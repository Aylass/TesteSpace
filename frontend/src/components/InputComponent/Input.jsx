import React from "react";
class InputComponent extends React.Component{

    render(){
        return(
            <input className="input" type="text" placeholder={this.props.data} name={this.props.data} onChange={this.props.onChange} value={this.props.data} disabled={this.props.disabled}  />
        )
    }
}

export default InputComponent;