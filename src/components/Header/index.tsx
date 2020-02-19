import { h, JSX } from 'preact';
import { memo } from 'preact/compat';
import Banner from '../Banner';
import style from './style.module.scss';
import { classNames } from '../../utils';

import logo from './img/logo.png';

interface Props {
  className?: string;
}

const Header = (props: Props): JSX.Element => (
  <header className={classNames(props.className, style.header)}>
    <Banner />
    <div className={style.logo}>
      <img className={style.icon} src={logo} alt="EXIF Cleaner Logo" />
      EXIF Cleaner
    </div>
  </header>
);

export default memo(Header);
