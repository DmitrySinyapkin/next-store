import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { ProductInCartType, ProductInTableType } from "../types/cart";
import styles from "../styles/CartTable.module.scss"

const CartTable = ({ items }: { items: Array<ProductInCartType> }) => {
    const [data, setData] = useState<Array<ProductInTableType> | []>([])

    const columns = [
        {
          title: 'Num.',
          dataIndex: 'key',
        },
        {
          title: 'Title',
          dataIndex: 'title',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
          }
      ];

    useEffect(() => {
        const filtered = items.map((item: ProductInCartType, index: number) => ({
            key: index + 1,
            title: item.title.slice(0, 50) + '...',
            quantity: item.quantity,
            cost: ((item.quantity * +item.price * 100) / 100).toFixed(2)
        }))
        setData(filtered)
    }, [])

    return (
        <div className={styles.table}>
            <h2>Order List</h2>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                size="small"
                pagination={false}
                summary={pageData => {
                    let totalQuantity = 0
                    let totalCost = 0

                    pageData.forEach((product: ProductInTableType) => {
                        totalQuantity += product.quantity
                        totalCost += +product.cost * 100
                    })

                    totalCost = (totalCost / 100).toFixed(2)

                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={2}>Total: </Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                    <Text>{totalQuantity}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>
                                    <Text>{totalCost}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    )
                }}
            />
        </div>
    )
}

export default CartTable
