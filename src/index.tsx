/// <reference path="../declaration.d.ts" />

import { h, render, JSX } from 'preact';
import style from './style.module.scss';

const App = (): JSX.Element => <h1 className={style.header}>Hello World</h1>;

render(<App />, document.getElementById('root'));
