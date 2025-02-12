


import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LOGO from "../assets/LOGOO.png"
import { StoreContext } from '../context/store'
import { MdClose, MdLogout, MdMenu,MdPermDeviceInformation } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Dropdown } from 'flowbite-react'
import { IoCartOutline } from "react-icons/io5";
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'
import DashSidebar from './DashSidebar'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF,FaWhatsapp,FaTiktok } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";



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

        <header className={` shadow-md`}>

          {/* upper */}
          <div className="bg-blue-100 p-2 flex justify-between items-center">
              
              {/* about && contact */}
              <div className="lg:flex hidden gap-x-10 text-[#ff9900] font-semibold">

                <Link to="/about">
                
                  <span className="flex items-center">

                    <FaInfo /> About

                  </span>

                </Link>

                <Link to="/contact">
                
                  <span className="flex items-center">

                    <MdPermDeviceInformation/> Contact
                    
                  </span>

                </Link>

              </div>

              {/* socials */}
              <div className="lg:flex hidden gap-x-1">

                <span className="">

                  <FaFacebookF/>

                </span>

                <span className="">

                  <FaInstagram/>
                  
                </span>

                <span className="">

                  <FaWhatsapp/>
                  
                </span>

                <span className="">

                  <FaTiktok/>
                  
                </span>

              </div>

              {/* toggle */}
              <div className="lg:hidden flex justify-end w-full">
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

          </div>
          
          {/* lower */}
          <div className="flex items-center justify-between p-3">


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

                    <IoCartOutline size={30} className=""/>

                    <span className="absolute -right-2 -top-4 h-6 w-6 rounded-full flex justify-center items-center bg-[#FF9900] text-white text-sm font-semibold shadow-md">
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

        {/* drawer */}
        <div className={`w-full h-full fixed top-0 bg-black/50 backdrop-blur-sm  origin-right transition-all  duration-200 ease-in lg:hidden overflow-y-hidden z-50 ${open ? "left-0" :"left-[-100%]"}`}>
                    
            <div className="absolute  left-0 w-[70%] h-full bg-white space-y-6 overflow-y-scroll px-3">
                
                <div className="flex justify-end p-2">

                    <span className="cursor-pointer" onClick={() => setOpen(false)} >

                        <MdClose size={30} className="font-bold"/>

                    </span>

                </div>

                <img 
                    src={LOGO}
                    alt="" 
                    className="cursor-pointer"
                    onClick={() => {

                        navigate("/")

                        setOpen(false)
                    }}
                />

                <DashSidebar/>
               

            </div>

        </div>

    </>

  )
  
}
