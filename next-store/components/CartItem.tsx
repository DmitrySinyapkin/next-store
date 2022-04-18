import { InputNumber } from "antd"
import Image from "next/image"
import { ProductInCartType } from "../types/cart"
import styles from "../styles/CartItem.module.scss"
import Link from "next/link"

const CartItem = ({ product, handleQuantityChange, handleRemoveFromList }: { product: ProductInCartType, handleQuantityChange: Function, handleRemoveFromList: Function}) => {

    const handleChange = (value: number) => {
        handleQuantityChange(product.id, value)
    }

    const handleRemove = () => {
        handleRemoveFromList(product.id)
    }

    return (
        <div className={styles.item}>
            <div className={styles.card}>
                <Link href={`/products/${product.id}`}>
                    <a>
                        <div className={styles.description}>
                            <figure>
                                <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
                            </figure>
                            <div>{product.title}</div>
                        </div>
                    </a>
                </Link> 
            </div>
            <div className={styles.quantity}>
                <div>Quantity:</div>
                <InputNumber value={product.quantity} min={1} onChange={handleChange} />
            </div>
            <div className={styles.price}>{(product.quantity * +product.price * 100) / 100} $</div>
            <button onClick={handleRemove}>Remove</button>
        </div>
    )
}

export default CartItem
