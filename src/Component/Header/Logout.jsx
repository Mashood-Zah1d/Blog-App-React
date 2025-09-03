import React from 'react'
import authentication from '../../Appwrite/Auth'
import { logout } from '../../Store/AuthSlice'
import { useDispatch } from 'react-redux'

function Logout() {
  const dispatch = useDispatch();

  const exit = async () => {
    try {
      await authentication.logout()
      dispatch(logout());  // ✅ dispatch redux action
    } catch (error) {
      console.log("APPWRITE :: ERROR :" + error);
    }
  }

  return (
    <button  
      onClick={exit}
      className='rounded-2xl bg-red-600 text-black px-4 py-2'>
      Logout
    </button>
  )
}

export default Logout
