import { InputNumber } from "antd"
import Image from "next/image"
import { ProductInCartType } from "../types/cart"
import styles from "../styles/CartItem.module.scss"

const CartItem = ({ product, handleQuantityChange }: { product: ProductInCartType, handleQuantityChange: Function}) => {

    const handleChange = (value: number) => {
        handleQuantityChange(product.id, value)
    }

    return (
        <div className={styles.item}>
            <figure>
                <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
            </figure>
            <div>{product.title}</div>
            <div className={styles.quantity}>
                <div>Quantity</div>
                <InputNumber value={product.quantity} onChange={handleChange} />
            </div>
            <div>{product.quantity * +product.price} $</div>
            <button>Remove</button>
        </div>
    )
}

export default CartItem
