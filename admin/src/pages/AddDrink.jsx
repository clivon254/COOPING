


import React, { Fragment, useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import { toast } from 'sonner'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Alert } from 'flowbite-react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react"
import { BsCheck, BsChevronBarExpand } from "react-icons/bs"
import clsx from "clsx"



export default function AddDrink() {

    const {url,token,fetchProducts,collections,categorys,colors ,sizes} = useContext(StoreContext)

    const [files ,setFiles] = useState([])

    const [uploading ,setUploading] = useState(false)

    const [imageUploadProgress ,setImageUploadProgress] = useState(null)

    const [imageUploadError ,setImageUploadError] = useState(null)

    const [error ,setError] = useState(null)

    const [loading ,setloading] = useState(false)

    const [formData , setFormData] = useState({
        images:[],
        type:"Drink",
        discountPrice:0
    })

    const navigate = useNavigate()


    // handleChange
    const handleChange = (e) => {

        setFormData({...formData , [e.target.name]:e.target.value})

    }


    // handleImageSubmit
    const handleImageSubmit = () => {

        if(files.length > 0 && files.length + formData.images.length < 7)
        {
            setUploading(true)

            setImageUploadError(null)

            const promises = []

            for(let i = 0 ;i < files.length ; i++)
            {
                promises.push(storageImage(files[i]))
            }

            Promise.all(promises)
            .then((urls) => {
                
                setFormData({
                    ...formData,
                    images:formData.images.concat(urls)
                })

                setImageUploadError(null)

                setUploading(false)

            })
            .catch((error) => {

                console.log(error)

                setImageUploadError('Image upload failed')

                setUploading(false)
            })

        }
        else
        {

            setImageUploadError('You can only upload per 6 images Product')

            setUploading(false)

        }

    }

    // storageImage
    const storageImage = async (file) => {

        return new Promise((resolve,reject) => {

            const storage = getStorage(app)

            const fileName = new Date().getTime() + file.name 

            const storageRef = ref(storage ,fileName)

            const uploadTask = uploadBytesResumable(storageRef ,file)

            uploadTask.on(
                'state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    setImageUploadProgress(progress.toFixed(0))

                },
                (error) => {

                    reject(error)

                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        resolve(downloadURL)

                    })
                }
            )
        })
    }

    // handleRemoveImage
    const handleRemoveImage = (index) => {

        setFormData({
            ...formData,
            images:formData?.images?.filter((_,i) => i !== index)
        })

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(formData?.images?.length < 0) 
        {
            return setError('upload at least an image')
        }

        try
        {
            setloading(true)

            const res = await axios.post(url + "/api/product/create-drink",formData,{headers:{token}})

            if(res.data.success)
            {
                setFormData()

                navigate(`/product/${res.data.drink._id}`)

                toast.success(`${res.data.drink.name} is added successfully `)

                setloading(false)

                fetchProducts()

                setFormData({})

            }

        }
        catch(error)
        {

            setloading(false)

            if(error.response)
            {
                const errorMessage = error.response.data.message 

                setError(errorMessage)

                console.log(errorMessage)
            }
            else
            {
                setError(error.message)
            }

        }

    }


    
    console.log(formData)

  return (

    <section className="w-full p-5 space-y-10">

        <h2 className="text-center text-4xl/9 font-bold">Add Drink</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 max-w-2xl mx-auto">

            {/* name */}
            <div className="flex flex-col gap-y-2">

                <label className="block text-sm/6 font-semibold text-gray-900">
                    Name
                </label>

                <input 
                    type="text" 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                    placeholder="name"
                    name="name"
                    onChange={handleChange}
                    value={formData?.name}
                />

            </div>

            {/* Category */}
            <div className="flex flex-col gap-y-2">

                <label className="block text-sm/6 font-semibold text-gray-900">Category</label>

                <select
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                    name="category"
                    onChange={handleChange}
                    value={formData?.category}
                >

                    <option value="" className="">Select Category</option>

                    {categorys?.map((collection,index) => (

                        <option key={index} value={collection.name}>{collection.name}</option>

                    ))}

                </select>

            </div>
            
            {/* collection*/}
            <div className="flex flex-col gap-y-2">

                <label className="block text-sm/6 font-semibold text-gray-900">Collection</label>

                <select 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                    name="collections"
                    onChange={handleChange}
                    value={formData?.collections}
                >

                    <option value="" className="">Select Collection</option>

                    {collections?.map((collection,index) => (

                        <option key={index} value={collection.name}>{collection.name}</option>

                    ))}

                </select>
            </div>

            {/* boolean */}
            <div className="flex items-center gap-x-5">
                
                {/* offer */}
                <div className="flex  items-center gap-x-2">

                    <input 
                        type="checkbox" 
                        className="block rounded " 
                        name="offer"
                        onChange={(e) => setFormData({...formData , offer : e.target.checked})}
                        checked={formData?.offer}
                    />

                    <label className="block text-sm/6 font-semibold text-gray-900">
                        Offer
                    </label>

                </div>

                {/* featured*/}
                <div className="flex items-center gap-x-2">

                    <input
                        type="checkbox" 
                        className="block rounded " 
                        name="featured"
                        onChange={(e) => setFormData({...formData , featured : e.target.checked})}
                        checked={formData?.featured} 
                   />

                    <label className="block text-sm/6 font-semibold text-gray-900">featured</label>

                </div>

            </div>
            
            {/* regularPrice */}
            <div className="flex flex-col gap-y-2">

                <label className="block text-sm/6 font-semibold text-gray-900">Regular Price</label>

                <input 
                    type="number" 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                    placeholder="KES"
                    name="regularPrice"
                    onChange={handleChange}
                    value={formData?.regularPrice}
                />

            </div>
            
            {formData?.offer && (

                <> 
                
                    {/* discountPrice */}
                    <div className="flex flex-col gap-y-2">

                        <label className="block text-sm/6 font-semibold text-gray-900">Discount Price</label>

                        <input 
                            type="number" 
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                            placeholder="KES"
                            name="discountPrice"
                            onChange={handleChange}
                            value={formData.discountPrice}
                        />

                    </div>

                </>

            )}


            {/* description */}
            <div className="flex flex-col gap-y-2">

                <label className="block text-sm/6 font-semibold text-gray-900">Description</label>

                <ReactQuill
                    theme='snow'
                    className="h-60 mb-20"
                    required
                    onChange={(value) => {
                        setFormData({...formData , description : value})
                    }}
                />

            </div>

            {/* images */}
            <div className="flex flex-col gap-y-2">

                <label className="block text-xl font-semibold text-gray-900">Images</label>

                {formData?.images?.length > 0  && 
                    
                    formData?.images?.map((url,index) => (

                        <div 
                            className="flex items-center justify-between"
                        >

                            <img 
                                src={url}
                                alt="" 
                                className="w-20 h-20 object-cover" 
                            />

                            <button 
                                className="text-rose-500"
                                onClick={() => handleRemoveImage(index)}
                            >
                                Delete
                            </button>

                        </div>

                    ))

                }

                <div className="flex flex-col gap-1">

                    <input 
                        type="file"
                        multiple
                        className="border border-gray-500 w-full" 
                        accept="image/*"
                        onChange={(e) => setFiles(e.target.files)}
                    />

                    <button 
                        className="bg-black text-white py-2 rounded-full disabled:opacity/70 disabled:cursor-not-allowed"
                        disabled={uploading}
                        type="button"
                        onClick={handleImageSubmit}
                    >

                        {uploading ? 
                         (
                            <div className="flex items-center justify-center gap-x-2">

                                <span className="animate-spin h-6 w-6 rounded-full border-2 border-r-amber-500"/> {imageUploadProgress} % uploaded

                            </div>
                         ) 
                            : 
                         ("upload")
                        }

                    </button>

                </div>

            </div>

            {imageUploadError && (

                <Alert color="failure">{imageUploadError}</Alert>

            )}

            <button 
                className="mt-4 flex w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#FF9900]/80 "
                type="submit"
                disabled={loading || uploading}
            >
                {loading ? 
                ("Adding . . . . . ") 
                : 
                ("Add Drink")}
            </button>

            {error && (

                <Alert color="failure">{error}</Alert>

            )}

        </form>

    </section>

  )

}
 