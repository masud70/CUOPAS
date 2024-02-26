import { UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Upload } from 'antd';
import React from 'react';
import './AddCourse.css';

const AddCourse = () => {
    const deptOptions = [
        {
            value: 'Computer Science and Engineering',
            label: 'Computer Science and Engineering'
        },
        {
            value: 'Electronics and Electrical Engineering',
            label: 'Electronics and Electrical Engineering'
        },
        {
            value: 'Pharmacy',
            label: 'Pharmacy'
        },
        {
            value: 'Genetic Engineering',
            label: 'Genetic Engineering'
        },
        {
            value: 'Language and Linguestics',
            label: 'Language and Linguestics'
        },
        {
            value: 'Political Science',
            label: 'Political Science'
        }
      ];
    const semesterOptions = [
        {
            value: '1st Semester',
            label: '1st Semester'
        },
        {
            value: '2nd Semester',
            label: '2nd Semester'
        },
        {
            value: '3rd Semester',
            label: '1st Semester'
        },
        {
            value: '4th Semester',
            label: '1st Semester'
        },
        {
            value: '5th Semester',
            label: '1st Semester'
        },{
            value: '6th Semester',
            label: '1st Semester'
        },
        {
            value: '7th Semester',
            label: '1st Semester'
        },
        {
            value: '8th Semester',
            label: '1st Semester'
        },
      ];


    return (
        <form className='addCourseDiv col-12 d-flex flex-wrap justify-content-around'>
            <div className="col-12 text-center">
                <small className='text-danger'>**Please fill up all the fields with correct information**</small>
            </div>
            <div className="col-12 col-md-5 px-3 text-center">  
                <Divider orientation='left border-light text-light' plain className='mb-0'>Course Title</Divider>
                <Input placeholder={"Insert Course Title"} />
            </div>
            <div className="col-12 col-md-5  px-3 text-center">  
                <Divider orientation='left border-light text-light' plain className='mb-0'>Course Code</Divider>
                <Input placeholder={"Insert Course Code"} />
            </div>
            <div className="col-12 col-md-5 px-3 text-center">  
                <Divider orientation='left border-light text-light' plain className='mb-0'>Course Credit</Divider>
                <Input placeholder={"Insert Course Credit"} />
            </div>
            <div className="col-12 col-md-5 px-3 text-center">  
                <Divider orientation='left border-light text-light' plain className='mb-0'>Department Name</Divider>
                <Select className='col-12 text-left' placeholder='Select Department' options={deptOptions} />
            </div>
            <div className="col-12 col-md-5 px-3 text-center">  
                <Divider orientation='left border-light text-light' plain className='mb-0'>Semester/Year</Divider>
                <Select className='col-12 text-left' placeholder='Select Semester/Year' options={semesterOptions} />
            </div>
            <div className="col-12 col-md-5 px-3 text-left">  
                <Divider orientation='left border-light text-light' plain className='mb-0'>Image for the Course</Divider>
                <Upload action="" listType="picture" maxCount={1}  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
            </div>
            <div className='col-5 text-center mt-3'>
                <Button className='addCourseButton'>Submit</Button>
            </div>
        </form>
    );
};

export default AddCourse;