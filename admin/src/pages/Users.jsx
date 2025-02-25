

import React from 'react'
import {Table} from "flowbite-react"
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { useState } from 'react'
import Error from '../components/Error'
import Loader from '../components/Error'
import {FaTrashAlt,FaEdit,FaStreetView} from "react-icons/fa"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"

export default function Users() {

    const {url,token,users,setUsers,usersLoading,usersError,fetchUsers} = useContext(StoreContext)

    const [userloader,setUserLoader] = useState([
        {},{},{},{},{}
    ])

    const [filteredUsers , setFilteredUsers] = useState(users)

    // handleSearch
    const handleSearch = (e) => {

        const searchUser = e.target.value

        const filtered = users?.filter((user) => user.email.toLowerCase().includes(searchUser.toLowerCase()))

        setFilteredUsers(filtered)

    }

    const navigate = useNavigate()


  return (

    <>

        <section className="w-full p-5 space-y-10">

            {/* header */}
            <div className="flex flex-col gap-y-3 sm:flex-row sm:justify-between sm:items-center">

                {/* title */}
                <div className="space-y-1">

                    <h2 className="text-4xl 2xl:text-5xl font-bold font-title">Users</h2>

                    <h4 className="text-xs md:text-sm 2xl:text-xl text-slate-600">Access all your user and there detailed information </h4>

                </div>


            </div>

            {/* search */}
            <div className="flex justify-between items-center gap-x-5">

                <input 
                    type="text" 
                    className="block w-full shadow-xl rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6"
                    placeholder='enter user email . . .'
                    onChange={handleSearch}
                />
                
                {/* button */}
                <button 
                    className="flex w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xl hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#FF9900]/80 "
                >
                    search
                </button>

            </div>

            {/* users */}
            <div 
                className="table-auto overflow-x-scroll md:mx-auto scrollbar 
               scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 
               dark:scrollbar-thumb-slate-500 "
            >

                <Table>

                    <Table.Head>

                        <Table.HeadCell></Table.HeadCell>

                        <Table.HeadCell>image</Table.HeadCell>

                        <Table.HeadCell>username</Table.HeadCell>

                        <Table.HeadCell>email</Table.HeadCell>

                        <Table.HeadCell>roles</Table.HeadCell>

                        <Table.HeadCell>actions</Table.HeadCell>

                    </Table.Head>

                    {!usersLoading && !usersError && (

                        <>

                            {filteredUsers?.length > 0 ? 
                                (
                                    <>

                                        {filteredUsers?.map((user,index) => (

                                           <Table.Body key={index}>

                                                <Table.Cell>{index + 1}.</Table.Cell>

                                                <Table.Cell>

                                                    <img 
                                                        src={user?.profilePicture} 
                                                        alt={user?.username} 
                                                        className="h-12 w-12 rounded-md"
                                                    />

                                                </Table.Cell>

                                                <Table.Cell className={` ${user?.isAdmin  ? "text-red-600 font-bold" : ""}`}>{user?.username}</Table.Cell>

                                                <Table.Cell>{user?.email}</Table.Cell>

                                                <Table.Cell>{user?.role}</Table.Cell>

                                                <Table.Cell>

                                                    <div className="flex items-center gap-x-2">

                                                        <span className="" onClick={() => navigate(`/user-profile/${user._id}`)}>
                                                            <FaEdit size={24}/>
                                                        </span>

                                                        <span className="">
                                                            <FaTrashAlt size={24}/>
                                                        </span>

                                                    </div>

                                                </Table.Cell>

                                           </Table.Body>

                                        ))}

                                    </>
                                ) 
                                : 
                                (

                                    <Table.Body>
                                    
                                        <Table.Cell colSpan={6} className='text-xl text-center text-slate-600 font-semibold'>
                                          You have no users yet
                                        </Table.Cell>
                                    
                                    </Table.Body>

                                )
                            }

                        </>

                    )}

                    {usersLoading && !usersError && (
                        
                        <>

                            {userloader?.map((user,index) => (

                                <Table.Body key={index}>

                                   
                                    <Table.Cell>

                                        <span className="block h-5 w-5 rounded-md animate-pulse bg-slate-300"/>

                                    </Table.Cell>

                                 
                                    <Table.Cell>

                                        <span className="block h-10 w-10 rounded-full animate-pulse bg-slate-300"/>

                                    </Table.Cell>
                                    
                                
                                    <Table.Cell>

                                        <span className="block h-5 w-24 rounded-md animate-pulse bg-slate-300"/>

                                    </Table.Cell>
                                    
                                  
                                    <Table.Cell>

                                        <span className="block h-5 w-24 rounded-md animate-pulse bg-slate-300"/>

                                    </Table.Cell>
                                    
                                    
                                    <Table.Cell>

                                        <span className="block h-5 w-12 rounded-md animate-pulse bg-slate-300"/>

                                    </Table.Cell>

                                   
                                    <Table.Cell>

                                        <div className="flex items-center gap-x-2">

                                            <span className="block h-6 w-6 rounded-full animate-pulse bg-slate-300"/>

                                            <span className="block h-6 w-6 rounded-full animate-pulse bg-slate-300"/>

                                            <span className="block h-6 w-6 rounded-full animate-pulse bg-slate-300"/>

                                        </div>

                                    </Table.Cell>

                                </Table.Body>

                            ))}

                        </>

                    )}

                    {usersError && (

                        <Table.Body>
                        
                            <Table.Cell colSpan={6}>
        
                                <Error retry={fetchUsers}/>
        
                            </Table.Cell>
                        
                        </Table.Body>

                    )}

                </Table>

            </div>

           
        </section>
    
    </>

  )

}
