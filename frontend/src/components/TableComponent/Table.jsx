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
                        if(user.status){
                            userStatus = user.status;
                        }

                     return(<Item 
                            key={`item_${user.user_id}`} 
                            name={userName} 
                            date={userDate} 
                            salary={userSalary} 
                            car={userCar} 
                            status={userStatus} 
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
    }
    render(){
        return(
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.date}</td>
                <td>{this.props.salary}</td>
                <td>{this.props.car}</td>
                <td>{this.props.status}</td>
                <FontAwesomeIcon icon={faUser} />
                <FontAwesomeIcon icon={faUserSecret} />
            </tr>
        )
    }
}

export default Table;