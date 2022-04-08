import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { getAllProducts, getCategories } from '../api/fakeStoreApi'
import { ProductType } from '../types/apiResponses'
import styles from '../styles/Home.module.scss'
import ProductCard from '../components/ProductCard'
import MainLayout from '../layouts/MainLayout'

const Home: NextPage = ({ categories, products}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const title = 'Home'
  const description = 'Home page of my store on NextJS'
  
  return (
    <MainLayout categories={categories} title={title} description={description}>
       <div className={styles.card__container}>
          {products.map((product: ProductType) => <ProductCard key={product.id} product={product} />)}
        </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await getCategories()
  const products = await getAllProducts()
  return {
    props: {
      categories,
      products,
    },
  } 
}

export default Home
