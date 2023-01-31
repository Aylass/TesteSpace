import React from "react";
import PropTypes from "prop-types";

/**
     * @function frontend\src\components\InputComponent\InputComponent
     * @summary - Handle inputs behavior and style
     * @returns {Element} - Return a react element
     */
class InputComponent extends React.Component{

    shouldComponentUpdate(nextProps){
        if(nextProps.disabled !== this.props.disabled){
            return true;
        }
        if(nextProps.data !== this.props.data){
            return true;
        }
        return false;
    }

    render(){
        return(
            <input 
                className="input" 
                type="text" 
                placeholder={this.props.data} 
                name={this.props.data} 
                onChange={this.props.onChange} 
                value={this.props.data} 
                disabled={this.props.disabled}  
            />
        )
    }
}
InputComponent.propTypes={
    placeholder: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
}

export default InputComponent;