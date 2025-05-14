import React from 'react'
import Spinner from './spinner';
import Link from 'next/link';


type AuthorProps = {
  author: {
    firstName: string;
    lastName: string;
  };
  id: number;
};

export default function Author({ author, id }: AuthorProps) {
  return (
    
      <Link href={`/author/${id}`}>
    <div className="author-wrapper flex flex-row items-center gap-2 flex-nowrap">
{
  !id ? <><Spinner /> </>:
  
  <>
  <img
    src={`https://dummyjson.com/icon/${id}/50`}
    alt={`${author.firstName} ${author.lastName}`}
    className="w-10 h-10 object-cover rounded-full"
  />
  
  <span className="text-sm font-medium 
  text-gray-600  uppercase hover:text-blue-600 transition">{author.firstName} {author.lastName}</span>
  
  
  </>
  
}
</div>
  </Link> 

  );
}
