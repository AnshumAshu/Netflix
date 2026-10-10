import React from 'react'
import { useNavigate } from "react-router-dom";
import useAuthStore from '../store/authStore';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //console.log("username:",username ,"\n email:",email,"\n password:",password);
  const {Signup,isLoading,error} = useAuthStore();
 
 

    const handleSignup =async(e) => {
        e.preventDefault();
        try {
            await Signup(username,email,password);
            navigate("/");
        }catch(error){
            console.error("Signup failed:", error);
            alert(error.response?.data?.message || "Signup failed" );
        }
    }
    
    return (
        <div className='min-h-screen pmin-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5' style={{backgroundImage:"linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/background_banner.jpg)",}}>
            <div className="max-w-[450px] w-full bg-black bg-opacity-75 rounded px-8 py-14 mx-auto mt-8">
                <h1 className='text-3xl font-medium text-white mb-7'> signin</h1>
                <form action="" onSubmit={handleSignup} className="flex flex-col space-y-4">
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='username' className="w-full h-[50px] bg-[#333] text-white rouded px-5 text-base" />

                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='anshumashu2002@gmail.com' className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base" />

                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter Your Password" className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base" />

                    {error && <p className='text-red-500 text-sm'>{error}</p>}

                    <button type="submit" disabled={isLoading}  className="w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer" >Sign Up </button>
                </form>
                <div className="mt-10 text-[#737373] text-sm">
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => navigate("/signin")} className="text-white font-medium cursor-pointer ml-2 hover:underline"> Sign In Now </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup