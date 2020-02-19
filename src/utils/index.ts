/**
 * Use `navigator.platform` and `navigator.maxTouchPoints` to detect device type
 *
 * - [Detect if device is iOS](https://stackoverflow.com/questions/9038625/detect-if-device-is-ios)
 * - [How to detect iPad and iPad OS version in iOS 13 and Up?](https://stackoverflow.com/questions/57765958/how-to-detect-ipad-and-ipad-os-version-in-ios-13-and-up)
 */
export const isIOS =
  !!navigator.platform &&
  /iPad|iPhone|iPod|MacIntel/.test(navigator.platform) &&
  navigator.maxTouchPoints > 1;

export const classNames = (...args: string[]) => args.filter(Boolean).join(' ');
