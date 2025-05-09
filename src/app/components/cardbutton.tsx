'use client'
import Link from 'next/link'

type ButtonProps = {
    href: string,
    value: string
}

export default function Cardbutton(props: ButtonProps) {

    let slug = props.href.startsWith('/') ? props.href : '/' + props.href;

   
    return (
        <>
            <Link href={slug} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
               {props.value}
            </Link>
        </>
    )
}
