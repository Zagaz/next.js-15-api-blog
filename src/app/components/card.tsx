'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoPricetagsSharp } from "react-icons/io5";

type CardProps = {
    post: {
        id: number;
        authorId?: number;
        title: string;
        tags: string[];
        imageUrl: string;
    };
};

export default function Card({ post }: CardProps) {
    const [authorName, setAuthorName] = useState<string>("");

    useEffect(() => {
        async function fetchAuthor() {
            try {
                if (!post.authorId) return;
                const apiUrl = `https://dummyjson.com/users/${post.authorId}`;
                const res = await fetch(apiUrl);
                const data = await res.json();
                setAuthorName(`${data.firstName} ${data.lastName}`);
            } catch (error) {
                console.error("Error fetching author:", error);
                setAuthorName("Unknown Author");
            }
        }

        fetchAuthor();
    }, [post.authorId]);

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
            console.log(post.authorId)
            {/* Image */}
            <div className="relative w-full h-48">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                {authorName && (
                    <div className="flex items-center gap-2 mb-2">
                        <img
                            src={`https://dummyjson.com/icon/${post.authorId}/50`}
                            alt={authorName}
                            className="w-[25px] h-[25px] object-cover rounded-full"
                        />
                        <p className="text-sm text-gray-500">{authorName}</p>
                    </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2">
                    <Link href={`article/${post.id}`} className="hover:text-blue-600">
                        {post.title}
                    </Link>
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <IoPricetagsSharp />
                    {post.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs text-gray-700 bg-gray-200 px-2 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Button */}
                <div className="mt-auto">
                    <Link
                        href={`article/${post.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
}
