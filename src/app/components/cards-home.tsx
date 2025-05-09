import Image from "next/image";
import Card from "./card";

type CardsHomeProps = {
  mainTitle: string;
}

export default function CardsHome(
  { mainTitle }: CardsHomeProps
) {
  type BlogCard = {
    id: number;
    title: string;
    tags: string[];
    imageUrl: string;
  };

  const dummyPosts: BlogCard[] = [
    {
      id: 1,
      title: "Understanding Tailwind CSS",
      tags: ["CSS", "Tailwind", "Frontend"],
      imageUrl: "https://picsum.photos/200/300?random=1",
    },
    {
      id: 2,
      title: "Getting Started with Next.js",
      tags: ["Next.js", "React", "SSR"],
      imageUrl: "https://picsum.photos/200/300?random=2",
    },
    {
      id: 3,
      title: "TypeScript Tips for Beginners",
      tags: ["TypeScript", "JavaScript"],
      imageUrl: "https://picsum.photos/200/300?random=3",
    },
    {
      id: 4,
      title: "Build a Blog with Markdown",
      tags: ["Markdown", "Blog", "Content"],
      imageUrl: "https://picsum.photos/200/300?random=4",
    },
    {
      id: 5,
      title: "Responsive Design with Tailwind",
      tags: ["Responsive", "Tailwind"],
      imageUrl: "https://picsum.photos/200/300?random=5",
    },
    {
      id: 6,
      title: "Deploying Next.js Apps",
      tags: ["Deployment", "Vercel"],
      imageUrl: "https://picsum.photos/200/300?random=6",
    },
  ];
  return (
    <>
      <h3>{mainTitle}</h3>
      <div className="homecards-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {dummyPosts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </>

  )
}
