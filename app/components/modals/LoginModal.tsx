"use client";


import { signIn } from "next-auth/react"
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm, Validate } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "./Heading";
import Input from "./inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation"

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",  
    },
  });

  const validateMatchPassword: Validate<string, FieldValues> = (
    value,
    formValues
  ) => {
    const password = formValues.password;
    return value === password || "Passwords do not match";
  };

  const onSumbit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    })

  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  },[registerModal, loginModal]);


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to back"
        subtitle="Login to you account"
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
  

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
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
                First time using Stay?
            </div>
            <div 
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
              font-medium"
              >
               Create an account
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSumbit)}
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;