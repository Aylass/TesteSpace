import React from "react";
import PropTypes from "prop-types";
import InputComponent from '../InputComponent/Input';
import style from './FormComponent.module.css';
import Translation from "../../users/Translation";

class FormContent extends React.Component{

    constructor(props){
        super(props);
        this.buildForm = this.buildForm.bind(this);
        this.buildFields = this.buildFields.bind(this);
    }

    /**
     * @function frontend\src\components\FormComponent\FormComponent.buildForm
     * @summary - Creates the fields for the current item
     */
    buildForm(){
        let list = [];
        for (let index = 0; index < this.props.fields.length; index++) {
            
            if((typeof this.props.data[this.props.fields[index].label] == "boolean") || (this.props.data[this.props.fields[index].label] === null)){
                list.push(
                    this.buildFieldsBoolean(index, this.props.fields[index].label, this.props.data[this.props.fields[index].label], this.props.fields[index].onChange)
                );
                
            }else{
                list.push(
                    this.buildFields(index, this.props.fields[index].label, this.props.data[this.props.fields[index].label], this.props.fields[index].onChange)
                );
            }
        }
        return list;
    }
    /**
     * @function frontend\src\components\FormComponent\FormComponent.buildFields
     * @summary - Creates form fields
     */
    buildFields(index, label, value, func){
        const handleOnChange = (event) => {
            value = event.target.value;
            if(typeof func === "function"){
                func(value, this.props.data[this.props.dataId], this.props.dataId);
            }
        }
        return(
            <>
                <span key={`label_${label}`}>{Translation[label]? Translation[label] : label}: </span>
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
     * @function frontend\src\components\FormComponent\FormComponent.buildFieldsBoolean
     * @summary - Creates field for boolean variables
     */
    buildFieldsBoolean(index, label, value, func){
        let isTrueSet = value;
        if(value === null)
        {
            isTrueSet = "null";
        }
        const handleOnChange = (event) => {
            value = event.target.value;
            if(value !== "null"){
                isTrueSet = (value === "true");
            }
            if(typeof func === "function"){
                func(isTrueSet, this.props.data[this.props.dataId], this.props.dataId);
            }
        }
        return(
            <>
                <span key={`label_${label}`}>{Translation[label]? Translation[label] : label}: </span>
                <select className={style.selector} id="select_boolean" onChange={handleOnChange} value={isTrueSet}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                    <option value={"null"}>Null</option>
                </select>
            </>
        )
    }

    render(){
        return (
            <div className={style.formComponent}>
                {this.buildForm()}
                <div className={style.btnWrap}>
                    <button className={style.btnSave} onClick={this.props.crudFunction}>Save</button>
                    <button className={style.btnCancel} onClick={this.props.resetSelectedButton}>Cancel</button>
                </div>
            </div>
        );
    }
}

FormContent.propTypes={
    mainList: PropTypes.array,
    fields: PropTypes.array,

    data: PropTypes.object,
    dataId: PropTypes.string,

    crudFunction: PropTypes.func,
    resetSelectedButton: PropTypes.func
}
export default FormContent;