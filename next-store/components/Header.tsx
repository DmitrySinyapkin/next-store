import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Badge } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import { useCountContext } from '../context/CountContext'
import styles from '../styles/Header.module.scss'
import AccountDrawer from './AccountDrawer'

const { Search } = Input

const Header = () => {
    const [count, setCount] = useCountContext()
    const [drawerVisible, setDrawerVisible] = useState(false)

    const getProductsAmount = () => {
        return localStorage.getItem('mnstore-cart') ? JSON.parse(localStorage.getItem('mnstore-cart')!).length : 0
    }

    const handleDrawerToggle = () => {
        setDrawerVisible(prev => !prev)
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}><Link href={'/'}><a>MNShop</a></Link></div>
            <div className={styles.search}>
                <Search placeholder='Search products...' style={{ width: 300 }} />
            </div>
            <div className={styles.user}>
                <Badge count={count} size='small'>
                    <div className={styles.cart}>
                        <Link href={'/carts/current'}>
                            <a>
                                <ShoppingCartOutlined />
                                <span>Cart</span>
                            </a>
                        </Link>
                    </div>
                </Badge>
                <div className={styles.login} onClick={handleDrawerToggle}>
                    <UserOutlined />
                    <span>Log in</span>
                </div>
            </div>
            <AccountDrawer authorized={false} visible={drawerVisible} handleToggle={handleDrawerToggle} />
        </div>
    )
}

export default Header
