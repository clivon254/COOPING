

import React from 'react'


export default function Loader() {

  return (

    <div className="flex items-center justify-center gap-x-3 mt-20 mb-5">

        <span className="animate-spin block rounded-full h-12 w-12 border-4 border-gray-300 border-l-orange-600 border-t-orange-600"/> Loading . . . . .

    </div>

  )

}