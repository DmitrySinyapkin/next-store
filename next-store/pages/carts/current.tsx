import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/fakeStoreApi";
import CartItem from "../../components/CartItem";
import { useCountContext } from "../../context/CountContext";
import MainLayout from "../../layouts/MainLayout";
import { ProductInCartType } from "../../types/cart";
import styles from "../../styles/CurrentCart.module.scss"
import { useRouter } from "next/router";

const CurrentCart: NextPage = ({ categories }: InferGetServerSidePropsType<GetServerSideProps>) => {
    const [products, setProducts] = useState<Array<ProductInCartType>>([])
    // @ts-ignore
    const [count, setCount] = useCountContext()

    const router = useRouter()

    useEffect(() => {
        setProducts(localStorage.getItem('mnstore-cart') ? JSON.parse(localStorage.getItem('mnstore-cart')!) : [])
    }, [])

    const handleQuantityChange = (id: number, value: number) => {
        const changed = products.map((product: ProductInCartType) => product.id === id ? {...product, quantity: value} : product)
        setProducts(changed)
        localStorage.setItem('mnstore-cart', JSON.stringify(changed))
    }

    const handleRemove = (id: number) => {
        const changed = products.filter((product: ProductInCartType) => product.id !== id)
        setProducts(changed)
        localStorage.setItem('mnstore-cart', JSON.stringify(changed))
        setCount((prev: number) => prev - 1)
    }

    const getTotalQuantity = (products: Array<ProductInCartType>) => {
        return products.reduce((quantity, product) => quantity += product.quantity, 0)
    }

    const getTotal = (products: Array<ProductInCartType>) => {
        return (products.reduce((total, product) => total += product.quantity * +product.price * 100, 0) / 100).toFixed(2)
    }

    return (
        <MainLayout categories={categories} title='Cart' description='Current cart'>
            <div className={styles.cart}>
                <h1>Cart</h1>
                {products.length > 0
                    ?
                        <div>
                            <div>
                                {products.map((product: ProductInCartType) => <CartItem
                                        key={product.id}
                                        product={product}
                                        handleQuantityChange={handleQuantityChange}
                                        handleRemoveFromList={handleRemove}
                                    />)
                                }
                            </div>
                            <div className={styles.wrapper}>
                                <div className={styles.totals}>
                                    <div>Items: {getTotalQuantity(products)}</div>
                                    <div>Total: {getTotal(products)} $</div>
                                </div>
                                <button onClick={() => router.push('/carts/confirm')}>Continue</button>
                            </div>
                        </div>
                    :
                        <div className={styles.message}>Your cart is empty</div>
                }
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
