import { Form, Input } from "antd";
import { useState } from "react";
import { UserType } from "../types/apiResponses";
import styles from "../styles/CustomerCard.module.scss"

const CustomerCard = ({ user }: { user: UserType }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [zipcode, setZipcode] = useState('')

    return (
        <div className={styles.card}>
            <h2>Customer</h2>
            <div className={styles.form}>
                <Form>
                    <Form.Item
                        name='name'
                        label='Name:'
                        rules={[{
                            required: true,
                            message: 'Please, enter your name!',
                            pattern: /^[a-zA-Z][a-z]+$/,
                        }]}
                    >
                        <Input defaultValue={user && user.name.firstname} onChange={(e) => setName(e.target.value)} />
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
                        <Input defaultValue={user && user.email} onChange={(e) => setEmail(e.target.value)} />
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
                        <Input defaultValue={user && user.phone} onChange={(e) => setPhone(e.target.value)} />
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
                        <Input defaultValue={user && user.address.city} onChange={(e) => setCity(e.target.value)} />
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
                        <Input defaultValue={user && user.address.street} onChange={(e) => setStreet(e.target.value)} />
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
                        <Input defaultValue={user && user.address.number} onChange={(e) => setNumber(e.target.value)} />
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
                        <Input defaultValue={user && user.address.zipcode} onChange={(e) => setZipcode(e.target.value)} />
                    </Form.Item>
                </Form>
            </div>
            <div className={styles.note}>Note: This section is out of order process now. Fake Store Api allows to add a new cart for signed users (using user ID). Confirm button will work only for logged in users.</div>
        </div>
    )
}

export default CustomerCard
