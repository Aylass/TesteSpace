import React from "react";
import "./NotificationComponent.css";
import PropTypes from "prop-types";

class NotificationComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            exitAnimation: ""
        }
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({exitAnimation: "Exit"}, () => {
                this.handleCloseNotification();
            })
        }, 3000);
    }

    handleCloseNotification(){
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

NotificationComponent.propTypes={
    closeNotification: PropTypes.func,
    titulo: PropTypes.string.isRequired,
    tipo: PropTypes.string,
    nomeCarro: PropTypes.string,
}
export default NotificationComponent;
