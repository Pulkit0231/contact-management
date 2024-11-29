import React from "react";
import { Row, Col } from "antd";

function DefaultLayout(props) {
  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify='center'>
          <Col lg={22} sm={24} xs={24}>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container-fluid">
                <a class="navbar-brand" href="/">Car Management</a>
                <div class="d-flex" >
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link " href="/admin">Admin</a>
                    </li>
                    <li class="nav-item">
                      <button class="nav-link border-0 " onClick={() => {
                        localStorage.removeItem('user');
                        window.location.href = '/login'
                      }} >Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

          </Col>
        </Row>

      </div>
      <div className="content">{props.children}</div>

    </div>
  );
}

export default DefaultLayout;
