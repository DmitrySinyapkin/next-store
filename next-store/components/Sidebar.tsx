import Link from "next/link"
import { firstCharToUpperCase } from "../utils/firstCharToUpperCase"
import styles from "../styles/Sidebar.module.scss"

const Sidebar = ({ categories }: { categories: string[] }) => {
    return (
        <div className={styles.sidebar}>
            <h3>Categories</h3>
            <nav>
                <ul>
                    {categories.map((category, index) => <li key={index}><Link href={`/products/category/${category}`}><a>{firstCharToUpperCase(category)}</a></Link></li>)}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
