import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/MainLayout.module.scss"

const MainLayout = ({children, categories, title, description}: {children: ReactNode, categories: string[], title: string, description: string}) => {
    return (
        <div className={styles.layout}>
            <Head>
                <title>{title} | My Next Store</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header></header>
            <aside><Sidebar categories={categories} /></aside>
            <main>{children}</main>
            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
}

export default MainLayout
