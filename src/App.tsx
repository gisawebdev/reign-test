import {useEffect, useState} from 'react';
import {Tab} from '@headlessui/react';
import Card from './components/Card';
import Header from './components/Header';
import Select from './components/Select';
import {Spinner} from './components/Spinner';
import './index.css';
import {useLocalStorage} from 'usehooks-ts';
import {fetchData} from './helpers/getPosts';
import ReactPaginate from 'react-paginate';

export type Posts = {
	author: string;
	created_at: string;
	objectID: string;
	story_title: string;
	story_url: string;
	liked: boolean;
};

const App = () => {
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

	return (
		<>
			<Header />
			<Tab.Group>
				<main className="grid place-items-center py-5 gap-5">
					<Tab.List className="flex items-center gap-4">
						<Tab>All</Tab>
						<Tab>My faves</Tab>
					</Tab.List>

					{/* Select */}
					<div className="md:w-[75%]">
						<Select query={query} setQuery={setQuery} />
					</div>
					<Tab.Panels className="w-[75%]">
						<Tab.Panel>
							{/* card container */}

							{isLoading ? (
								<Spinner />
							) : (
								<div className="grid md:grid-cols-2 gap-5 mt-5  max-h-[50vh] overflow-y-scroll scroll-ml-2 overflow-hidden p-1 md:p-0">
									{posts.map((post) => {
										const {
											author,
											created_at,
											objectID,
											story_title,
											story_url,
											liked,
										} = post;
										return (
											<Card
												key={objectID}
												link={story_url}
												title={story_title}
												date={created_at}
												author={author}
												liked={liked}
												onLikeClick={() => handleLikedClick({liked, objectID})}
											/>
										);
									})}
								</div>
							)}
						</Tab.Panel>
						<Tab.Panel>
							<div className="grid md:grid-cols-2 gap-5 mt-5  max-h-[50vh] overflow-y-scroll scroll-ml-2 overflow-hidden p-1 md:p-0">
								{favoritePosts.map((post) => {
									const {
										author,
										created_at,
										objectID,
										story_title,
										story_url,
										liked,
									} = post;
									return (
										<Card
											key={objectID}
											link={story_url}
											title={story_title}
											date={created_at}
											author={author}
											liked={liked}
											onLikeClick={() => handleLikedClick({liked, objectID})}
										/>
									);
								})}
							</div>
						</Tab.Panel>
					</Tab.Panels>
				</main>
			</Tab.Group>
			{/* buttons */}
		</>
	);
};

export default App;
