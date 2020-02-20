import { h, JSX } from 'preact';
import { memo } from 'preact/compat';
import style from './style.module.scss';
import { classNames } from '../../utils';

import imageTop from './img/image_top.png';
import imageBottom from './img/image_bottom.png';

interface Props {
  className?: string;
  close?: boolean;
}

const ImageIcon = (props: Props): JSX.Element => (
  <div className={classNames(style.wrapper, props.className)}>
    <div className={style.container}>
      <img className={style.top} src={imageTop} alt="image top" />
      <img
        className={classNames(style.bottom, props.close && style['bottom--close'])}
        src={imageBottom}
        alt="image bottom"
      />
    </div>
  </div>
);

export default memo(ImageIcon);
