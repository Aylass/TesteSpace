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

        this.buildButtonsMap = this.buildButtonsMap.bind(this);
        this.buildButtons = this.buildButtons.bind(this);
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

    buildButtonsMap(menuItems){
        const list = [];

        for (let index = 0; index < menuItems.length; index++) {
            list.push(
                this.buildButtons(menuItems[index].label, menuItems[index].btnFunction)
            );
        }
        return list;
    }

    buildButtons(label, buttonFunction){
        return(
            <button 
                className="menuButton"
                key={`menuButton_${buttonFunction}`} 
                onClick={()=>this.props.btnFunction(buttonFunction)}>
                {label}
            </button>
        )
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
                        {this.buildButtonsMap(this.props.menuItems)}
                    </div>
                    :
                    <></>
                }
            </div>
        )
    }
}

Menu.propTypes={
    menuItems: PropTypes.array,
    btnFunction: PropTypes.func
}
export default Menu;