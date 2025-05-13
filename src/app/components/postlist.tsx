import  Link  from 'next/link';
import Spinner from '@/app/components/spinner'; // Assuming the Spinner component is imported from a file
import Tags from '@/app/components/tags'; // Assuming Tags component is imported from a file

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
};

type Author = {
  firstName: string;
  lastName: string;
};

type PostListProps = {
  posts: Post[];
  author: Author;
};

const PostList = ({ posts, author }: PostListProps) => {
  return (
    <div className="space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="flex max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="flex flex-row w-full no-underline">
              <Link href={`/article/${post.id}`}>
                {!post.id ? (
                  <Spinner />
                ) : (
                  <img
                    className="w-full object-cover h-full"
                    src={`https://picsum.photos/seed/post${post.id}/120/120`}
                    alt={`Thumbnail for ${post.title}`}
                  />
                )}
              </Link>

              <div className="p-4 flex flex-col justify-between w-2/3">
                <div>
                  <Tags post={{ tags: post.tags }} />
                  <Link href={`/article/${post.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight mt-1 line-clamp-1 uppercase">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.body}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      By {author.firstName} {author.lastName}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 text-center">No posts found.</p>
      )}
    </div>
  );
};

export default PostList;
