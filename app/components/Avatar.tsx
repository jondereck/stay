'use client'

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  size: string; // Accepts Tailwind CSS utility classes for sizing
}

const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <div className={`rounded-full ${size}`}>
      <Image
        className="rounded-full"
        src={src || "/images/placeholder.jpg"}
        alt="Avatar"
        width={30}
        height={30}
      />
    </div>
  );
}

export default Avatar;
