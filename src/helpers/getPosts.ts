import { Posts } from "../types";

export const fetchData = async (query: string, page: number = 0) => {
	const baseUrl = `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`;
	const result = await fetch(baseUrl);
	const data = await result.json();

	const {hits, nbPages} = data;

	const filteredData = hits.filter(
		(item: Posts) => item.story_title !== null && item.story_url !== null,
	);

	return {
		data: filteredData as Posts[],
		nbPages,
	};
};
