import { validateSvgContent } from '../utils/validate.util';

export class IconService {
  public static iconContent = new Map<string, string>();

  private url: string;
  /**
   * When set to `false`, SVG content that is HTTP fetched will not be checked
   * if the response SVG content has any `<script>` elements, or any attributes
   * that start with `on`, such as `onclick`.
   * @default true
   */
  private sanitize: boolean = true;
  private request: Map<string, Promise<any>> = new Map<string, Promise<any>>();

  constructor(url: string, sanitize?: boolean) {
    this.url = url;
    if (sanitize) {
      this.sanitize = sanitize;
    }
  }

  public async getSvgContent() {
    // see if we already have a request for this url
    let req = this.request.get(this.url);

    if (!req) {
      if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
        // we don't already have a request
        req = fetch(this.url).then((res) => {
          if (res.ok) {
            return res.text().then(async (svgContent) => {
              if (svgContent && this.sanitize !== false) {
                svgContent = await validateSvgContent(svgContent);
              }
              return IconService.iconContent.set(this.url, svgContent || '');
            });
          }
          return IconService.iconContent.set(this.url, '');
        });

        // cache for the same requests
        this.request.set(this.url, req);
      } else {
        // set to empty for ssr scenarios and resolve promise
        IconService.iconContent.set(this.url, '');
        return Promise.resolve();
      }
    }

    return await req;
  }

}
