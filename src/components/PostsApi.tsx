import {Posts} from '../types';
import Card from './Card';

interface Props {
	posts: Posts[];
	handleLikedClick({liked, objectID}: {liked: boolean; objectID: string}): void;
}

const PostsApi = ({posts, handleLikedClick}: Props) => {
	return (
		<div className="grid md:grid-cols-2 gap-5 mt-5  max-h-[50vh] overflow-y-scroll scroll-ml-2 overflow-hidden p-1 md:p-0">
			{posts.map((post) => {
				const {author, created_at, objectID, story_title, story_url, liked} =
					post;
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
	);
};

export default PostsApi;
