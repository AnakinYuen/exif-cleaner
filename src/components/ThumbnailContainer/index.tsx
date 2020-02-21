import { h, JSX } from 'preact';
import { useContext } from 'preact/hooks';
import style from './style.module.scss';
import Thumbnail from '../Thumbnail';
import { classNames } from '../../utils';
import { ContextStore, toggleImageCheck } from '../../globalState';

interface Props {
  className?: string;
}

const ThumbnailContainer = (props: Props): JSX.Element => {
  const { images, dispatch } = useContext(ContextStore);
  const onClick = (file: File) => {
    dispatch(toggleImageCheck(file));
  };

  const thumbnails: JSX.Element[] = [];
  const iterator = images.entries();
  for (const [file, info] of iterator) {
    thumbnails.push(
      <Thumbnail
        file={file}
        progress={info.progress}
        src={info.src}
        checked={info.checked}
        onClick={onClick}
      />,
    );
  }
  return <div className={classNames(style.container, props.className)}>{thumbnails}</div>;
};

export default ThumbnailContainer;
