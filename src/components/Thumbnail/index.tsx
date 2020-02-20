import { h, JSX } from 'preact';
import { useCallback } from 'preact/hooks';
import { memo } from 'preact/compat';
import style from './style.module.scss';
import { classNames } from '../../utils';

import tick from './img/tick.svg';

interface Props {
  file: File;
  className?: string;
  progress: number;
  src: string;
  checked?: boolean;
  onClick?: (file: File) => void;
}

const Thumbnail = (props: Props): JSX.Element => {
  const percent = props.progress * 100;
  const linearGradient = props.checked
    ? 'rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)'
    : `rgba(0, 0, 0, 0) ${percent}%, rgba(0, 0, 0, 0.6) ${percent}%`;

  const onClick = useCallback(() => {
    if (props.progress !== 1) {
      return;
    }
    props.onClick(props.file);
  }, [props.onClick, props.file]);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(${linearGradient}), url(${props.src})`,
      }}
      className={classNames(style.thumbnail, props.className)}
      onClick={onClick}
    >
      <img
        className={classNames(style.tick, props.checked && style['tick--is-check'])}
        src={tick}
        alt="tick"
        draggable={false}
      />
    </div>
  );
};

export default memo(Thumbnail);
