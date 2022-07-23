import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { fetchData } from "../helpers/getPosts";
import { Posts } from "../types";

export const usePosts = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
	const [query, setQuery] = useLocalStorage('query', '');
	const [isLoading, setIsLoading] = useState(false);
	const [favoritePosts, setFavoritePosts] = useLocalStorage<Posts[]>(
		'favorite',
		[],
	);

	useEffect(() => {
		setIsLoading(true);

		fetchData(query)
			.then(({data}) => {
				const res = data.map((item: Posts) => {
					return {
						...item,
						liked: favoritePosts.some(
							(favorite: Posts) => favorite.objectID === item.objectID,
						),
					};
				});

				setPosts(res);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [query]);

	const handleLikedClick = ({
		liked,
		objectID,
	}: {
		liked: boolean;
		objectID: string;
	}) => {
		const newPosts = posts.map((item: Posts) => {
			if (item.objectID === objectID) {
				return {...item, liked: !liked};
			}
			return item;
		});
		setPosts(newPosts);
		setFavoritePosts(() => {
			if (liked) {
				return favoritePosts.filter(
					(item: Posts) => item.objectID !== objectID,
				);
			}
			return [
				...favoritePosts,
				newPosts.find((item: Posts) => item.objectID === objectID)!,
			];
		});
	};

  return {
    posts,
    query,
    setQuery,
    isLoading,
    handleLikedClick,
    favoritePosts
  };
}
