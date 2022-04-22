export interface ProductType {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string
}

export interface UserType {
    id: number,
    email: string,
    username: string,
    password: string,
    name:{
        firstname: string,
        lastname: string
    },
    address:{
        city: string,
        street: string,
        number: number,
        zipcode: string,
        geolocation:{
            lat: string,
            long: string
        }
    },
    phone: string
}

interface CartItemType {
    productId: number,
    quantity: number
} 
export interface CartType {
    id: number,
    userId: number,
    date: string,
    products: Array<CartItemType>
}
