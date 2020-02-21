import { h, JSX } from 'preact';
import { useContext, useMemo } from 'preact/hooks';
import style from './style.module.scss';
import ThumbnailContainer from '../ThumbnailContainer';
import { classNames } from '../../utils';
import { ContextStore, checkAllImage, uncheckAllImage } from '../../globalState';

interface Props {
  className?: string;
}

const SelectBox = (props: Props): JSX.Element => {
  const { isProcessing, isSelected, dispatch } = useContext(ContextStore);

  return useMemo(() => {
    const onClick = () => (isSelected ? dispatch(uncheckAllImage()) : dispatch(checkAllImage()));

    return (
      <div className={classNames(style['select-box'], props.className)}>
        <button
          className={classNames(style.button, isProcessing && style['button--disable'])}
          onClick={onClick}
        >
          {isSelected ? 'Cancel' : 'Select All'}
        </button>
        <ThumbnailContainer />
      </div>
    );
  }, [isSelected, isProcessing, dispatch, props.className]);
};

export default SelectBox;
