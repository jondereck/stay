'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "./Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "./inputs/CategoryInput";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import CountrySelect from "./inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "./inputs/Counter";
import ImageUpload from "./inputs/ImageUpload";
import Input from "./inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [steps, setSteps] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDescription, setSelectedDescription] = useState('')
  const [selectedImages, setSelectedImages] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

 

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors},
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imgSrc: '',
      price: 0,
      title: '',
      description: '',
    }
  })

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imgSrc = watch('imgSrc');

 

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), []);

  const setCustomValue = (id: string, value: any) => {
    if (id === 'category') {
      setSelectedCategory(value);
    }
    if (id === 'location') {
      setSelectedLocation(value);
    }
    if (id === 'imgSrc') {
      setSelectedImages(value);
    }
   
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setSteps((value) => value -1);
  }
  const onNext = () => {
    if (steps === STEPS.CATEGORY  && !selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    if (steps === STEPS.LOCATION && !selectedLocation) {
      toast.error("Please select a location");
      return;
    }

    if (steps === STEPS.IMAGES && !selectedImages) {
      toast.error("Please upload an image")
    }
   

  setSteps((value) => value + 1);
    
  };
  

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


  const onSumbit: SubmitHandler<FieldValues> = (data) => {
    if (steps !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post('/api/listing', data)
      .then(() =>{
        toast.success('Listing Created');
        router.refresh;
        reset();
        setSteps(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(({response})=> 
      toast.error(`Error creating listing ${response?.status}`))
      .finally(() => {
        setIsLoading(false);
      })
       
  }
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
        {categories.map((test) => (
            <div key={test.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  label={test.label}
                  selected={category === test.label}
                  icon={test.icon}
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

  if (steps === STEPS.INFO)     {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading 
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guest"
          subtitle="How many guests do you allow?"
          value= {guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many room do you have?"
          value= {roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathroom do you have?"
          value= {bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
        
      </div>
    )
  }

  if (steps === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />

        <ImageUpload
          value={imgSrc}
          onChange={(value) => setCustomValue('imgSrc', value)}
          
        />
      </div>
    )
  }

  if (steps === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
           title="How would you describe your place?"
           subtitle="Short is simple works best!"
        />
        <Input 
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input 
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />


      </div>
    )
  }

  if (steps === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          required
          disabled={isLoading}
          register={register}
          errors={errors}
        />



      </div>

    )
  }


  return ( 
    <Modal
      title="Staycation that feels home"
      onClose={rentModal.onClose}
      isOpen={rentModal.isOpen}
      onSubmit={handleSubmit(onSumbit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
}
 
export default RentModal;