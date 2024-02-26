import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Space, Select } from 'antd';
import './new.css'


const { Option } = Select;

const AddNewStudent1 = () => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const [selectData, setSelectData] = useState([
        {name: "CSE", value: "CSE"},
        {name: "EEE", value: "EEE"},
        {name: "IER", value: "IER"},
        {name: "IML", value: "IML"},
    ])
    const [faculty, setFaculty] = useState([
        {name: "Engineering", value: "Engineering"},
        {name: "Business", value: "Business"},
        {name: "Science", value: "Science"},
    ])
    const [hall, setHall] = useState([
        {name: "Rab Hall", value: "Rab Hall"},
        {name: "Amanat Hall", value: "Amanat Hall"},
    ])

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    const onChange = (date, dateString) => {
        console.log(date, dateString);
      }

    return (
        <div className="mainDivAddStudent p-3">
            <Space className='w-100 bg-dark justify-content-center h3 text-light py-2'>Student Form</Space>
            <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
            initialValues={{
                requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
            >
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Student ID" name="student_id" required tooltip="This is a required field">
                        <Input placeholder="Student ID" />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Name" name="name" required tooltip="This is a required field">
                        <Input placeholder="Name English" />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Name Bangla" name="nameBn" required tooltip="This is a required field">
                        <Input placeholder="Name Bangla" />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Session" name="session" required tooltip="This is a required field">
                        <Input placeholder="Session" />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Father's Name" name="father_name" required tooltip="This is a required field">
                        <Input placeholder="Father's Name"/>
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Mother's Name" name="mother_name" required tooltip="This is a required field">
                        <Input placeholder="Mother's Name" />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Faculty" name="faculty" required tooltip="This is a required field">
                        <Select defaultValue="Select..."  onChange={handleChange}>
                            {
                                faculty.map((val,key)=>{
                                    return <Option value={val.value}>{val.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Department" name="department" required tooltip="This is a required field">
                        <Select defaultValue="Select..."  onChange={handleChange}>
                            {
                                selectData.map((val,key)=>{
                                    return <Option value={val.value}>{val.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Alloted Hall" name="hall">
                        <Select defaultValue="Select..."  onChange={handleChange}>
                            {
                                hall.map((val,key)=>{
                                    return <Option value={val.value}>{val.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Religion" name="religion" tooltip="This is a required field">
                        <Select defaultValue="Select..."  onChange={handleChange}>
                            <Option value="Islam">Islam</Option>
                            <Option value="Hindu">Hindu</Option>
                        </Select>
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Date of Birth" name="dob" required tooltip="This is a required field">
                        <DatePicker className="col-12" onChange={onChange} />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Nationality" name="nationality" required tooltip="This is a required field">
                        <Input placeholder='Nationality' />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Contact Number" name="phone" required tooltip="This is a required field">
                        <Input placeholder='Contact Number' />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-md-6 col-12'>
                    <Form.Item label="Email" name="email">
                        <Input placeholder='Email' />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-12'>
                    <Form.Item label="Present Address" name="present_address" required tooltip="This is a required field">
                        <Input placeholder='Present Address' />
                    </Form.Item>
                </Space>
                <Space direction='vertical' className='col-12'>
                    <Form.Item label="Permanent Address" name="permanent_address" required tooltip="This is a required field">
                        <Input placeholder='Permanent Address' />
                    </Form.Item>
                </Space>
                <Form.Item className='text-center'>
                    <Button type="primary" htmlType="submit" className='formSubmitBtn'>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddNewStudent1;