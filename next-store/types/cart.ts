import { CartType, ProductType } from "./apiResponses";

export interface ProductInCartType extends ProductType {
    quantity: number,
}

export interface ProductInTableType {
    key: number,
    title: string,
    quantity: number,
    cost: string,
}

interface CartItemType {
    productId: number,
    quantity: number
} 
export interface CurrentCartType {
    userId: number,
    date: string,
    products: Array<CartItemType>
}

export interface OrderType {
    id: number,
    userId: number,
    date: string,
    products: Array<ProductInCartType>
}
