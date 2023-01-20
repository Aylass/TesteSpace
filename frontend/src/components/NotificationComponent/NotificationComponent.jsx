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
                    <spam className="notificationTitle">{this.props.titulo}</spam>
                    <button className="notificationHeaderBtn">x</button>
                    <hr className="line"/>
                    <div className="notificationContent">
                        <spam>Carro {this.props.nomeCarro} foi editado com {this.props.tipo}.</spam>
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