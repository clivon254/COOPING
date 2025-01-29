

import React, { Fragment, useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate, useParams } from 'react-router-dom'
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
import Error from '../components/Error'
import Loader from '../components/loader'

export default function UpdateFood(){

    const {url,token,fetchProducts,collections,categorys,spices,sauces} = useContext(StoreContext)

    const [files ,setFiles] = useState([])

    const [uploading ,setUploading] = useState(false)

    const [imageUploadProgress ,setImageUploadProgress] = useState(null)

    const [imageUploadError ,setImageUploadError] = useState(null)

    const [error ,setError] = useState(null)

    const [loading ,setloading] = useState(false)

    const [formData , setFormData] = useState({ })

    const [selectedSauces , setSelectedSauces] = useState([])

    const [selectedSpices , setSelectedSpices] = useState([])

    const navigate = useNavigate()

    const {foodId} = useParams()

    const [fetchingProductLoading , setFetchingProductLoading] = useState(false)
    
    const [fetchingProductError , setFetchingProductError] = useState(false)




    // fetchProduct
    const fetchProduct = async () => {

        try
        {
            setFetchingProductLoading(true)

            setFetchingProductError(false)

            const res = await axios.get(url + `/api/product/get-product/${foodId}`)

            if(res.data.success)
            {
                setFormData(res.data.product)

                setFetchingProductLoading(false)
            }

        }
        catch(error)
        {
            console.log(error)

            setFetchingProductError(true)
        }

    }

    // handleChange
    const handleChange = (e) => {

        setFormData({...formData , [e.target.name]:e.target.value})

    }

    // handleChangeSelectedSpice
    const handleChangeSelectedSpice = (el) => {

        setSelectedSpices(el)

        setFormData({...formData , spices: el})

    }

    // handleChangeSelectedSauce
    const handleChangeSelectedSauce = (el) => {

        setSelectedSauces(el)

        setFormData({...formData , sauces: el})
        
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

            const res = await axios.put(url + `/api/product/update-product/${foodId}`,formData,{headers:{token}})

            if(res.data.success)
            {
                setFormData()

                navigate(`/product/${res.data.updatedProduct._id}`)

                toast.success(`${res.data.updatedProduct.name} is updated successfully `)

                setloading(false)

                fetchProducts()

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

    useEffect(() => {

        if(formData?.spices?.length < 1)
        {
            spices && setSelectedSpices([spices[0]])
        }
        else
        {
            setSelectedSpices(formData.spices)
        }

        if(formData?.sauces?.length < 1)
        {
            sauces && setSelectedSauces([sauces[0]])
        }
        else
        {
            setSelectedSauces(formData?.sauces)
        }

    },[])

    useEffect(() => {

        fetchProduct()

    },[foodId])
    
    console.log(formData)

  return (

    <>

        {!fetchingProductLoading && !fetchingProductError && ( 
        
                <section className="w-full p-5 space-y-10">

                    <h2 className="text-center text-4xl/9 font-bold">Update Food</h2>

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

                                <option value="" className="">Select Category</option>

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

                        {/* sauces */}
                        <div className="flex flex-col gap-y-2">

                            <label className="block text-sm/6 font-semibold text-gray-900">Sauces</label>

                            <Listbox
                                value={selectedSauces}
                                onChange={(el) => handleChangeSelectedSauce(el)}
                                multiple
                            >
                                <div className="relative mt-1">

                                    <ListboxButton className="relative w-full cursor-default rounded pl-1 pr-3 text-left px-3 py-4 2xl:py-6 border border-gray-600">

                                        <span className="">
                                            {selectedSauces?.map((sauce) => sauce?.name).join(",")}
                                        </span>

                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <BsChevronBarExpand size={26}/>
                                        </span>

                                    </ListboxButton>

                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-0"
                                        className="border shadow-md"
                                    >

                                        <ListboxOptions>
                                            
                                            {sauces?.map((sauce,index) => (

                                                <ListboxOption
                                                    key={index}
                                                    className={({active}) => 
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 
                                                    ${active ? "bg-orange-100" :"text-black"}`
                                                    }
                                                    value={sauce}
                                                >
                                                    {({selected}) => (

                                                        <>
                                                            <div 
                                                                className={clsx(
                                                                    "flex items-center gap-2 truncate",
                                                                    selected ? "font-medium": "font-normal" )}
                                                            >

                                                                <span className="">{sauce.name}</span>

                                                            </div>

                                                            {selected && (

                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-500">

                                                                    <BsCheck className="h-5 w-5"/>

                                                                </span>

                                                            )}

                                                        </>

                                                    )}
                                                </ListboxOption>

                                            ))}

                                        </ListboxOptions>

                                    </Transition>

                                </div>

                            </Listbox>

                        </div>
                        
                        {/* spices */}
                        <div className="flex flex-col gap-y-2">

                            <label className="block text-sm/6 font-semibold text-gray-900">Spices</label>

                            <Listbox
                                value={selectedSpices}
                                onChange={(el) => handleChangeSelectedSpice(el)}
                                multiple
                            >
                                <div className="relative mt-1">

                                    <ListboxButton className="relative w-full cursor-default rounded pl-1 pr-3 text-left px-3 py-4 2xl:py-6 border border-gray-600">

                                        <span className="">
                                            {selectedSpices?.map((spice) => spice.name).join(",")}
                                        </span>

                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <BsChevronBarExpand size={26}/>
                                        </span>

                                    </ListboxButton>

                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-0"
                                        className="border shadow-md"
                                    >

                                        <ListboxOptions>
                                            
                                            {spices?.map((spice,index) => (

                                                <ListboxOption
                                                    key={index}
                                                    className={({active}) => 
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 
                                                    ${active ? "bg-orange-100" :"text-black"}`
                                                    }
                                                    value={spice}
                                                >
                                                    {({selected}) => (

                                                        <>
                                                            <div 
                                                                className={clsx(
                                                                    "flex items-center gap-2 truncate",
                                                                    selected ? "font-medium": "font-normal" )}
                                                            >

                                                                <span className="">{spice.name}</span>

                                                            </div>

                                                            {selected && (

                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-500">

                                                                    <BsCheck className="h-5 w-5"/>

                                                                </span>

                                                            )}

                                                        </>

                                                    )}
                                                </ListboxOption>

                                            ))}
                                        </ListboxOptions>

                                    </Transition>

                                </div>

                            </Listbox>

                        </div>

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
                                value={formData?.description}
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
                            ("updating . . . . . ") 
                            : 
                            ("Update Food")}
                        </button>

                        {error && (

                            <Alert color="failure">{error}</Alert>

                        )}

                    </form>

                </section>

        )}

        {!fetchingProductError && fetchingProductLoading && (

           <Loader />

        )}

        {fetchingProductError && (

            <Error retry={fetchProduct}/>

        )}

    </>

  )

}
