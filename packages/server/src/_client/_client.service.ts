import { Injectable, Req } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
/* import * as builder from 'xmlbuilder';
import { XMLElement } from 'xmlbuilder'; */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { renderToString } = require('../../client/prerender');

@Injectable()
export class ClientService {
	public async getApp(@Req() req) {
		// const filePath = await this.getFilePath('index.html');
		const reqPath = req.path === '/' ? '' : req.path;
		// const srcHtml = readFileSync(filePath,
		//   'utf8'
		// );
		const srcHtml = readFileSync(
			join(__dirname, '..', '..', 'client', 'index.html'),
			'utf8',
		);
		return renderToString(srcHtml, {
			removeBooleanAttributeQuotes: true,
			prettyHtml: false,
		}).then(results => results.html);
	}

	public async getFilePath(url: any) {
		const basePath = `${__dirname}/dist/client`;
		const filePath = resolve(join(__dirname, '..', '..', 'client', url));
		// const basePath = this.configService.get('CLIENT_BUILD_PATH');
		return filePath;
	}

	/* public async getSitemap() {
    const recipes = await this.recipeService.getAllRecipes();
    return this.buildXML(recipes);
  }

  private async buildXML(recipes: IRecipe[]) {
    const xml = builder
      .create('urlset')
      .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    recipes.forEach(recipe => {
      this.buildEntry(xml, `recipe/${recipe.name}`, recipe.uploadDate);
    });
    return xml.end({ pretty: true });
  }

  private buildEntry(xml: XMLElement, uri: string, date: string) {
    const baseUrl = 'http://localhost:5000';
    xml
      .ele('url')
      .ele('loc', `${baseUrl}/${uri}`)
      .up()
      .ele('lastmod', date)
      .up();
  } */
}
