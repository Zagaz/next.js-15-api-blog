'use client';
import React, { useState, useEffect } from 'react';
import Tags from '@/app/components/tags';

type ArticleProps = {
  params: {
    articleId: string;
  };
};

type ArticleData = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
};

type AuthorData = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function Article({ params }: ArticleProps) {
  const { articleId } = params;
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [author, setAuthor] = useState<AuthorData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch article data
        const articleRes = await fetch(`https://dummyjson.com/posts/${articleId}`);
        const articleData: ArticleData = await articleRes.json();
        setArticle(articleData);

        // Fetch author data using userId from article
        const authorRes = await fetch(`https://dummyjson.com/users/${articleData.userId}`);
        const authorData: AuthorData = await authorRes.json();
        setAuthor(authorData);
        console.table(authorData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [articleId]);

  if (!article || !author) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="mb-4">{article.body}</p>
      
    

      <Tags post={{ tags: article.tags }} />


      <div>
        <img 
        //  here
          src={`https://dummyjson.com/icon/${author.id}/50`} 
          alt={author.firstName} 
          className="object-cover rounded-full mr-2"
        />
      
        
         {author.firstName} {author.lastName}
      </div>
    </div>
  );
}
