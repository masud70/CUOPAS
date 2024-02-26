import React from 'react';
import './Profile.css';
import 'antd/dist/antd.css';
import { Image, Input, Space, Button, DatePicker, Divider } from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone,PoweroffOutlined  } from '@ant-design/icons';
import ProfileDivInfoname from './ProfileDivInfoname';
import moment from 'moment';

const Profile = (props) => {
    const {isDisabled} = props;
    const dateFormat = 'DD-MM-YYYY';
    const info = {
        name:'Hamja Mohtadee Nafi',
        nameBangla: 'হামযা মুহতাদী ইবনে মামুন',
        fatherName: 'A.K.M. Mamunur Rashid',
        fatherNameBangla: 'এ.কে.এম. মামুনূর রশীদ',
        motherName: 'Shirin Akhter',
        religion: 'Islam',
        nationality: 'Bangladeshi',
        dob:'15-07-2001',
        contact: '+880162618246',
        email: 'tonmoy.csecu@gmail.com',
        presentAdd: '2 No. Gate, CU',
        permanentAdd: '1 No. Gate, CU',
        hallName: 'Shahid Abdur Rab Hall',
        hallRoomNo: '404'
    }
    return (
        <div className='mainProfileDiv row d-flex justify-content-center'>
            <section className="col-12 row section-1">
                <section className="col-12 col-md-5 col-lg-3 section-1-1 d-flex justify-content-center align-items-center">
                    <Image width={200} className='profileImg'
                    src="https://scontent.fspd5-1.fna.fbcdn.net/v/t1.6435-9/127815800_2787654611488565_2612494760625448124_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeGvcAGQR7VwZxzkrMpvQyjt2JdHWpMnTIfYl0dakydMh_IE8O1a8mSPj3SkiB96NxBAc0vGFDq7ECyOfgN0_A_V&_nc_ohc=8NQiXWjgTMgAX_sADMj&tn=aj-JXwDGWWZnhErw&_nc_ht=scontent.fspd5-1.fna&oh=00_AT8ZmkiW34PIKVGlX-vFMmrc_H5ZhuhswMJhaf-ILhGSZA&oe=61E564C1"
                    />
                </section>
                <section className="col-12 col-md-7 text-left col-lg-9 section-1-2">
                    <Space direction='vertical'>
                        <Space>
                             Tonmoy Chandro Das
                        </Space>
                        <Space>
                            19701070
                        </Space>
                        <Space>
                            Computer Science & Engineering
                        </Space>
                        <Space>
                           Faculty of Engineering
                        </Space>
                    </Space>
                </section>
            </section>
            {
                isDisabled && 
                <div className="col-12 row section-2 d-flex justify-content-around">
                    <ProfileDivInfoname name={"Update Password"}/>
                    <div className="col-12 col-md-5 col-lg-4 text-center">
                        <Input.Password placeholder="New Password" />
                    </div> 
                    <div className="col-12 col-md-5 col-lg-4 text-center">
                        <Input.Password
                        placeholder="Confirm New Password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 text-center">    
                        <Space>
                            <Button type="primary" className='updateButton'>
                                Update
                            </Button>
                        </Space>
                    </div>
                </div>
            }
            
            <div className="col-12 row section-3 d-flex justify-content-around flex-wrap">
                <ProfileDivInfoname name={"Hall Informations"}/>
                <div className="col-12 col-md-5  col-lg-4 px-3 text-center">  
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Hall Name</Divider>
                    <Input placeholder={info.hallName} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5 col-lg-4 px-3 text-center">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Room No.</Divider>
                    <Input placeholder={info.hallRoomNo} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5 col-lg-4 d-flex align-items-end justify-content-center text-center">
                    <Button disabled={isDisabled} type="primary" className='updateButton'>
                        Update
                    </Button>
                </div>
            </div>
            <div className="col-12 row section-4 d-flex justify-content-around flex-wrap">
                <ProfileDivInfoname name={"Basic Informations"}/>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Name</Divider>
                    <Input placeholder={info.name} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Name (Bangla)</Divider>
                    <Input placeholder={info.nameBangla} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Father's Name</Divider>
                    <Input placeholder={info.fatherName} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Father's Name (Bangla)</Divider>
                    <Input placeholder={info.fatherNameBangla} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Mother's Name</Divider>
                    <Input placeholder={info.motherName} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Religion</Divider>
                    <Input placeholder={info.religion} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Nationality</Divider>
                    <Input placeholder={info.nationality} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Date of Birth</Divider>
                    <DatePicker disabled={isDisabled} defaultplaceholder={moment('15-07-2001', dateFormat)} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Contact No</Divider>
                    <Input placeholder={info.contact} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Email</Divider>
                    <Input placeholder={info.email} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Present Add.</Divider>
                    <Input placeholder={info.presentAdd} disabled={isDisabled} />
                </div>
                <div className="col-12 col-md-5">
                    <Divider orientation='left border-light text-light' plain className='mb-0'>Permanent Add.</Divider>
                    <Input placeholder={info.permanentAdd}  />
                </div>
                <div className="col-12 text-center mt-3 col-md-5">
                    <Space>
                        <Button disabled={isDisabled} type="primary" className='updateButton'>
                            Update
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default Profile;