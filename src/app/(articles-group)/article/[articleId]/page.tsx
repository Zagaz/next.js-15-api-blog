'use client';
import React, { useState, useEffect } from 'react';
import { use } from 'react';
import Tags from '@/app/components/tags';
import Author from '@/app/components/author';
import { BiLike } from "react-icons/bi";

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
  const [skip, setSkip] = useState<number>(6);


  useEffect(() => {
    async function fetchData() {
      try {
        const articleRes = await fetch(`https://dummyjson.com/posts/${articleId}`);
        const articleData: ArticleData = await articleRes.json();
        setArticle(articleData);

        const authorRes = await fetch(`https://dummyjson.com/users/${articleData.userId}`);
        const authorData: AuthorData = await authorRes.json();
        setAuthor(authorData);

        const commentsRes = await fetch(`https://dummyjson.com/comments?postId=${articleId}&limit=6&skip=${skip}`);
        const commentsData: CommentsData = await commentsRes.json();
        console.log(commentsData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [articleId , skip]);


  if (!article || !author) {
    return <div>Loading...</div>;
  }
  function handleSkip () {
    setSkip(skip + 6);
  }

  return (
    <div className="article-wrapper">
      <div className="article-content p-4">
        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
        <p className="mb-4">{article.body}</p>
      </div>
      <div className="article-tags px-4">
        <Tags post={{ tags: article.tags }} />
      </div>
      <div className="article-author px-4">
        <Author author={author} id={author.id} />
      </div>
      <div className="article-comments p-4">
        <h2 className="text-2xl font-bold mb-2">Comments</h2>
        {/* // fix this  */}
        <h3>You have {comments?.total} comments.</h3>
        <ul>
          {comments?.comments.map((comment) => (
            <li key={comment.id} className="mb-4">
              <p>{comment.body}</p>
              <p>{comment.user.fullName}</p>
              <div className="flex items-center gap-1">
                <BiLike />
                <span>{comment.likes}</span>
              </div>

            </li>
          ))}
        </ul>
        <hr />
      </div>
      <div className="article-comments p-4">
        <button onClick={handleSkip}>Load More</button>
      </div>

    </div>
  );
}
