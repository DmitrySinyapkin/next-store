import { Divider, Form, Input, message, Result, Space } from "antd"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useState } from "react"
import { addNewUser, getCategories } from "../../api/fakeStoreApi"
import MainLayout from "../../layouts/MainLayout"
import styles from "../../styles/Signup.module.scss"
import { SignupFormType } from "../../types/common"

const Signup: NextPage = ({ categories }: InferGetServerSidePropsType<GetServerSideProps>) => {
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = (values: SignupFormType) => {
        if (values.password === values.repeatedPassword) {
            const user = {
                username: values.username,
                password: values.password,
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
            addNewUser(user)
                .then(resp => {
                    if (resp.id) {
                        setIsSuccess(true)
                    }
                })
                .catch(err => message.error('Registration failed! Please, try again later.'))
        } else {
            message.error('Passwords don\'t match')
        }
    }

    return (
        <MainLayout categories={categories} title='Sign up' description='Registration page'>
            <h1>Registration</h1>
            <div className={styles.card}>
                {isSuccess
                    ?
                    <div className={styles.success}>
                        <Result status='success' title='Registration completed!' subTitle='Now you can log in' />
                    </div>
                    :
                    <div className={styles.form}>
                        <Form onFinish={handleSubmit} >
                            <Form.Item
                                name='username'
                                label='Username:'
                                rules={[{
                                    required: true,
                                    message: 'Please, enter your name!',
                                    pattern: /^[a-zA-Z]\w+$/,
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Divider />
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
                            <Divider />
                            <Form.Item
                                name='password'
                                label='Password:'
                                rules={[{
                                    required: true,
                                    message: 'Unacceptable symbols',
                                    pattern: /^\S+$/,
                                }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name='repeatedPassword'
                                label='Repeate password:'
                                rules={[{
                                    required: true,
                                    message: 'Unacceptable symbols',
                                    pattern: /^\S+$/,
                                }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <div className={styles.controls}>
                                    <Space>
                                        <button type="submit">Sign up</button>
                                    </Space>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                }
            </div>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const categories = await getCategories()
    return {
        props: {
            categories,
        },
    }
}

export default Signup
