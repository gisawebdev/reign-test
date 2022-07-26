import {Fragment, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';

const options = [
	{
		id: 1,
		news: 'Select your news',
		query: '',
		img: '',
	},
	{
		id: 2,
		news: 'Angular',
		query: 'angular',
		img: '/assets/images/angular.png',
	},
	{
		id: 3,
		news: 'React',
		query: 'react',
		img: '/assets/images/react.png',
	},
	{
		id: 4,
		news: 'Vue',
		query: 'vue',
		img: '/assets/images/vue.png',
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

interface Props {
	query: string;
	setQuery: (query: string) => void;
}

const Select = ({query, setQuery}: Props) => {
	const [selected, setSelected] = useState(
		options.find((item) => item.query === query) ?? options[0],
	);

	return (
		<Listbox
			value={selected}
			onChange={(news) => {
				setSelected(news);
				setQuery(news.query);
			}}
		>
			{({open}) => (
				<>
					<div className="mt-1 relative">
						<Listbox.Button className="relative w-52 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
							<span className="flex items-center">
								{selected.img === '' ? (
									''
								) : (
									<img
										src={selected.img}
										alt="logo"
										loading="lazy"
										className="flex-shrink-0 h-6 w-6 "
									/>
								)}
								<span className="ml-3 block truncate">{selected.news}</span>
							</span>
							<span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<SelectorIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 w-52 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
								{options.map((option) => (
									<Listbox.Option
										key={option.id}
										className={({active}) =>
											classNames(
												active ? 'text-white bg-indigo-600' : 'text-gray-900',
												'cursor-default select-none relative py-2 pl-3 pr-9',
											)
										}
										value={option}
									>
										{({selected, active}) => (
											<>
												<div className="flex items-center">
													{option.img === '' ? (
														''
													) : (
														<img
															src={option.img}
															alt=""
															className="flex-shrink-0 h-6 w-6 "
														/>
													)}
													<span
														className={classNames(
															selected ? 'font-semibold' : 'font-normal',
															'ml-3 block truncate',
														)}
													>
														{option.news}
													</span>
												</div>

												{selected ? (
													<span
														className={classNames(
															active ? 'text-white' : 'text-indigo-600',
															'absolute inset-y-0 right-0 flex items-center pr-4',
														)}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};

export default Select;
