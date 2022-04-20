import { CATEGORIES_URL, LOGIN_URL, POST_METHOD, PRODUCTS_URL } from "../constants/fakeStoreApi"

const doGetRequest = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

const doPostRequest = async (url: string, body: BodyInit | null | undefined) => {
    const options = {
        method: POST_METHOD,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: body
    }
    const res = await fetch(url, options)
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

export const getProductById = (id: string | string[] | undefined) => {
    const url = PRODUCTS_URL + `/${id}`
    return doGetRequest(url)
}

export const login = (username: string, password: string) => {
    const url = LOGIN_URL
    const body = JSON.stringify({
        username,
        password
    })
    doPostRequest(url, body)
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
}
