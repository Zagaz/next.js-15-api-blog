'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/spinner';
import { FaLocationDot } from "react-icons/fa6";
import { PiBuildingApartment } from "react-icons/pi";
import Link from 'next/link';
import Tags from '@/app/components/tags';

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

export default function AuthorId({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  const { authorId } = use(params); // unwrap params
  const router = useRouter(); // initialize router

  const [author, setAuthor] = useState<AuthorData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, postsRes] = await Promise.all([
          fetch(`https://dummyjson.com/users/${authorId}`),
          fetch(`https://dummyjson.com/users/${authorId}/posts`)
        ]);

        if (!userRes.ok) {
          router.push('/'); // Fix: Call not found page
          return;
        }

        const userData = await userRes.json();
        const postsData = await postsRes.json();

        setAuthor(userData);
        setPosts(postsData.posts || []);
      } catch (error) {
        console.error('Error fetching author or posts:', error);
        router.push('/'); // redirect on general error
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [authorId, router]);

  if (loading) {
    return <div><Spinner /></div>;
  }

  if (!author) return null;

  return (
    <div className="author-wrapper w-full md:w-3/6 mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 items-start border border-gray-100">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-md flex flex-col items-center text-center gap-4">
        <img
          src={author.image}
          alt="Author"
          className="w-28 h-28 rounded-full object-cover shadow"
        />

        <h1 className="text-4xl md:text-3xl font-bold text-gray-800">
          {author.firstName} {author.lastName}
        </h1>

        <div className="flex text-4xl items-center justify-center gap-2 text-gray-600 text-sm">
          <FaLocationDot className="text-purple-600 text-2xl" />
          <div className='text-2xl'>
            {author.address.city && <span>{author.address.city}</span>}
            {author.address.stateCode && <span> - {author.address.stateCode}</span>}
            {author.address.country && <span> - {author.address.country}</span>}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
          <PiBuildingApartment className="text-2xl text-purple-600" />
          <div className='text-2xl'>
            {author.company.name && <span>{author.company.name}</span>}
            {author.company.title && <span> - {author.company.title}</span>}
          </div>
        </div>
      </div>

      <div className="mt-8 w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Posts by {author.firstName}
        </h3>

        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="flex flex-row w-full no-underline">
                  <Link href={`/article/${post.id}`}>
                    <img
                      className="w-full object-cover h-full"
                      src={`https://picsum.photos/seed/post${post.id}/120/120`}
                      alt={`Thumbnail for ${post.title}`}
                    />
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
      </div>
    </div>
  );
}
