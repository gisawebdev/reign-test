import {useState} from 'react';
import Card from './components/Card';
import Header from './components/Header';
// import Pagination from './components/Pagination';
import Select from './components/Select';
import './index.css';

type Posts = {
	author: string;
	created_at: string;
	objectID: string;
	title: string;
	url: string;
};

const App = () => {
	// hacker news api
	const baseUrl = 'https://hn.algolia.com/api/v1/search?query=';

	// posts state
	const [posts, setPosts] = useState<Posts[]>([]);
	// query state
	const [query, setQuery] = useState('react');

	const getAllPosts = async () => {
		const response = await fetch(`${baseUrl}react`);
		const data = await response.json();

		setPosts(data.hits);
	};

	getAllPosts();

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
					<Select />
				</div>

				{/* card container */}
				<div className="grid md:grid-cols-2 gap-5 mt-5 w-[85%]  max-h-[50vh] overflow-y-scroll scroll-ml-2 overflow-hidden">
					{posts.map((post) => {
						const {author, created_at, objectID, title, url} = post;
						return (
							<Card
								key={objectID}
								link={url}
								title={title}
								date={created_at}
								author={author}
							/>
						);
					})}
				</div>
			</main>
		</>
	);
};

export default App;
