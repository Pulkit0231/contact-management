import { Col, Row, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { addContact } from '../redux/actions/contactsActions'
function AddContact() {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)

    function onFinish(values) {

        values.bookedTimeSlots = []

        dispatch(addContact(values))
        console.log(values)
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                        <h3>Add New Contact</h3>
                        <hr />
                        <Form.Item
                            name='name'
                            label='Name'
                            rules={[
                                {
                                    required: true, message: 'Please enter a name!'

                                }]}>
                            <Input placeholder="Enter contact name" />
                        </Form.Item>
                        <Form.Item
                            name='email'
                            label='Email'
                            rules={[
                                { required: true, message: 'Please enter an email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}>
                            <Input placeholder="Enter email address" />
                        </Form.Item>
                        <Form.Item
                            name='number'
                            label='Mobile Number'
                            rules={[
                                { required: true, message: 'Please enter a number!' },
                                { pattern: /^[0-9]+$/, message: 'Only numeric values allowed!' },
                            ]}>
                            <Input placeholder="Enter mobile number" />
                        </Form.Item>

                        <div className='text-right'>
                            <button className='btn1'>ADD CONTACT</button>
                        </div>

                    </Form>
                </Col>
            </Row>

        </DefaultLayout>
    )
}

export default AddContact
