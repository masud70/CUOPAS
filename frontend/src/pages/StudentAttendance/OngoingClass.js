import React, {useState, useContext} from 'react';
import { Modal, Button, Input } from 'antd';
import axios from 'axios';
import AuthApi from '../../ContextApi/AuthApi';
import { toast } from 'react-toastify';
const api = axios.create({
    baseURL: "http://localhost:5000/"
});
const OngoingClass = (props) => {
    const data = props.data;
    const Auth = useContext(AuthApi);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [classCode, setClassCode] = useState(0);
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        api.post('/api/class/attendance', {classId: data.class_id, studentId: Auth.userData.id, classCode: classCode}).then(res=>{
            console.log(res.data)
            setVisible(false);
            setConfirmLoading(false);
            if(res.data.status){
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);
            }
        }).then(e=>{
            setVisible(false);
            setConfirmLoading(false);
        })
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <div className="classRow row mb-0">
            <div className="col-1">
                #{data.i}
            </div>
            <div className="col">
                {data.name}
            </div>
            <div className="col">
                {data.course_name}
            </div>
            <div className="col">
                {new Date(data.start).toLocaleDateString() +" "+ new Date(data.start).toLocaleTimeString()}
            </div>
            <div className="col">
                {new Date(data.end).toLocaleDateString() +" "+ new Date(data.end).toLocaleTimeString()}
            </div>
            <div className="col float-right text-right ml-0" style={{display: 'block'}}>
                <Modal
                    title="Database Management System Attendance"
                    visible={visible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Input placeholder="Input Class Key" onChange={(e)=>setClassCode(e.target.value)}/>
                </Modal>
                <Button type="primary" onClick={showModal}>
                    Attendance
                </Button>
            </div>
        </div>
    );
};

export default OngoingClass;