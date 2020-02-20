import { h, JSX } from 'preact';
import { memo } from 'preact/compat';
import style from './style.module.scss';
import { classNames } from '../../utils';

import add from './img/add.svg';
import download from './img/download.svg';

interface Props {
  className?: string;
  action: 'add' | 'download';
  onClick?: () => void;
}

const FAB = (props: Props): JSX.Element => (
  <button
    className={classNames(style.ripple, style.fab, style[`fab--${props.action}`], props.className)}
    onClick={props.onClick}
  >
    <img className={style.add} src={add} alt="add button" />
    <img className={style.download} src={download} alt="download button" />
  </button>
);

export default memo(FAB);
