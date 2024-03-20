import { CategoryProps } from "../CategoryProps";

export interface SelectCategoriesProps {
    setIdCategory: (id: string) => void;
    categories: CategoryProps[];
}