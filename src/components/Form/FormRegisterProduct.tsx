'use client'

import React, { useEffect, useState } from 'react'
import { InputPrimary } from '../InputPrimary/InputPrimary'
import { InputSecundary } from '../InputPrimary/InputSecundary'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

import { v4 as uuidV4 } from 'uuid'
import { storage } from '@/services/firebaseConnection'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Notification } from '../Notifier/Notification'
import { api } from '@/lib/api'
import { CategoryProps } from '@/@types/CategoryProps'
import { SelectCategories } from '../InputPrimary/SelectCategories'
import { Button } from '../ui/button'
import { ProductProps } from '@/@types/ProductProps'

export function FormRegisterProduct() {

    const [name,setName] = useState<string>('')
    const [description,setDescription] = useState<string>('')
    const [price,setPrice] = useState<number>(1)
    const [image,setImage] = useState<string>('')
    const [buttonDisabled,setButtonDisabled] = useState<boolean>(false)
    const [idCategory,setIdCategory] = useState<string>('')

    const [allCategories,setAllCategories] = useState<CategoryProps[]>([])

    const [loading,setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function getAllCategories(){
            try{
                const response = await api.get('/api/category')
                setAllCategories(response.data)
            }catch{
                Notification('error', 'Erro ao buscar categorias')
            }
        }
        getAllCategories()
    },[])

    useEffect(() => {
        if(isNaN(price)) {
            setPrice(0)
        }
    },[price])

    async function handleRegisterProduct(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setLoading(true)

        if(name === '' || price === 0 || image === '') {
            Notification('error', 'Preencha todos os campos para cadastrar um produto')
        }

        const data : ProductProps = {
            name,
            description,
            price,
            image,
            idCategory
        }

        try{
            const response = await api.post('/api/product', {...data})
            Notification('success', 'Produto cadastrado com sucesso')
        }catch{
            Notification('error', 'Erro ao cadastrar produto')
        }finally{
            setLoading(false)
        }
    }

    async function handleFile(e : React.ChangeEvent<HTMLInputElement>){
        if (e.target.files && e.target.files[0]) {
          const image = e.target.files[0]
    
          await handleUpload(image)
        }
      }
    
      async function handleUpload(image: File) {
        setButtonDisabled(true)
  
        const uidImage = uuidV4()
    
        const uploadRef = ref(storage, `products/${uidImage}`)
    
        uploadBytes(uploadRef, image)
        .then((snapShop) => {
          getDownloadURL(snapShop.ref)
          .then(url => {
            setImage(url)
            setButtonDisabled(false)
          })
        })
      };


      const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const parsedValue = parseFloat(inputValue);
    
        if (!isNaN(parsedValue)) {
          setPrice(parsedValue);
        } else {
          setPrice(0);
        }
      };

  return (
    <form className='w-full flex flex-col gap-2' onSubmit={(e) => handleRegisterProduct(e)}>
        <InputPrimary value={name} onChange={setName} placeholder='Nome do produto' type='text' />
        <InputPrimary value={description} onChange={setDescription} placeholder='Descrição do produto' type='text' />
        <InputSecundary onChange={handleChange} placeholder='Preço do produto' />
        <Input className='disabled:cursor-not-allowed' disabled={buttonDisabled} onChange={handleFile} id="picture" type="file" />
        <SelectCategories setIdCategory={setIdCategory} categories={allCategories} />
        <Button disabled={buttonDisabled} className='disabled:cursor-not-allowed' onClick={handleRegisterProduct} type='submit'>{!loading ? 'Cadastrar' : 'Cadastrando....'}</Button>
    </form>
  )
}
