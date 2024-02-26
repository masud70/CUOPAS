import { TeamOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuperAdmin.css'

const Department = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/dbaManager/department');
    }
    return (
        <div onClick={onClick} className="btn card col-6 col-md-5 col-lg-3 m-0 px-2 py-0 bg-dark">
            <div className="card-header p-0 mx-0 mt-2 dept_head">
                <span className='deptName px-1 mb-0 pb-0'>Conputer Science & Engineering</span>
            </div>
            <div className="card-body px-0 py-0">
                <div className="row m-0 px-0 py-1">
                    <div className="col-6 px-0 py-2 m-0 bg-light text-center">
                        <div className="col-12"><TeamOutlined style={{fontSize: '30px'}}/></div>
                        <div className="col-12">Teacher(s)</div>
                        <div className="col-12">20</div>
                    </div>
                    <div className="col-6 px-0 py-2 m-0 bg-light text-center">
                        <div className="col-12"><TeamOutlined style={{fontSize: '30px'}}/></div>
                        <div className="col-12">Students(s)</div>
                        <div className="col-12">400</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Department;