import { TeamOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import Department from './Department';
import './SuperAdmin.css';

const SuperAdmin = () => {
    return (
        <div className='dbaMain'>
            <Divider orientation='left'><span className='h4 fas'>Department Wise Statistics</span></Divider>
            <div className="site-card-wrapper row m-0 d-flex justify-content-center">
                <Department/>
                <Department/>
                <Department/>
                <Department/>
                <Department/>
                <Department/>
                <Department/>
                <Department/>
                <Department/>
                <Department/>
                <Department/>
                <Department/>
            </div>
        </div>
    );
};

export default SuperAdmin;