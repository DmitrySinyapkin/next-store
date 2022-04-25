import { message, Space } from "antd"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useRouter } from "next/router"
import { addNewOrder, getCategories } from "../../api/fakeStoreApi"
import CartTable from "../../components/CartTable"
import CustomerCard from "../../components/CustomerCard"
import { LS_AUTH_USER, LS_CART } from "../../constants/localStorage"
import MainLayout from "../../layouts/MainLayout"
import { ProductInCartType } from "../../types/cart"
import styles from "../../styles/ConfirmOrder.module.scss"

const ConfirmOrder: NextPage = ({ categories }: InferGetServerSidePropsType<GetServerSideProps>) => {
    const user = localStorage.getItem(LS_AUTH_USER) ? JSON.parse(localStorage.getItem(LS_AUTH_USER)!) : null
    const items = localStorage.getItem(LS_CART) ? JSON.parse(localStorage.getItem(LS_CART)!) : null

    const router = useRouter()

    const handleBack = () => {
        router.push('/carts/current')
    }

    const handleConfirm = () => {
        // Fake Store Api needs user ID for new cart. Order confirmation will work for logged in users only
        if (user) {
            const date = new Date().toISOString()
            const products = items!.map((item: ProductInCartType) => ({ productId: item.id, quantity: item.quantity }))
            const cart = {
                userId: user!.id,
                date,
                products
            }

            addNewOrder(cart)
                .then(resp => {
                    if (resp.id) {
                        message.success('Order accepted')
                        router.push('/user/orders')
                        localStorage.removeItem(LS_CART)
                    } else {
                        message.error('Order error! Please, try again later')
                    }
                })
                .catch(err => message.error(`Order error! ${err}`))
        } else {
            message.warning('Only authorized users can make orders. Please, log in')
        }
    }

    return (
        <MainLayout categories={categories} title='Confirm order' description='Order confirmation'>
            <div className={styles.confirm}>
                <h1>Confirm order</h1>
                <div className={styles.wrapper}>
                    <CustomerCard user={user} />
                    {items && <CartTable items={items} />}
                </div>
                <div className={styles.buttons}>
                    <Space>
                        <button onClick={handleBack}>Back</button>
                        <button onClick={handleConfirm}>Confirm order</button>
                    </Space>
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

export default ConfirmOrder
