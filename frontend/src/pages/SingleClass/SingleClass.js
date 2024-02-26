import React, {useState, useEffect, useContext} from "react";
import { PageHeader, Button, Descriptions, Table, Switch, Radio, Form, Space, Tag, Divider } from 'antd';
import './SingleClass.css'
import { useParams } from "react-router-dom";
import AuthApi from "../../ContextApi/AuthApi";
import axios from "axios";
import Example from "../TeacherClassSingle/Example";
const api = axios.create({
    baseURL: "http://localhost:5000/"
});
const columns = [
    {
      title: 'Student ID',
      dataIndex: 'sid',
    },
    {
      title: 'Class Title',
      dataIndex: 'title'
    },
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    }
  ];
const pagination = { position: 'bottom' };

const SingleClass = () => {
    const Auth = useContext(AuthApi);
    const {cid} = useParams();
    const [courseData, setCourseData] = useState({});
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [state, setState] = useState({
        bordered: false,
        loading: false,
        pagination,
        size: 'default',
        expandable: false,
        title: undefined,
        // rowSelection: {},
        // scroll: undefined,
        hasData: true,
        tableLayout: undefined,
        top: 'none',
        bottom: 'bottomRight',
    })
    useEffect(()=>{
        api.post('/api/class/StudentSingleCourseData', {cid: cid, sid: Auth.userData.id}).then(res=>{
            setCourseData(res.data.result.courseData[0]); 
            const cData = res.data.result.courseData[0];
            const list = [];
            let i = 1;
            res.data.result.attendanceData.map(item=>{
                list.push({
                    key: i++,
                    sid: Auth.userData.id,
                    title: cData.course_name,
                    date: new Date(item.start).toLocaleDateString(),
                    status: item.status?<Tag color="#009432">Present</Tag>:<Tag color="#ff1f34">Absent</Tag>,
                })
                if(item.status) setTotal(i=>i+1);
            })
            setData(list);
        })
    },[])


    return (
        <div className="site-page-header-ghost-wrapper singleClassMain w-100">
            <PageHeader
                className="pageHeader"
                ghost={false}
                onBack={() => window.history.back()}
                title={courseData.course_name}
            >
                <Descriptions size="small" column={1}>
                    <Descriptions.Item label="Course Teacher">{courseData.name?courseData.name:"Not assigned yet"}</Descriptions.Item>
                    <Descriptions.Item label="Course Credit">
                        {courseData.course_credit}
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Descriptions size="small" column={2}>
                <Descriptions.Item label="Total Class">{data.length}</Descriptions.Item>
                <Descriptions.Item label="Your Attendance">{total}</Descriptions.Item>
                <Descriptions.Item label="Your Percentage">{data.length?Math.floor(total/data.length*100):0}%</Descriptions.Item>
            </Descriptions>
            <div className="classHistory">
            <Table
            {...state}
            pagination={{ position: [state.top, state.bottom] }}
            columns={columns}
            dataSource={state.hasData ? data : null}
            />
            </div>
            <div className="statistics">
                <Divider orientation="left" plain>
                    <span className="h4 fas">Statistics</span>
                </Divider>
                <Example/>
            </div>
        </div>
    );
};

export default SingleClass;
