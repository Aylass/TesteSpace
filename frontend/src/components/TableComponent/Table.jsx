import React from "react";
import "./Table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons'

class Table extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        //this.buildRow = this.buildRow.bind(this);//se funcao nova usa THIS adiciona aq
    }

   /* buildRow(collum){
        console.log(typeof this.props.dataRow);
        return(
            this.props.dataRow.map?.(user => {
                return(
                    <>
                        <td key={`dataRow_${user.user_id}`}>
                            {collum == "user_first_name" ? 
                                user.user_first_name :
                                collum == "user_birth_date"?
                                user.user_birth_date : 
                                collum == "user_product_buyed_id"?
                                user.user_product_buyed_id : 
                                collum == "user_car_id"?
                                user.user_car_id :
                                collum == "status"?
                                user.user_car_id : null
                            }
                        </td>
                    </>
                );
            })
        );
    }*/

    buildHeader(){
        return(
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Nascimento</th>
                    <th>Salário</th>
                    <th>Carro</th>
                    <th>Status</th>
                </tr>
            </thead>
        );
    }

    render(){
        return(
            <table>
                {this.buildHeader()}
                <tbody>
                    {this.props.dataRow.map?.(user => {
                        let userName = "";
                        let userDate = "";
                        let userSalary = "";
                        let userCar = "";
                        let userStatus = "";

                        if(user.user_first_name){
                            userName = user.user_first_name;
                        }
                        if(user.user_birth_date){
                            userDate = user.user_birth_date;
                        }
                        if(user.user_job_id){
                            userSalary = user.user_job_id;
                        }
                        if(user.user_car_id){
                            userCar = user.user_car_id;
                        }
                        userStatus = user.status;
                        

                     return(<Item 
                            key={`item_${user.user_id}`} 
                            name={userName} 
                            date={userDate} 
                            salary={userSalary} 
                            car={userCar} 
                            status={userStatus} 
                            user={user}
                        />)})
                    }
                </tbody>
            </table>
        )
    }

}

class Item extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
         isOpemItem : false,
        }
        this.toggleBodyItem = this.toggleBodyItem.bind(this);
    }

    toggleBodyItem(){
        this.setState({isOpemItem : !this.state.isOpemItem});
    }

    render(){
        return(
            <>
                <tr
                onClick={() => this.toggleBodyItem()}
                >
                    <td>{this.props.name}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.salary}</td>
                    <td>{this.props.car}</td>
                    <td>{this.props.status === true?
                        <FontAwesomeIcon style={{color : '#20B2AA'}} icon={faUser} /> : 
                        this.props.status === false?
                        <FontAwesomeIcon style={{color : '#FF6347'}} icon={faUser} /> :
                        <FontAwesomeIcon style={{color : '#4F4F4F'}} icon={faUserSecret} />
                    }</td>
                </tr>
                {this.state.isOpemItem === false? null :<ItemBody user={this.props.user}/>}
            </>
        )
    }
}


class ItemBody extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            tabOpemModal : 0,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(tab){
       this.setState({tabOpemModal : tab});
   }

    render(){
        return(
            <>
                <tr onClick={() => this.toggleModal(1)}> 
                    <th>Carro</th>
                    <td  colSpan="5" rowSpan="5"><Modal openModal={this.state.tabOpemModal} user={this.props.user}/></td>
                </tr>
                <tr onClick={() => this.toggleModal(2)}>
                    <th>Emprego</th>
                </tr> 
                <tr onClick={() => this.toggleModal(3)}>
                    <th>Produto</th>
                </tr>
                <tr onClick={() => this.toggleModal(4)}>
                    <th>Acessos</th>
                </tr>
                <tr onClick={() => this.toggleModal(5)}>
                    <th>Endereço</th> 
                </tr>
            </>
        )
    }
}

class Modal extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
                {
                    this.props.openModal === 1? //Tab Carro
                        <>  
                            <div>
                                <b>Carro</b><br/><hr/>
                            </div>
                            <p>    
                                Carro: {this.props.user.user_car_id} <br/>
                                Modelo: <br/>
                                Fabricante: <br/>
                                Tipo: <br/>
                                Gasolina: <br/>
                            </p> 
                        </>
                        :
                        this.props.openModal === 2? //Tab Emprego
                        <>  
                            <div>
                                <b>Emprego</b><br/><hr/>
                            </div>
                            <p>            
                                Carro: <br/>
                                Modelo: <br/>
                                Fabricante: <br/>
                                Tipo: <br/>
                                Gasolina: <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 3? //Tab Produto
                        <>  
                            <div>
                                <b>Produto</b><br/><hr/>
                            </div>
                            <p>            
                                Carro: <br/>
                                Modelo: <br/>
                                Fabricante: <br/>
                                Tipo: <br/>
                                Gasolina: <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 4? //Tab Acessos
                        <>  
                            <div>
                                <b>Acessos</b><br/><hr/>
                            </div>
                            <p>            
                                Carro: <br/>
                                Modelo: <br/>
                                Fabricante: <br/>
                                Tipo: <br/>
                                Gasolina: <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 5? //Tab Endereço
                        <>  
                            <div>
                                <b>Endereço</b><br/><hr/>
                            </div>
                            <p>            
                                Carro: <br/>
                                Modelo: <br/>
                                Fabricante: <br/>
                                Tipo: <br/>
                                Gasolina: <br/>
                            </p>
                        </>
                        : <></>
                }
            </>
        )
    }
}

export default Table;