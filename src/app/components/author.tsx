import React from 'react'

type AuthorProps = {
  author: {
    firstName: string;
    lastName: string;
  };
  id: number;
};

export default function Author({ author, id }: AuthorProps) {
  return (
    <div className="flex flex-row items-center gap-2 flex-nowrap">
      <img
        src={`https://dummyjson.com/icon/${id}/50`}
        alt={`${author.firstName} ${author.lastName}`}
        className="w-10 h-10 object-cover rounded-full"
      />
      <span className="text-sm">{author.firstName} {author.lastName}</span>
    </div>
  );
}
