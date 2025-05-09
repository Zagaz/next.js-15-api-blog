'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa6";


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
    // Author name will be fected  
    const [authorName, setAuthorName] = useState<string>("");

    useEffect(() => {
        async function fetchAuthor() {
            try {
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
            {/* The Image  */}
            <div className="relative w-full h-48">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            {/* The Author */}
            <div className="p-4 flex-1 flex flex-col">
                {
                    authorName &&
                    <>
                        <div className='flex-1 flex flex-row'>
                      
                            <img 
                            src={`https://i.pravatar.cc/25?img=${post.id}`} 
                            alt={post.title}
                            sizes="10px"
                            className="object-cover  rounded-full"
                            />

                            
                            <p className="text-sm text-gray-500 mb-1">{authorName}</p>
                        </div>
                    </>
                }
                {/* The Title */}
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                    {
                        post.tags.length > 0 &&
                        post.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))
                    }
                </div>
                {/* The Button  */}
                <div className="mt-auto">
                    <Link href={`article/${post.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
}
