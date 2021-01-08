import { Config } from '@stencil/core';
import dotenvPlugin from 'rollup-plugin-dotenv';

// https://stenciljs.com/docs/config

export const config: Config = {
  taskQueue: 'async',
  buildEs5: true,
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: true,
    cloneNodeFix: true,
    slotChildNodesFix: true,
  },
  outputTargets: [
    {
      type: 'www',
      dir: '../../dist/client',
      baseUrl: 'http://localhost:3001',
      prerenderConfig: './prerender.config.ts',
      serviceWorker: {
        unregister: true,
      },
    },
    {
      type: 'dist-hydrate-script',
      dir: '../../dist/client/prerender',
    },
  ],
  globalStyle: 'src/global/app.css',
  plugins: [dotenvPlugin()],
};
