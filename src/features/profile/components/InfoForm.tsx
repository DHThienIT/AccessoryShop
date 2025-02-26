import React from 'react'
import { Input, message, Popconfirm, Select } from 'antd'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'

import Address from '../../../model/address'
import Button from '../../../components/__atom/Button'

import classNames from 'classnames/bind'
import styles from '../Profile.module.scss'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import User from '../../../model/user'
import { useMutation } from '@tanstack/react-query'
import { updateInfo } from '../services'
const cl = classNames.bind(styles)
const { Option } = Select

interface FormValues {
    username: string
    password: string
    confirmPassword: string
}

interface Props {
    user: User
}

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
})

function FormComp({ user }: Props) {
    const updateProfileMutation = useMutation(updateInfo, {
        onSuccess: (data) => {
            console.log(data)
            if (data.status === 200) message.success(data.data.message)
            else message.error('Something went wrong!')
        },
    })
    const handleSubmit = async (values: any) => {
        updateProfileMutation.mutate(values)
    }
    console.log(user)
    return (
        <Formik
            initialValues={{
                id: user.id,
                email: user.email || '',
            }}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
        >
            {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form className={cl('form')}>
                    <div className={cl('heading')}>
                        Welcome to the information
                    </div>
                    <div className={cl('subheading')}>
                        Check or change your informations as you want
                    </div>
                    <div className={cl('basic')}>
                        <div className='form-group'>
                            <label htmlFor='email' className='form-label'>
                                Email:
                            </label>
                            <Field
                                id='email'
                                name='email'
                                component={Input}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                size='large'
                            />
                            <ErrorMessage
                                component='div'
                                className='form-error'
                                name='email'
                            />
                        </div>
                    </div>
                    <Button type='primary'>Save</Button>
                </Form>
            )}
        </Formik>
    )
}

export default FormComp
