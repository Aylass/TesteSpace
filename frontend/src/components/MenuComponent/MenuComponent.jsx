import React from "react";
import "./MenuComponent.css";
import PropTypes from "prop-types";

/**
     * @function frontend\src\components\MenuComponent\Menu
     * @summary - Handle menu behavior and style
     * @returns {Element} - Return a react element
     */
class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animateOpenMenu: "",
            isMenuOpen: false
        }
        this.openMenu = this.openMenu.bind(this);
    }
    /**
     * @function frontend\src\components\MenuComponent\Menu.openMenu
     * @summary - Open menu and start animation
     */
    openMenu() {
        let aux = "";
        if(!this.state.isMenuOpen){
            aux = "change";
        }
        this.setState({
            animateOpenMenu: aux,
            isMenuOpen: !this.state.isMenuOpen
        });
    }

    render(){
        return(
            <div className="container">
                <div onClick={this.openMenu}>
                    <div className={"bar1" + this.state.animateOpenMenu}></div>
                    <div className={"bar2" + this.state.animateOpenMenu}></div>
                    <div className={"bar3" + this.state.animateOpenMenu}></div>
                </div>
                
                {this.state.isMenuOpen? 
                    <div className="buttonsWrapper">
                        <button className="menuButton" onClick={() => {this.props.mainListChange(1)}}>Usuários</button>
                        <button className="menuButton" onClick={() => {this.props.mainListChange(2)}}>Carros</button>
                        <button className="menuButton" onClick={() => {this.props.mainListChange(3)}}>Trabalhos</button>
                    </div>
                    :
                    <></>
                }
            </div>
        )
    }
}
Menu.propTypes={
    mainListChange: PropTypes.func,
}
export default Menu;