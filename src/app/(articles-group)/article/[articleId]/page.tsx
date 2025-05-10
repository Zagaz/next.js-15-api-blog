'use client';
import React, { useState, useEffect } from 'react';
import { use } from 'react';
import Tags from '@/app/components/tags';
import Author from '@/app/components/author';
import Comments from '@/app/components/comments';
import { BiLike } from "react-icons/bi";
import Spinner from '@/app/components/spinner';


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

type CommentsData = {
  comments: {
    id: number;
    body: string;
    user: {
      id: number;
      fullName: string;
    };
    likes: number;
  }[];
  total: number;
};

export default function Article({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = use(params); // unwrap Promise

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [author, setAuthor] = useState<AuthorData | null>(null);
  const [comments, setComments] = useState<CommentsData | null>(null);
  const [limit, setLimit] = useState<number>(6);



  useEffect(() => {
    async function fetchData() {
      try {
        const articleRes = await fetch(`https://dummyjson.com/posts/${articleId}`);
        const articleData: ArticleData = await articleRes.json();
        setArticle(articleData);

        const authorRes = await fetch(`https://dummyjson.com/users/${articleData.userId}`);
        const authorData: AuthorData = await authorRes.json();
        setAuthor(authorData);

        const commentsRes = await fetch(`https://dummyjson.com/comments?postId=${articleId}&limit=${limit}`);
        const commentsData: CommentsData = await commentsRes.json();
        console.log(commentsData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [articleId, limit]);

  if (!article || !author) {
    return(

      <div
      className='flex justify-center items-center h-screen' 
      ><Spinner /> </div>
    )
  }
  function handleSkip() {
    setLimit(limit + 6);
  }

  return (
   <div className="article-wrapper max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="article-content mb-6">
  <img
  src={`https://picsum.photos/seed/${article.id}/300/200`}
  alt={article.title}
  className="w-full rounded-lg object-cover"
/>

    <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
    <p className="text-gray-700 leading-relaxed">{article.body}</p>
  </div>

  <div className="article-tags mb-6">
    <Tags post={{ tags: article.tags }} />
  </div>

  <div className="article-author mb-8">
    <Author author={author} id={author.id} />
  </div>

  <div className="article-comments">
    <Comments
      comments={comments?.comments || []}
      total={comments?.total || 0}
      onLoadMore={handleSkip}
    />
  </div>
</div>

  );
}
