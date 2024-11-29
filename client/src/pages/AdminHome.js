import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

function AdminHome() {
    const { cars } = useSelector((state) => state.carsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [totalCars, setTotalCars] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    useEffect(() => {
        setTotalCars(cars);
    }, [cars]);

    const filteredCars = totalCars.filter(
        (car) =>
            car &&
            ((car.title && car.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                ((car.tags && car.tags.toLowerCase().includes(searchQuery.toLowerCase()))) ||
                (car.description && car.description.toLowerCase().includes(searchQuery.toLowerCase())))
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
                                placeholder="Search cars"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control"
                                style={{ maxWidth: '300px', margin: '0 auto' }}
                            />
                        </div>
                        <button className="btn1">
                            <a href="/addcar">ADD CAR</a>
                        </button>
                    </div>
                </Col>
            </Row>



            {loading && <Spinner />}

            <Row justify="center" gutter={16}>
                {filteredCars.map((car) => (
                    <Col lg={6} sm={24} xs={24} key={car._id}>
                        <div className="car p-4 bs1">
                            <img src={car.image} className="carimg" alt={car.name} />
                            <div className="car-content d-flex align-items-center justify-content-between">
                                <div className="text-left pl-2">
                                    <p><b>Tag</b>: {car.tags}</p>
                                    <p><b>Title</b>: {car.title}</p>
                                    <p><b>Description</b>: {car.description} /-</p>
                                </div>
                                <div className="mr-4">
                                    <Link to={`/editcar/${car._id}`}>
                                        <EditOutlined
                                            className="mr-3"
                                            style={{ color: "green", cursor: "pointer" }}
                                        />
                                    </Link>
                                    <Popconfirm
                                        title="Are you sure to delete this car?"
                                        onConfirm={() => dispatch(deleteCar({ carid: car._id }))}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined
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
