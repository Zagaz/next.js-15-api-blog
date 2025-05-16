'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Tags from '@/app/components/tags';
import Author from './author';

type AuthorData = {
  id: number;
  firstName: string;
  lastName: string;
};

type CardProps = {
  post: {
    id: number;
    authorId?: number;
    title: string;
    tags: string[];
    imageUrl: string;
    body: string;
  };
};

export default function Card({ post }: CardProps) {
  const [author, setAuthor] = useState<AuthorData | null>(null);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        if (!post.authorId) return;
        const apiUrl = `https://dummyjson.com/users/${post.authorId}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        setAuthor({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,

        });
      } catch (error) {
        console.error("Error fetching author:", error);
        setAuthor(null);
      }
    }
    console.log("Post body:", post.body);

    fetchAuthor();

  }, [post.authorId]);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-[16/9]">

        <Link href={`article/${post.id}`} className="uppercase hover:text-blue-600">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Tags */}
        <Tags post={{ tags: post.tags }} />

        {/* // Author */}
        {author && (
          // Author component with full author data
          <Author author={author} id={author.id} />
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">
          <Link href={`article/${post.id}`} className="uppercase hover:text-blue-600">
            {post.title}
          </Link>
        </h2>

        {/* Description */}
        <p className="text-gray-700 line-clamp-2">
          {post.body}
        </p>
      </div>
    </div>
  );
}
