import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DateInput from '../Input/DateInput/DateInput';
import SelectInput from '../Input/SelectInput/SelectInput';
import LabelInput from '../LabelInput/LabelInput';
import './AddNewTeacher.css';

const AddNewTeacher = () => {
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
    const [department, setDepartment] = useState(null)
    const [file, setFile] = useState(null)

    const submitHandler = (e) =>{
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('student_id', id);
        formData.append('name', name);
        formData.append('name_bn', nameBn);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('nationality', nation);
        formData.append('religion', religion);
        formData.append('dob', dob);
        formData.append('department_id', department);
        formData.append('father_name', father);
        formData.append('mother_name', mother);
        formData.append('image', file);

        const config={
            headers:{
              'content-type': 'multipart/form-data',
            }
          }
          
          const url = 'http://localhost:5000/addUser';
          axios.post(url, formData, config).then((res)=>{
            if(res.data.status){
                toast.success('Data added successfully.')
            }else{
                toast.error('Something went wrong. Please try again.')
            }
          }).catch(e=>{
            toast.error(e.message)
          })
        }
          
    return (
        <form onSubmit={submitHandler} className="d-flex p-3 justify-content-between row AddNewTeacherDiv">
            <div className="col-12 text-center h3">Add a new Teacher</div>
            <LabelInput name="Teacher ID" id="id" type="number" setData={setId}/>
            <SelectInput name="Dept. Name" id="dept" setOption={setDepartment} url="http://localhost:5000/api/departmentList"/>
            <LabelInput name="Name" id="name" type="text" setData={setName}/>
            <LabelInput name="Name (বাংলা)" id="nameBn" type="text" setData={setNameBn}/>
            <LabelInput name="Father's Name" id="father" type="text" setData={setFather}/>
            <LabelInput name="Mother's Name" id="mother" type="text" setData={setMother}/>
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
                    <input type="text" name="" id="addrP" />
                </div>
            </div>
            <div className="col-12 float-left">
                <div className="label col-2 float-left">
                    <label for="addr">Parmanent Address:</label>
                </div>
                <div className="col-10 float-left">
                    <input type="text" name="" id="addr" />
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
                <input type="submit" value="Submit Now" />
            </div>
        </form>
    );
};

export default AddNewTeacher;