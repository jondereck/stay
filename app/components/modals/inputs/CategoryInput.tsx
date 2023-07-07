'use client'

import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  label: string;
  selected: boolean;
  icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  label,
  selected,
  icon: Icon,
}) => {
  return ( 
    <div
      onClick={() => onClick(label)} 
      className={`
        rounded-xl
        border-2
        flex
        flex-col
        p-4
        cursor-pointer
        hover:bg-[#F5FAFF]
        hover:border-black
        transition
        ${selected ? 'border-black' : 'border-neutral-200'}
                
      `}
    >
        <Icon size={30}/>
        <div className="font-medium"
         >
            {label}

        </div>
    </div>
  );
}
 
export default CategoryInput;