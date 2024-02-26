import { Collapse, Space, Divider, Input, Button } from 'antd';
import React from 'react';
import './AssignCourse.css';

const AssignCourse = () => {
    const { Panel } = Collapse;
    return (
        <div className='assignCourseDiv col-12'>
            <form className='col-12 py-3 d-flex flex-wrap justify-content-around' action="">
                <div className="col-12 col-md-5 px-3 text-center">  
                    <Divider orientation='center border-light text-light' plain className='mb-0'>Course Code</Divider>
                    <Input className='text-center' placeholder={"Search by course code"} />
                </div>
                <div className="col-12">
                    <hr className='bg-light' />
                </div>
            </form>
            <Space direction="vertical" className='col-12'>
                <Collapse  collapsible="header" defaultActiveKey={['1']}>
                    <Panel header="414 - Database management System" key="1">
                        <h6 className='course-title'>Database Management System</h6>
                        <div className='mb-2'>
                            <small><i class="fas fa-circle"></i> 414</small>
                            <small><i class="fas fa-circle"></i> 4th Semester</small>
                            <small><i class="fas fa-circle"></i> Department of Computer Science and Engineering</small>
                            <small><i class="fas fa-circle"></i> Faculty of Engineering</small>
                            <small><i class="fas fa-circle"></i> Assigned Teachers:</small>
                            <ul>
                                <li>Dr. Rudra Pratap Deb Nath</li>
                                <li>Dr. Rudra Pratap Deb Nath</li>
                            </ul>
                        </div>
                        <Input.Group className='col-6'>
                            <Input className='col-6' placeholder='Insert Teacher ID to assign'/>
                            <Button className='assignTeacherCourse'>Assign</Button>
                        </Input.Group>
                        
                    </Panel>
                </Collapse> 
                <Collapse  collapsible="header" defaultActiveKey={['1']}>
                    <Panel header="This panel can only be collapsed by clicking text" key="1">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, modi.</p>
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export default AssignCourse;