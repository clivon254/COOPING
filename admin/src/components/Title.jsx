

import React from 'react'


export default function Title({label}) {

  return (

    <div className="w-full flex flex-col gap-y-2  sm:flex-row items-center my-2">

        <div className="w-full flex-1 border-t-2 border-slate-600 "/>

        <div className="mx-10 text-2xl/9  font-semibold tracking-tight text-[#FF9900] uppercase">{label}</div>

        <div className="w-full flex-1 border-t-2 border-slate-600 "/>

    </div>

  )

}