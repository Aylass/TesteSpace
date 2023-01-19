import React from "react";
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

export default InputComponent;