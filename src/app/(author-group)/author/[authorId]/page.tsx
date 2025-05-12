'use client'; // This makes the component run on the client-side

import { useState, useEffect } from 'react';

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
    async function fetchAuthor() {
      try {
        const userRes = await fetch(`https://dummyjson.com/users/${authorId}`);
        const userData = await userRes.json();

        const postsRes = await fetch(`https://dummyjson.com/posts/user/${authorId}`);
        const postsData = await postsRes.json();

        setAuthor(userData);
        setPosts(postsData.posts || []);
      } catch (error) {
        console.error('Error fetching author or posts:', error);
      }
    }

    fetchAuthor();
  }, [authorId]);

  return (
    <>
    
    <div className="author-wrapper max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 items-start border border-gray-100">
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
        <p className="text-sm text-gray-500">{author?.email}</p>
      </div>

      {/* Address Info */}
      <div className="w-full">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Location</h3>
        <ul role="list" className="flex flex-col gap-1 text-gray-700 text-sm">
          {author?.address?.city && <li role="listitem">City: {author.address.city}</li>}
          {author?.address?.stateCode && <li role="listitem">State: {author.address.stateCode}</li>}
          {author?.address?.country && <li role="listitem">Country: {author.address.country}</li>}
        </ul>
      </div>

      {/* Author's Posts */}
      <div className="mt-8 w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Posts by {author?.firstName}
        </h3>
        <ul className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center bg-white rounded-lg shadow p-4 gap-4 hover:bg-gray-50 transition"
              >
                <img
                  src={`https://picsum.photos/seed/post${post.id}/80/80`}
                  alt={`Thumbnail for ${post.title}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="text-md font-bold text-gray-900 line-clamp-1">{post.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.body}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No posts found.</p>
          )}
        </ul>
      </div>
    </div>
    </>
  );
}
