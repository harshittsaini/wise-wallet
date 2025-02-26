import { useNavigate } from "react-router-dom";
import { IoWallet } from "react-icons/io5";

const Auth = () => {
  const navigate = useNavigate();

  const onSignup = () => {
    navigate("/signup");
  };

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" text-[90px] ">
        <IoWallet />
      </div>
      <div>
        <h1 className="m-9 font-bold font-serif text-7xl">Wise Wallet</h1>
        <h5 className="m-0"> Welcome to Your Own Personal Finance Tracker!</h5>
        <div className="bg-white h-[0.5px] m-4"></div>
      </div>

      <div className="flex gap-8 m-10">
        <button onClick={onSignup}>Signup</button>
        <button onClick={onLogin}>Login</button>
      </div>

      <p>Test Login Credentials: </p>
      <div className="flex gap-2">
        <p>Email: test@gmail.com</p>
        <p>Password: test123</p>
      </div>

      {/* <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn> */}
      <div className="bottom-[-165px] relative">
        {/*<p className="bottom-0">Made by Harshit Kumar</p>
        <p>Copyright ©️ 2024</p>*/}
        
      </div>
    </div>
  );
};

export default Auth;
