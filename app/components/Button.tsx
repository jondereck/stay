'use client'
import { useState } from "react";
import { IconType } from "react-icons";
import ConfirmationModal from "./inputs/ConfimationModal";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // optional prop for handling click event on
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType
  onWarning?: boolean

}


const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  onWarning
}) => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleLocalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onWarning) {
      e.stopPropagation(); // Stop event propagation to prevent parent click
    e.preventDefault();
      setModalOpen(true);
    } else {
      onClick(e);
    }
  };

  const handleConfirm = () => {
    setModalOpen(false);
    // @ts-ignore
    onClick(null); // Invoke the original onClick handler with a dummy MouseEvent
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <button
        onClick={handleLocalClick}
        disabled={disabled}
        className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transtion
          w-full
          ${outline ? "bg-white" : "bg-rose-500"}
          ${outline ? "text-black" : "text-white"}
          ${outline ? "border-black" : "border-rose-500"}
          ${small ? "py-1" : "py-3"}
          ${small ? "text-sm" : "text-md"}
          ${small ? "font-light" : "font-semibold"}
          ${small ? "border-[1px]" : "border-2"}`}
      >
        {Icon && <Icon className="absolute left-4 top-4" />}
        {label}
      </button>

      {onWarning && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          title="Confirmation"
          body={<p>Are you sure you want to perform this action?</p>}
          actionLabel="Confirm"
          disabled={disabled}
        />
      )}
    </>
  );
};
export default Button;