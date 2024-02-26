import React from 'react';
import { Card, Avatar, Tag } from "antd";
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ClassCard = (props) => {
    const link = `/classroom/${props.item.course_id}`;
    return (
        <Link to={link}>
            <Card
                style={{ width: 275, margin: "2px" }}
                cover={
                    <img
                    title={props.item.course_name}
                    alt={props.item.course_name}
                    src={props.item.image}
                    />
                }
                >
                <Meta
                    avatar={<Avatar src={props.teacherImg} title={props.teacher}/>}
                    title={props.item.course_name}
                    description={props.teacher}
                />
                <Card bordered={false} style={{backgroundColor: '#EEF2FF'}}>
                    <div className="row p-0">
                        <div className="col-9">
                            {props.item.semester_name}
                        </div>
                        <div className="col-3">
                            <Tag title='Course Credit' style={{padding: '0px 10px'}} color="#0B4619">{props.item.course_credit}</Tag> 
                        </div>
                    </div>
                </Card>
            </Card>
        </Link>
    );
};

export default ClassCard;