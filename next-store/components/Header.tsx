import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Badge } from 'antd'
import styles from '../styles/Header.module.scss'

const { Search } = Input

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>MNShop</div>
            <div className={styles.search}>
                <Search placeholder='Search products...' style={{ width: 300 }} />
            </div>
            <div className={styles.user}>
                <Badge count={2} size='small'>
                    <div className={styles.cart}>
                        <ShoppingCartOutlined />
                        <span>Cart</span>
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
