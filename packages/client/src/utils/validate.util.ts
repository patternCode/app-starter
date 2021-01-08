import { isStr } from './utils';

export const validateSvgContent = (svgContent: string) => {
  const div = document.createElement('div');
  div.innerHTML = svgContent;

  // setup this way to ensure it works on our buddy IE
  for (let i = div.childNodes.length - 1; i >= 0; i--) {
    if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
      div.removeChild(div.childNodes[i]);
    }
  }

  // must only have 1 root element
  const svgElm = div.firstElementChild;
  if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
    const svgClass = svgElm.getAttribute('class') || '';
    svgElm.setAttribute('class', (svgClass + ' s-ion-icon').trim());

    // root element must be an svg
    // lets double check we've got valid elements
    // do not allow scripts
    if (isValid(svgElm as any)) {
      return div.innerHTML;
    }
  }
  return '';
};

export const isValid = (elm: HTMLElement) => {
  if (elm.nodeType === 1) {
    if (elm.nodeName.toLowerCase() === 'script') {
      return false;
    }

    for (let i = 0; i < elm.attributes.length; i++) {
      const val = elm.attributes[i].value;
      if (isStr(val) && val.toLowerCase().indexOf('on') === 0) {
        return false;
      }
    }

    for (let i = 0; i < elm.childNodes.length; i++) {
      if (!isValid(elm.childNodes[i] as any)) {
        return false;
      }
    }
  }
  return true;
};

type CustomValidityState = {
  -readonly[P in keyof ValidityState]: ValidityState[P]
};

export const InputValidityObj =
  (customValidity: Partial<ValidityState> = {}): ValidityState => {
    /*
     * We need to make ValidityState an object because it is readonly and
     * we cannot use the spread operator. Also, we don't export
     * `CustomValidityState` because it is a leaky implementation and the user
     * already has access to `ValidityState` in lib.dom.ts. Also an interface
     * {a: Type} can be casted to {readonly a: Type} so passing any object
     * should be fine.
     */
    const objectifiedCustomValidity: Partial<CustomValidityState> = {};
    for (const propName in customValidity) {
      /*
       * Casting is needed because ValidityState's props are all readonly and
       * thus cannot be set on `onjectifiedCustomValidity`. In the end, the
       * interface is the same as ValidityState (but not readonly), but the
       * function signature casts the output to ValidityState (thus readonly).
       */
      objectifiedCustomValidity[propName as keyof CustomValidityState] =
          customValidity[propName as keyof ValidityState];
    }
    return {
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: true,
      valueMissing: false,
      ...objectifiedCustomValidity
    };
};
