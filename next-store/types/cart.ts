import { ProductType } from "./apiResponses";

export interface ProductInCartType extends ProductType {
    quantity: number,
}

export interface ProductInTableType {
    key: number,
    title: string,
    quantity: number,
    cost: string,
}
