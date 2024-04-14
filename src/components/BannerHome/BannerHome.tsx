'use client'
import React, { useEffect, useState } from 'react'
import banner from '/public/banner.svg'
import Image from 'next/image'
import BackGroundImage from '@/app/assets/bg.png'
import { api } from '@/lib/api'
import { MarketInfoProps } from '@/@types/MarketInfoProps'

export function BannerHome() {

  const [marketInfo, setMarketInfo] = useState<MarketInfoProps>()

  useEffect(() => {
    async function getMarketInfo(){
      try{
        const response = await api.get('/api/market')
        setMarketInfo(response.data)
        console.log('entrou no try', response.data)
      }catch{
        setMarketInfo({
          name: 'Red Burguer',
          address: 'Av. Amazonas QD 118 LT 04',
          opening_hour: 'Sáb á Dom - 18:00 as 23:30',
        })
      }
    }
    getMarketInfo()
  },[])

  return (
    // <Image priority={true} alt='Banner hamburgueria' src={BackGroundImage} className='w-full h-[200px] min-[630px]:h-[350px] min-[1100px]:h-[456px] object-cover min-[1450px]:h-[500px]' />
    <div className='w-full h-[400px] relative max-[500px]:h-[250px]'>
      <Image src={BackGroundImage} alt='Banner hamburgueria' className='w-full h-[400px] max-[500px]:h-[250px]' />
      <div className='absolute bottom-36 max-[500px]:bottom-16 space-y-1 left-0 right-0 mx-auto'>
        <h1 className='text-white text-center font-bold text-2xl'>{marketInfo?.name}</h1>
        <p className='text-gray-400 text-center text-sm'>{marketInfo?.address}</p>
        <div className='flex justify-center text-white'>
          <p className='bg-orange-500 px-4 py-2 rounded-md'>{marketInfo?.opening_hours}</p>
        </div>
      </div>
    </div>
  )
}
