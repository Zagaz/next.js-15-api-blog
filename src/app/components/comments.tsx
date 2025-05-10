// app/components/comments.tsx
'use client';
import React from 'react';
import { BiLike } from 'react-icons/bi';
import {FadeLoader  } from "react-spinners";
import AvatarWithLoader from './avatarwithloader';

type Comment = {
  id: number;
  body: string;
  user: {
    id: number;
    fullName: string;
  };
  likes: number;
};

type CommentsProps = {
  comments: Comment[];
  total: number;
  onLoadMore: () => void;
};

export default function Comments({ comments, total, onLoadMore }: CommentsProps) {
  return (
    <div className="article-comments p-4">

      <h2 className="text-2xl font-bold mb-2">Comments</h2>
      <h3 className="mb-4 text-gray-600">You have {total} comments.</h3>
      <ul>
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="mb-6 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">

             {/* async load image or <Spinner >    */}
              <AvatarWithLoader
  src={`https://picsum.photos/seed/${comment.user.id}/50`}
  alt={comment.user.fullName}
  className="w-10 h-10 object-cover rounded-full"
/>




              <span className="font-medium text-gray-800">{comment.user.fullName}</span>
            </div>
            <p className="text-gray-700 mb-3 leading-relaxed">{comment.body}</p>
            <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <BiLike className="mr-1" />
              <span className="text-sm">{comment.likes}</span>
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onLoadMore}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Load More
      </button>
    </div>
  );
}
