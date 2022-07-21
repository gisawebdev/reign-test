interface Props {
	title?: string;
	date?: string;
	author?: string;
}

const Card = ({title, date, author}: Props) => {
	return (
		<article className="relative rounded-md w-full p-5 border border-[#979797] hover:opacity-40 transition ease-in-out duration-300 h-32 max-h-44">
			<header>
				<span>icon </span>
				<span>date </span>
				<span>author </span>
			</header>
			<main className="my-2">
				<h3>title</h3>
			</main>
			<footer className="absolute bg-[#606060] bg-opacity-[0.06] left-0  bottom-0 w-full md:w-[15%] p-3 md:p-0 md:top-0 md:left-[85%] md:right-0 flex items-center justify-center">
				<div className="bg-red-500 rounded-full  h-5 w-5" />
			</footer>
		</article>
	);
};

export default Card;
