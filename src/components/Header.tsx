const Header = () => {
	return (
		<header className="grid place-items-center py-10 bg-gradient-to-b from-[#ececec]  to-white shadow">
			<nav className=" md:w-[85%]">
				<img
					src="src/assets/hacker-news.png"
					alt="logo"
					loading="lazy"
					className="max-w-[208px]"
				/>
			</nav>
		</header>
	);
};

export default Header;
