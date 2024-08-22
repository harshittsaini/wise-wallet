import React from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
    const onLogout = () => {
        navigate("/");
    }

  return (
    <div className='flex items-center justify-between px-6 py-2 drop-shadow-md'>
        <h2 className='text-xl font-semibold font-serif py-1 text-white'>Wise Wallet</h2>

        <ProfileInfo onLogout={onLogout} />
    </div>
  )
}

export default Navbar