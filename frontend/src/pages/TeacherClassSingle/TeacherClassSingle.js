import React, {useState, useEffect, useContext, PureComponent} from "react";
import { PageHeader, Button, Descriptions, Table, DatePicker, TimePicker, Form, Space, Menu, Dropdown, Tag, Input, Divider } from 'antd';
import './TeacherClassSingle.css';
import Highlighter from 'react-highlight-words';
import Modal from "antd/lib/modal/Modal";
import moment from 'moment';
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthApi from "../../ContextApi/AuthApi";
import { toast } from "react-toastify";
// import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Example from "./Example";

const api = axios.create({
    baseURL: "http://localhost:5000/"
});
const { RangePicker } = DatePicker;
const columns = [
    {
      title: 'Class Title',
      dataIndex: 'title'
    },
    {
      title: 'Start',
      dataIndex: 'start'
    },
    {
        title: 'End',
        dataIndex: 'end'
    },
    {
        title: 'Class Code',
        dataIndex: 'code'
    },
    {
      title: 'Participants',
      dataIndex: 'participants'
    },
    {
        title: 'Action',
        dataIndex: 'action'
    }
  ];
const pagination = { position: 'bottom' };
const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
class Example1 extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';
    render() {
        return (
            <div>
                <span>OK</span>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

const TeacherClassSingle = () => {
    const [form] = Form.useForm();
    const Auth = useContext(AuthApi);
    const [courseData, setCourseData] = useState([]);
    const [teacher, setTeacher] = useState({})
    const [classes, setClasses] = useState([]);
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = useState(false);
    const [list, setList] = useState([]);
    const [attendanceListData, setAttendanceListData] = useState([]);
    const [state, setState] = useState({
        bordered: false,
        loading: false,
        pagination,
        size: 'default',
        title: undefined,
        hasData: true,
        tableLayout: undefined,
        top: 'none',
        bottom: 'bottomRight',
    });
    const expandedRowRender = () => {
        const columns = [
            { title: 'Student ID', dataIndex: 'sid', key: 'sid' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            {title: 'Status',dataIndex: 'status',key: 'status'},
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                <Space size="middle">
                    <Button type="danger">Remove</Button>
                </Space>
                ),
            },
        ];
    
        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                sid: '1970107'+i,
                name: 'Md. Masud Mazumder',
                status: <Tag color="#87d068">Present</Tag>
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} rowClassName="subTableRow"/>;
    };
    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    let { cid } = useParams();
    const onSubmit = (val) => {
        handleCancel();
        const start = val.date[0]._d;
        const end = val.date[1]._d;
        api.post('/api/class/createClass', {courseId: cid, teacherId: Auth.userData.id, start: start, end: end}).then(res=>{
            if(res.data.status){
                toast.success(res.data.message+" \n Class code : "+res.data.code);
            }else{
                toast.error(res.data.message);
            }
        })
    }

    const onClickView = (id) =>{
        api.get('/api/class/attendanceList/'+id).then(res=>{
            setList(res.data.data);
            setVisible2(true);
        })
    }
    let listData = [];
    const attendanceListColumn = [
        {
          title: 'Student ID',
          dataIndex: 'sid',
        },
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Status',
          dataIndex: 'status',
        },
    ];
    useEffect(()=>{
        list.map(item=>{
            listData.push({sid: item.student_id, name: item.name, status: item.status? <Tag className="px-2 py-1" color="#116530">"Present"</Tag>: <Tag className="px-2 py-1" color="#BF000B">Absent</Tag>})
        })
        setAttendanceListData(listData);
    },[visible2])

    useEffect(()=>{
        setTeacher(Auth.userData);
        api.post('/api/class/course', {cid: cid, tid: Auth.userData.id}).then(res=>{
            setClasses(res.data.data.classes);
            setCourseData(res.data.data.courseData[0]);
        })
    },[])
    const data = [];
    for (let i = 0; i < classes.length; i++) {
        data.push({
            key: i,
            title: courseData.course_name,
            start: new Date(classes[i].start).toLocaleDateString() +" "+ new Date(classes[i].start).toLocaleTimeString(),
            end: new Date(classes[i].end).toLocaleDateString() +" "+ new Date(classes[i].end).toLocaleTimeString(),
            code: <Tag color="#1F4068" style={{padding: '3px 7px', fontSize: '15px'}}>{classes[i].class_code}</Tag>,
            participants: classes[i].present+"/"+courseData.total,
            action: <Space>
                <Button onClick={()=>onClickView(classes[i].class_id)} type="primary">View</Button>
                <Button type="danger">Close</Button>
            </Space>
        });
    }

    return (
        <div className="site-page-header-ghost-wrapper singleClassMain w-100">
            <PageHeader
                className="pageHeader"
                ghost={false}
                onBack={() => window.history.back()}
                title={courseData.course_name}
            >
                <Descriptions size="small" column={1}>
                    <Descriptions.Item label="Course Teacher">{teacher.name}</Descriptions.Item>
                    <Descriptions.Item label="Course Credit">{courseData.course_credit}</Descriptions.Item>
                    <Descriptions.Item label="Semester">{courseData.semester_name}</Descriptions.Item>
                    <Descriptions.Item label="Total Student">{courseData.total}</Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Descriptions size="small" column={2}>
                <Descriptions.Item label="Total Class">{classes.length}</Descriptions.Item>
                <Descriptions.Item label="Create A New Class" className="d-flex align-items-center float-right">
                    <Button type="primary" onClick={showModal}>
                        Create Now
                    </Button>
                    <Modal
                        title="Create A New Class"
                        visible={visible}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <Form
                        style={{textAlign: 'center', paddingBottom: '20px'}}
                            form={form}
                            name="createClass"
                            layout="vertical"
                            onValuesChange={onRequiredTypeChange}
                            onFinish={onSubmit}
                            initialValues={{ remember: true }}
                            >
                            <Form.Item label="Class Time" required name="date">
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    showTime
                                    format="YYYY/MM/DD hh:mm:ss"
                                />
                            </Form.Item>
                            <Form.Item style={{float: 'right'}}>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Descriptions.Item>
            </Descriptions>
            <div className="classHistory">
            <Table
                {...state}
                // expandable={{ expandedRowRender }}
                pagination={{ position: [state.top, state.bottom] }}
                columns={columns}
                dataSource={state.hasData ? data : null}
                rowClassName="mainTableRow"
                scroll={{ x: 700, y: 1000 }}
            />
            </div>
            <div className="statisticsTeacher">
                <Divider orientation="left" plain>
                    <span className="h4 fas">Statistics</span>
                </Divider>
                <Example />
            </div>
            <Modal
                title="Attendance List"
                centered
                visible={visible2}
                onOk={() => setVisible2(false)}
                onCancel={() => setVisible2(false)}
                width={1000}
            >
                <Table columns={attendanceListColumn} dataSource={attendanceListData} size="small" />
            </Modal>
        </div>
    );
};

export default TeacherClassSingle;
