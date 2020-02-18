import { h, JSX } from 'preact';
import { memo } from 'preact/compat';

const onChange = (e: Event): void => {
  console.log((e.target as HTMLInputElement).files);
};

const UploadBox = (): JSX.Element => {
  return <input type="file" accept="image/*" multiple onChange={onChange} />;
};

export default memo(UploadBox);
