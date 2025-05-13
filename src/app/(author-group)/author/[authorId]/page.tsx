'use client'; // This makes the component run on the client-side

import { useState, useEffect } from 'react';
import Spinner from '@/app/components/spinner';
import { FaLocationDot } from "react-icons/fa6";
import { MdWorkOutline } from "react-icons/md";
import Link from 'next/link';
import Tags from '@/app/components/tags';


// Define the type structure for the author data
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
    name: string
    title: string
  }
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
  params: { authorId: string };
}) {
  const { authorId } = params;

  const [author, setAuthor] = useState<AuthorData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, postsRes] = await Promise.all([
          fetch(`https://dummyjson.com/users/${authorId}`),
          fetch(`https://dummyjson.com/users/${authorId}/posts`)
        ]);

        const userData = await userRes.json();
        const postsData = await postsRes.json();

        setAuthor(userData);
        setPosts(postsData.posts || []);
      } catch (error) {
        console.error('Error fetching author or posts:', error);
      }
    }

    fetchData();
  }, [authorId]);

  if (!author) {
    return <div><Spinner /></div>;
  }

  if (!posts) {
    return <Spinner />;
  }


  return (
    <>

      <div className="author-wrapper w-full md:w-3/6 mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 items-start border border-gray-100">

        {/* Author Info */}
        <div className="author-profile w-full flex flex-col items-center gap-4">
          <img
            src={author?.image}
            alt="Author"
            className="w-24 h-24 rounded-full object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {author?.firstName} {author?.lastName}
          </h2>

        </div>

        {/* Address Info */}
        <div className="w-full text-center">

          <div role="list" className="flex flex-row items-center justify-center gap-1 text-gray-700 text-sm">
            <FaLocationDot />
            {author?.address?.city && <div role="listitem">{author.address.city}</div>}
            {author?.address?.stateCode && <div role="listitem">- {author.address.stateCode}</div>}
            {author?.address?.country && <div role="listitem">- {author.address.country}</div>}
          </div>
        </div>
        {/* Work info  */}
    <div className="w-full text-center">

          <div role="list" className="flex flex-row items-center justify-center gap-1 text-gray-700 text-sm">
            <MdWorkOutline />
            {author?.company?.name && <div role="listitem">{author.company.name}</div>}
            {author?.company?.title && <div role="listitem">- {author.company.title}</div>}
          </div>
        </div>


        {/* Author's Posts */}
        <div className="mt-8 w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Posts by {author?.firstName}
          </h3>


          <div className="space-y-6">
  {posts.length > 0 ? (
    posts.map((post) => (
      <div
        key={post.id}
        className="flex max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      >
        <Link href={`/article/${post.id}`} className="flex flex-row w-full no-underline">
          <img
            src={`https://picsum.photos/seed/post${post.id}/120/120`}
            alt={`Thumbnail for ${post.title}`}
            className="w-1/3 object-cover"
          />
          <div className="p-4 flex flex-col justify-between w-2/3">
            <div>
              <span className="text-xs uppercase text-gray-500 tracking-wide">

              <Tags post={{ tags: post.tags }} />
              </span>
              <h3 className="text-lg font-semibold text-gray-900 leading-tight mt-1 line-clamp-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.body}</p>
            </div>
            <div className="mt-2 text-xs text-gray-500"> {`By ${author?.firstName} ${author?.lastName} `}</div>
          </div>
        </Link>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500 text-center">No posts found.</p>
  )}
</div>




        </div>
      </div>
    </>
  );
}
