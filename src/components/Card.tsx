import {ClockIcon} from '@heroicons/react/outline';
import {useRef} from 'react';

interface Props {
	link: string;
	title: string;
	date: string;
	author: string;
}

const Card = ({link, title, date, author}: Props) => {
	const likeButtonRef = useRef<HTMLButtonElement>(null);

	const handleClick = (event: any) => {
		event.stopPropagation();
		likeButtonRef.current!.classList.toggle('on-click');
	};

	return (
		<a
			href={link}
			rel="noreferrer"
			target="_blank"
			className="relative rounded-md w-full border border-[#979797] hover:opacity-40 transition ease-in-out duration-300 h-40 md:h-auto p-5 "
		>
			<header className="flex gap-3 text-[#767676] text-[0.68rem] font-normal">
				<ClockIcon className="w-5" />
				<span>
					{date} by {author}
				</span>
			</header>
			<main className="my-2 md:w-[80%]">
				<h3 className="text-[#6b6b6b]  font-medium line-clamp-2 md:line-clamp-none">{title}</h3>
			</main>
			<footer className="absolute bg-[#606060] bg-opacity-[0.06] left-0  bottom-0 w-full md:w-[15%] p-5 md:p-0 md:top-0 md:left-[85%] md:right-0 flex items-center justify-center ">
				<button ref={likeButtonRef} className="heart" onClick={handleClick}/>
			</footer>
		</a>
	);
};

export default Card;

{
	/* <header className="flex gap-3 text-[#767676] text-[0.68rem] font-normal">
				<ClockIcon className="w-5" />
				<span>
					{date} by {author}
				</span>
			</header>
			<main className="my-2 md:w-[80%]">
				<h3 className="text-[#6b6b6b]  font-medium line-clamp-2 md:line-clamp-none">{title}</h3>
			</main>
			<footer className="absolute bg-[#606060] bg-opacity-[0.06] left-0  bottom-0 w-full md:w-[15%] p-3 md:p-0 md:top-0 md:left-[85%] md:right-0 flex items-center justify-center">
				<button ref={likeButtonRef} className="heart relative z-50" onClick={handleClick}/>
			</footer> */
}
