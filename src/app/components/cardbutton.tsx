'use client'
import Link from 'next/link'

type ButtonProps = {
    href: string,
    id: string,
    value: string
}

export default function Cardbutton(props: ButtonProps) {
    return (
        <>
            <Link href={`/article/${props.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Read More
            </Link>
        </>
    )
}
