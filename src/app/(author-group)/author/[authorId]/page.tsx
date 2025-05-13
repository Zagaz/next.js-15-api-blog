'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/spinner';
import { FaLocationDot } from "react-icons/fa6";
import { PiBuildingApartment } from "react-icons/pi";
import Link from 'next/link';
import Tags from '@/app/components/tags';
import AuthorInfo from '@/app/components/author-info';
import PostList from '@/app/components/postlist';


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
      <AuthorInfo author={author} />
      <PostList posts={posts} author={author} />
    </div>
  );
}
