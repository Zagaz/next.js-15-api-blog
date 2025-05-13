import AuthorInfo from '@/app/components/author/author-info';
import PostList from '@/app/components/author/postlist';
import { redirect } from 'next/navigation';

type AuthorData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  address: {
    city: string;
    stateCode: string;
    country: string;
  };
  company: {
    name: string;
    title: string;
  };
};

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
  views: number;
};

export default async function AuthorPage({ params }: { params: { authorId: string } }) {
  const { authorId } = params;

  try {
    const [userRes, postsRes] = await Promise.all([
      fetch(`https://dummyjson.com/users/${authorId}`),
      fetch(`https://dummyjson.com/users/${authorId}/posts`)
    ]);

    if (!userRes.ok || !postsRes.ok) {
      redirect('/');
    }

    const author: AuthorData = await userRes.json();
    const { posts }: { posts: Post[] } = await postsRes.json();

    return (
      <div className="author-wrapper w-full md:w-3/6 mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 items-start border border-gray-100">
        <AuthorInfo author={author} />
        <PostList posts={posts} author={author} />
      </div>
    );
  } catch (error) {
    console.error('Failed to load author:', error);
    redirect('/');
  }
}
