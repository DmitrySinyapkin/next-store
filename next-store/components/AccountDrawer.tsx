import { Drawer, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { login } from "../api/fakeStoreApi"

const AccountDrawer = ({ authorized, visible, handleToggle }: { authorized: boolean, visible: boolean, handleToggle: Function }) => {
    const [title, setTitle] = useState('Log in')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    /* useEffect(() => {
        if (localStorage.getItem('mnstore-user')) {
            setTitle(JSON.parse(localStorage.getItem('mnstore-user')!).username)
        }
    }, []) */

    const handleSubmit = () => {
        login(username, password)
        handleToggle()
    }

    return (
        <>
            <Drawer title={title} visible={visible} onClose={handleToggle}>
                {authorized
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
