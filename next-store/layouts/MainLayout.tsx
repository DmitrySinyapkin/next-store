import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import styles from "../styles/MainLayout.module.scss"
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({children, categories, title, description}: {children: ReactNode, categories: string[], title: string, description: string}) => {
    return (
        <div className={styles.layout}>
            <Head>
                <title>{title} | My Next Store</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Header />
            </header>
            <aside><Sidebar categories={categories} /></aside>
            <main>{children}</main>
            <footer>
               <Footer />
            </footer>
        </div>
    )
}

export default MainLayout
