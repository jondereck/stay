'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "./Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../navbar/CategoryInput";

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

  let BodyContent = (
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
                  onClick={() => {}}
                  label={item.label}
                  selected={false}
                  icon={item.icon}
                />
            </div>
        ))}
      </div>

    </div>
  )


  return ( 
    <Modal
      title="Staycation that feels home"
      onClose={rentModal.onClose}
      isOpen={rentModal.isOpen}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
      body={BodyContent}
    />
  );
}
 
export default RentModal;