import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteContact, getAllContacts } from "../redux/actions/contactsActions";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

function AdminHome() {
    const { contacts } = useSelector((state) => state.contactsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [totalContacts, setTotalContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllContacts());
    }, [dispatch]);

    useEffect(() => {
        setTotalContacts(contacts);
    }, [contacts]);

    const filteredContacts = totalContacts.filter(
        (contact) =>
            contact &&
            ((contact.name && contact.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                ((contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase()))))
    );



    return (
        <DefaultLayout>
            <Row justify="center" gutter={16} className="mt-2">
                <Col lg={20} sm={24}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mt-1 mr-2">Admin Panel</h3>
                        <div className="search-container" style={{ textAlign: 'center', margin: '20px 0' }}>
                            <input
                                type="text"
                                placeholder="Search contacts"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control"
                                style={{ maxWidth: '300px', margin: '0 auto' }}
                            />
                        </div>
                        <button className="btn1">
                            <a href="/addcontact">ADD CONTACT</a>
                        </button>
                    </div>
                </Col>
            </Row>



            {loading && <Spinner />}

            <Row justify="center" gutter={16}>
                {filteredContacts.map((contact) => (
                    <Col lg={6} sm={24} xs={24} key={contact._id}>
                        <div className="contact p-4 bs1">
                            <div className="contact-content d-flex align-items-center justify-content-between">
                                <div className="text-start pl-2">
                                    <p><b>Name</b>: {contact.name}</p>
                                    <p><b>Email</b>: {contact.email}</p>
                                    <p><b>Mobile Number</b>: {contact.number} </p>
                                </div>
                                <div className=" d-flex flex-column mb-3">
                                    <Link to={`/editcontact/${contact._id}`}>
                                        <EditOutlined
                                            className="px-2 "
                                            style={{ color: "green", cursor: "pointer" }}
                                        />
                                    </Link>
                                    <Popconfirm
                                        name="Are you sure to delete this contact?"
                                        onConfirm={() => dispatch(deleteContact(contact._id))}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined
                                            className="px-2 mt-4"
                                            style={{ color: "red", cursor: "pointer" }}
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </DefaultLayout>
    );
}

export default AdminHome;
