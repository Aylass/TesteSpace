import React from "react";
import PropTypes from "prop-types";
import './HeaderComponent.css';

class Header extends React.Component{

    constructor(props){
        super(props);

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
                this.buildButtons(btnList[index].label, btnList[index].btnFunction)
            );
        }
        return list;

    }
    /**
     * @function frontend\src\Header.buildButtons
     * @summary - Creates header buttons
     */
    buildButtons(label, buttonFunction){
        return(
            <button 
                className="headerbtn"
                key={`headerButton-${buttonFunction}`} 
                onClick={()=> {this.props.changeSelectedHeaderOption(buttonFunction)
            }}>
                {label}
            </button>
        )
    }

    render(){
        return (
            <div className="headerButtons">
                {this.buildHeader(this.props.buttonsList)}
            </div>
        );
    }
}

Header.propTypes={
    buttonsList: PropTypes.array,
    changeSelectedHeaderOption: PropTypes.func,
}
export default Header;