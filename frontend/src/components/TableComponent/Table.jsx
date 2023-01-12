import React from "react";
import "./Table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons'

class Table extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpenModal: false,
            modalData: null
        }

        this.openEditModal = this.openEditModal.bind(this);
        this.onChildChanged = this.onChildChanged.bind(this);
        this.onChildChangedModalData = this.onChildChangedModalData.bind(this);
    }

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

    openEditModal(event){  
        event.preventDefault();
        event.stopPropagation();
        this.setState({isOpenModal : true});
    }

    onChildChanged(bool) {
        this.setState({isOpenModal: bool});
        console.log("Trocou valor pai!", this.state.isOpenModal)
    }

    onChildChangedModalData(data) {
        this.setState({modalData: data});
        console.log("Trocou valor pai Modal Data!", this.state.modalData)
    }

    render(){
        return(
            <>
                {this.state.isOpenModal?
                    <div className="divModal"> 
                        <EditModal isOpenModal={this.state.isOpenModal} modalData={this.state.modalData} callbackParent={this.onChildChanged} /> 
                    </div>
                    : <></>}
                <table>
                    {this.buildHeader()}
                    <tbody>
                        {this.props.dataRow.map?.(user => {
                            //user -------------------------------------------------------
                            let userName = "";
                            let userId = "";
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
                            if(user.user_access_id){
                                userId = user.user_access_id;
                            }
                            userStatus = user.status;

                            //user cars-------------------------------------------------------
                            const userCurrentCar = this.props.dataCars[userCar];
                            
                            //user emprego-------------------------------------------------------
                            const userCurrentJob = this.props.dataJobs[userSalary];
                            
                            //user produtos-------------------------------------------------------
                            const userCurrentProduct = this.props.dataProducts[userSalary];
                            
                            //user Acessos-------------------------------------------------------
                            const userCurrentAccess = this.props.dataAccess[userId];
                            
                            //user Endereços-------------------------------------------------------
                            const userCurrentAddresses = this.props.dataAddresses[userId];
            
                        return(<Item 
                                modalData={this.onChildChangedModalData}
                                key={`item_${user.user_id}`} 
                                name={userName} 
                                date={userDate} 
                                salary={userCurrentJob?.user_job_salary || ""} 
                                car={userCar} 
                                status={userStatus} 
                                user={user}
                                currentCar={userCurrentCar}
                                currentJob={userCurrentJob}
                                currentProduct={userCurrentProduct}
                                currentAccess={userCurrentAccess}
                                currentAdresses={userCurrentAddresses}
                                openEditModal={this.openEditModal}
                            />)})
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

class EditModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            carData: null
        }
        this.closeModal = this.closeModal.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.listenerClick = this.listenerClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.wrapperRef = React.createRef();
    }

    closeModal(){
       //this.props.isOpenModal = false;
       console.log("fechou")
    }

    setWrapperRef(node){
        if(node !== undefined)
        this.wrapperRef = node;
        console.log("setwrapper", this.wrapperRef)
    }

    listenerClick(event){
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.props.isOpenModal) {
            this.props.callbackParent(false)
            console.log("entro")
            console.log(event.target)
        }
    }

    componentDidMount(){
        document.addEventListener('click', this.listenerClick);
        //document.addEventListener('keyDown', this.listenerClick);
    }

    componentWillUnmount(){
        //document.removeEventListener('keyDown', this.listenerClick);
        document.removeEventListener('click', this.listenerClick);
    }
    
    render(){
        console.log(this.props.modalData)
        return(
            <div ref={this.setWrapperRef} className="modal">
                <div className="modal-content">
                    <button className="closeModalButton" onClick={() => this.props.callbackParent(false)}>X</button>
                    <div>
                            <b>Carro</b><br/><hr/>
                            </div>
                            {this.props.modalData ? <p>    
                                Carro: {this.props.modalData?.car_name || ""} <br/>
                                Modelo: {this.props.modalData?.car_model || ""} <br/>
                                Fabricante: {this.props.modalData?.car_manufacturer || ""} <br/>
                                Tipo: {this.props.modalData?.car_type || ""} <br/>
                                Gasolina: {this.props.modalData?.car_fuel || ""} <br/>
                            </p>: <></>}
                    <button className="editModalButton" onClick={() => this.props.callbackParent(false)}>Editar</button>
                    <button className="saveModalButton" onClick={this.closeModal}>Salvar</button>
                    <button className="cancelModalButton" onClick={this.closeModal}>Cancelar</button>
                </div>
            </div>
        )
    }
}

