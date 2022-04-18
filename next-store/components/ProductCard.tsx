import { ProductType } from "../types/apiResponses"
import Image from "next/image"
import styles from "../styles/ProductCard.module.scss"
import Link from "next/link"

const ProductCard = ({ product }: { product: ProductType}) => {
    return (
        <div className={styles.card}>
            <Link href={`/products/${product.id}`}>
                <a>
                    <figure>
                        <Image src={product.image} alt='No image' layout="fill" objectFit="contain" />
                    </figure>
                    <div className={styles.card__title}>
                        <span>{product.title}</span>
                    </div>
                    <div className={styles.card__price}>
                        <span>{product.price} $</span>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default ProductCard
