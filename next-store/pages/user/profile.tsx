import { Divider, Form, Input, message, Modal, Result, Space } from "antd"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useEffect, useState } from "react"
import { getCategories, updateUser } from "../../api/fakeStoreApi"
import { LS_AUTH_USER, LS_TOKEN } from "../../constants/localStorage"
import MainLayout from "../../layouts/MainLayout"
import styles from "../../styles/Profile.module.scss"
import { UserType } from "../../types/apiResponses"

const Profile: NextPage = ({ categories }: InferGetServerSidePropsType<GetServerSideProps>) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [visible, setVisible] = useState(false)
    const [isPasswordChanged, setIsPasswordChanged] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatedNewPassword, setRepeatedNewPassword] = useState('')

    const initialValues = {
        firstname: user?.name.firstname || '',
        lastname: user?.name.lastname || '',
        email: user?.email || '',
        phone: user?.phone || '',
        city: user?.address.city || '',
        street: user?.address.street || '',
        number: user?.address.number || '',
        zipcode: user?.address.zipcode || ''
    }

    useEffect(() => {
        setUser(localStorage.getItem(LS_AUTH_USER) ? JSON.parse(localStorage.getItem(LS_AUTH_USER)!) : null)
    }, [])

    const handleSubmit = (values: any) => {
        const updatedUser = {
            username: user!.username,
            password: user!.password,
            name: {
                firstname: values.firstname,
                lastname: values.lastname,
            },
            email: values.email,
            phone: values.phone,
            address: {
                city: values.city,
                street: values.street,
                number: values.number,
                zipcode: values.zipcode,
                geolocation: {
                    lat: '',
                    long: ''
                }
            }
        }
        updateUser(user!.id, updatedUser)
            .then(resp => {
                if (resp.id) {
                    // localStorage.setItem(LS_AUTH_USER, JSON.stringify(resp)) - nothing in real will update in the database, no need to change local storage item
                    message.success('Profile was updated!')
                } else {
                    message.error('Profile update error! Try again later')
                }
            })
            .catch(err => message.error('Profile update error! Try again later'))
    }

    const handleModalOpen = () => {
        setVisible(true)
    }

    const handleModalClose = () => {
        setVisible(false)
    }

    const handlePasswordChange = () => {
        if (oldPassword && newPassword && repeatedNewPassword) {
            if (oldPassword === user?.password) {
                if (newPassword === repeatedNewPassword) {
                    const updatedUser = {
                        username: user.username,
                        password: newPassword,
                        name: {
                            firstname: user.name.firstname,
                            lastname: user.name.lastname,
                        },
                        email: user.email,
                        phone: user.phone,
                        address: {
                            city: user.address.city,
                            street: user.address.street,
                            number: user.address.number,
                            zipcode: user.address.zipcode,
                            geolocation: {
                                lat: '',
                                long: ''
                            }
                        }
                    }
                    updateUser(user.id, updatedUser)
                        .then(resp => {
                            if (resp.id) {
                                setIsPasswordChanged(true)
                                setOldPassword('')
                                setNewPassword('')
                                setRepeatedNewPassword('')
                                // localStorage.setItem(LS_AUTH_USER, JSON.stringify(resp)) - nothing in real will be updated in the database, no need to change local storage item
                                setTimeout(() => {
                                    setVisible(false)
                                    setIsPasswordChanged(false)
                                }, 1000)
                            } else {
                                message.error('Change error! Please, try again!')
                            }
                        })
                        .catch(err => message.error('Change error! Please, try again!'))
                } else {
                    message.error('Passwords don\'t match!')
                }
            } else {
                message.error('Incorrect old password!')
            }
        } else {
            message.warning('Please, fill out all fields!')
        }
    }

    return (
        <MainLayout categories={categories} title='Profile' description='User profile page'>
            <h1>{user ? user.username : 'User'} | Profile</h1>
            <div className={styles.card}>
                {user
                    ?
                    <div className={styles.form}>
                        <div className={styles.controls}>
                            <button onClick={handleModalOpen}>Change password</button>
                        </div>
                        <Divider />
                        <Form initialValues={initialValues} onFinish={handleSubmit}>
                            <h3>Presonal info:</h3>
                            <Form.Item
                                name='firstname'
                                label='First name:'
                                rules={[{
                                    required: true,
                                    message: 'Please, enter your name!',
                                    pattern: /^[a-zA-Z][a-z]+$/,
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='lastname'
                                label='Last name:'
                                rules={[{
                                    message: 'Please, enter your name!',
                                    pattern: /^[a-zA-Z][a-z]+$/,
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Divider />
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
                                    message: 'Please, enter your phone!',
                                    pattern: /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Divider />
                            <h3>Address:</h3>
                            <Form.Item
                                name='city'
                                label='City:'
                                rules={[{
                                    message: 'Please, enter city name!',
                                    pattern: /^[a-zA-Z\s]+$/,
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='street'
                                label='Street:'
                                rules={[{
                                    message: 'Please, enter street name!',
                                    pattern: /^[a-zA-Z\s]+$/,
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='number'
                                label='Number:'
                                rules={[{
                                    message: 'Please, enter house number!',
                                    pattern: /^\d+$/,
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='zipcode'
                                label='ZIP code:'
                                rules={[{
                                    message: 'Please, enter correct ZIP code!',
                                    pattern: /\d{5}([ \-]\d{4})?/,
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <div className={styles.controls}>
                                    <Space>
                                        <button type="submit">Save changes</button>
                                    </Space>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    :
                    !localStorage.getItem(LS_TOKEN) && <div>
                        <Result status='error' title='This page is unavaliable for non-authorized users!' />
                    </div>
                }
            </div>
            <Modal
                title='Change password'
                visible={visible}
                onOk={handlePasswordChange}
                onCancel={handleModalClose}
            >
                {isPasswordChanged
                    ?
                    <Result status='success' title='Password changed!' />
                    :
                    <Form>
                        <Form.Item
                            name='oldPassword'
                            label='Old password:'
                            rules={[{
                                required: true,
                                message: 'Unacceptable symbols',
                                pattern: /^\S+$/,
                            }]}
                        >
                            <Input.Password value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name='newPassword'
                            label='New password:'
                            rules={[{
                                required: true,
                                message: 'Unacceptable symbols',
                                pattern: /^\S+$/,
                            }]}
                        >
                            <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name='repeatedNewPassword'
                            label='Repeate new password:'
                            rules={[{
                                required: true,
                                message: 'Unacceptable symbols',
                                pattern: /^\S+$/,
                            }]}
                        >
                            <Input.Password value={repeatedNewPassword} onChange={(e) => setRepeatedNewPassword(e.target.value)} />
                        </Form.Item>
                    </Form>
                }
            </Modal>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const categories = await getCategories()
    return {
        props: {
            categories,
        },
    }
}

export default Profile
