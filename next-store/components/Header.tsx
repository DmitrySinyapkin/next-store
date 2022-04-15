import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Badge } from 'antd'
import Link from 'next/link'
import styles from '../styles/Header.module.scss'

const { Search } = Input

const Header = () => {

    const getProductsAmount = () => {
        return localStorage.getItem('mnstore-cart') ? JSON.parse(localStorage.getItem('mnstore-cart')!).length : 0
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}><Link href={'/'}><a>MNShop</a></Link></div>
            <div className={styles.search}>
                <Search placeholder='Search products...' style={{ width: 300 }} />
            </div>
            <div className={styles.user}>
                <Badge count={() => getProductsAmount()} size='small'>
                    <div className={styles.cart}>
                        <Link href={'/carts/current'}>
                            <a>
                                <ShoppingCartOutlined />
                                <span>Cart</span>
                            </a>
                        </Link>
                    </div>
                </Badge>
                <div className={styles.login}>
                    <UserOutlined />
                    <span>Log in</span>
                </div>
            </div>
        </div>
    )
}

export default Header
