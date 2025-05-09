"use client";

import { useEffect, useState } from "react";
import Card from "./card";

type CardsHomeProps = {
  mainTitle: string;
};

type BlogCard = {
  id: number;
  title: string;
  tags: string[];
  imageUrl: string;
  authorId: number;
};

export default function CardsHome({ mainTitle }: CardsHomeProps) {
  
  
  const [posts, setPosts] = useState<BlogCard[]>([]);
  useEffect(() => {
    async function fetchApi() {
      try {
        // Fetch 6 posts
        const apiUrl = "https://dummyjson.com/posts?limit=6";
        const res = await fetch(apiUrl);
        const data = await res.json();

        // Todo: based on> data user Id, fech the author name;
        
        const mappedPosts: BlogCard[] = data.posts.map((post: any) => ({
          id: post.id,
          authorId: post.userId,
          title: post.title,
          tags: post.tags,
          imageUrl: `https://picsum.photos/seed/${post.id}/300/200`, // Mock image
        }));
        
        setPosts(mappedPosts);
       
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchApi();
  }, []);


  

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-6">{mainTitle}</h3>
      <div className="homecards-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
