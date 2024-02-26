import React, {useState, useEffect, useContext} from "react";
import "./StudentAttendance.css";
import ClassCard from "./ClassCard";
import OngoingClass from "./OngoingClass";
import AuthApi from '../../ContextApi/AuthApi';
import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000/"
});
const StudentAttendance = () => {
    const Auth = useContext(AuthApi);
    const [courses, setCourses] = useState([]);
    const [ongoing, setOngoing] = useState([]);

    useEffect(()=>{
        let url = '/api/class/courseList/'+Auth.userData.semester_id;
        api.get(url).then(res=>{
            setCourses(res.data.data);
        });
        url = '/api/class/ongoingClass/'+Auth.userData.semester_id;
        api.get(url).then(res=>{
            setOngoing(res.data.data);
        });
    },[])
    const courseList = courses.map(item=>{
        return (<ClassCard data={item} />);
    });
    let i=0;
    const onGoingList = ongoing.map(item=>{
        item.i = ++i;
        return (<OngoingClass data={item}/>);
    })

    return (
        <div className="AttendanceMainDiv mt-2">
            <div className="AttendanceHeading p-2 w-100">
                <h3 className="m-1">My Classes</h3>
            </div>
            <div className="classes row my-1 mx-0 px-2 flex-direction-row flex-wrap">
                {courseList}
            </div>
            <div className="AttendanceHeading p-2 w-100">
                <h3 className="m-1">Ongoing Classes</h3>
            </div>
            <div className="ongoingClasses">
                {onGoingList}
            </div>
        </div>
    );
};

export default StudentAttendance;
