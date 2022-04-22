import { CATEGORIES_URL, LOGIN_URL, POST_METHOD, PRODUCTS_URL, USERS_URL } from "../constants/fakeStoreApi"
import { LS_AUTH_USER, LS_TOKEN } from "../constants/localStorage"
import { UserType } from "../types/apiResponses"

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

const getAllUsers = () => {
    return doGetRequest(USERS_URL)
}

export const login = (username: string, password: string) => {
    const url = LOGIN_URL
    const body = JSON.stringify({
        username,
        password
    })
    return doPostRequest(url, body)
        .then(resp => {
            // mock realization bacause of api abilities
            if (resp.token) {
                localStorage.setItem(LS_TOKEN, resp.token)
                return getAllUsers().then(resp => {
                    const user = resp.find((user: UserType) => user.username === username)
                    localStorage.setItem(LS_AUTH_USER, JSON.stringify(user))
                    return user
                })
            }
        })
        .catch(err => console.log(err))
}
