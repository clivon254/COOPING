

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'
import { MdClose, MdMenu, MdShoppingBag } from 'react-icons/md'
import LOGO from "../assets/LOGOO.png"
import { Avatar, Dropdown } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'



export default function Header() {

    const {open,setOpen} = useContext(StoreContext)

    const {currentUser} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleSignOut
    const handleSignOut = () => {

        try
        {
            dispatch(signOutSuccess())

            localStorage.removeItem("token")

            toast.success("You have signed out")

            navigate("/sign-in")

        }
        catch(error)
        {
            console.log(error.message)
        }

    }


  return (

    <header className="p-3">

        <div className="flex items-center justify-between">

            {/* toggle */}
            <div className="lg:hidden cursor-pointer">
                {open ? 
                    (
                        <button className="">
                            <MdClose
                                size={30}
                                onClick={() => setOpen(false)}
                                className="cursor-pointer"
                            />
                        </button>
                    ) 
                    : 
                    (
                        <button className="">
                            <MdMenu
                                size={30}
                                onClick={() => setOpen(true)}
                                className="cursor-pointer"
                            />
                        </button>
                    )
                }
            </div>

            {/* logo */}
            <div className="h-10 md:h-16 w-30 md:w-48 ">

                <img 
                    src={LOGO}
                    alt="" 
                    className="h-full w-full" 
                />

            </div>

            {/* actions */}
            <div className="flex items-center gap-x-4">

                {/* cart */}
                <div className="relative cursor-pointer">

                    <MdShoppingBag
                        size={30}
                        onClick={() => navigate('/cart')}
                    />

                    <span className="absolute -right-3 -top-2 flex items-center justify-center h-6 w-6 text-white bg-[#003399] rounded-full text-xs font-semibold">
                        1
                    </span>

                </div>

                {/* dropdown */}
                <div className="">
                    {currentUser && (

                        <Dropdown
                            inline
                            arrowIcon={false}
                            label={
                                <Avatar
                                    alt="user"
                                    img={currentUser?.profilePicture}
                                    rounded
                                />
                            }
                            className="cursor-pointer"
                        >

                            <Dropdown.Header>

                                <span className="block text-xs">{currentUser?.username}</span>

                                <span className="block text-xs">{currentUser?.email}</span>

                                <span className="block text-xs">{currentUser?.role}</span>

                            </Dropdown.Header>

                            <Link to="/profile">

                                <Dropdown.Item>Profile</Dropdown.Item>

                            </Link>

                            <Dropdown.Item
                                onClick={() => handleSignOut()}
                            >
                                Sign out
                            </Dropdown.Item>

                        </Dropdown>

                    )}
                </div>

            </div>

        </div>

    </header>

  )

}
