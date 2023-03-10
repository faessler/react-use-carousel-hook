export const SITE = {
	title: 'React useCarousel hook',
	description: 'Docs of the react-use-carousel-hook npm package, including install and usage guide with examples.',
	defaultLanguage: 'en-us',
} as const;

export const KNOWN_LANGUAGES = {
	English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/faessler/react-use-carousel-hook/tree/main/docs`;

// // See "Algolia" section of the README for more information.
// export const ALGOLIA = {
// 	indexName: 'XXXXXXXXXX',
// 	appId: 'XXXXXXXXXX',
// 	apiKey: 'XXXXXXXXXX',
// };

export type Sidebar = Record<
	(typeof KNOWN_LANGUAGE_CODES)[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	en: {
		'Navigation': [
			{ text: 'Introduction', link: 'introduction' },
			{ text: 'Installation', link: 'installation' },
			{ text: 'Usage', link: 'usage' },
			{ text: 'Examples', link: 'examples' },
		],
	},
};
