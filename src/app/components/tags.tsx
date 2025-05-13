import React from 'react'
import { IoPricetagsSharp } from "react-icons/io5";
import Link from 'next/link';

type TagsProps = {
    post:
    {
        tags: string[]
    }

}

export default function Tags({ post }: TagsProps) {
    return (
        <>
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <IoPricetagsSharp />
                {post.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="text-xs text-gray-700  px-2 py-1 rounded-full text-xs uppercase text-gray-500 tracking-wide">
                        <Link href={`/tags/${tag}`} className={`hover:text-blue-600 transition`}>
                        {tag}  
                        </Link>
                   </span>
                ))}
            </div>
        </>
    )
}
