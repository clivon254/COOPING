

import React, { useContext, useEffect, useRef, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../firebase'
import { StoreContext } from '../context/store'
import { useDispatch, useSelector } from 'react-redux'
import { signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react';



export default function Profile() {

    const {token,url} = useContext(StoreContext)

    const {loading ,error , currentUser} = useSelector(state => state.user)

    const [formData ,setFormData] = useState({})

    const [imageFile ,setImageFile] = useState(null)

    const [imageFileUrl ,setImageFileUrl] = useState(null)

    const [imageFileUploading ,setImageFileUploading] = useState(false)

    const [imageFileUploadProgress ,setImageFileUploadProgress] = useState(null)

    const [imageFileUploadError ,setImageFileUploadError] = useState(null)

    const [updatedError ,setUpdatedError] = useState(null)

    const filePickerRef = useRef()

    const navigate = useNavigate()

    const dispatch = useDispatch()


    // handleImageChange
    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if(file)
        {
            setImageFile(file)

            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {

        if(imageFile)
        {
            uploadImage()
        }

    },[imageFile])

    // uploadImage
    const uploadImage = () => {

        setImageFileUploadError(null)

        setImageFileUploading(true)

        const storage = getStorage(app)

        const fileName = new Date().getTime() + imageFile.name 

        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on(
            'state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                setImageFileUploadProgress(progress.toFixed(0))
            },
            (error) => {

                setImageFileUploadError("image could not upload an image (File must be less than 5MB)")

                setImageFileUploadProgress(null)

                setImageFileUrl(null)

                setImageFile(null)

                setImageFileUploading(false)
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    setImageFileUrl(downloadURL)

                    setFormData({...formData , profilePicture: downloadURL})

                    setImageFileUploading(false)
                })
            }
        )
    }   

    // handleChange
    const handleChange = (e) => {

        setFormData({...formData , [e.target.name]:e.target.value})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(Object.keys(formData).length === 0)
        {

            dispatch(updateUserFailure('No changes made'))

            return 
        }
        

        if(imageFileUploading)
        {

            dispatch(updateUserFailure('Please wait for the image to finish upload'))

            return
        }

        try
        {
            dispatch(updateUserStart())


            const res = await axios.put(url + `/api/user/update-user/${currentUser._id}`,formData,{headers :{token}})

            if(res.data.success)
            {
                dispatch(updateUserSuccess(res.data.rest))

                toast.success("Profile updated succcessfully")
            }

        }
        catch(error)
        {

            if(error.response)
            {
                const errorMessage = error.response.data.message 

                dispatch(updateUserFailure(errorMessage))
            }
            else
            {
                dispatch(updateUserFailure(error.message))
            }

        }

    }

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

    // handleDelete
    const handleDelete = () => {}


  return (

    <section className="w-full p-5 space-y-10">

        <h2 className="text-center text-2xl/9 font-bold">Profile</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 max-w-xl mx-auto">

            <input 
                type="file" 
                onChange={handleImageChange}
                accept='/image*'
                ref={filePickerRef}
                hidden
            />
            
            {/* image */}
            <div 
                className="relative h-32 w-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                onClick={() => filePickerRef.current.click()}
            >

                {imageFileUploadProgress && (

                    <CircularProgressbar
                        value={imageFileUploadProgress || 0}
                        text={`${imageFileUploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root:{
                                width:'100%',
                                height:'100%',
                                top:0,
                                left:0,
                            },
                            path:{
                                stroke:`rgba(62 ,152 ,1999 ,${imageFileUploadProgress})`
                            }
                        }}
                    />

                )}
                    
                <img 
                    src={imageFileUrl || currentUser.profilePicture}
                    alt="user" 
                    className={`rounded-full w-full h-full object-cover border-8 
                        ${imageFileUploadProgress && imageFileUploadProgress < 100 && `opaciy-${imageFileUploadProgress}`}`}
                />
                
            </div>

            {imageFileUploadError && (

                <Alert color="failure">{imageFileUploadError}</Alert>

            )}
            
            {/* email */}
            <input 
                type="email" 
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                placeholder='name@example.com'
                name="email"
                onChange={handleChange}
                defaultValue={currentUser?.email}
            />

            {/* username */}
            <input 
                type="text" 
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                placeholder='username'
                name="username"
                onChange={handleChange}
                defaultValue={currentUser?.username}
            />

            {/* password */}
            <input 
                type="password" 
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                placeholder='*******'
                name="password"
                onChange={handleChange}
            />

            {/* button */}
            <button 
                className="flex w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#FF9900]/80 "
                type='submit'
                disabled={loading}
            >
                {loading ? 
                (
                    <div className="">
                        updating ......
                    </div>
                ) 
                    : 
                ("update user")
                }
            </button>

            {error && (

                <Alert color="failure">{error}</Alert>

            )}

            {/* action */}
            <div className="flex justify-between items-center ">

                <span className="cursor-pointer block text-sm/6 font-medium text-red-600">
                    Delete Account
                </span>

                <span 
                    className="cursor-pointer block text-sm/6 font-medium text-red-600"
                    onClick={() => handleSignOut()}
                >
                    Sign out
                </span>

            </div>

        </form>

    </section>

  )

}
