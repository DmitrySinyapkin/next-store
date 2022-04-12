import { ReactNode } from "react"
import styles from "../styles/ListLayout.module.scss"

const ListLayout = ({children, header}: {children: ReactNode, header: string}) => {
    return (
        <div className={styles.list_layout}>
            <h1>{header}</h1>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}

export default ListLayout
