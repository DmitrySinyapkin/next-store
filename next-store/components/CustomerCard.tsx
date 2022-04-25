import { Form, Input } from "antd";
import { UserType } from "../types/apiResponses";
import styles from "../styles/CustomerCard.module.scss"

const CustomerCard = ({ user }: { user: UserType | null }) => {
    const initialValues = {
        name: user?.name.firstname || '',
        email: user?.email || '',
        phone: user?.phone || '',
        city: user?.address.city || '',
        street: user?.address.street || '',
        number: user?.address.number || '',
        zipcode: user?.address.zipcode || ''
    }

    return (
        <div className={styles.card}>
            <h2>Customer</h2>
            <div className={styles.form}>
                <Form initialValues={initialValues}>
                    <Form.Item
                        name='name'
                        label='Name:'
                        rules={[{
                            required: true,
                            message: 'Please, enter your name!',
                            pattern: /^[a-zA-Z][a-z]+$/,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label='E-mail:'
                        rules={[{
                            required: true,
                            message: 'Please, enter your e-mail!',
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='phone'
                        label='Phone:'
                        rules={[{
                            required: true,
                            message: 'Please, enter your phone!',
                            pattern: /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <div>Address:</div>
                    <Form.Item
                        name='city'
                        label='City:'
                        rules={[{
                            required: true,
                            message: 'Please, enter your city!',
                            pattern: /^[a-zA-Z]+$/,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='street'
                        label='Street:'
                        rules={[{
                            required: true,
                            message: 'Please, enter your city!',
                            pattern: /^[a-zA-Z]+$/,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='number'
                        label='Number:'
                        rules={[{
                            required: true,
                            message: 'Please, enter your city!',
                            pattern: /^\d+$/,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='zipcode'
                        label='ZIP code:'
                        rules={[{
                            required: true,
                            message: 'Please, enter your city!',
                            pattern: /\d{5}([ \-]\d{4})?/,
                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </div>
            <div className={styles.note}>Note: This section is out of order process now. Fake Store Api allows to add a new cart for signed users (using user ID). Confirm button will work only for logged in users.</div>
        </div>
    )
}

export default CustomerCard
