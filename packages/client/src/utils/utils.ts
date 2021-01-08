import { getAssetPath } from '@stencil/core';
import { AIcon } from '../components/atoms/a-icon/a-icon';


let CACHED_MAP: Map<string, string>;

export const getIconMap = (): Map<string, string> => {
  if (typeof window === 'undefined') {
    return new Map();
  } else {
    if (!CACHED_MAP) {
      const win = window as any;
      win.icons = win.icons || {};
      CACHED_MAP = win.icons.map = win.icons.map || new Map();
    }
    return CACHED_MAP;
  }
};

export const addIcons = (icons: { [name: string]: string; }) => {
  const map = getIconMap();
  Object.keys(icons).forEach(name => map.set(name, icons[name]));
};


export const getUrl = (aIcon: AIcon) => {
  let url = getSrc(aIcon.src);
  if (url) {
    return url;
  }

  url = getName(aIcon.name, aIcon.icon);
  if (url) {
    return getNamedUrl(url);
  }

  if (aIcon.icon) {
    url = getSrc(aIcon.icon);
    if (url) {
      return url;
    }
  }

  return null;
};


const getNamedUrl = (iconName: string) => {
  const url = getIconMap().get(iconName);
  if (url) {
    return url;
  }
  return getAssetPath(`svg/${iconName}.svg`);
};


export const getName = (
  iconName: string | undefined,
  icon: string | undefined,
) => {
  // default to "md" if somehow the mode wasn't set

  if (!iconName && icon && !isSrc(icon)) {
    iconName = icon;
  }
  if (isStr(iconName)) {
    iconName = toLower(iconName);
  }

  if (!isStr(iconName) || iconName.trim() === '') {
    return null;
  }

  // only allow alpha characters and dash
  const invalidChars = iconName.replace(/[a-z]|-|\d/gi, '');
  if (invalidChars !== '') {
    return null;
  }

  return iconName;
};

export const getSrc = (src: string | undefined) => {
  if (isStr(src)) {
    src = src.trim();
    if (isSrc(src)) {
      return src;
    }
  }
  return null;
};

export const isSrc = (str: string) => str.length > 0 && /(\/|\.)/.test(str);

export const isStr = (val: any): val is string => typeof val === 'string';

export const toLower = (val: string) => val.toLowerCase();
