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
      {/* Display the author ID */}
      <div>BlogId: {authorId}</div>

      {/* Display the author name if data has been loaded */}
      <div>
        {author?.firstName} {author?.lastName}

      </div>
      <div>
        {author?.email}
      </div>
      <div>
        {author?.address?.city}
      </div>
      <div>
        {author?.address?.stateCode}
      </div>
      <div>
        {author?.address?.country}
      </div>

    </>
  );
}
