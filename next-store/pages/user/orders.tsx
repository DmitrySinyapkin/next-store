import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import { getAllProducts, getCartsByUser, getCategories } from "../../api/fakeStoreApi";
import Order from "../../components/Order";
import { LS_AUTH_USER } from "../../constants/localStorage";
import MainLayout from "../../layouts/MainLayout";
import { CartType, ProductType, UserType } from "../../types/apiResponses";
import { CartItemType, OrderType } from "../../types/cart";

const OrderList: NextPage = ({ categories }: InferGetServerSidePropsType<GetServerSideProps>) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [products, setProducts] = useState<Array<ProductType> | null>(null)
    const [orders, setOrders] = useState<Array<OrderType> | null>(null)

    useEffect(() => {
        setUser(localStorage.getItem(LS_AUTH_USER) ? JSON.parse(localStorage.getItem(LS_AUTH_USER)!) : null)
        getAllProducts()
            .then(resp => setProducts(resp))
    }, [])

    useEffect(() => {
        if (user && products) {
            getCartsByUser(user!.id)
                .then(resp => {
                    if (resp.length > 0) {
                        const mixed = resp.map((order: CartType) => ({...order, products: order.products.map((item: CartItemType) => getProductData(item))}))
                        setOrders(mixed)
                    }
                })
        }
    }, [user, products])

    const getProductData = (product: CartItemType) => {
        const data = products!.find((item: ProductType) => item.id === product.productId)
        const mixed = {
            ...data,
            quantity: product.quantity
        }
        return mixed
    }

    return (
        <MainLayout categories={categories} title='Orders' description='User orders page'>
            <h1>{user ? user.username : 'User'} | Orders</h1>
            {orders
                ?
                orders.map((order: OrderType) => <Order key={order.id} order={order} />)
                :
                <div style={{ marginLeft: '20px', fontSize: '1.5rem' }}>There are no orders</div>
            }
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const categories = await getCategories()
    return {
        props: {
            categories,
        },
    }
}

export default OrderList
