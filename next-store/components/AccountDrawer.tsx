import { LogoutOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons"
import { Drawer, Form, Input, List, message, Space } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { login } from "../api/fakeStoreApi"
import { LS_AUTH_USER, LS_TOKEN } from "../constants/localStorage"
import { UserType } from "../types/apiResponses"
import { AccountItemType } from "../types/common"

const AccountDrawer = ({ visible, handleToggle, handleLogin, handleExit }: { visible: boolean, handleToggle: Function, handleLogin: Function, handleExit: Function }) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    const router = useRouter()

    const listData: Array<AccountItemType> = [
        {
            title: 'Your profile',
            link: '/user/profile',
            icon: <UserOutlined />
        },
        {
            title: 'Your orders',
            link: '/user/orders',
            icon: <UnorderedListOutlined />
        },
        {
            title: 'Log out',
            link: null,
            icon: <LogoutOutlined />
        },
    ]

    useEffect(() => {
        if (localStorage.getItem(LS_AUTH_USER)) {
            setUser(JSON.parse(localStorage.getItem(LS_AUTH_USER)!))
        }
    }, [])

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem(LS_AUTH_USER)
        localStorage.removeItem(LS_TOKEN)
        handleExit()
        handleToggle()
        message.info('Logged out of account')
        router.push('/')
    }

    const renderItem = (item: AccountItemType) => {
        return (
            <List.Item>
                {item.link
                    ?
                    <Link href={item.link}><a>{item.icon} {item.title}</a></Link>
                    :
                    <div onClick={handleLogout}><a>{item.icon} {item.title}</a></div>
                }
            </List.Item>
        )
    }

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
                    <List
                        dataSource={listData}
                        renderItem={renderItem}
                    />
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
                                    pattern: /^\S+$/,
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
