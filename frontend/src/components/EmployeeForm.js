import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import moment from "moment";
import "./EmployeeForm.css";

function EmployeeForm({ onFinish, initialValues }) {
  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={{
      ...initialValues
    }}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Please enter the full name" }]}
          >
            <Input className="" placeholder="Enter full name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input type="email" placeholder="Enter email" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="updateProfile">
          UPDATE
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EmployeeForm;
