"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm, Validate } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react"
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPass: "",
    },
  });

   const validateEmail = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValidEmail = emailRegex.test(value);
    
    if (!isValidEmail) {
      return 'Invalid email address';
    }
  };

  const validateName = (value: string) => {
    if (value.length < 3 ) {
      return 'Invalid name'
    }
  }

  const validateMatchPassword: Validate<string, FieldValues> = (
    value,
    formValues
  ) => {
    const password = formValues.password;
    if (value === password) {
      return true;
    } 
    return value === password || "Passwords do not match";
  };

  const onSumbit: SubmitHandler<FieldValues> = (data) => {

  
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success('Succesfully created an account')
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

      
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  },[registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Stay"
        subtitle="Your staycation that feels home"
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={validateEmail}
        
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={validateName}
      />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        obscure
        required
      />

      <Input
        id="repeatPass"
        label="Repeat password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        obscure
        validate={validateMatchPassword}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
 
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />

      <div
        className="
        text-neutral-500
          text-center
          mt-4
          font-light
        "
      >
        <div className="
          flex 
          flex-row 
          justify-center
          items-center 
          gap-2"
          >
            <div>
                Aready have an Acount?
            </div>
            <div 
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline"
              >
                Login
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSumbit)}
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
