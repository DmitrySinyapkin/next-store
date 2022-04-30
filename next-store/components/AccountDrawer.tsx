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
                router.push('/')
            })
            .catch(err => message.error(`Authorization error: ${err}`))
        handleToggle()
    }

    // handler for test log in
    const handleDemoLogin = () => {
        login('johnd', 'm38rmF$')
            .then(resp => {
                setUser(resp)
                handleLogin(resp.name.firstname)
                message.success(`${resp.name.firstname} is logged in`)
                router.push('/')
            })
            .catch(err => message.error(`Authorization error: ${err}`))
        handleToggle()
    }

    return (
        <>
            {/* @ts-ignore*/}
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
                            <div style={{ textAlign: 'center' }}>Don&apos;t have an account? <Link href={'/user/signup'}><a>Sign up</a></Link></div>
                            {/* demo section for test access */}
                            <div style={{ width: '100%', marginTop: '40px', padding: '5px', border: '1px solid gray', display: "flex", flexDirection: "column", gap: '10px', fontSize: '0.7rem' }}>
                                <div>Demo mode</div>
                                <div>Since Fake Store Api only immitates interaction with database and you cannot create a real user, you can log in for testing</div>
                                <div style={{ color: 'darkcyan', cursor: 'pointer' }} onClick={handleDemoLogin} >Click here to log in as test user</div>
                            </div>
                            {/*-----------------------------------------------------*/}
                        </Form>
                    </Space>
                }
            </Drawer>
        </>
    )
}

export default AccountDrawer
