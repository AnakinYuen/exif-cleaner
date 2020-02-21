import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import style from './style.module.scss';
import Header from '../Header';
import FAB from '../FAB';
import UploadBox from '../UploadBox';
import { classNames } from '../../utils';

const App = (): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);
  const haveFile = files.length > 0;

  return (
    <div className={style.app}>
      <Header className={style.header} />
      <main className={style.main}>
        <UploadBox
          className={classNames(style['upload-box'], haveFile && style['upload-box--close'])}
          close={haveFile}
          setFiles={setFiles}
        />
      </main>
      <FAB className={classNames(style.fab, haveFile && style['fab--up'])} action="add" />
    </div>
  );
};

export default App;
