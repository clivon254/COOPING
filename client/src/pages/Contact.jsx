
import React, { useContext, useState } from 'react'
import { GiRotaryPhone , GiTeleport} from "react-icons/gi";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { StoreContext } from '../context/store';
import { toast } from 'sonner';
import axios from "axios"



export default function Contact() {

    const {url} = useContext(StoreContext)

    const [formData ,setFormData] = useState({})

    const [contacting , setContacting] = useState(false)

    const [contactingError , setContactingError] = useState(null)


    // handleChange
    const handleChange = async (e) => {

        setFormData({...formData ,[e.target.name]:e.target.value})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            setContacting(true)

            setContactingError(false)

            const res  = await axios.post(url + "/api/auth/contact-us", formData)

            if(res.data.success)
            {
                setContacting(false)

                toast.success("message sent successfully")

                setFormData({})

            }

        }
        catch(error)
        {
            console.log(error.message)

            setContacting(false)

            if(error.response)
            {
                setContactingError(error.response.data.message)
            }
            else
            {

                setContactingError("Error: " + error.message)

            }

        }

    }


    console.log(formData)

  return (
    
    <section className="w-full">

        <div className="w-full flex flex-col gap-10 md:flex-row p-5 items-center border-b-8 border-[#FF9900]">

            {/* description */}
            <div className="space-y-8 w-full md:w-1/2">

                {/* header */}
                <div className="space-y-4 ">

                    <h3 className="text-4xl font-bold tracking-tight text-[#FF9900] sm:text-6xl">Contact us</h3>

                    <h4 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Get in touch</h4>

                    <p className="text-xl  text-gray-500">
                        We like to interact with our customers , and there what they think our products and feedback
                    </p>

                </div>

                {/* email */}
                <div className="flex items-start gap-x-10 p-4 border border-orange-100 rounded-md shadow-md ">

                    <span className="bg-orange-100 h-20 w-20 flex items-center justify-center rounded-md shadow-md text-white">

                        <FaEnvelopeOpenText className="text-[#ff9900]" size={40} />

                    </span>

                    <span className="flex flex-col gap-y-4">

                        <span className="text-xl font-semibold text-slate-600">Email Address :</span>

                        <span className="text-[#ff9900] text-base">coopin@gmail.com</span>

                    </span>

                </div>

                {/* phone */}
                <div className="flex items-start gap-x-10 p-4 border border-orange-100 rounded-md shadow-md ">

                    <span className="bg-orange-100 h-20 w-20 flex items-center justify-center rounded-md shadow-md text-white">
                        
                        <GiRotaryPhone className="text-[#ff9900]" size={40}/>

                    </span>

                    <span className="flex flex-col gap-y-4">

                        <span className="text-xl font-semibold text-slate-600">Phone number :</span>

                        <span className="text-[#ff9900] text-base">+254 111 202 895</span>

                    </span>

                </div>

                {/* location */}
                <div className="flex items-start gap-x-10 p-4 border border-orange-100 rounded-md shadow-md ">

                    <span className="bg-orange-100 h-20 w-20 flex items-center justify-center rounded-md shadow-md text-white">
                        
                        <GiTeleport className="text-[#ff9900]" size={40}/>

                    </span>

                    <span className="flex flex-col gap-y-4">

                        <span className="text-xl font-semibold text-slate-600">Location :</span>

                        <span className="text-[#ff9900] text-base">CUK , Karen</span>

                    </span>

                </div>
            
            </div>

            {/* form */}
            <div className="w-full md:w-1/2">

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4 p-5 border border-orange-100 rounded-md ">

                    {/* name */}
                    <div className="flex flex-col gap-y-2">

                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">Name</label>

                        <input 
                            type="text" 
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                            placeholder='Your name'
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />

                    </div>

                    {/* phone */}
                    <div className="flex flex-col gap-y-2">

                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">Phone</label>

                        <input 
                            type="phone" 
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" 
                            placeholder='07XXXXXXXX'
                            name="phone"
                            onChange={handleChange}
                            value={formData.phone}
                            required
                        />

                    </div>

                    {/* email */}
                    <div className="flex flex-col gap-y-2">

                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">Email</label>

                        <input 
                            type="email" 
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" 
                            placeholder='name@example.com'
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />

                    </div>

                    {/* subject */}
                    <div className="flex flex-col gap-y-2">

                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">Subject</label>

                        <input 
                            type="text" 
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                            placeholder='subject'
                            name="subject"
                            onChange={handleChange}
                            value={formData.subject}
                        />

                    </div>

                    {/* message*/}
                    <div className="flex flex-col gap-y-2">

                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">message</label>

                        <textarea 
                            type="text" 
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                            placeholder='type here . . . . '
                            name="message"
                            onChange={handleChange}
                            value={formData.message}
                        />

                    </div>

                    {contactingError && (

                        <div className="p-2 bg-red-100 text-red-500 rounded-md">{contactingError}</div>

                    )}

                    <button 
                        className="flex w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-md hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#FF9900]/80 "
                        disabled={contacting}
                        type="submit"
                    >

                        {contacting ?
                        (
                        <div className="">
                            Loading . . . . 
                        </div>
                        ) 
                        : 
                        ("Submit")
                        }
                    </button>

    
                </form>

            </div>

        </div>
        
        {/* map */}
        <div className="border-b-8 border-[#FF9900] w-full">
            
            <div className="space-y-6 p-5 max-w-2xl mx-auto w-full">

                <h2 className="text-2xl uppercase text-center font-semibold text-[#ff9900] mx-auto">Find us on Google Maps</h2>

                <p className="text-base text-center text-gray-700 mx-auto">
                    Easily locate our store using the map below, or get directions directly on Google Maps. Visit us and browse our vast selection of products in person!
                </p>

            </div>
            
            <div className="h-[500px] ">

                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.2550343378743!2d36.72665687350116!3d-1.3665601357160515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f051fc223e6c9%3A0x46afe71d2e294614!2sCooperative%20University%20of%20Kenya%2C%20Karen!5e1!3m2!1sen!2ske!4v1739375944908!5m2!1sen!2ske"  
                    className="w-full h-full"
                />

            </div>

        </div>

    </section>

  )

}
