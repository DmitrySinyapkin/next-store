import Link from "next/link"
import { firstCharToUpperCase } from "../utils/firstCharToUpperCase"
import styles from "../styles/Sidebar.module.scss"

const Sidebar = ({ categories }: { categories: string[] }) => {
    return (
        <div className={styles.sidebar}>
            <h3>Catalog</h3>
            <ul>
                {categories.map((category, index) => <li key={index}>{firstCharToUpperCase(category)}</li>)}
            </ul>
        </div>
    )
}

export default Sidebar
