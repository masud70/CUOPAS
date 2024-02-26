import React, {useEffect, useState, useContext} from 'react';
import './TeacherClasses.css';
import TeacherClassCard from './TeacherClassCard';
import axios from 'axios';
import AuthApi from '../../ContextApi/AuthApi';
const api = axios.create({
    baseURL: "http://localhost:5000/"
});
const TeacherClasses = () => {
    const [course, setCourse] = useState([]);
    const Auth = useContext(AuthApi);
    useEffect(()=>{
        const tid = Auth.userData.id;
        api.get('/api/class/courses/'+tid).then(res=>{
            setCourse(res.data.data);
        })
    },[])

    const classes = course.map((item)=>{
        return (<TeacherClassCard item={item} teacher={Auth.userData.name} teacherImg={Auth.userData.image}/>) 
    });

    return (
        <div className='teacherClassMain mt-1 w-100'>
            <div className="heading">
                <h4>My Classes</h4>
            </div>
            <div className="classes row my-1 mx-0 px-1">
                {classes}
            </div>
        </div>
    );
};

export default TeacherClasses;