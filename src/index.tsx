import { h, render, JSX } from 'preact';
import style from './style.module.scss';
import Header from './components/Header';
import UploadBox from './components/UploadBox';

const App = (): JSX.Element => (
  <div className={style.app}>
    <Header className={style.header} />
    <main className={style.main}>
      <UploadBox className={style['upload-box']} />
    </main>
  </div>
);

render(<App />, document.getElementById('root'));
