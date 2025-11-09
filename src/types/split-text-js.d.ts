declare module "split-text-js" {
  class SplitTextJS {
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    constructor(target: string | HTMLElement);
  }
  export default SplitTextJS;
}
