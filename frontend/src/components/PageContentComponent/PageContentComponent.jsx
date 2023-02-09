import React from "react";
import PropTypes from "prop-types";
import style from './PageContentComponent.module.css';
import FormContent from "../FormComponent/FormComponent";

class PageContent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedList: 0,
            selectedObject: 1,
            callForm: false,
        }

        this.objectStringId = this.props.lists[this.state?.selectedList]?.fields?.[0].label;
        
        //Select List
        this.selectOptions = this.selectOptions.bind(this);
        this.handleListOptionChange = this.handleListOptionChange.bind(this);

        //Select Object
        this.selectObject = this.selectObject.bind(this);
        this.handleObjectOptionChange = this.handleObjectOptionChange.bind(this);
    }
    
    /**
     * @function frontend\src\components\PageContentComponent\PageContentComponent.selectOptions
     * @summary - Manage main list selected
     */
    selectOptions(){
        const optionsArray = [];

        for (let index = 0; index < this.props.lists.length; index++) {
            optionsArray.push(<option key={'option_' + index} value={this.props.lists[index].id}>{this.props.lists[index].name}</option>);
        }

        return optionsArray;
    }
    /**
     * @function frontend\src\components\PageContentComponent\PageContentComponent.handleListOptionChange
     * @summary - Handle list option changes
     */
    handleListOptionChange(event){
        const value = parseInt(event.target.value)
        
        this.setState({selectedList: this.props.lists[value].id}); 
    }

    /**
     * @function frontend\src\components\PageContentComponent\PageContentComponent.selectObject
     * @summary - Manage object selected
     */
    selectObject(){
        const optionsArray = [];
        this.objectStringId = this.props.lists[this.state?.selectedList]?.fields?.[0].label;

        for (let index = 0; index < this.props.lists[this.state.selectedList].list.length; index++) {
            const object = this.props.lists[this.state.selectedList].list[index];
            
            optionsArray.push(<option key={'optionObject_' + index} value={object[this.objectStringId]}>{object[this.objectStringId]}</option>);
        }
        return optionsArray;
    }
    /**
     * @function frontend\src\components\PageContentComponent\PageContentComponent.handleObjectOptionChange
     * @summary - Handle list option changes
     */
    handleObjectOptionChange(event){ 
        const value = parseInt(event.target.value)

        this.props.lists[this.state.selectedList].list.map(
            (item)=>{

                if(item[this.objectStringId] === value){
                    
                    this.setState({
                        selectedObject: item,
                        callForm: true
                    });
                }
            }
        );
    }

    render(){
        
        return (
            <div className="">
                <span>Lista Escolhida: </span>
                <select className={style.selector} id="select" onChange={this.handleListOptionChange} value={this.state.selectedList} >
                    {this.selectOptions()}
                </select>
                <span className={style.label} >Id do Item Escolhido: </span>
                <select className={style.selector} id="selectObject" onChange={this.handleObjectOptionChange} value={this.state.selectedObject[this.objectStringId]} >
                    {this.selectObject()}
                </select>
                {this.state.callForm?
                    <FormContent
                        mainList={this.props.lists[this.state.selectedList].list}  
                        fields={this.props.lists[this.state.selectedList].fields}
                        
                        data={this.state.selectedObject}
                        dataId={this.objectStringId}

                        crudFunction={this.props.crudFunction}
                    ></FormContent>
                    :
                    <></>
                }
            </div>
        );
    }
}

PageContent.propTypes={
    lists: PropTypes.array,
    crudFunction: PropTypes.func,
}
export default PageContent;