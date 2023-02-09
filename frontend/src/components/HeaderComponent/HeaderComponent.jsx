import React from "react";
import PropTypes from "prop-types";
import './HeaderComponent.css';
import PageContent from '../PageContentComponent/PageContentComponent';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedBtn: 0,
            isSelected: 0
        }
        this.buildHeader = this.buildHeader.bind(this);
        this.buildButtons = this.buildButtons.bind(this);
    }
    
    /**
     * @function frontend\src\Header.buildHeader
     * @summary - Takes every button data from list
     */
    buildHeader(btnList){
        let list = [];

        for (let index = 0; index < btnList.length; index++) {
            list.push(
                this.buildButtons(index, btnList[index].label, btnList[index].btnFunction)
            );
        }
        return list;
    }
    /**
     * @function frontend\src\Header.buildButtons
     * @summary - Creates header buttons
     */
    buildButtons(index, label, buttonFunction){
        return(
            <button 
                className={this.state.isSelected === buttonFunction?  "headerbtnSelected": "headerbtn"}
                key={`headerButton-${buttonFunction}`} 
                onClick={()=> {
                    this.setState({
                        selectedBtn: index,
                        isSelected: buttonFunction
                    });
                    this.props.changeSelectedHeaderOption(buttonFunction)}
                    }>
                {label}
            </button>
        )
    }

    render(){
        return (
            <div className="headerButtons">
                {this.buildHeader(this.props.buttonsList)}
                {this.state.selectedBtn >= 1?
                    <PageContent 
                        crudFunction={this.props.buttonsList[this.state.selectedBtn]?.function} 
                        lists={this.props.configList} 
                    ></PageContent>
                :
                    <></>
                }
            </div>
        );
    }
}

Header.propTypes={
    buttonsList: PropTypes.array,
    changeSelectedHeaderOption: PropTypes.func,

    configList: PropTypes.array,
}
export default Header;