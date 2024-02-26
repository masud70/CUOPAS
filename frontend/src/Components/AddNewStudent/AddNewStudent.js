import React, { useState, useEffect } from 'react';
import DateInput from '../Input/DateInput/DateInput';
import SelectInput from '../Input/SelectInput/SelectInput';
import LabelInput from '../LabelInput/LabelInput';
import { useNavigate } from 'react-router';
import Cookies from "js-cookie";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddNewStudent.css';

const AddNewStudent = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [nameBn, setNameBn] = useState(null)
    const [email, setEmail] = useState(null)
    const [father, setFather] = useState(null)
    const [phone, setPhone] = useState(null)
    const [mother, setMother] = useState(null)
    const [nation, setNation] = useState(null)
    const [dob, setDob] = useState(new Date())
    const [religion, setReligion] = useState(null)
    const [hall, setHall] = useState(null)
    const [session, setSession] = useState(null)
    const [faculty, setFaculty] = useState(null)
    const [department, setDepartment] = useState(null)
    const [file, setFile] = useState(null)
    const [pAddress, setPAddress] = useState(null)
    const [cAddress, setCAddress] = useState(null)
    const [deptUrl, setDeptUrl] = useState('http://localhost:5000/api/departmentList')
    // var link='null';

    // useEffect(()=>{
    //     if(faculty >= 1) {
    //         const idx = faculty;
    //         link = 'http://localhost:5000/api/departmentList/2';
    //         alert(deptUrl)
    //         setDeptUrl(link)
    //     }
    // }, [faculty])

    const submitHandler = (e) =>{
        e.preventDefault();
        
        // var formData = new FormData();
        // formData.append('student_id', id);
        // formData.append('name', name);
        // formData.append('name_bn', nameBn);
        // formData.append('session', session);
        // formData.append('email', email);
        // formData.append('faculty', faculty);
        // formData.append('phone', phone);
        // formData.append('nationality', nation);
        // formData.append('religion', religion);
        // formData.append('dob', dob);
        // formData.append('department_id', department);
        // formData.append('hall_name', hall);
        // formData.append('father_name', father);
        // formData.append('mother_name', mother);
        // formData.append('image', file);

        const token = Cookies.get('userToken');
        const url = 'http://localhost:5000/addUser';

        axios({
            method: 'post',
            url: url,
            data: { token: token, data:{ student_id: id, name: name, name_bn: nameBn, session: session, email: email, phone: phone, nationality: nation, religion: religion, department_id: department, hall_name: hall, father_name: father, mother_name: mother, permanent_address: pAddress, current_address: cAddress }},
            headers: {
               "Content-Type": "application/json"
            }
          }).then((res)=>{
            if(res.data.status){
                toast.success('Data added successfully.');
                window.location.reload();
            }else{
                toast.error(res.data.message)
            }
        }).catch(e=>{
            toast.error(e.message)
        })

    } 
    return (
        <form onSubmit={submitHandler} className="d-flex p-3 justify-content-between row addNewStudent">
            <div className="col-12 text-center h3">Add a new student</div>
            <LabelInput name="Student ID" id="id" type="number" setData={setId}/>
            <LabelInput name="Name" id="name" type="text" setData={setName}/>
            <LabelInput name="Name (বাংলা)" id="nameBn" type="text" setData={setNameBn}/>
            <LabelInput name="Session" id="session" type="text" setData={setSession}/>
            <LabelInput name="Father's Name" id="father" type="text" setData={setFather}/>
            <LabelInput name="Mother's Name" id="mother" type="text" setData={setMother}/>
            <SelectInput name="Faculty Name" id="faculty" setOption={setFaculty} url="http://localhost:5000/api/facultyList"/>
            <SelectInput name="Dept. Name" id="dept" setOption={setDepartment} url={deptUrl}/>
            <SelectInput name="Alloted Hall" id="hall" setOption={setHall} url="hall"/>
            <DateInput name="Date of Birth" id="dob" setDate={setDob}/>
            <SelectInput name="Religion" id="religion" setOption={setReligion} url="religion"/>
            <LabelInput name="Nationality" id="nation" type="text" setData={setNation}/>
            <LabelInput name="Contact Number" id="phone" type="text" setData={setPhone}/>
            <LabelInput name="Email" id="fname" type="email" setData={setEmail}/>
            <hr className="bg-dark w-75" />
            <div className="col-12 float-left">
                <div className="label col-2 float-left">
                    <label for="addrP">Present Address:</label>
                </div>
                <div className="col-10 float-left">
                    <input onChange={(e)=>setCAddress(e.target.value)} type="text" name="" id="addrP" />
                </div>
            </div>
            <div className="col-12 float-left">
                <div className="label col-2 float-left">
                    <label for="addr">Parmanent Address:</label>
                </div>
                <div className="col-10 float-left">
                    <input onChange={(e)=>setPAddress(e.target.value)} type="text" name="" id="addr" />
                </div>
            </div>
            <hr className="bg-dark w-75" />
            <div className="col-12 text-center">
                <input name='image' type="file" className="input-img-hidden" id="img-up" alt="" onChange={(e)=>{setFile(e.target.files[0])}}/>
                <label className="col-12 img-prev mx-auto" for="img-up">
                </label>
            </div>
            <small className="text-danger mx-auto mt-0 pt-0">Click on Image to upload</small>
            <div className="col-12 text-center">
                <input type="submit" className='formSubmitBtn' value="Submit Now" />
            </div>
        </form>
    );
};

export default AddNewStudent;