import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import axios from 'axios';
import { toast } from 'react-toastify';
import './SelectInput.css'

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : '#142F43',
      fontSize: '16px'
    }),
    menu: (provided, state) => ({
        ...provided,
        width: '100%',
    }),
    control: () => ({
      backgroundColor: '#F9F9F9',
      borderRadius: '5px',
      width: '100%',
      height: '45px',
      padding: "0% !important",
      margin: "0% !important",
      overflow: 'hidden',
      fontSize: '16px',
      border: '2px solid #C9CCD5'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      const borderRadius = "5px";
      const color = "black";
      const paddingTop = "-10px !important";
      return { ...provided, opacity, transition, borderRadius, color, paddingTop };
    }
  }

const SelectInput = (props) => {
    const [data, setData] = useState(null);
    const {name, id, setOption, url} = props;
    const [selected, setSelected] = useState(null)

    const customTheme = (theme) =>{
        return{
            ...theme,
            colors: {
                ...theme.colors,
                primary25: '#CEE5D0',
                primary: '#142F43',
            }
        }
    }

    useEffect(()=>{
        if(url === 'hall'){
            setData([
                { value: 'Shahid Abdur Rab Hall', label: 'Shahid Abdur Rab Hall' },
                { value: 'Shah Amanat Hall', label: 'Shah Amanat Hall' },
                { value: 'A. F. Rahman Hall', label: 'A. F. Rahman Hall' },
                { value: 'Shah Amanat Hall', label: 'Shah Amanat Hall' },
                { value: 'Sohrawardi Hall', label: 'Sohrawardi Hall' },
                { value: 'Alaol Hall', label: 'Alaol Hall' },
                { value: 'Shahjalal Hall', label: 'Shahjalal Hall' },
                { value: 'Sheikh Hasina Hall', label: 'Sheikh Hasina Hall' },
                { value: 'Shamsunnahar Hall', label: 'Shamsunnahar Hall' },
                { value: 'Pritilota Hall', label: 'Pritilota Hall' },
                { value: 'Khaleda Zia Hall', label: 'Khaleda Zia Hall' }
            ])
        }else if(url === 'religion'){
            setData([
                { value: 'Islam', label: 'Islam' },
                { value: 'Hindu', label: 'Hindu' },
                { value: 'Buddhist', label: 'Buddhist' }
            ])
        }else if(url === null){
            setData([
                { value: 'null', label: 'Select...' }
            ])
        }
        else{
            axios.get(url).then(res=>{
                if(res.data.status){
                    setData(res.data.list)
                }
            }).catch(e=>{
                toast.error('Something went wrong!')
            })
        }
    },[])

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
         setOption((prev)=>{return selectedOption.value});
      };

    return (
        <div className="col-12 col-md-6 float-left">
            <div className="label col-3 float-left">
                <label for={id}>{name} :</label>
            </div>
            <div className="col-9 float-left">
                <Select styles={customStyles} theme={customTheme} className="selectInput" value={selected} onChange={handleChange} options={data} id={id}/>
            </div>
        </div>
    );
};

export default SelectInput;