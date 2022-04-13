import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Image from "next/image";
import { getCategories, getProductById } from "../../api/fakeStoreApi";
import MainLayout from "../../layouts/MainLayout";
import { firstCharToUpperCase } from "../../utils/firstCharToUpperCase";
import styles from "../../styles/Product.module.scss"

const Product: NextPage = ({ categories, product }: InferGetServerSidePropsType<GetServerSideProps>) => {
    return (
        <MainLayout categories={categories} title={firstCharToUpperCase(product.title)} description={product.description}>
            <div className={styles.product}>
                <h1>{product.title}</h1>
                <div className={styles.container}>
                    <figure>
                        <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
                    </figure>
                    <div className={styles.buy_block}>
                        <div className={styles.price}>{product.price} $</div>
                        <button>Add to cart</button>
                    </div>
                </div>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.rating}>Rating: {product.rating.rate}</div>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const categories = await getCategories()
    const product = await getProductById(ctx.query.productId)
    return {
        props: {
            categories,
            product,
        },
    } 
}

export default Product
