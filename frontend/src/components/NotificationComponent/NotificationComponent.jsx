import React from "react";
import "./NotificationComponent.css";

class NotificationComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            exitAnimation: ""
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({exitAnimation: "Exit"})
        }, 3000);
    }
    componentDidUpdate(){
        setTimeout(() => {
            this.props.closeNotification()
        }, 100);
    }
    
    render(){
        return(
            <>
                <div className={"notificationBox" + this.props.tipo + this.state.exitAnimation}>
                    <span className="notificationTitle">{this.props.titulo}</span>
                    <button className="notificationHeaderBtn" onClick={this.props.closeNotification}>x</button>
                    <hr className="line"/>
                    <div className="notificationContent">
                        <span>
                            Carro de {this.props.nomeCarro} foi editado com 
                            {this.props.tipo === "Success"? 
                                " sucesso"
                                : this.props.tipo === "Error"? 
                                " erro" 
                                : " um aviso"
                            }.
                        </span>
                    </div>
                </div>
            </>
        )
    }
}
export default NotificationComponent;
