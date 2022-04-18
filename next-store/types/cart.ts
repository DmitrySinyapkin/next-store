import { ProductType } from "./apiResponses";

export interface ProductInCartType extends ProductType {
    quantity: number,
}
