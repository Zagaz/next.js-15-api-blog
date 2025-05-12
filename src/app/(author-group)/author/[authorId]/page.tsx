'use client'; // This makes the component run on the client-side

import { useState, useEffect } from 'react';

// Define the type structure for the author data returned from the API
type AuthorData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address:{
    city:string
    stateCode:string
    country:string
  }
  
  
};

// Functional component that receives route parameters
export default function AuthorId({
  params,
}: {
  params: { authorId: string }; // Params is a regular (synchronous) object in App Router
}) {
  const { authorId } = params; // Extract the authorId from the params

  // useState to store the fetched author data
  const [author, setAuthor] = useState<AuthorData | null>(null);

  // useEffect runs once on component mount or when authorId changes
  useEffect(() => {
    async function fetchAuthor() {
      try {
        // Fetch author data from the API
        const apiUrl = `https://dummyjson.com/users/${authorId}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.table(data);

        // Save the response in state
        setAuthor(data);
      } catch (error) {
        // Log errors if the request fails
        console.error('Error fetching author:', error);
      }
    }

    fetchAuthor(); // Call the fetch function when the component mounts
  }, [authorId]); // Run the effect again if the authorId changes

  // JSX rendering
  return (

<>
  <div className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 items-start border border-gray-100">
    {/* Header */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">Author Profile</h2>
      <p className="text-sm text-gray-500">Author ID: {authorId}</p>
    </div>

    {/* Author Info */}
    <div>
      <p className="text-lg font-medium text-gray-700">
        {author?.firstName} {author?.lastName}
      </p>
      <p className="text-sm text-gray-500">{author?.email}</p>
    </div>

    {/* Address as list */}
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Location</h3>
      <ul role="list" className="flex flex-col gap-1 text-gray-700 text-sm">
        {author?.address?.city && <li role="listitem">City: {author.address.city}</li>}
        {author?.address?.stateCode && <li role="listitem">State: {author.address.stateCode}</li>}
        {author?.address?.country && <li role="listitem">Country: {author.address.country}</li>}
      </ul>
    </div>
  </div>
</>





  );
}
