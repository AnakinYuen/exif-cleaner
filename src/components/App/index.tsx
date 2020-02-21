import { h, JSX } from 'preact';
import { useContext, useMemo } from 'preact/hooks';
import style from './style.module.scss';
import Header from '../Header';
import FAB from '../FAB';
import UploadBox from '../UploadBox';
import SelectBox from '../SelectBox';
import { classNames } from '../../utils';
import { asyncUpdateMultipleImageProgress, downloadZip } from '../../utils/helper';
import { ContextStore, addImages } from '../../globalState';

const App = (): JSX.Element => {
  const { haveFile, isSelected, dispatch } = useContext(ContextStore);

  return useMemo(() => {
    const onAdd = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true;
      input.onchange = (e: Event) => {
        const files = [...(e.target as HTMLInputElement).files];
        dispatch(addImages(files));
        dispatch(asyncUpdateMultipleImageProgress(files));
      };
      input.click();
    };

    const onDownload = () => dispatch(downloadZip);

    const onClick = () => (isSelected ? onDownload() : onAdd());

    return (
      <div className={style.app}>
        <Header className={style.header} />
        <main className={style.main}>
          <UploadBox
            className={classNames(style['upload-box'], haveFile && style['upload-box--close'])}
            close={haveFile}
          />
          <SelectBox
            className={classNames(style['select-box'], haveFile && style['select-box--show'])}
          />
        </main>
        <FAB
          className={classNames(style.fab, haveFile && style['fab--up'])}
          action={isSelected ? 'download' : 'add'}
          onClick={onClick}
        />
      </div>
    );
  }, [haveFile, isSelected, dispatch]);
};

export default App;
