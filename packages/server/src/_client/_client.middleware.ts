import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientService } from './_client.service';

// const { renderToString } = require('../../client/prerender');

import { join } from 'path';

@Injectable()
export class ClientMiddleware implements NestMiddleware {
	constructor(private readonly clientService: ClientService) {}

	async use(req: Request, res: Response, next: () => void) {
		const reqPath = this.validatePath(req.path);

		// 'req.path', req.path)
		// 'validate path', this.validatePath(req.path))
		// 'regex', /[^\\/]+\.[^\\/]+$/.test(req.path))
		// 'index', req.path.includes('index.html'))

		/* if (!/[^\\/]+\.[^\\/]+$/.test(req.path)) {
      const basePath = 'dist/client';
      const srcHtml = readFileSync(
        join(process.cwd(), basePath, `${reqPath}`, 'index.html'),
        'utf8'
      );
      await renderToString(
        srcHtml,
        {
          removeBooleanAttributeQuotes: true,
          prettyHtml: false
        }
      )
        .then(results => {
          'results', results.html)
          return res.send(results.html);
        })
        .catch((_err) => res.status(404).end());
    } */

		if (
			/[^\\/]+\.[^\\/]+$/.test(req.path) &&
			!req.path.includes('index.html')
		) {
			const file = await this.clientService.getFilePath(req.path);
			res.sendFile(file, err => {
				if (err) {
					res.status(404).end();
				}
			});
		} else {
			return next();
		}
	}

	private validatePath(path: string) {
		return path && path.charAt(0) !== '/' ? `/${path}` : path;
	}

	private getIndexFilePath(clientPath: string): string {
		return join(clientPath, 'index.html');
	}
}
