

import React from 'react'
import { MdStar } from 'react-icons/md'
import Advert from '../components/Advert'
import PromoFood from '../components/promoFood'
import Subscribe from '../components/Subscribe'
import MainBanner from '../components/MainBanner'

export default function Home() {

  return (
    
    <div className="w-full">

      <MainBanner/>

      <Advert/>

      <PromoFood/>

      <Subscribe/>

    </div>

  )

}
