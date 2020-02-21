import { h, JSX } from 'preact';
import { useContext, useMemo } from 'preact/hooks';
import style from './style.module.scss';
import Header from '../Header';
import FAB from '../FAB';
import UploadBox from '../UploadBox';
import SelectBox from '../SelectBox';
import { classNames } from '../../utils';
import { ContextStore } from '../../globalState';

const App = (): JSX.Element => {
  const { haveFile } = useContext(ContextStore);

  return useMemo(() => {
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
        <FAB className={classNames(style.fab, haveFile && style['fab--up'])} action="add" />
      </div>
    );
  }, [haveFile]);
};

export default App;
