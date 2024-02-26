import React from 'react';

const ProfileDivInfoname = (props) => {
    const {name} = props;
    return (
        <div className="col-12">
            <h5 className='text-light'>
                <span className='text-danger font-weight-bold'><i class="fas fa-grip-lines-vertical"></i></span> 
                &nbsp; {name}
            </h5>
        </div>
    );
};

export default ProfileDivInfoname;