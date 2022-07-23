import ReactPaginate from 'react-paginate';

interface Props {
	currentPage: number;
	pages: number;
	setCurrentPage: (page: number) => void;
}

const Pagination = ({currentPage, pages, setCurrentPage}: Props) => {
	return (
		<ReactPaginate
			nextLabel=">"
			previousLabel="<"
			breakLabel="..."
			forcePage={currentPage}
			pageCount={pages}
			renderOnZeroPageCount={() => null}
			onPageChange={(page) => setCurrentPage(page.selected)}
			className="flex justify-center items-center gap-5 w-full mt-5"
			activeClassName=" transition- ease-in duration-300 bg-cyan-400 text-white p-2 rounded-full hover:bg-cyan-600"
			previousClassName="transition ease-in duration-300 rounded-full hover:bg-gray-200"
			nextClassName="transition ease-in duration-300 rounded-full hover:bg-gray-200"
		/>
	);
};

export default Pagination;
