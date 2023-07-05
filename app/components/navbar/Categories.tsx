'use client'
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBoatFishing, GiCaveEntrance, GiForest, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import Container from "../Container";
import CategoryBox from "./CategoryBox";
import { useParams, usePathname, useSearchParams } from "next/navigation";

 
export  const categories = [
  { 

    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious',

  },
  
  { 

    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach',

  },
  {

    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is close to the windmills',

  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is close to the modern!',

  },
  {
    label: 'Coutryside',
    icon: TbMountain,
    description: 'This property is close to the mountain!',

  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property is close to the pools!',

  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is close to the islands!',

  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to the Lake!',

  },
  {
    label: 'Camping',
    icon: GiForest,
    description: 'This property has camping activities!',

  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property is close to the cave!',

  }
  
]


const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathName = usePathname();

  const isMainPage = pathName === '/';

  if (!isMainPage) {
    return null;
  }



  return ( 
   <Container>
    <div
      className="
        pt-4
        flex
        flex-row
        justify-between
        items-center
        overflow-x-auto
      "
    >
      {categories.map((item) => (
        <CategoryBox
        
        key={item.label}
        label={item.label}
        selected={category === item.label}
        icon={item.icon}/>
      ))}
    </div>
   </Container>
   );
}
 
export default Categories;