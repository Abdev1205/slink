'use client'
import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
import TextFields from '@/components/input/InputFields/TextFields';
import { ApiUrl } from '@/utils/BaseUrl';

const Register = () => {
  const router = useRouter()
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [cpass, setCPass] = useState();
  const [valid, setvalid] = useState(false)

  // useEffect(() => {
  //   validDataForm()
  // }, [name, pass, cpass, email])

  const handleUserReg = async (e) => {
    e.preventDefault()
    try {
      if (name && email && pass) {
        // setvalid(true)
        const data = {
          "name": name,
          "email": email,
          "password": pass,
        }
        const res = await api.post(`/api/shorten/auth/register`, data);
        console.log(res);
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        router.push('/login')

      } else {
        // setvalid(false);
        toast.error("fill all required details correctly", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    }
  }
  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shorten/auth/google`;
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };
  return (
    <>

      <div className='bg-bgPrimary w-[100%] h-full  ' >
        <div className=' w-[100%] h-full mt-[2rem] flex justify-center items-center   ' >
          <div className=' flex flex-col w-[30rem]   bg-[#181E29]   border-[1px] border-[#353C4A] rounded-md px-[2.5rem] py-[2.5rem] ' >


            <form onSubmit={(e) => handleUserReg(e)} className=' flex flex-col gap-[1rem]   '  >
              <TextFields
                value={name}
                setValue={setName}
                label={"Name"}
                placeholder={"Enter your Name"}
                required={true}
                type='text'

              />
              <TextFields
                value={email}
                setValue={setEmail}
                label={"Email"}
                placeholder={"Enter your Email"}
                required={true}
                type='email'

              />
              <TextFields
                value={pass}
                setValue={setPass}
                label={"Password"}
                placeholder={"Enter your password"}
                required={true}
                type='password'

              />
              {/* <TextFields
                value={cpass}
                setValue={setCPass}
                label={"Confirm Password"}
                placeholder={"Enter your password"}
                required={true}
                type='password'

              /> */}
              <button className={` active:scale-95 duration-300   ${email && pass ? "opacity-100 cursor-pointer " : "opacity-75 cursor-not-allowed "} primary-button-bg text-white px-[.5rem] py-[.5rem] rounded-md mt-[1rem] `} >Register</button>

              <div className=' flex justify-center items-center gap-[.3rem] mt-[1rem] ' >
                <div className=' w-[40%] h-[1px]  bg-[#ab4689cd] ' />
                <span className='text-white text-opacity-70' >Or</span>
                <div className=' w-[40%] h-[1px] bg-[#ab4689cd] ' />
              </div>

            </form>
            <button onClick={handleGoogleLogin} className=' active:scale-95 duration-300 bg-[#eff1f7b3] hover:bg-white flex justify-center items-center gap-[.5rem] px-[.5rem] py-[.5rem] rounded-md font-nunito font-[400] text-[1.02rem] text-black mt-[2rem]   ' >
              <FcGoogle className=' text-[1.2rem] ' />
              Login with Google
            </button>

            <div className=' flex justify-center text-white gap-[.4rem] mt-[.6rem] ' >
              <p className='opacity-[.7]  ' >Already have account,</p>
              <Link className='text-pink-300 underline underline-offset-1' href="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Register
