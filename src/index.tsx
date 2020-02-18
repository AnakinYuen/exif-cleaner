import { h, render, JSX } from 'preact';
import style from './style.module.scss';
import UploadBox from './components/UploadBox';

const App = (): JSX.Element => (
  <div>
    <h1 className={style.header}>Hello World</h1>
    <UploadBox />
  </div>
);

render(<App />, document.getElementById('root'));
