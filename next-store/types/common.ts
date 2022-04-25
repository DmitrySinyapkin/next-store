export interface AccountItemType {
    title: string,
    link: string | null,
    icon: JSX.Element
}

export interface UserDataType {
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
