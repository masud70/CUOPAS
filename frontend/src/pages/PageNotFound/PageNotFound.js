import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css'

const PageNotFound = () => {
    const Navigate = useNavigate();
    return (
        <div className='bg-light mt-2 pageNotFound'>  
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={()=>Navigate('/')}>Back Home</Button>}
            />
        </div>
    );
};

export default PageNotFound;