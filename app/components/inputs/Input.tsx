'use client'

import { useState } from 'react';
import { UseFormRegister, FieldValues, FieldErrors, Validate } from 'react-hook-form';
import { TbCurrencyPeso } from 'react-icons/tb';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  validate?: Validate<string, FieldValues>;
  obscure?: boolean
}


const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  validate,
  obscure,



}) => {
  
  const [passwordVisible, setPasswordVisibile] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibile((prev) => !prev);
  }

  const inputType = obscure ? (passwordVisible ? "text" : "password") : type; 

  return (
    <div className='h-full relative'>
      {formatPrice && (
        <TbCurrencyPeso
          size={24}
          className="
       text-neutral-700
       absolute
       top-5
       left-2"
        />
      )}
      <input

        id={id}

        disabled={disabled}
        {...register(id, { required, validate })}
        placeholder=" "
        type={inputType}
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}`}

      />
      {type === 'password' && (
        <button
          type='button'
          className='absolute top-5 right-4'
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <AiOutlineEye size={30}/> : <AiOutlineEyeInvisible size={30}/>}
        </button>
      )}
      <label
        className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        ${formatPrice ? 'left-9' : 'left-4'}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}>
        {label}
      </label>
    </div>
  );
}

export default Input