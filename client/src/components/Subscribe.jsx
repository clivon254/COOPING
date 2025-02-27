

import React from 'react'

export default function Subscribe() {

  return (

    <div className="w-full relative isolate overflow-hidden  px-5 py-10 sm:py-16 lg:py-24 border-b-8 border-primary bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400">

       <div className="grid grid-cols-1 md:grid-cols-2">
            
            <div className="max-w-xl lg:max-w-lg">

                <p className="text-4xl font-bold">
                  Want product news and updates ?Sign up for our news letter
                </p>

            </div>

            <div className="mt-6 space-y-4">
                
                <div className="flex max-w-md gap-x-4">

                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>

                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        autoComplete="email"
                        className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#ff9900] sm:text-sm/6"
                    />
                    
                    <button
                        type="submit"
                        className="flex-none rounded-md bg-[#ff9900] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff9900]"
                    >
                        Subscribe
                    </button>

                </div>

                <span className="text-base font-semibold block">We care about your data . Read our <span className="text-[#FF9900]">privacy and policy</span></span>

            </div>

       </div>

    </div>

  )

}
