import React from 'react';

interface LoaderProps {
  className?: string; // Allow custom sizing/styling
}

export default function Loader({ className = "w-32 h-32" }: LoaderProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <video
        src="/mp4/Scary Bat Loading.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
      />
    </div>
  );
}
