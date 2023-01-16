import React from "react";
class InputComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: "",
            disabled: false,
        }
        //this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        //this.setState({disabled: this.props.disabled});
        //this.forceUpdate();
    }

    /*onChange(event){
        this.setState({data: event.target.value});
    }*/


    
    componentWillReceiveProps(nextProps) {
        if (this.props.status !== nextProps.status) {
          this.setState({
            disabled: nextProps.status
          });
          this.forceUpdate();
        }
    }

    render(){
        return(
            <input className="input" type="text" placeholder={this.props.data} name={this.props.data} onChange={this.props.onChange} value={this.state.data} disabled={this.props.disabled}  />
        )
    }
}

export default InputComponent;