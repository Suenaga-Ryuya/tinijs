import {
  ContentService,
  type Id,
  type Slug,
  type Status,
  type Order,
  type Title,
  type Content,
} from '@tinijs/content';

export interface DocCategory extends Id, Slug, Status, Order, Title {}
export interface DocCategoryDetail extends DocCategory, Content {}

export interface DocPost extends Id, Slug, Status, Order, Title {
  category: string;
}
export interface DocPostDetail extends DocPost, Content {}

export type CategoryService = ContentService<DocCategory, DocCategoryDetail>;
export type PostService = ContentService<DocPost, DocPostDetail>;

export const frameworkCategoryService = new ContentService<
  DocCategory,
  DocCategoryDetail
>('framework-categories');
export const frameworkPostService = new ContentService<DocPost, DocPostDetail>(
  'framework-posts'
);

export const uiCategoryService = new ContentService<
  DocCategory,
  DocCategoryDetail
>('ui-categories');
export const uiPostService = new ContentService<DocPost, DocPostDetail>(
  'ui-posts'
);

export const moduleCategoryService = new ContentService<
  DocCategory,
  DocCategoryDetail
>('module-categories');
export const modulePostService = new ContentService<DocPost, DocPostDetail>(
  'module-posts'
);

export const toolboxCategoryService = new ContentService<
  DocCategory,
  DocCategoryDetail
>('toolbox-categories');
export const toolboxPostService = new ContentService<DocPost, DocPostDetail>(
  'toolbox-posts'
);

export const cliCategoryService = new ContentService<
  DocCategory,
  DocCategoryDetail
>('cli-categories');
export const cliPostService = new ContentService<DocPost, DocPostDetail>(
  'cli-posts'
);
