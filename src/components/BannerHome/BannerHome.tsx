import React from 'react'
import banner from '/public/banner.svg'
import Image from 'next/image'

export function BannerHome() {
  return (
    <Image alt='Banner hamburgueria' src={banner} className='w-full h-[200px] min-[630px]:h-[350px] min-[1100px]:h-[456px] object-cover' />
  )
}
