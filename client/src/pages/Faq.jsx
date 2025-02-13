
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { FaPlus } from 'react-icons/fa'

export default function Faq() {

    const {faqs} = useContext(StoreContext)

    const [openItems, setOpenItems] = useState([])

    // toggle Item
    const toggleItem = (index) => {

        setOpenItems((prevOpenItems) => {

            if(prevOpenItems.includes(index))
            {
                return prevOpenItems.filter(item => item !== index)
            }
            else
            {
                return [...prevOpenItems , index]
            }

        })
    }

    console.log(faqs)

  return (

    <section className="w-full p-5 space-y-5">

        <header className="md:text-4xl md:text-center text-3xl text-slate-700 font-semibold">
            Questions ? We have answers
        </header>

        <div className="space-y-3 md:max-w-3xl mx-auto ">

            {faqs?.length > 0 ? 
                (

                    <>
   
                        {faqs?.map((item ,index) => (

                            <div className="py-4 w-full border border-orange-50 p-3 cursor-pointer rounded-md bg-orange-50 transition-all ease-in duration-500 delay-200 shadow-md">
            
                                {/* question */}
                                <div 
                                    className="flex items-start gap-x-5"
                                    onClick={() => toggleItem(index)}
                                >
            
                                    <span className="">
                                        <FaPlus size={24} className="text-[#FF9900]"/>
                                    </span>
            
                                    <p className="font-semibold text-[#FF9900]">
                                        {item.question}
                                    </p>
            
                                </div>
            
                                {/* answer */}
                                {openItems.includes(index) && (
            
                                    <div className="p-2">
            
                                        <p className="text-sm text-slate-700">{item?.answer}</p>
            
                                    </div>
            
                                )}
            
                            </div>
            
                        ))}

                    </>

                ) 
                : 
                (
                  <>
                        <p className="">There are no FQAQs yet</p>
                  </>
                )
            }
            
        </div>

    </section>

  )

}
