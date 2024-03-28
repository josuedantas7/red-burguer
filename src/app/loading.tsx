import Image from 'next/image'
import React from 'react'
import loadingGif from '@/app/assets/loading.gif'

const loading = () => {
  return (
    <Image className='mx-auto' src={loadingGif} width={200} height={200} alt='Gif de carregamento' />
  )
}

export default loading
