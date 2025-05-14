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
                        className="text-xs px-2 py-1 
                        rounded-10 text-xs uppercase text-gray-500 
                         tracking-wide 
                          hover:bg-gray-200 transistion">
                        <Link href={`/tags/${tag}`} >
                        {tag}  
                        </Link>
                   </span>
                ))}
            </div>
        </>
    )
}
