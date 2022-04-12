import { CATEGORIES_URL, PRODUCTS_URL } from "../constants/fakeStoreApi"

const doGetRequest = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export const getCategories = () => {
    return doGetRequest(CATEGORIES_URL)
}

export const getProductsByCategory = (category: string | string[] | undefined) => {
    const url = PRODUCTS_URL + `/category/${category}`
    return doGetRequest(url)
}

export const getAllProducts = () => {
    return doGetRequest(PRODUCTS_URL)
}
