import { h, JSX } from 'preact';
import { memo } from 'preact/compat';
import style from './style.module.scss';
import ImageIcon from '../ImageIcon';
import { classNames } from '../../utils';

interface Props {
  close?: boolean;
  isDragOver: boolean;
}

const UploadBoxContent = (props: Props): JSX.Element => (
  <div
    className={classNames(
      style['upload-box-content'],
      props.close && style['upload-box-content--close'],
    )}
  >
    <ImageIcon
      className={classNames(style.icon, props.isDragOver && style['icon--close'])}
      close={props.isDragOver}
    />
    <p className={style.header}>Upload images</p>
    <span className={style.content}>Drag and drop your images here to start the upload</span>
    <label
      className={classNames(style.button, props.isDragOver && style['button--hidden'])}
      for="file"
    >
      Choose Images
    </label>
  </div>
);

export default memo(UploadBoxContent);
