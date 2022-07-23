import {Tab} from '@headlessui/react';
import classNames from 'classnames';
import {useState} from 'react';
import FavoritePosts from './components/FavoritePosts';
import Header from './components/Header';
import Pagination from './components/Pagination';
import PostsApi from './components/PostsApi';
import Select from './components/Select';
import {Spinner} from './components/Spinner';
import {usePosts} from './hooks/usePosts';
import './index.css';

const App = () => {
	const {
		currentPage,
		favoritePosts,
		handleLikedClick,
		isLoading,
		pages,
		posts,
		query,
		setCurrentPage,
		setQuery,
	} = usePosts();

	const [activeTab, setActiveTab] = useState('');

	return (
		<>
			<Header />
			<Tab.Group>
				<main className="grid place-items-center py-5 gap-5">
					<Tab.List className="flex items-center ">
						<Tab
							className={classNames('py-2 px-5 border rounded-sm', {
								'border-cyan-500 text-cyan-500': activeTab === 'All',
							})}
							onClick={() => setActiveTab('All')}
						>
							All
						</Tab>

						<Tab
							className={classNames('py-2 px-5 border rounded-sm', {
								'border-cyan-500 text-cyan-500': activeTab === 'My faves',
							})}
							onClick={() => setActiveTab('My faves')}
						>
							My faves
						</Tab>
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
								<PostsApi posts={posts} handleLikedClick={handleLikedClick} />
							)}
						</Tab.Panel>
						<Tab.Panel>
							<FavoritePosts
								favoritePosts={favoritePosts}
								handleLikedClick={handleLikedClick}
							/>
						</Tab.Panel>
					</Tab.Panels>
				</main>
				<Pagination
					currentPage={currentPage}
					pages={pages}
					setCurrentPage={setCurrentPage}
				/>
			</Tab.Group>
		</>
	);
};

export default App;
