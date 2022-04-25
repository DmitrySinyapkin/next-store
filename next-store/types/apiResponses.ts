import { CurrentCartType } from "./cart"
import { UserDataType } from "./common"

export interface ProductType {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string
}

export interface UserType extends UserDataType {
    id: number,
}
export interface CartType extends CurrentCartType {
    id: number,
}
