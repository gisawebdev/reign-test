import Card from './components/Card';
import Header from './components/Header';
import Pagination from './components/Pagination';
import './index.css';

const App = () => {
	return (
		<>
			<Header />
			<main className='grid place-items-center py-5 gap-5'>
				
				
				{/* buttons */}
				<div className='flex items-center gap-4'>
					<button>All</button>
					<button>My faves</button>
				</div>

				{/* filter */}
				<div className='md:w-[85%]'>
					<input type="text"  className='border' />
				</div>

				{/* card container */}
				<div className='grid md:grid-cols-2 gap-5 mt-5 w-[85%] '>
					{
						Array.from({ length: 6 }).map((_, i) => (
							<Card/>
							)
						)

					}
				</div>

				{/* pagination */}
				<Pagination/>
			</main>
		</>
	);
};

export default App;
