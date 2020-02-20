import { h, JSX } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import style from './style.module.scss';
import UploadBoxContent from '../UploadBoxContent';
import { classNames } from '../../utils';

const preventDefaultAndStopPropagation = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};

interface Props {
  close?: boolean;
  className?: string;
  setFiles: (files: File[]) => void;
}

const UploadBox = (props: Props): JSX.Element => {
  const [isDragOver, setIsDragOver] = useState(false);

  return useMemo(() => {
    const onChange = (e: Event): void => {
      props.setFiles([...(e.target as HTMLInputElement).files]);
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
      console.log(e.dataTransfer.files);
      dragLeaveHandler(e);
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
  }, [props.className, props.close, props.setFiles, isDragOver, setIsDragOver]);
};

export default UploadBox;
