


import React, { useContext , useEffect, useState} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LOGO from "../assets/LOGOO.png"
import { StoreContext } from '../context/store'
import { MdClose, MdLogout, MdMenu,MdPermDeviceInformation } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Dropdown } from 'flowbite-react'
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'
import DashSidebar from './DashSidebar'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF,FaWhatsapp,FaTiktok } from "react-icons/fa";
import { FaInfo , FaQuestion } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5"
import { MdLiquor } from "react-icons/md";
import { RiDrinks2Line } from "react-icons/ri";
import { GiClothes } from "react-icons/gi";
import { IoRestaurantSharp } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";



export default function Header() {


  const {open,setOpen,token,cartNumber,NavLinks,products} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [searchOpen , setSearchOpen] = useState(false)

  const [searchInput , setSearchInput] = useState("")

  const [filteredProducts , setFilteredProducts] = useState([])

  const [isSticky , setIsSticky] = useState(false)



  // handleSearch
  const handleSearch = (e) => {

    const searchTerm = e.target.value 

    setSearchInput(searchTerm)

    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setFilteredProducts(filtered)

  }


  // handle sign out 
  const handleSignOut = () => {

    dispatch(signOutSuccess())

    toast.success("sign out successfully")

    navigate('/')

    localStorage.removeItem("token")

  }


  useEffect(() => {

    let prevScrollPosition = 0 ;

    const handleScroll = () => {

      const scrollPosition = window.scrollY

      const scrollDirection = scrollPosition - prevScrollPosition

      prevScrollPosition = scrollPosition

      if(scrollDirection < 0 && scrollPosition > 0)
      {
        setIsSticky(true)
      }
      else
      {
        setIsSticky(false)
      }


    }

    window.addEventListener('scroll', handleScroll)

    return () => {

      window.removeEventListener('scroll', handleScroll)

    }

  },[])


  return (
    
    <>

        <header className={`w-full  ${isSticky ? "sticky top-0" : ""} z-50 border-b-2 border-gray-100 shadow-md`}>

          {/* upper */}
          <div className="bg-gray-100  flex justify-between items-center p-2 lg:p-0"> 
              
              {/* about && contact  && FAQ*/}
              <div className="lg:flex hidden gap-x-6  text-[#ff9900] text-xs font-semibold p-1">

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

                <Link to="/faq">
                
                  <span className="flex items-center">

                    <FaQuestion/> FAQ
                    
                  </span>

                </Link>

              </div>

              {/* search */}
              <div className="border border-zinc-300 w-[500px] relative hidden lg:block">

                <input 
                  type="text" 
                  className="w-full border-none focus:none" 
                  placeholder='search . . . '
                  onChange={handleSearch}
                />

                {searchInput && (

                  <span className="absolute inset-y-3 right-12 cursor-pointer">

                    <CiCircleRemove className="text-black font-bold" onClick={() => setSearchInput("")}/>

                  </span>

                )}

                <button className="absolute inset-y-0 right-0 bg-gray-400 flex justify-center items-center px-3 py-1">
                  <IoSearch size={22} className="text-white"/>
                </button>

                {searchInput && (

                  <div className="absolute w-full max-h-[60vh] z-50 bg-slate-200 overflow-hidden overflow-y-scroll p-3">

                    {filteredProducts.length > 0 ? 
                      (
                        <>

                          <div className="space-y-3">

                            {filteredProducts.map((product,index) => (

                              <div 
                                key={index}
                                className="flex items-center gap-x-5 border-b border-orange-200 pb-3 cursor-pointer "
                                onClick={() => setSearchInput("") }
                              >

                                <Link to={`/product/${product._id}`}>

                                  <img 
                                    src={product?.images[0]}
                                    alt="" 
                                    className="h-12 w-12 rounded-md shadow-sm" 
                                  />

                                </Link>

                                <div className="flex flex-col gap-y-1">

                                  <span className="">{product?.name}</span>

                                  {product.discountPrice > 0 ? 
                                    (

                                    <div className="flex items-center gap-x-2 text-sm font-medium">

                                      <span className="text-xs line-through text-gray-500">
                                        {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                      </span>

                                      <span className="">
                                        {(product?.discountPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                      </span>

                                    </div>

                                    ) 
                                    : 
                                    (
                                      <span className="text-sm font-medium">
                                        {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                      </span>
                                    )
                                  }

                                </div>

                              </div>

                            ))}

                          </div>

                        </>
                      ) 
                      : 
                      (
                        
                        <p className="">

                          Sorry <span className="">"{searchInput}"</span> not found ! ! ! !

                        </p>

                      )
                    }

                  </div>

                )}

              </div>

              {/* socials */}
              <div className="lg:flex hidden gap-x-3 text-[#ff9900] p-1">

                <span className="hover:scale-110 hover:cursor-pointer">

                  <FaFacebookF size={20} />

                </span>

                <span className="hover:scale-110 hover:cursor-pointer">

                  <FaInstagram size={20}/>
                  
                </span>

                <span className="hover:scale-110 hover:cursor-pointer">

                  <FaWhatsapp size={20}/>
                  
                </span>

                <span className="hover:scale-110 hover:cursor-pointer">

                  <FaTiktok size={20}/>
                  
                </span>

              </div>

              {/* toggle */}
              <div className="lg:hidden  text-[#FF9900]">
                {
                  open ? 
                  <MdClose
                    size={30}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                  :
                  <MdMenu
                    size={40}
                    onClick={() => setOpen(true)}
                    className="cursor-pointer"
                  />
                }
              </div>

              {/* actions */}
              <div className="flex items-center gap-x-3 lg:gap-x-5 lg:hidden">

                {/* cart */}
                {token && currentUser && (

                  <div className="relative cursor-pointer">

                    <Link to="/cart">

                      <IoCartOutline size={30} className=""/>

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
                          className=''
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
          
          {/* lower */}
          <div className="bg-white p-2 lg:flex justify-center items-center">

              <div className="flex items-center justify-between gap-x-10">
                
                {/* left navs */}
                <div className="hidden lg:flex gap-x-7 ">

                  {/* home */}
                  <NavLink
                    to={`/`}
                    className={({isActive}) => isActive ? "active-nav" : "active-nav-link"}
                  >

                      <span className="">
                        <IoHomeOutline size={20}/>
                      </span> 

                      <span className="text-[#FF9900]">Home </span>

                  </NavLink>

                  {/* food  */}
                  <NavLink
                    to={`/food`}
                    className={({isActive}) => isActive ? "active-nav" : "active-nav-link"}
                  >

                      <span className="">

                        <IoRestaurantSharp size={20}/>

                      </span>
                      
                      <span className="text-[#FF9900]">Food </span>

                  </NavLink>
                  
                  {/* drinks */}
                  <NavLink
                    to={`/drink`}
                    className={({isActive}) => isActive ? "active-nav" : "active-nav-link"}
                  >

                      <span className="">
                        <RiDrinks2Line size={20}/>
                      </span>

                      <span className="text-[#FF9900]"> Drink</span>

                  </NavLink>

                </div>

                {/* logo */}
                <Link to="/" className=''>

                    <div className="flex items-center">

                      {/* word */}
                      <div className="h-10 w-30 lg:h-16 lg:w-48">
                          
                          <img 
                            src={LOGO} 
                            alt="" 
                            className="h-full w-full" 
                          />

                      </div>

                    </div>

                </Link>
                
                {/* right navs */}
                <div className="hidden lg:flex gap-x-7">

                  {/* liqour */}
                  <NavLink
                    to={`/liqour`}
                    className={({isActive}) => isActive ? "active-nav" : "active-nav-link"}
                  >

                      <span className="">
                        <MdLiquor size={20} />
                      </span>
                      
                      <span className="text-[#FF9900]">Liqour</span>

                  </NavLink>

                  {/* merchendise  */}
                  <NavLink
                    to={`/merchendise`}
                    className={({isActive}) => isActive ? "active-nav" : "active-nav-link"}
                  >

                      <span className="">
                        <GiClothes size={20}/>
                      </span>
                      
                      <span className="text-[#FF9900]"> Merchendise </span>
                      
                  </NavLink>

                  {/*discover more  */}
                  <Link
                    to={``}
                    className={"flex items-center gap-x-1 text-base font-semibold"}
                  >

                      <span className=""><FaQuestion size={18}/></span>
                      
                      <span className="text-[#FF9900] font-semibold">Discover more </span>

                  </Link>

                  {/* actions */}
                  <div className="hidden lg:flex items-center gap-x-3 lg:gap-x-5">

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
                              className=''
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

                {/* search */}
                <div className="border border-zinc-300 w-[500px] relative  lg:hidden">

                  <input 
                    type="text" 
                    className="w-full border-none focus:none" 
                    placeholder='search . . . '
                    onChange={handleSearch}
                  />

                  {searchInput && (

                  <span className="absolute inset-y-3 right-12 cursor-pointer">

                    <CiCircleRemove className="text-black font-bold" onClick={() => setSearchInput("")}/>

                  </span>

                  )}

                  <button className="absolute inset-y-0 right-0 bg-gray-400 flex justify-center items-center px-3 py-1">
                    <IoSearch size={22} className="text-white"/>
                  </button>

                  {searchInput && (

                    <div className="absolute w-full max-h-[60vh] z-50 bg-slate-200 overflow-hidden overflow-y-scroll p-3">

                      {filteredProducts.length > 0 ? 
                        (
                          <>

                            <div className="space-y-3">

                              {filteredProducts.map((product,index) => (

                                <div 
                                  key={index}
                                  className="flex items-center gap-x-5 border-b border-orange-200 pb-3 cursor-pointer "
                                  onClick={() => setSearchInput("") }
                                >

                                  <Link to={`/product/${product._id}`}>

                                    <div className="h-12 w-12 min-w-12 max-w-12">

                                      <img 
                                        src={product?.images[0]}
                                        alt="" 
                                        className="h-full w-full rounded-md shadow-sm" 
                                      />

                                    </div>

                                  </Link>

                                  <div className="flex flex-col gap-y-1">

                                    <span className="">{product?.name}</span>

                                    {product.discountPrice > 0 ? 
                                      (

                                      <div className="flex items-center gap-x-2 text-sm font-medium">

                                        <span className="text-xs line-through text-gray-500">
                                          {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                        </span>

                                        <span className="">
                                          {(product?.discountPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                        </span>

                                      </div>

                                      ) 
                                      : 
                                      (
                                        <span className="text-sm font-medium">
                                          {(product?.regularPrice)?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                                        </span>
                                      )
                                    }

                                  </div>

                                </div>

                              ))}

                            </div>

                          </>
                        ) 
                        : 
                        (
                          
                          <p className="">

                            Sorry <span className="">"{searchInput}"</span> not found ! ! ! !

                          </p>

                        )
                      }

                    </div>

                  )}

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
