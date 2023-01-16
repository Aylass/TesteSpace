import React from "react";
import "./Table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import InputComponent from "../InputComponent/Input";

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
        event.stopPropagation();
        this.setState({isOpenModal : true});
    }

    onChildChanged(bool) {
        this.setState({isOpenModal: bool});
    }

    onChildChangedModalData(data) {
        this.setState({modalData: data});
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

/*class Input extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            nome: "",
            modelo: "",
            fabricante: "",
            tipo: "",
            gasolina: ""
        }
        this.setNome = this.setNome.bind(this);
        this.setModelo = this.setModelo.bind(this);
        this.setFabricante = this.setFabricante.bind(this);
        this.setTipo = this.setTipo.bind(this);
        this.setGasolina = this.setGasolina.bind(this);
    }

    setNome(event){
        this.setState({nome: event.target.value});
        //this.props.onChildChanged(event.target.value, undefined, undefined, undefined, undefined);
    }
    setModelo(event){
        this.setState({modelo: event.target.value});
        this.props.onChildChanged(undefined, this.state.modelo, undefined, undefined, undefined);
    }
    setFabricante(event){
        this.setState({fabricante: event.target.value});
        this.props.onChildChanged(undefined, undefined, this.state.fabricante, undefined, undefined);
    }
    setTipo(event){
        this.setState({tipo: event.target.value});
        this.props.onChildChanged(undefined, undefined, undefined, this.state.tipo, undefined);
    }
    setGasolina(event){
        this.setState({gasolina: event.target.value});
        this.props.onChildChanged(undefined, undefined, undefined, undefined, this.state.gasolina);
    }


    render(){
        return(
            <div className="inputGrid">
                <p>    
                    Carro:  
                </p>
                <input className="input" type="text" placeholder={this.props.nomeData} name="Nome do Carro" onChange={this.setNome} value={this.state.nome}/>
                <p>    
                    Modelo:  
                </p>
                <input className="input" type="text" placeholder={this.props.modeloData} name="Modelo" onChange={this.setModelo} value={this.state.modelo}/>
                <p>    
                    Fabricante:  
                </p>
                <input className="input" type="text" placeholder={this.props.fabricanteData} name="Fabricante" onChange={this.setFabricante} value={this.state.fabricante}/>
                <p>    
                    Tipo:  
                </p>
                <input className="input" type="text" placeholder={this.props.tipoData}name="Tipo" onChange={this.setTipo} value={this.state.tipo}/>
                <p>    
                    Gasolina:  
                </p> 
                <input className="input" type="text" placeholder={this.props.gasolinaData} name="Gasolina" onChange={this.setGasolina} value={this.state.gasolina}/>
            </div>
        )
    }
}*/

class EditModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            carData: null,
            isEditing: false,
            nomeData: "Nome",
            modeloData: "Modelo",
            fabricanteData: "Fabricante",
            tipoData: "Tipo",
            gasolinaData: "Gasolina",
            disableReadOnly: false
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.listenerClick = this.listenerClick.bind(this);
        this.setIsEditing = this.setIsEditing.bind(this);
        this.onChildChanged = this.onChildChanged.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.wrapperRef = React.createRef();
    }

    /*saveJson(){
        const obj={albumId:'1', id:'2', photoId:'2', title:'abcd', thumbnailUrl:'https://abcd.com', url:'https://abcd.com'}
        this.props.saveChanges({
            key: this.props.modalData,
            obj
        }) 
    }*/

    setWrapperRef(node){
        if(node !== undefined)
        this.wrapperRef = node;
    }

    setIsEditing(event){
        event.stopPropagation();
        if(this.state.isEditing === false){ //not editing
             this.setState({
                isEditing: true, 
                disableReadOnly: true});
        }else{ //editing
            this.setState({
                isEditing: false,    
                disableReadOnly: false});
                console.log("coisa")
            //this.onChildChanged(this.props.modalData.car_name, this.props.modalData.car_model, this.props.modalData.car_manufacturer, this.props.modalData.car_type, this.props.modalData.car_fuel);
        }
    }

     onInputChanged(data){
        //await this.setState({data: data});
        console.log("mudo")
    }

    async onChildChanged(nome, modelo, fabricante, tipo, gasolina){
        if(nome !== undefined){
            await this.setState({nomeData: nome});
        }
        if(modelo !== undefined){
            await this.setState({modeloData: modelo});
        }
        if(fabricante !== undefined){
            await this.setState({fabricanteData: fabricante});
        }
        if(tipo !== undefined){
            await this.setState({tipoData: tipo});
        }
        if(gasolina !== undefined){
            await this.setState({gasolinaData: gasolina});
        }
        console.log("Funcao chamada", this.state.nomeData)
        console.log("----", this.state.modeloData)
        this.forceUpdate();
    }

    listenerClick(event){
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.props.isOpenModal) {
            this.props.callbackParent(false);
        }
    }

    componentDidMount(){
        document.addEventListener('click', this.listenerClick);
        this.setState({nomeData: this.props.modalData?.car_name || "Nome"});
        this.setState({modeloData: this.props.modalData?.car_model || "Modelo"});
        this.setState({fabricanteData: this.props.modalData?.car_manufacturer || "Fabricante"});
        this.setState({tipoData: this.props.modalData?.car_type || "Tipo"});
        this.setState({gasolinaData: this.props.modalData?.car_fuel || "Gasolina"});
        //document.addEventListener('keyDown', this.listenerClick);
    }

    /*componentWillUnmount(){
        //document.removeEventListener('keyDown', this.listenerClick);
        document.removeEventListener('click', this.listenerClick);
        console.log("desmonto", this.props.modalData)
    }*/
    
    render(){
        return(
            <div ref={this.setWrapperRef} className="modal">
                <div className="modal-content">
                    <button className="closeModalButton" onClick={() => this.props.callbackParent(false)}>X</button>

                        <b>{!this.state.isEditing? "": "Edição de "}Carro</b><br/><hr/>

                        <div className="inputGrid">
                            <p>Carro: </p>  <InputComponent disable={this.state.disableReadOnly} data={this.state.nomeData} onChange={() => this.onInputChanged} />    
                            <p>Modelo: </p> <InputComponent disable={this.state.disableReadOnly} data={this.state.modeloData} onChange={() => this.onInputChanged}/> 
                            <p>Fabricante: </p> <InputComponent disable={this.state.disableReadOnly} data={this.state.fabricanteData} onChange={() => this.onInputChanged}/> 
                            <p>Tipo: </p> <InputComponent disable={this.state.disableReadOnly} data={this.state.tipoData} onChange={() => this.onInputChanged}/>
                            <p>Gasolina: </p> <InputComponent disable={this.state.disableReadOnly} data={this.state.gasolinaData} onChange={() => this.onInputChanged}/>
                        </div>
                        { this.state.isEditing === false?
                                <button className={"editModalButton"} onClick={this.setIsEditing}>Editar</button>
                            : 
                            <>
                                <button className={"saveModalButton"} onClick={this.setIsEditing}>Salvar</button>
                                <button className={"cancelModalButton"} onClick={() => this.props.callbackParent(false)}>Cancelar</button>
                            </>

                        }
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
                <tr onClick={this.toggleBodyItem}
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