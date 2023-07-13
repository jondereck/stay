'use client';

import Heartbutton from "@/app/components/HeartButton";
import Heading from "@/app/components/modals/Heading";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";

interface ListingHeadProps {
  id: string;
  title: string;
  imgSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;

}


const ListingHead: React.FC<ListingHeadProps> = ({
  id, 
  title,
  imgSrc, 
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return ( 
    <>
    <Heading 
      title={title}
      subtitle={`${location?.region}, ${location?.label}`}
    />
    <div
      className="
        w-full
        h-[60vh]
        overflow-hidden
        rounded-xl
        relative
      "
    >
        <Image 
          alt="Image"
          src={imgSrc}        
          className="object-cover w-full"
          fill
        />

        <div className="absolute top-5 right-5">
          <Heartbutton 
            listingId={id}
            currentUser={currentUser}
          />
          
        </div>
    </div>
    </>
   );
}
 
export default ListingHead;