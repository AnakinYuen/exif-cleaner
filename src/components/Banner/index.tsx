import { h, JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { memo } from 'preact/compat';

interface Props {
  className?: string;
}

const Banner = (props: Props): JSX.Element => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <svg
      width={width}
      height="170"
      viewBox={`0 0 ${width} 170`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d={`M0 0H${width}V120V170C${width} 130 ${width - 33.3333} 120 ${width -
          50} 120H50C33.3333 120 0 110 0 70V0Z`}
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0"
          y1="0"
          x2={width}
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#226EFF" />
          <stop offset="1" stop-color="#22FFF2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default memo(Banner);
