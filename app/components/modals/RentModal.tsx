'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "./Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "./inputs/CategoryInput";
import { FieldValue, useForm } from "react-hook-form";
import CountrySelect from "./inputs/CountrySelect";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE  = 5
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [steps, setSteps] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSumbmit,
    setValue,
    watch,
    formState: { errors},
    reset
  } = useForm<FieldValue>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imgSrc: '',
      price: '',
      title: '',
      description: '',
    }
  })

  const category = watch('category');
  const location = watch('location');

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);
  const setCustomValue=(id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true, // to trigger validation and error message update in the input field  
      shouldValidate: true,
      shouldTouch: true,
    
    })
  }

  const onBack = () => {
    setSteps((value) => value -1);
  }

  const onNext = () => {
    setSteps((value) => value +1);
  }

  const actionLabel = useMemo(() => {
    if (steps === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  },[steps]);


  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back'
  },[steps]);

  let bodyContent = (
    <div
      className="
        flex
        flex-col
        gap-8
      "
    >
      <Heading 
        title="Which of the best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        " 
      >
        {categories.map((item) => (
            <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
                />
            </div>
        ))}
      </div>

    </div>
  )

  if (steps === STEPS.LOCATION) {
    bodyContent = (
        <div  className="flex flex-col gap-8">  
          <Heading 
              title="Where are you place located?"          
              subtitle="Help guest find you!"
          />

          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
          <Map
            center={location?.latlng}
          />



        </div>
    )
  }


  return ( 
    <Modal
      title="Staycation that feels home"
      onClose={rentModal.onClose}
      isOpen={rentModal.isOpen}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
}
 
export default RentModal;