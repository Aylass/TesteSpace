import React from "react";
import PropTypes from "prop-types";
import InputComponent from '../InputComponent/Input';
import style from './FormComponent.module.css';

class FormContent extends React.Component{

    constructor(props){
        super(props);
        this.state={
            inputData: ""
        }
        this.buildForm = this.buildForm.bind(this);
        this.buildFields = this.buildFields.bind(this);
    }

    /**
     * @function frontend\src\components\FormComponent\FormComponent.buildForm
     * @summary - Takes every button data from list
     */
    buildForm(){
        let list = [];
        for (let index = 0; index < this.props.fields.length; index++) {
            list.push(
                this.buildFields(index, this.props.fields[index].label, this.props.data[this.props.fields[index].label], this.props.fields[index].onChange)
            );
        }
        return list;
    }
    /**
     * @function frontend\src\components\FormComponent\FormComponent.buildFields
     * @summary - Creates header buttons
     */
    buildFields(index, label, value, func){
        if(typeof(value) == "boolean"){
            if(value === false){
                value = "false";
            }else{
                value = "true";
            }
        }
        const handleOnChange = (event) => {
            value = event.target.value;
            
            if(typeof func === "function"){
                func(value, this.props.data[this.props.dataId], this.props.dataId);
            }
        }
        return(
            <>
                <span key={`label_${label}`}>{label}: </span>
                <InputComponent 
                    key={`input_label_${label}`}
                    disabled={false} 
                    data={value} 
                    onChange={handleOnChange} 
                /> 
            </>
        )
    }

    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onModelChanged
     * @summary - Save car model variable
     */
    onInputChanged(data){
        this.setState({
            inputData: data.target.value,
        });
    }

    render(){
        console.log("fields", this.props.fields)
        console.log("data", this.props.data)
        return (
            <div className={style.formComponent}>
                {this.buildForm()}
            </div>
        );
    }
}

FormContent.propTypes={
    mainList: PropTypes.array,
    fields: PropTypes.array,
    data: PropTypes.object,
    dataId: PropTypes.string
}
export default FormContent;