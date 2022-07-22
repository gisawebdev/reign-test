import {useEffect, useState} from 'react';
import Card from './components/Card';
import Header from './components/Header';
// import Pagination from './components/Pagination';
import Select from './components/Select';
import {Spinner} from './components/Spinner';
import './index.css';

type Posts = {
	author: string;
	created_at: string;
	objectID: string;
	story_title: string;
	story_url: string;
};

const App = () => {
	const [posts, setPosts] = useState<Posts[]>([]);
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		const fetchData = async () => {
			const baseUrl = 'https://hn.algolia.com/api/v1/search_by_date?query=';
			const result = await fetch(
				`${query === 'Select your news' ? baseUrl : `${baseUrl}${query}`}`,
			);
			const data = await result.json();

			const filteredData = data.hits.filter(
				(item: Posts) => item.story_title !== null && item.story_url !== null,
			);
			setPosts(filteredData);
		};

		fetchData();
		setIsLoading(false);
	}, [query]);

	return (
		<>
			<Header />
			<main className="grid place-items-center py-5 gap-5">
				{/* buttons */}
				<div className="flex items-center gap-4">
					<button>All</button>
					<button>My faves</button>
				</div>

				{/* Select */}
				<div className="md:w-[85%]">
					<Select setQuery={setQuery} />
				</div>

				{/* card container */}

				{isLoading ? (
					<Spinner />
				) : (
					<div className="grid md:grid-cols-2 gap-5 mt-5 w-[85%]  max-h-[50vh] overflow-y-scroll scroll-ml-2 overflow-hidden">
						{posts.map((post) => {
							const {author, created_at, objectID, story_title, story_url} =
								post;
							return (
								<Card
									key={objectID}
									link={story_url}
									title={story_title}
									date={created_at}
									author={author}
								/>
							);
						})}
					</div>
				)}
			</main>
		</>
	);
};

export default App;
