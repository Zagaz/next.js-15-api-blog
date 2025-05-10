// app/components/avatar-with-loader.tsx
'use client';
import React, { useState } from 'react';
import {  PuffLoader  } from 'react-spinners';

type AvatarWithLoaderProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function AvatarWithLoader({ src, alt, className }: AvatarWithLoaderProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-10 h-10">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PuffLoader color="#1f259f" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loading ? 'invisible' : 'visible'}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
