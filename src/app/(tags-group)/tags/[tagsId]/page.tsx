'use client';
import React, { useState, useEffect } from 'react';
import Author from '@/app/components/author';
import Tags from '@/app/components/tags';
import Spinner from '@/app/components/spinner';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  views: number;
  tags: string[];
};

type AuthorData = {
  id: number;
  firstName: string;
  lastName: string;
};

type PostWithAuthor = Post & { author: AuthorData };

export default function TagsId({ params }: { params: { tagsId: string } }) {
  const { tagsId } = params;

  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostsAndAuthors() {
      try {
        const postRes = await fetch(`https://dummyjson.com/posts/tag/${tagsId}?limit=6&skip=0`);
        const postData = await postRes.json();
        const posts: Post[] = postData.posts || [];

        const postsWithAuthors: PostWithAuthor[] = await Promise.all(
          posts.map(async (post) => {
            const authorRes = await fetch(`https://dummyjson.com/users/${post.userId}`);
            const authorData: AuthorData = await authorRes.json();
            return { ...post, author: authorData };
          })
        );

        setPosts(postsWithAuthors);
      } catch (error) {
        console.error('Erro ao buscar posts ou autores:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPostsAndAuthors();
  }, [tagsId]);

  return (
    <div className="tag-wrapper w-full max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold uppercase mb-6">Tag: {tagsId}</h2>

      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-2xl p-4 flex flex-col gap-3 border border-gray-100">
              <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${post.id}/600/300`}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold uppercase">{post.title}</h3>

              <Author id={post.userId} author={post.author} />

              <p className="text-sm text-gray-700 line-clamp-2">{post.body}</p>

              <Tags post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p>Sorry. No post found with this tag.</p>
      )}
    </div>
  );
}
