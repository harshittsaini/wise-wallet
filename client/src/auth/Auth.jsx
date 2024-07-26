import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
  } from "@clerk/clerk-react";
  import { Navigate } from "react-router-dom";
  import { IoWallet } from "react-icons/io5";

const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <SignedOut>
        <div className=" text-[90px] " >< IoWallet /></div>
        <div>
          <h1 className="m-9 font-bold font-serif text-7xl">Wise Wallet</h1>
          <h5 className='m-0'> Welcome to Your Own Personal Finance Tracker!</h5>
          <div className="bg-white h-[0.5px] m-4"></div>
        </div>


        <div className="flex gap-8 m-10">
          <SignUpButton mode="modal" />
          <SignInButton mode="modal" />
        </div>

        <p>Test Login Credentials: </p>
        <div className="flex gap-2">
          <p>Username: test</p>
          <p>Password: test123</p>
        </div>

      </SignedOut>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
      <div className="bottom-[-165px] relative">
        <p className="bottom-0">
          Made by Harshit Kumar
        </p>
        <p>Copyright ©️ 2024</p>
      </div>
    </div>
  )
}

export default Auth