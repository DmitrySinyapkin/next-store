import { Drawer, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { login } from "../api/fakeStoreApi"
import { LS_AUTH_USER } from "../constants/localStorage"
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
            })
        handleToggle()
    }

    return (
        <>
            <Drawer title={user ? user.name.firstname : 'Log in'} visible={visible} onClose={handleToggle}>
                {user
                    ?
                    <div>Mock div for now</div>
                    :
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
                    </Form>
                }
            </Drawer>
        </>
    )
}

export default AccountDrawer
