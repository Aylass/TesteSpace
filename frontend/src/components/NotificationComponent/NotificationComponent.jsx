import React from "react";
import "./NotificationComponent.css";
import PropTypes from "prop-types";

/**
     * @function frontend\src\components\NotificationComponent\NotificationComponent
     * @summary - Handle notifications
     * @returns {Element} - Return a react element
     */
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

    /**
     * @function frontend\src\components\NotificationComponent\NotificationComponent.handleCloseNotification
     * @summary - Close notification when father calls
     */
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
                            {this.props.notificationDescription}
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
    notificationDescription: PropTypes.string,
}
export default NotificationComponent;
