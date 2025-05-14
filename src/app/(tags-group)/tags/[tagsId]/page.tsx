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

        // Busca os dados de cada autor com Promise.all
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
    <div className="tag-wrapper w-full md:w-3/6 mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6 items-start border border-gray-100">
      <h2 className="text-2xl font-bold uppercase mb-4">Tag: {tagsId}</h2>

      {loading ? (
        <>
          <Spinner />
        
        </>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="w-full space-y-2 ">
            <img
              src={`https://picsum.photos/seed/${post.id}/600/300`}
              alt={post.title}
              className="w-full rounded-lg object-cover"
            />

            <h3 className="text-lg font-semibold uppercase">{post.title}</h3>

            {/* Agora passa o autor completo e o id para o componente Author */}
            <Author id={post.userId} author={post.author} />

            <p className="text-sm text-gray-700">{post.body}</p>
            <Tags post={post} />
          </div>
        ))
      ) : (
        <p>Sorry. No post found with this tag.</p>
      )}
    </div>
  );
}
