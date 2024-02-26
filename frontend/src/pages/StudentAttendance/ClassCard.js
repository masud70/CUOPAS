import React from 'react';
import { Card, Avatar } from "antd";
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ClassCard = (props) => {
    const data = props.data;
    const url = "/classroom/"+data.course_id;
    return (
        <Link to={url}>
            <Card
                style={{ width: 250, margin: "2px" }}
                cover={
                    <img
                    title={data.course_name}
                    alt={data.course_name}
                    src={data.cover}
                    />
                }
                >
                <Meta
                    avatar={<Avatar src={data.image} title={data.name}/>}
                    title={data.course_name}
                    description={data.name? data.name: "Teacher not assigned"}
                />
            </Card>
        </Link>
    );
};

export default ClassCard;