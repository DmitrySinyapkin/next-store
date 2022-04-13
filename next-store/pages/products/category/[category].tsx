import type { GetServerSideProps, InferGetServerSidePropsType, NextPage, NextPageContext } from 'next'
import { getCategories, getProductsByCategory } from '../../../api/fakeStoreApi'
import { ProductType } from '../../../types/apiResponses'
import ProductCard from '../../../components/ProductCard'
import MainLayout from '../../../layouts/MainLayout'
import ListLayout from '../../../layouts/ListLayout'
import { useRouter } from 'next/router'
import { firstCharToUpperCase } from '../../../utils/firstCharToUpperCase'

const Category: NextPage = ({ categories, products}: InferGetServerSidePropsType<GetServerSideProps>) => {
    const router = useRouter()
    const title = firstCharToUpperCase(router.query.category)
    const description = `${title} page`
    
    return (
        <MainLayout categories={categories} title={title} description={description}>
            <ListLayout header={firstCharToUpperCase(title)}>
                {products.map((product: ProductType) => <ProductCard key={product.id} product={product} />)}
            </ListLayout>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const categories = await getCategories()
    const products = await getProductsByCategory(ctx.query.category)
    return {
        props: {
            categories,
            products,
        },
    } 
}

export default Category