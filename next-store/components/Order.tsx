import { useState } from "react"
import { OrderType, ProductInCartType } from "../types/cart"
import CartTable from "./CartTable"
import styles from "../styles/Order.module.scss"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import { formatDate } from "../utils/formatDate"

const Order = ({ order }: { order: OrderType }) => {
    const [open, setOpen] = useState(false)

    const handleToggle = () => {
        setOpen(prev => !prev)
    }

    const getTotalQuantity = (products: Array<ProductInCartType>) => {
        return products.reduce((quantity, product) => quantity += product.quantity, 0)
    }

    const getTotalCost = (products: Array<ProductInCartType>) => {
        return (products.reduce((total, product) => total += product.quantity * +product.price * 100, 0) / 100).toFixed(2)
    }

    return (
        <div className={styles.item}>
            <div className={styles.header}>
                <div className={styles.number}>Num. {order.id}</div>
                <div className={styles.date}><span>Date:</span> {formatDate(order.date)}</div>
                <div className={styles.total_quantity}>
                    <div><span>Total quantity:</span></div>
                    <div>{getTotalQuantity(order.products)}</div>
                </div>
                <div className={styles.total_cost}>
                    <div><span>Total cost:</span></div>
                    <div>{getTotalCost(order.products)}</div>
                </div>
                <div className={styles.status}><i>In progress</i></div>
            </div>
            <div className={styles.controls}>
                <div className={styles.button} onClick={handleToggle}>{open ? <div><UpOutlined /> Hide details</div> : <div><DownOutlined /> Show details</div>}</div>
            </div>
            <div className={open ? styles.table_opened : styles.table_closed}>
                <CartTable items={order.products} />
            </div>
        </div>
    )
}

export default Order
