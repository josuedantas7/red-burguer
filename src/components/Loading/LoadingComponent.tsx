import Image from 'next/image'
import React from 'react'
import loadingGif from '@/app/assets/loading.gif'

export const LoadingComponent = () => {
  return (
    <Image src={loadingGif} width={200} height={200} alt='Gif de carregamento' />
  )
}
