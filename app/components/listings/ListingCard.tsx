"use client";

import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Heartbutton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
  disabled?: boolean;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  actionLabel,
  actionId = "",
  onAction,
  disabled,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listing/${data.id}`)}
      className="
        col-span-1 cursor-pointer group
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imgSrc}
            alt="Listing"
          />

          <div className="absolute top-3 right-3">
            <Heartbutton 
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div
          className="font-semibold text-lg"        
        >
         {location?.label}, {location?.province}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
           ₱ {price}
          </div>
          {!reservation && (
            <div className="font-light">
              /night
            </div>
          )}
          {onAction && actionLabel && (
            <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
            
            />

          )}
        </div>

      </div>
    </div>
  );
};

export default ListingCard;
