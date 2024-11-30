import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getAllContacts } from '../redux/actions/contactsActions';
import { Col, Row } from 'antd';
import Spinner from '../components/Spinner';

function Home() {
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
                ((contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase()))) ||
                (contact.number && contact.number.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    return (
        <DefaultLayout>
            {loading && <Spinner />}

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

            <Row justify="center" gutter={16}>
                {filteredContacts.map((contact) => (
                    <Col lg={5} sm={24} xs={24} key={contact._id}>
                        <div className="contact p-4 bs1">
                            <h1>Contact Details</h1>
                            <div className="contact-content d-flex ">
                                <div className="text-start pl-2">
                                    <p><b>Name</b>: {contact.name}</p>
                                    <p><b>Email</b>: {contact.email}</p>
                                    <p><b>Mobile Number</b>: {contact.number} </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </DefaultLayout>
    );
}

export default Home;
