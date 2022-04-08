import { ProductType } from "../types/apiResponses"
import Image from "next/image"
import styles from "../styles/ProductCard.module.scss"

const ProductCard = ({ product }: { product: ProductType}) => {
    return (
        <div className={styles.card}>
            <figure>
                <Image src={product.image} alt='No image' width={200} height={200} />
            </figure>
            <div className={styles.card__title}>
                <span>{product.title}</span>
            </div>
            <div className={styles.card__price}>
                <span>{product.price} $</span>
            </div>
        </div>
    )
}

export default ProductCard
