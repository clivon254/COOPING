


import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LOGO from "../assets/LOGOO.png"
import { StoreContext } from '../context/store'
import { MdClose, MdLogout, MdMenu } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Dropdown } from 'flowbite-react'
import { IoCartOutline } from "react-icons/io5";
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'



export default function Header() {


  const {open,setOpen,token,cartNumber,NavLinks} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  // handle sign out 
  const handleSignOut = () => {

    dispatch(signOutSuccess())

    toast.success("sign out successfully")

    navigate('/')

    localStorage.removeItem("token")

  }


  return (
    
    <>

        <header className={` p-3 shadow-md`}>

          <div className="flex items-center justify-between">

            {/* toggle */}
            <div className="lg:hidden">
              {
                open ? 
                <MdClose
                  size={30}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer"
                />
                :
                <MdMenu
                  size={30}
                  onClick={() => setOpen(true)}
                  className="cursor-pointer"
                />
              }
            </div>

            {/* logo */}
            <Link to="/">

                <div className="flex items-center">

                  {/* word */}
                  <div className="h-12 w-36 lg:h-20 lg:w-60">
                      
                      <img 
                        src={LOGO} 
                        alt="" 
                        className="h-full w-full" 
                      />

                  </div>

                </div>

            </Link>

            {/* NavLinks */}
            <div className="hidden lg:flex items-center gap-x-6 justify-center">

              {NavLinks?.map((nav,index) => (

                <NavLink
                  key={index}
                  to={`${nav.path}`}
                  className={({isActive}) => isActive ? "flex items-center gap-x-1 text-sm font-semibold text-orange-600" : "flex items-center gap-x-1 text-sm font-semibold"}
                >

                  <span className="">{nav?.icon}</span>{nav?.name}

                </NavLink>

              ))}

            </div>


            {/* actions */}
            <div className="flex items-center gap-x-3 lg:gap-x-5">

              {/* cart */}
              {token && currentUser && (

                <div className="relative cursor-pointer">

                  <Link to="/cart">

                    <IoCartOutline size={30}/>

                    <span className="absolute -right-2 -top-3 h-6 w-6 rounded-full flex justify-center items-center bg-[#FF9900] text-white text-sm font-semibold shadow-md">
                      {cartNumber || 0}
                    </span>

                  </Link>

                </div>

              )}

              {/* dropdown */}
              <div className="">
                {currentUser ?
                  (
                   <Dropdown
                    inline
                    arrowIcon={false}
                    label={
                      <Avatar
                        img={currentUser.profilePicture}
                        rounded
                        className='shadow-md'
                      />
                    }
                   >

                    <Dropdown.Header>

                      <span className="block text-xs tracking-tight truncate font-semibold">{currentUser?.username}</span>

                      <span className="block text-xs tracking-tight truncate mt-1 font-semibold">{currentUser?.email}</span>

                    </Dropdown.Header>

                    <Link to="/profile">

                      <Dropdown.Item>Profile</Dropdown.Item>

                    </Link>

                    <Link to="/orders">

                      <Dropdown.Item>Orders</Dropdown.Item>
                      
                    </Link>

                    <Dropdown.Item 
                      className="flex items-center gap-x-2"
                      onClick={handleSignOut}
                    >

                      <MdLogout size={24}/>sign out

                    </Dropdown.Item>

                   </Dropdown>
                  )
                  :
                  (
                    <button 
                      onClick={() => navigate('/sign-in')}
                      className="flex w-full items-center justify-center rounded-full bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xl hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer"
                    >
                      sign in
                    </button>
                  )
                }
              </div>

            </div>

          </div>


        </header>

    </>

  )
  
}
