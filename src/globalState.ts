import { createContext } from 'preact';
import { sumIterable } from './utils/helper';
import { Dispatch } from './utils/useThunkReducer';

interface ImageInfo {
  progress: number;
  src: string;
  checked: boolean;
  blob: Blob | null;
}

export interface State {
  images: Map<File, ImageInfo>;
  selected: Set<File>;
  isSelected: boolean;
  haveFile: boolean;
  isProcessing: boolean;
}

const ADD_IMAGES = 'ADD_IMAGES';
const UPDATE_MULTIPLE_IMAGE_PROGRESS = 'UPDATE_MULTIPLE_IMAGE_PROGRESS';
const TOGGLE_IMAGE_CHECK = 'TOGGLE_IMAGE_CHECK';
const CHECK_ALL_IMAGE = 'CHECK_ALL_IMAGE';
const UNCHECK_ALL_IMAGE = 'UNCHECK_ALL_IMAGE';

export const addImages = (files: File[]) => ({
  type: ADD_IMAGES as typeof ADD_IMAGES,
  files,
});

export interface Progress {
  progress: number;
  blob: Blob;
}

export const updateMultipleImageProgress = (progresses: Map<File, Progress>) => ({
  type: UPDATE_MULTIPLE_IMAGE_PROGRESS as typeof UPDATE_MULTIPLE_IMAGE_PROGRESS,
  progresses,
});

export const toggleImageCheck = (key: File) => ({
  type: TOGGLE_IMAGE_CHECK as typeof TOGGLE_IMAGE_CHECK,
  key,
});

export const checkAllImage = () => ({
  type: CHECK_ALL_IMAGE as typeof CHECK_ALL_IMAGE,
});

export const uncheckAllImage = () => ({
  type: UNCHECK_ALL_IMAGE as typeof UNCHECK_ALL_IMAGE,
});

export type Action = ReturnType<
  | typeof addImages
  | typeof updateMultipleImageProgress
  | typeof toggleImageCheck
  | typeof checkAllImage
  | typeof uncheckAllImage
>;

const addedImageHandler = (state: State, action: ReturnType<typeof addImages>): State => {
  const images = new Map(state.images);
  action.files.forEach(file => {
    if (images.has(file)) {
      return;
    }
    images.set(file, {
      progress: 0,
      src: URL.createObjectURL(file),
      checked: false,
      blob: null,
    });
  });
  return { ...state, images, haveFile: true, isProcessing: true };
};

const updateMultipleImageProgressHandler = (
  state: State,
  action: ReturnType<typeof updateMultipleImageProgress>,
): State => {
  const images = new Map(state.images);
  const iterator = action.progresses.entries();
  for (const [key, value] of iterator) {
    const imageInfo = images.get(key);
    if (imageInfo) {
      images.set(key, { ...imageInfo, progress: value.progress, blob: value.blob });
    }
  }
  const totalProgress = sumIterable(images.values());
  return { ...state, images, isProcessing: totalProgress < images.size };
};

const toggleImageCheckHandler = (
  state: State,
  action: ReturnType<typeof toggleImageCheck>,
): State => {
  const images = new Map(state.images);
  const imageInfo = images.get(action.key);
  if (!imageInfo) {
    return state;
  }
  const checked = !imageInfo.checked;
  images.set(action.key, { ...imageInfo, checked });

  const selected = new Set(state.selected);
  if (checked) {
    selected.add(action.key);
  } else {
    selected.delete(action.key);
  }
  return { ...state, images, selected, isSelected: selected.size > 0 };
};

const checkAllImageHandler = (state: State): State => {
  const images = new Map(state.images);
  const selected = new Set<File>();
  const iterator = images.entries();
  for (const [key, value] of iterator) {
    selected.add(key);
    if (!value.checked) {
      images.set(key, { ...value, checked: true });
    }
  }
  return { ...state, images, selected, isSelected: true };
};

const uncheckAllImageHandler = (state: State): State => {
  const images = new Map(state.images);
  const selected = new Set<File>();
  const iterator = images.entries();
  for (const [key, value] of iterator) {
    if (value.checked) {
      images.set(key, { ...value, checked: false });
    }
  }
  return { ...state, images, selected, isSelected: false };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ADD_IMAGES:
      return addedImageHandler(state, action);
    case UPDATE_MULTIPLE_IMAGE_PROGRESS:
      return updateMultipleImageProgressHandler(state, action);
    case TOGGLE_IMAGE_CHECK:
      return toggleImageCheckHandler(state, action);
    case CHECK_ALL_IMAGE:
      return checkAllImageHandler(state);
    case UNCHECK_ALL_IMAGE:
      return uncheckAllImageHandler(state);
    default:
      return state;
  }
};

export const initState: State = {
  images: new Map<File, ImageInfo>(),
  selected: new Set<File>(),
  haveFile: false,
  isSelected: false,
  isProcessing: true,
};

interface DispatchObj<A, S> {
  dispatch: Dispatch<A, S>;
}

export const ContextStore = createContext<State & DispatchObj<Action, State>>({
  ...initState,
  dispatch: () => void 0,
});
