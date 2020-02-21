import { h, JSX } from 'preact';
import { useState, useContext, useMemo } from 'preact/hooks';
import style from './style.module.scss';
import UploadBoxContent from '../UploadBoxContent';
import { classNames } from '../../utils';
import { asyncUpdateMultipleImageProgress } from '../../utils/helper';
import { ContextStore, addImages } from '../../globalState';

const preventDefaultAndStopPropagation = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};

interface Props {
  close?: boolean;
  className?: string;
}

const UploadBox = (props: Props): JSX.Element => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { dispatch } = useContext(ContextStore);

  return useMemo(() => {
    const onChange = (e: Event): void => {
      const files = [...(e.target as HTMLInputElement).files];
      dispatch(addImages(files));
      dispatch(asyncUpdateMultipleImageProgress(files));
    };

    const dragOverHandler = (e: DragEvent) => {
      setIsDragOver(true);
      preventDefaultAndStopPropagation(e);
    };

    const dragLeaveHandler = (e: DragEvent) => {
      setIsDragOver(false);
      preventDefaultAndStopPropagation(e);
    };

    const dropHandler = (e: DragEvent) => {
      const files = [...e.dataTransfer.files];
      dragLeaveHandler(e);
      dispatch(addImages(files));
      dispatch(asyncUpdateMultipleImageProgress(files));
    };

    return (
      <div
        onDrag={preventDefaultAndStopPropagation}
        onDragStart={preventDefaultAndStopPropagation}
        onDragEnd={dragLeaveHandler}
        onDragOver={dragOverHandler}
        onDragEnter={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
        className={classNames(style.area, props.className, isDragOver && style['area--drag'])}
      >
        <input
          className={style.input}
          id="file"
          type="file"
          accept="image/*"
          multiple
          onChange={onChange}
        />
        <UploadBoxContent isDragOver={isDragOver} close={props.close} />
      </div>
    );
  }, [props.className, props.close, isDragOver, setIsDragOver, dispatch]);
};

export default UploadBox;
