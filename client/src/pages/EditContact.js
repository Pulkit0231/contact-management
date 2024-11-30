import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editContact, getAllContacts } from "../redux/actions/contactsActions";
import {
    useLoaderData,
} from "react-router-dom";

function EditContact() {
    const match = useLoaderData();
    const { contacts } = useSelector((state) => state.contactsReducer);

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alertsReducer);
    const [contact, setcontact] = useState();
    const [totalcontacts, settotalcontacts] = useState([]);
    useEffect(() => {
        if (contacts.length === 0) {
            console.log(contacts)
            dispatch(getAllContacts());
        } else {
            settotalcontacts(contacts);
            setcontact(contacts.find((o) => o._id === match));
            console.log(contact);
        }
    }, []);

    function onFinish(values) {
        values._id = contact._id;

        dispatch(editContact(values));
        console.log(values);
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify="center mt-5">
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    {totalcontacts.length > 0 && (
                        <Form
                            initialValues={contact}
                            className="bs1 p-2"
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <h3>Edit Contact</h3>

                            <hr />
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="number"
                                label="Mobile number"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <div className="text-right">
                                <button className="btn1">Edit Contact</button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default EditContact;
