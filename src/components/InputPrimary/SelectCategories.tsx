import React from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { CategoryProps } from '@/@types/CategoryProps'
import { SelectCategoriesProps } from '@/@types/TypesPropsComponents/SelectCategories'

export function SelectCategories({setIdCategory, categories} : SelectCategoriesProps) {

    return (
        <Select onValueChange={setIdCategory}>
            <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                {categories.map((category: CategoryProps) => (
                <SelectItem key={category.id} value={category.id as string}>{category.name}</SelectItem>
                ))}
            </SelectGroup>
            </SelectContent>
        </Select>
        )
}
