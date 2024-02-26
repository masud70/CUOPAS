import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import './AddNewPayment.css';
import { Collapse, Divider, Select, List, Button, Form, Input, Space, Modal, DatePicker } from 'antd';
import { BankOutlined, CloseCircleOutlined, ExclamationCircleOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import AuthApi from '../../ContextApi/AuthApi';

const { Panel } = Collapse;
const { Option } = Select;

function callback(key) {
  console.log(key);
}
const api = axios.create({
    baseURL: "http://localhost:5000/",
});
const iconNull = () =>{return (<></>);}

const AddNewPayment = () => {
    const Auth = useContext(AuthApi)
    const [form] = Form.useForm();
    const [field, setField] = useState([
        {name: 'Tuiotion Fee', value: 3000},
        {name: 'Admision Fee', value: 2500},
    ])
    const [newField, setNewField] = useState({});
    const [idList, setIdList] = useState([
        {id: 19701070, name: "Md. Masud Mazumder", dept: "CSE"},
        {id: 19701071, name: "Md. Masud Mazumder", dept: "CSE"},
        {id: 19701072, name: "Md. Masud Mazumder", dept: "CSE"},
        {id: 19701073, name: "Md. Masud Mazumder", dept: "CSE"},
        {id: 19701074, name: "Md. Masud Mazumder", dept: "CSE"},
        {id: 19701075, name: "Md. Masud Mazumder", dept: "CSE"},
        {id: 19701076, name: "Md. Masud Mazumder", dept: "CSE"},
        {id: 19701077, name: "Md. Masud Mazumder", dept: "CSE"},
        {id: 19701068, name: "Tareq Rahman Likhon Khan", dept: "CSE"},
        {id: 19701066, name: "Tonmoy Chandro Das", dept: "CSE"}
    ]);
    const [total, setTotal] = useState(0);
    const [semesterList, setSemesterList] = useState([]);
    const [semester, setSemester] = useState();
    const [selectedId, setSelectedId] = useState([]);
    const [idField, setIdField] = useState();
    const [title, setTitle] = useState();
    const [dueDate, setDueDate] = useState(null);
    const genExtra = () => (
        <CloseCircleOutlined
            style={{fontSize: '20px', color: '#485460'}}
            onClick={event => {
                const id = event.nativeEvent.path[4].innerText;
                setIdList(pre=>pre.filter(item=>item.student_id!==id))
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );

    const submitFunction = (values) => {
        if(idList.length===0){
            toast.warn("Students cannot be empty");
        }else if(!title){
            toast.warn("Title cannot be empty");
        }else if(field.length===0){
            toast.warn("Payment fields cannot be empty");
        }else if(!dueDate){
            toast.warn("Due date cannot be empty");
        }else{
            const now = new Date();
            const ids = idList.map(obj=>obj.student_id);
            api.post('/api/user/createPayment',{purpose_title: title, department_id: 101, created_by: Auth.userData.user_id, created_at: now, idList: ids, due_date: dueDate, fields: field}).then(res=>{
                if(res.data.status){
                    toast.success(res.data.message);
                    setIdList([]);
                }else{
                    toast.error(res.data.message);
                }
            })
        }
    };
    const addNewField = () => {
        if(newField.name && newField.value){
            newField.value = parseInt(newField.value);
            setField(pre=>([...pre,newField]));
            setNewField({});
        }
        else{
            toast.warning("Field name and amount cannot be empty.")
        }
    };
    const semesterHandler = val =>{
        setSemester(val[val.length-1]);
    };
    const titleHandler = val =>{
        setTitle(val[val.length-1]);
    };
    useEffect(() => {
        const Total = field.reduce((a, b) => parseInt(b.value)+a, 0)
        setTotal(Total)
    }, [field]);
    useEffect(()=>{
        const url = "/api/admin/semesterList/"+Auth.userData.user_id;
        api.get(url).then(res=>{
            setSemesterList(res.data.data)
        })
    },[Auth.userData.user_id]);
    useEffect(()=>{
        if(semester){
            const url = '/api/admin/semesterWiseIdList/'+semester;
            api.get(url).then(res=>{
                setIdList(res.data.data);
            })
        }else{
            setIdList([]);
        }
    },[semester]);
    useEffect(()=>{
        if(selectedId.length){
            const url = '/api/admin/infoWithIds';
            api.post(url, {idList: selectedId}).then(res=>{
                if(res.data.data.length>0){
                    const newArray = idList.concat(res.data.data);
                    setIdList(newArray.filter((v,i,a)=>a.findIndex(t=>(t.student_id===v.student_id))===i));
                    setIdField(null);
                }else{
                    toast.warn("Data not found.")
                }
                
            })
        }
    },[selectedId]);

    const ids = idList.map(item=>{
        return (
            <Panel header={item.student_id} key={item.student_id} extra={genExtra()}>
                <div className='row'>
                    <div className="col-12"><UserOutlined /> {item.name}</div>
                    <div className="col-12"><ProfileOutlined /> {item.semester_name}</div>
                    <div className="col-12"><BankOutlined /> {item.department_name}</div>
                </div>
            </Panel>
        );
    });
    const children = [];
    semesterList.map(item=>{
        return children.push(<Option key={item.semester_id}>{item.semester_name}</Option>);
    });
    const confirm = () => {
        Modal.confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure to submit this creation?',
          okText: 'Confirm',
          cancelText: 'Cancel',
          onOk: ()=>{submitFunction()}
        });
    };

    // const allPaymentFieldNames  = ["Admit Fee", "Readmit Fee","Salary","Late fine","Libary Fee","Laboratory Fee",
    //     "Registration Fee","Hall community Fee","Hall sports Fee","Versity Union Fee","Versity Sports Fee","Hall Admit Fee",
    //     "Seat Rent","Exam Fee","Student Helping Fund","Student Welfare Fund","Student Welfare Fee","Identy  Card  Fee",
    //     "Rover Scout Fee","Transport Fee","Non Collegiate Fee","Study Development Fee","Number Card Exam Fee","B.N.C.C Fee",
    //     "Treatment Fee","Library Card Fee","Session Fee","Retention Fee","Extra Curricular Fee"];

    return (
        <div className="AddNewPaymentDiv">
            <div className="row d-flex p-3 justify-content-between" id="SelectionSection"> 
                <div className="col-12 text-center mb-4">
                    <small className="text-danger">Please Select first</small>
                </div>
                <Input.Group compact style={{ width: '50%' }}>
                    <Space style={{ width: '25%', border: '0px solid #fff' }} className='p-1 bg-dark text-light'>Semester</Space>
                    <Select
                        mode="tags"
                        placeholder="Select Semester..."
                        style={{ width: '75%' }}
                        onChange={semesterHandler}
                        value={semester}
                    >{children}</Select>
                </Input.Group>
                <Input.Group compact style={{ width: '50%' }}>
                    <Space style={{ width: '30%', border: '0px solid #fff' }} className='p-1 bg-dark text-light'>Student ID</Space>
                    <Select
                        mode="tags"
                        placeholder="Filter With Student ID"
                        style={{ width: '70%' }}
                        maxTagCount={1}
                        value={idField}
                        onChange={(val)=>setSelectedId(val)}
                    ></Select>
                </Input.Group>
                <Divider className='p-0 m-1'/>
                <Input.Group compact style={{ width: '50%' }}>
                    {/* <Space style={{ width: '30%', border: '0px solid #fff' }} className='p-1 bg-dark text-light'>Payment Title </Space> */}
                    <Select
                        mode="tags"
                        value={title}
                        onChange={titleHandler}
                        placeholder="Please a payment title if it is not existed"
                        style={{ width: '100%' }}
                    ></Select>
                </Input.Group>
                <Input.Group compact style={{ width: '50%' }}>
                    <Space style={{ width: '30%', border: '0px solid #fff' }} className='p-1 bg-dark text-light'>Due Date </Space>
                    <DatePicker style={{ width: '70%', padding: '0px', margin: '0px' }} className="p-0 m-0" onChange={(d,ds)=>{setDueDate(ds)}}/>
                </Input.Group>
                <hr className="col-8 bg-dark mx-auto" />
            </div>
            <div className="row p-3">
                <div className="col-12 p-0 col-md-4" id="idList"> 
                    <Collapse
                        onChange={callback}
                        expandIconPosition='left'
                        >
                        {ids}
                    </Collapse>
                </div>

                <div className="bg-right col-12 col-md-8 text-center pb-3 pt-0">
                    <Form action="" form={form} layout="vertical">
                        <Divider orientation="left">Payment Field</Divider>
                            <List
                                size="small"
                                bordered
                                dataSource={field}
                                renderItem={item => 
                                    <List.Item className='py-2 px-3 tinyBottomBorder'
                                        actions={[<span key="list-loadmore-edit" className='text-dark'>{item.value}</span>,<CloseCircleOutlined onClick={()=>setField(list=>list.filter(listItem=> listItem!=item))} style={{fontSize: '20px', color: 'red'}}/>]}
                                    >
                                        {item.name}
                                    </List.Item>
                                }
                            />
                            <Collapse expandIcon={iconNull}>
                                <Panel header="Add a new field" key="1" className='m-0 p-0'>
                                    <Input.Group compact className='p-0 m-0'>
                                        <Input value={newField.name} className='m-0' style={{ width: '50%' }} placeholder="Field Name" onChange={e=>setNewField(p=>({...p,["name"]: e.target.value}))}/>
                                        <Input value={newField.value} className='m-0' style={{ width: '25%' }} placeholder="Amount" onChange={e=>setNewField(p=>({...p,["value"]: e.target.value}))}/>
                                        <Button style={{ width: '25%' }} type="primary" onClick={addNewField}>Add</Button>
                                    </Input.Group>
                                </Panel>
                            </Collapse>
                        <hr className="bg-dark" />
                        <div className="col-12 py-0 row mx-auto text-center">
                            <div className="col-5 h3 text-left float-left">
                                Total:
                            </div>
                            <div className="col-7 h3 font-weight-bold float-left text-right">
                                {total}
                            </div>
                        </div>
                        <Button onClick={confirm} htmlType="submit" type='primary' className='px-5 m-3'>Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddNewPayment;