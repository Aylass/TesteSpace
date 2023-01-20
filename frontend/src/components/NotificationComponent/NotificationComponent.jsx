import React from "react";
import "./NotificationComponent.css";

class NotificationComponent extends React.Component{

    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <>
                <div className={"notificationBox" + this.props.tipo}>
                    <span className="notificationTitle">{this.props.titulo}</span>
                    <button className="notificationHeaderBtn" onClick={this.props.closeNotification}>x</button>
                    <hr className="line"/>
                    <div className="notificationContent">
                        <span>
                            Carro {this.props.nomeCarro} foi editado com 
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

// titlo texto e tipo(erro/sucesso/warning)
//     ter um x 
//     timeout pra sair da tela sozinho props