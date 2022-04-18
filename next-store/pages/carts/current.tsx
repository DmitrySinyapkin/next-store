import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/fakeStoreApi";
import CartItem from "../../components/CartItem";
import MainLayout from "../../layouts/MainLayout";
import { ProductInCartType } from "../../types/cart";

const CurrentCart: NextPage = ({ categories }: InferGetServerSidePropsType<GetServerSideProps>) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(localStorage.getItem('mnstore-cart') ? JSON.parse(localStorage.getItem('mnstore-cart')!) : [])
    }, [])

    const handleQuantityChange = (id: number, value: number) => {
        const changed = [
            ...products,
            {
                id: id,
                quantity: value
            }
        ]
        setProducts(changed)
        localStorage.setItem('mnstore-cart', JSON.stringify(changed))
    }

    const getTotalQuantity = (products: Array<ProductInCartType>) => {
        return products.reduce((quantity, product) => quantity += product.quantity, 0)
    }

    const getTotal = (products: Array<ProductInCartType>) => {
        return products.reduce((total, product) => total += product.quantity * +product.price, 0)
    }

    return (
        <MainLayout categories={categories} title='Cart' description='Current cart'>
            <div>
                <h1>Cart</h1>
                <div>
                    {products.length > 0
                        ?
                            products.map((product: ProductInCartType) => <CartItem key={product.id} product={product} handleQuantityChange={handleQuantityChange} />)
                        :
                            <div>Your cart is empty</div>
                    }
                </div>
                <div>
                    <div>Quantity: {getTotalQuantity(products)}</div>
                    <div>Total: {getTotal(products)} $</div>
                    <button>Finish</button>
                </div>
            </div>
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

export default CurrentCart
