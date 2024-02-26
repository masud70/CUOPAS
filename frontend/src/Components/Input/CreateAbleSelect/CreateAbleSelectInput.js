import React, {useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import './CreateAbleSelectInput.css'


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

const CreateAbleSelect = (props) => {
    const {setOption} = props;
    const [options, setOptions] = useState([
        {value: 3303, label: "Purple", pid: 3303},
        {value: 3301, label: "Blue", pid: 3306},
        {value: 3307, label: "Red", pid: 3307},
        {value: 3308, label: "Green", pid: 3308}
    ])
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

    return (
        <div className="col-12 row CreateAbleDiv">
            <div className="col-3">
                <span>
                    Title :
                </span>
            </div>
            <div className="col-9 mr-0 pr-0">
                <CreatableSelect onChange={(e)=>setOption(e)} options={options} styles={customStyles} theme={customTheme}/>
            </div>
        </div>
    );
};

export default CreateAbleSelect;