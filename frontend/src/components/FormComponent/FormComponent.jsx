import React from "react";
import PropTypes from "prop-types";
import InputComponent from '../InputComponent/Input';
import style from './FormComponent.module.css';
import Translation from "../../users/Translation";

class FormContent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            objectEdited: this.props.data
        }
        this.buildForm = this.buildForm.bind(this);
        this.buildFields = this.buildFields.bind(this);
        this.saveDataModifications = this.saveDataModifications.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if(props.data !== state.objectEdited){
            //Change in props
            return{
                objectEdited: props.data
            };
        }
        return null; // No change to state
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
                    this.buildFieldsBoolean(this.props.fields[index].label)
                );
                
            }else{
                list.push(
                    this.buildFields(this.props.fields[index].label)
                );
            }
        }
        return list;
    }

    handleOnChange(event, label) {
        const value = event.target.value;

        let editedData = {...this.state.objectEdited};
        editedData[label] = value;

        this.setState({
            objectEdited: editedData
        });
    }

    /**
     * @function frontend\src\components\FormComponent\FormComponent.buildFields
     * @summary - Creates form fields
     */
    buildFields(label){
        return(
            <>
                <span key={`label_${label}`}>{Translation[label]? Translation[label] : label}: </span>
                <InputComponent 
                    key={`input_label_${label}`}
                    disabled={false} 
                    data={this.state.objectEdited[label]} 
                    onChange={event => this.handleOnChange(event, label)} 
                /> 
            </>
        )
    }

    /**
     * @function frontend\src\components\FormComponent\FormComponent.buildFieldsBoolean
     * @summary - Creates field for boolean variables
     */
    buildFieldsBoolean(label){
        return(
            <>
                <span key={`label_${label}`}>{Translation[label]? Translation[label] : label}: </span>
                <select className={style.selector} id="select_boolean" onChange={event => this.handleOnChange(event, label)} value={this.state.objectEdited[label]}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                    <option value={"null"}>Null</option>
                </select>
            </>
        )
    }

    saveDataModifications()
    {
        this.props.crudFunction(this.state.objectEdited);
    }
    
    render(){
        console.log("props",this.props.data)
        console.log("state",this.state.objectEdited)
        return (
            <div className={style.formComponent}>
                {this.buildForm()}
                <div className={style.btnWrap}>
                    <button className={style.btnSave} onClick={this.saveDataModifications}>Save</button>
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