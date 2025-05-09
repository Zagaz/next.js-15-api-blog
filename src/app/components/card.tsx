import React from 'react';

type CardProps = {
  post: {
    id: number;
    title: string;
    imageUrl: string;
    tags: string[];
  };
};

export default function Card({ post }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="relative w-full h-48">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
