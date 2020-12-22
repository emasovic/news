export const HOME = '/';

const ARTICLE = '/article';

export const SINGLE_ARTICLE = ARTICLE + '/:id';
export const goToSingleArticle = id => ARTICLE + `/${id}`;

export const CATEGORIES = '/categories';
export const CATEGORY = CATEGORIES + '/:category';
export const goToCategory = category => CATEGORIES + `/${category}`;

export const SEARCH = '/search';
