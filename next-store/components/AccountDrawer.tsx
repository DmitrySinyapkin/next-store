import { Drawer, Form, Input, message, Space } from "antd"
import Link from "next/link"
import { useState } from "react"
import { login } from "../api/fakeStoreApi"
import { UserType } from "../types/apiResponses"

const AccountDrawer = ({ visible, handleToggle, handleLogin }: { visible: boolean, handleToggle: Function, handleLogin: Function }) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        login(username, password)
            .then(resp => {
                setUser(resp)
                handleLogin(resp.name.firstname)
                message.success(`${resp.name.firstname} is logged in`)
            })
            .catch(err => message.error(`Authorization error: ${err}`))
        handleToggle()
    }

    return (
        <>
            <Drawer title={user ? user.name.firstname : 'Log in'} visible={visible} onClose={handleToggle}>
                {user
                    ?
                    <div>Mock div for now</div>
                    :
                    <Space>
                        <Form onFinish={handleSubmit}>
                            <Form.Item
                                name='username'
                                label='Username:'
                                rules={[{
                                    required: true,
                                    message: 'Please, enter correct username!',
                                    pattern: /^[a-zA-Z]\w+$/,
                                }]}
                            >
                                <Input onChange={(e) => setUsername(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                label='Password:'
                                rules={[{
                                    required: true,
                                    message: 'Unacceptable symbols',
                                    pattern: /^[A-Za-z0-9_^]+$/,
                                }]}
                            >
                                <Input.Password type='password' onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <button type="submit">Log in</button>
                            </Form.Item>
                            <div style={{ textAlign: 'center' }}>Don&apos;t have an account? <Link href={'/signup'}><a>Sign up</a></Link></div>
                        </Form>
                    </Space>
                }
            </Drawer>
        </>
    )
}

export default AccountDrawer
