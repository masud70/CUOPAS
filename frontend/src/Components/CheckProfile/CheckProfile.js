import { Button, Input, Space } from 'antd';
import React, { useState } from 'react';
import Profile from '../Profile/Profile';
import './CheckProfile.css';

const CheckProfile = () => {
    const [showProfileInfo, setShowProfieInfo] = useState(true);
    return (
        <div className='CheckProfileDiv text-center'>
            <div>
                <div className="col-12 mb-3 text-center">
                    <small className='text-danger'>Please Input a Student/Teacher ID below to update profile</small>
                </div>
                <div className="col-12 row d-flex justify-content-center">
                    <div className="col-4 float-left">
                        <Input placeholder="Input Student ID" />
                    </div>
                    <div className="col-4 float-left">
                        <Space>
                            <Button type="primary" className='updateButton'>
                                Update
                            </Button>
                        </Space>
                    </div>
                </div>
            </div>  
            <br />
            <hr className='bg-light' />
            {showProfileInfo && <Profile isDisabled= {false}/>}
        </div>
    );
};

export default CheckProfile;