class Item extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
         isOpenItem : false,
        }
        this.toggleBodyItem = this.toggleBodyItem.bind(this);
        this.viewButtonFunc = this.viewButtonFunc.bind(this);
    }

    toggleBodyItem(){
        this.setState({isOpenItem : !this.state.isOpenItem});
    }

    viewButtonFunc(event){
            this.props.modalData(this.props.currentCar);
            this.props.openEditModal(event);
    }

    render(){
        return(
            <>
                <tr onClick={() => this.toggleBodyItem}
                >
                    <td>{this.props.name}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.salary}</td>
                    <td><button onClick={this.viewButtonFunc} >Visualizar</button></td>
                    <td>{this.props.status === true?
                        <FontAwesomeIcon style={{color : '#20B2AA'}} icon={faUser} /> : 
                        this.props.status === false?
                        <FontAwesomeIcon style={{color : '#FF6347'}} icon={faUser} /> :
                        <FontAwesomeIcon style={{color : '#4F4F4F'}} icon={faUserSecret} />
                    }</td>
                </tr>
                {this.state.isOpenItem === false? null :
                    <ItemBody 
                        user={this.props.user} 
                        currentCar={this.props.currentCar}
                        currentJob={this.props.currentJob}
                        currentProduct={this.props.currentProduct}
                        currentAccess={this.props.currentAccess}
                        currentAdresses={this.props.currentAdresses}
                    />}
            </>
        )
    }
}


class ItemBody extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            tabOpenModal : 1,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(tab){
       this.setState({tabOpenModal : tab});
   }

    render(){
        return(
            <>
                <tr onClick={() => this.toggleModal(1)}> 
                    <th>Carro</th>
                    <td  colSpan="5" rowSpan="5">
                        <Modal 
                            openModal={this.state.tabOpenModal} 
                            user={this.props.user} 
                            currentCar={this.props.currentCar}
                            currentJob={this.props.currentJob}
                            currentProduct={this.props.currentProduct}
                            currentAccess={this.props.currentAccess}
                            currentAdresses={this.props.currentAdresses}
                        />
                    </td>
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
        this.state = {
            tabOpenModal : 0,
        }
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
                                Carro: {this.props.currentCar?.car_name || ""} <br/>
                                Modelo: {this.props.currentCar?.car_model || ""} <br/>
                                Fabricante: {this.props.currentCar?.car_manufacturer || ""} <br/>
                                Tipo: {this.props.currentCar?.car_type || ""} <br/>
                                Gasolina: {this.props.currentCar?.car_fuel || ""} <br/>
                            </p> 
                        </>
                        :
                        this.props.openModal === 2? //Tab Emprego
                        <>  
                            <div>
                                <b>Emprego</b><br/><hr/>
                            </div>
                            <p>            
                                Titulo: {this.props.currentJob?.user_job_title || ""} <br/>
                                Salário: {this.props.currentJob?.user_job_salary_currency_symbol || ""} {this.props.currentJob?.user_job_salary || ""} <br/>
                                Endereço: {this.props.currentJob?.user_job_address || ""} <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 3? //Tab Produto
                        <>  
                            <div>
                                <b>Produto</b><br/><hr/>
                            </div>
                            <p>            
                                Nome: {this.props.currentProduct?.user_product_buyed_product_name || ""} <br/>
                                Fabricante: {this.props.currentProduct?.user_product_buyed_company_name || ""} <br/>
                                Preço: {this.props.currentProduct?.user_product_buyed_product_price || ""} <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 4? //Tab Acessos
                        <>  
                            <div>
                                <b>Acessos</b><br/><hr/>
                            </div>
                            <p>            
                                Tecnologia: {this.props.currentAccess?.user_access_business_technoloy || ""} <br/>
                                Login: {this.props.currentAccess?.user_access_login || ""} <br/>
                                Endereço IP: {this.props.currentAccess?.user_access_ip_address || ""} <br/>
                                Endereço MAC: {this.props.currentAccess?.user_access_mac_address || ""} <br/>
                                Máquina: {this.props.currentAccess?.user_access_user_agent || ""} <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 5? //Tab Endereço
                        <>  
                            <div>
                                <b>Endereço</b><br/><hr/>
                            </div>
                            <p>   
                                País: {this.props.currentAdresses?.user_address_country || ""} <br/>         
                                Estado: {this.props.currentAdresses?.user_address_state || ""} <br/>
                                Cidade: {this.props.currentAdresses?.user_address_city || ""} <br/>
                                Rua: {this.props.currentAdresses?.user_address_street_address || ""} <br/>
                            </p>
                        </>
                        : 
                    <></>
                }
            </>
        )
    }
}

export default Table;