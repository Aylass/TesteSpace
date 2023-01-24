import React from "react";
import "./Table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserSecret, faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import InputComponent from "../InputComponent/Input";
import NotificationComponent from "../NotificationComponent/NotificationComponent";
import PropTypes from "prop-types";

class Table extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            startsOn: 0,
            endsOn: 20,
            isOpenModal: false,
            modalData: null, //current user car from Modal
            modalUser: null, //current user from Modal
            isNotification: false,
        }

        /*Notification*/
        this.typeNotification = "Warning";

        /*Paginator Bind*/
        this.onPageChange = this.onPageChange.bind(this);
        /*Edit Modal Bind*/
        this.changeIsOpenModal = this.changeIsOpenModal.bind(this);
        this.changeModalData = this.changeModalData.bind(this);
        this.isNotificationOpen = this.isNotificationOpen.bind(this);
        this.onChangedModalCar = this.onChangedModalCar.bind(this);
    }

    /*Notification*/
    isNotificationOpen(){
        this.setState({
            isNotification: !this.state.isNotification,});
            console.log(this.state.isNotification)
    }

    /*Edit Modal*/
    changeIsOpenModal(bool){
        console.log("chamo", bool)
        this.setState({
            isOpenModal: bool
        });
    }
    changeModalData(user, car){
        this.setState({
            modalUser: user,
            modalData: car
        });
    }

    onChangedModalCar(modalCar) {
        try {
            this.typeNotification = "Success";
            
            let listCarsObjectCopy = {...this.props.auxCarDataList};
            let listUserObjectCopy = [...this.props.dataList];
            const newCarId = (Object.keys(listCarsObjectCopy).length) + 1;
            modalCar.car_id = newCarId
            listCarsObjectCopy[newCarId] = modalCar;
            for(let i=0; i<this.props.dataList.length; i++){
                const user = this.props.dataList[i];
                if((user.user_car_id === this.state.modalUser.user_car_id)&&(user.user_id === this.state.modalUser.user_id)){
                    listUserObjectCopy[i].user_car_id = newCarId;
                    this.notificationDescription = `Carro de ${user.user_first_name} foi editado com`;
                    break;
                }
            }
            this.props.saveEditedData(listUserObjectCopy,listCarsObjectCopy);
        } catch (error) {
            this.typeNotification = "Error";
            this.notificationDescription = `Ocorreu um erro.`;
        }
    }

    /*Paginator*/
    onPageChange(start, end, current){
        this.setState({
            startsOn: start,
            endsOn: end,
            currentPage: current
        });
    }

    /*Builds*/ 
    buildHeader(listHeader){
        return(
            <>
                {
                    <thead>
                        <tr>
                            {listHeader.map((column) => {
                                    return <th key={`column_${column}`}>{column}</th>
                                })}
                        </tr>
                    </thead>
                }
            </>
        );
    }
    buildBody(dataList, columnsList, tagId, auxCarDataList, auxJobDataList){
        const list = [];
        for (let index = this.state.startsOn; index < this.state.endsOn; index++) {
            const data = dataList[index];
            list.push(
                <tr key={`line_${data[tagId]}`} className="item">
                    {this.buildItem(data, columnsList,tagId,auxCarDataList,auxJobDataList)}
                </tr>
            );
        }
        return list;
    }
    buildItem(data, columnsList,tagId,auxCarDataList,auxJobDataList){
        return(
            <>
                <Item 
                    isOpenModal={this.state.isOpenModal}
                    changeIsOpenModal={this.changeIsOpenModal}

                    columnsList={columnsList}
                    data={data}
                    tagId={tagId}
                    auxCarDataList={auxCarDataList}
                    auxJobDataList={auxJobDataList}

                    changeModalData={this.changeModalData}
                ></Item>
            </>
        );
    }

    render(){
        console.log(this.state.isNotification)
        return(
            <>
                {this.isNotification?
                    <NotificationComponent 
                        tipo={this.typeNotification}
                        titulo="Edição de Carro"
                        notificationDescription={this.notificationDescription}
                        closeNotification={this.isNotificationOpen}
                    /> 
                : null}
                <Paginator 
                    mainListChange={this.mainListChange}
                    totalItems={this.props.dataList.length} 
                    currentPage={this.state.currentPage} 
                    startsOn={this.state.startsOn} 
                    endsOn={this.state.endsOn} 
                    onPageChange={this.onPageChange}
                />
                {this.state.isOpenModal?
                    <div className="divModal"> 
                        <EditModal 
                            isOpenModal={this.state.isOpenModal} 
                            modalData={this.state.modalData} 
                            modalUser={this.state.modalUser}

                            onChangedModalCar={this.onChangedModalCar}
                            changeIsOpenModal={this.changeIsOpenModal} 
                        
                            openNotification={this.isNotificationOpen}
                        /> 
                    </div>
                : <></>}
                <table>
                    {this.buildHeader(this.props.columns,this.props.chosenList)}
                    <tbody>
                        {this.buildBody(
                            this.props.dataList,
                            this.props.columns,
                            this.props.tagId,
                            this.props.auxCarDataList,
                            this.props.auxJobDataList)}
                    </tbody>
                </table>
            </>
        )
    }
}

class TableOld extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mainList: this.props.dataRow,
            numMainList: 1,
            isOpenModal: false,
            isNotification: false,
            modalData: null,
            modalUser: null,
            modalCar: {},
            listCars: this.props.dataCars,
            listUsers: this.props.dataRow,
            currentPage: 1,
            startsOn: 0,
            endsOn: 20,
        }
        this.listJob = this.props.dataJobs;
        this.listProducts = this.props.dataProducts;
        this.listAccess = this.props.dataAccess;
        this.listAdresses = this.props.dataAddresses;
        this.typeNotification = "Warning";
        this.notificationDescription = "Confira os dados inseridos.";

        //Modal
        this.openEditModal = this.openEditModal.bind(this);
        this.onChildChanged = this.onChildChanged.bind(this);
        this.onChildChangedModalData = this.onChildChangedModalData.bind(this);
        this.onChildChangedModalCar = this.onChildChangedModalCar.bind(this);
        this.onChangedModalCar = this.onChangedModalCar.bind(this);
        this.onChildChangedModalUserData = this.onChildChangedModalUserData.bind(this);
        this.isNotificationOpen = this.isNotificationOpen.bind(this);

        //Paginator
        this.onPageChange = this.onPageChange.bind(this);
        this.mainListChange = this.mainListChange.bind(this);
    }

    changetoArray(){

    }

    mainListChange(numb){
        //menu seleciona usuário
        
        let currentList = this.state.mainList;
        if(numb === 2){ //menu seleciona carro
            currentList = this.props.dataCars;
        }else if(numb === 3){//menu seleciona trabalho
            currentList = this.props.dataJobs;
        }
        this.setState({
            mainList: currentList,
            numMainList: numb
        });
    }

    isNotificationOpen(){
        this.setState({isNotification: !this.state.isNotification});
    }

    buildHeader(){
        return(
            <>
                {this.state.numMainList === 1?
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Nascimento</th>
                            <th>Salário</th>
                            <th>Carro</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                : this.state.numMainList === 2?
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Modelo</th>
                            <th>Tipo</th>
                            <th>Fabricante</th>
                            <th>Gasolina</th>
                        </tr>
                    </thead>
                :
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Título</th>
                            <th>Endereço</th>
                            <th>Moeda</th>
                            <th>Salário</th>
                        </tr>
                    </thead>
                }
            </>
        );
    }

    openEditModal(event){  
        event.stopPropagation();
        this.setState({isOpenModal: true});
    }

    onChildChanged(bool) {
        this.setState({isOpenModal: bool});
    }

    onChildChangedModalData(data) {
        this.setState({modalData: data});
    }
    onChildChangedModalCar(data) {
        this.setState({modalCar: data});
    }
    onChildChangedModalUserData(data) {
        this.setState({modalUser: data});
    }


    onPageChange(start, end, current){
        this.setState({
            startsOn: start,
            endsOn: end,
            currentPage: current
        });
    }
    
    onChangedModalCar(modalCar) {
        try {
            console.log("ola")
            this.typeNotification = "Success";
            
            let listCarsObjectCopy = {...this.state.listCars};
            let listUserObjectCopy = [...this.state.listUsers];
            const newCarId = (Object.keys(listCarsObjectCopy).length) + 1;
            modalCar.car_id = newCarId
            listCarsObjectCopy[newCarId] = modalCar;
            for(let i=0; i<this.state.listUsers.length; i++){
                const user = this.state.listUsers[i];
                if((user.user_car_id === this.state.modalUser.user_car_id)&&(user.user_id === this.state.modalUser.user_id)){
                    listUserObjectCopy[i].user_car_id = newCarId;
                    this.notificationDescription = `Carro de ${user.user_first_name} foi editado com`;
                    break;
                }
            }
            this.setState({
                listCars: listCarsObjectCopy,
                listUsers: listUserObjectCopy});
        } catch (error) {
            this.typeNotification = "Error";
            this.notificationDescription = `Ocorreu um erro.`;
        }
    }

    mapItemsUser(){
        const list = [];
        for (let index = this.state.startsOn; index < this.state.endsOn; index++) {
            const user = this.state.listUsers[index];
            //user -------------------------------------------------------
                let userName = "";
                let userId = "";
                let userDate = "";
                let userSalary = "";
                let userCarId = "";
                let userStatus = "";

                if(user.user_first_name){
                    userName = user.user_first_name;
                }
                if(user.user_birth_date){
                    userDate = user.user_birth_date.split("/");
                    userDate = userDate[1] + "/" + userDate[0] + "/" + userDate[2]
                }
                if(user.user_job_id){
                    userSalary = user.user_job_id;
                }
                if(user.user_car_id){
                    userCarId = user.user_car_id;
                }
                if(user.user_access_id){
                    userId = user.user_access_id;
                }
                userStatus = user.status;

                //user cars-------------------------------------------------------
                const userCurrentCar = this.state.listCars[userCarId];
                
                //user emprego-------------------------------------------------------
                const userCurrentJob = this.props.dataJobs[userSalary];
                
                //user produtos-------------------------------------------------------
                const userCurrentProduct = this.props.dataProducts[userSalary];
                
                //user Acessos-------------------------------------------------------
                const userCurrentAccess = this.props.dataAccess[userId];
                
                //user Endereços-------------------------------------------------------
                const userCurrentAddresses = this.props.dataAddresses[userId];
            list.push(<Item 
                object={user}
                numbList={this.props.numbList}
                column1={userName}
                column2={userDate}
                column3={userCurrentJob?.user_job_salary || ""}
                column4={"buttom"}
                column5={userStatus}
                    modalData={this.onChildChangedModalData}
                    key={`item_${user.user_id}`} 
                    name={userName} 
                    date={userDate} 
                    currency={userCurrentJob?.user_job_salary_currency_symbol || ""}
                    salary={userCurrentJob?.user_job_salary || ""} 
                    status={userStatus} 
                    user={user}
                    currentCar={userCurrentCar}
                    onChangedModalCar={this.onChangedModalCar}
                    onChildChangedModalUserData={this.onChildChangedModalUserData}
                    currentJob={userCurrentJob}
                    currentProduct={userCurrentProduct}
                    currentAccess={userCurrentAccess}
                    currentAdresses={userCurrentAddresses}
                    openEditModal={this.openEditModal}/>);
        }
        return list;
    }

    mapItemsCars(){
        const list = [];
        for (let index = this.state.startsOn; index < this.state.endsOn; index++) {
            const car = this.state.mainList[index];
            list.push(<Item 
                object={car}
                numbList={this.props.numbList}
                column1={car.car_name}
                column2={car.car_model}
                column3={car.car_type}
                column4={car.car_manufacturer}
                column5={car.car_fuel}
            />);
        }
        return list
    }

    mapItemsJobs(){
        const list = [];
        for (let index = this.state.startsOn; index < this.state.endsOn; index++) {
            const job = this.state.mainList[index];

            const salaryFormated = job.user_job_salary?.replace(".", ",") || "";
            list.push(<Item 
                object={job}
                numbList={this.props.numbList}
                column1={job.user_job_id}
                column2={job.user_job_title}
                column3={job.user_job_address}
                column4={job.user_job_salary_currency_symbol}
                column5={salaryFormated}
            />);
        }
        return list
    }
   

    render(){
        return(
            <>
                {this.state.isNotification?
                    <NotificationComponent 
                        tipo={this.typeNotification}
                        titulo="Edição de Carro"
                        notificationDescription={this.notificationDescription}
                        closeNotification={this.isNotificationOpen}
                    /> 
                : null}
                <Paginator 
                    mainListChange={this.mainListChange}
                    totalItems={this.state.listUsers.length} 
                    currentPage={this.state.currentPage} 
                    startsOn={this.state.startsOn} 
                    endsOn={this.state.endsOn} 
                    onPageChange={this.onPageChange}
                />
                {this.state.isOpenModal?
                    <div className="divModal"> 
                        <EditModal 
                            isOpenModal={this.state.isOpenModal} 
                            modalData={this.state.modalData} 
                            modalUser={this.state.modalUser}
                            onChildChangedModalCar={this.onChangedModalCar} 
                            //changeIsOpenModallalala={this.onChildChanged} 
                            openNotification={this.isNotificationOpen}
                        /> 
                    </div>
                    : <></>}
                <table>
                    {this.buildHeader()}
                    <tbody>
                        { this.state.numMainList === 1?
                            this.mapItemsUser()
                            : this.state.numMainList === 2?
                                this.mapItemsCars()
                            :
                                this.mapItemsJobs()
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animateOpenMenu: "",
            isMenuOpen: false
        }
        this.openMenu = this.openMenu.bind(this);
    }
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

class Paginator extends React.Component{
    constructor(props){
        super(props);
        const totalItems = this.props.totalItems;
        const numMaxPages = Math.ceil(totalItems / 20);
        
        this.numPages = numMaxPages;
        
        this.btnChangeOption = this.btnChangeOption.bind(this);
        this.handlePageOptionChange = this.handlePageOptionChange.bind(this);
    }  

    selectOptions(){
        const optionsArray = [];
        for (let page = 1; page <= this.numPages; page++) {
            optionsArray.push(<option key={'option' + page} value={page}>{page} Pagina</option>);
        }
        return optionsArray;
    }

    btnChangeOption(isRight){
        let count = this.props.currentPage;
        let newStart;
        let newEnd;
        if(isRight){//direita
            count = count+1;
            newStart = parseInt(this.props.startsOn + 20);
            newEnd = parseInt(this.props.endsOn + 20);
        }else{//esquerda
            count = count-1;
            newStart = parseInt(this.props.startsOn - 20);
            newEnd = parseInt(this.props.endsOn - 20); 
        }
        
        if(count <= this.numPages && count > 0){
            this.props.onPageChange(newStart, newEnd, count);
        }
    }

    handlePageOptionChange(event) {
        let newOptionValue = parseInt(event.target.value);
        let newStart = 20 * (newOptionValue - 1);
        let newEnd =  20 * newOptionValue;

        //atualizar end start
        this.props.onPageChange(newStart, newEnd, newOptionValue);
    }

    render(){
        return(
            <>
                <div className="paginatorWrapper">
                    <p className="paginatorPara">Exibindo: {this.props.startsOn+1}-{this.props.endsOn}</p>
                    <p className="paginatorPara">Total: {this.props.totalItems}</p>
    
                    <button className='btnPaginator' onClick={()=>this.btnChangeOption(false)}>{<FontAwesomeIcon icon={faArrowLeft} />}</button>
                    <select className="selector" id="select" onChange={this.handlePageOptionChange} value={this.props.currentPage}>
                        {this.selectOptions()}
                    </select>
                    <button className='btnPaginator' onClick={()=>this.btnChangeOption(true)}>{<FontAwesomeIcon icon={faArrowRight} />}</button>
                </div>
            </>        
        )
    }
}

class EditModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            disabledSaveBtn: true,
            carData: this.props.carData,
            isEditing: false,
            nomeData: this.props.modalData?.car_name || "Nome",
            modeloData: this.props.modalData?.car_model || "Modelo",
            fabricanteData: this.props.modalData?.car_manufacturer || "Fabricante",
            tipoData: this.props.modalData?.car_type || "Tipo",
            gasolinaData: this.props.modalData?.car_fuel || "Gasolina",
        }
    
        this.listenerClick = this.listenerClick.bind(this);
        this.listenerESC = this.listenerESC.bind(this);
        this.setIsEditing = this.setIsEditing.bind(this);

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onModeloChanged = this.onModeloChanged.bind(this);
        this.onFabricanteChanged = this.onFabricanteChanged.bind(this);
        this.onTipoChanged = this.onTipoChanged.bind(this);
        this.onGasolinaChanged = this.onGasolinaChanged.bind(this);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.wrapperRef = React.createRef();
    }
    
    setWrapperRef(node){
        if(node !== undefined)
        this.wrapperRef = node;
    }

    setIsEditing(event){
        event.stopPropagation();
        if(this.state.isEditing === false){ //not editing
             this.setState({
                isEditing: true});
        }else{ //editing
            this.setState({
                isEditing: false});
                let newCar = {
                    car_id: this.props.modalData.car_id,
                    car_fuel: this.state.gasolinaData,
                    car_manufacturer: this.state.fabricanteData,
                    car_model: this.state.modeloData,
                    car_name: this.state.nomeData,
                    car_type: this.state.tipoData
                }
                this.props.onChangedModalCar(newCar,this.props.modalUser);
                this.props.openNotification();
        }
    }


    hasSomeInputChanged(nome, modelo, fabricante, tipo, gasolina){
        if((nome ===  this.props.modalData.car_name)
        && (modelo ===  this.props.modalData.car_model)
        && (fabricante ===  this.props.modalData.car_manufacturer)
        && (tipo ===  this.props.modalData.car_type)
        && (gasolina ===  this.props.modalData.car_fuel)
        ){//disable button
            return true;
        }
        return false;
    }
    onNameChanged(data){
        this.setState({
            nomeData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(data.target.value, this.state.modeloData, this.state.fabricanteData, this.state.tipoData, this.state.gasolinaData)});
    }
    onModeloChanged(data){
        this.setState({
            modeloData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nomeData, data.target.value, this.state.fabricanteData, this.state.tipoData, this.state.gasolinaData)});
    }
    onFabricanteChanged(data){
        this.setState({
            fabricanteData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nomeData, this.state.modeloData, data.target.value, this.state.tipoData, this.state.gasolinaData)});
    }
    onTipoChanged(data){
        this.setState({
            tipoData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nomeData, this.state.modeloData, this.state.fabricanteData, data.target.value, this.state.gasolinaData)});
    }
    onGasolinaChanged(data){
        this.setState({
            gasolinaData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nomeData, this.state.modeloData, this.state.fabricanteData, this.state.tipoData, data.target.value)});
    }

    listenerClick(event){
        if (this.wrapperRef 
            && !this.wrapperRef.contains(event.target) 
            && this.props.isOpenModal
            && event.target.className !== "btnVisualizar"
        ) {
            this.props.changeIsOpenModal(false);
        }
    }
    listenerESC(event){
            if(event.keyCode === 27)
                this.props.changeIsOpenModal(false);
    }

    componentDidMount(){
        document.addEventListener('click', this.listenerClick);
        document.addEventListener('keydown', this.listenerESC);
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.listenerClick);
        document.removeEventListener('keydown', this.listenerESC);
    }

    render(){
        return(
            <div ref={this.setWrapperRef} className="modal">
                <div className="modal-content">
                    <button className="closeModalButton" onClick={() => this.props.changeIsOpenModal(false)}>X</button>

                        <b>{!this.state.isEditing? "": "Edição de "}Carro</b><br/><hr/>

                        <div className="inputGrid">
                            <p>Carro: </p>  <InputComponent disabled={!this.state.isEditing} data={this.state.nomeData} onChange={this.onNameChanged} />    
                            <p>Modelo: </p> <InputComponent disabled={!this.state.isEditing} data={this.state.modeloData} onChange={this.onModeloChanged}/> 
                            <p>Fabricante: </p> <InputComponent disabled={!this.state.isEditing} data={this.state.fabricanteData} onChange={this.onFabricanteChanged}/> 
                            <p>Tipo: </p> <InputComponent disabled={!this.state.isEditing} data={this.state.tipoData} onChange={this.onTipoChanged}/>
                            <p>Gasolina: </p> <InputComponent disabled={!this.state.isEditing} data={this.state.gasolinaData} onChange={this.onGasolinaChanged}/>
                        </div>
                        { this.state.isEditing === false?
                                <button className={"editModalButton"} onClick={this.setIsEditing}>Editar</button>
                            : 
                            <>
                                <button className={this.state.disabledSaveBtn? "saveModalButtonDisable" : "saveModalButton"} disabled={this.state.disabledSaveBtn} onClick={this.setIsEditing}>Salvar</button>
                                <button className={"cancelModalButton"} onClick={() => this.props.changeIsOpenModal(false)}>Cancelar</button>
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

        this.viewButtonFunc = this.viewButtonFunc.bind(this);
    }

    viewButtonFunc(){
        
        // this.props.modalData(this.props.currentCar);
        // this.props.onChildChangedModalUserData(this.props.user);
        // this.props.openEditModal(event);
        this.props.changeIsOpenModal(true);
        this.props.changeModalData(this.props.data, this.props.auxCarDataList[this.props.data.user_car_id]);
    }
    
    render(){
        
        return(
            <>
                {this.props.auxCarDataList !== "notNeeded" && this.props.auxJobDataList !== "notNeeded"? 
                    this.props.columnsList.map((column) => {
                        if((column === "Salário") 
                        && (this.props.auxJobDataList[this.props.data[this.props.tagId]] !== undefined)){
                            const salaryFormated = this.props.auxJobDataList[this.props.data[this.props.tagId]]
                                                            .user_job_salary
                                                            ?.replace(".", ",") || "";
                            const currencyFormated = this.props.auxJobDataList[this.props.data[this.props.tagId]]
                                                            .user_job_salary_currency_symbol;

                            return(
                                <td key={`item_${this.props.data[this.props.tagId]}_${column}`} >
                                    {currencyFormated + " " + salaryFormated}
                                </td>
                            )
                        }
                        else if(column === "Carro"){
                            const currentCar = this.props.auxCarDataList[this.props.data.user_car_id];
                            return(
                                <td key={`item_${this.props.data[this.props.tagId]}_${column}`} >
                                    <button className="btnVisualizar" onClick={this.viewButtonFunc} >Visualizar</button>
                                </td>
                            )
                        }
                        else if(column === "Status"){
                            return(
                                <td>{this.props.data.status === true?
                                        <FontAwesomeIcon style={{color : '#20B2AA'}} icon={faUser} /> 
                                    : 
                                    this.props.data.status === false?
                                        <FontAwesomeIcon style={{color : '#FF6347'}} icon={faUser} /> 
                                    :
                                        <FontAwesomeIcon style={{color : '#4F4F4F'}} icon={faUserSecret} />
                                }</td>
                            )
                        }
                        return(
                            <td key={`item_${this.props.data[this.props.tagId]}_${column}`} >{this.props.data[column]}</td>
                        )
                    })
                :
                    this.props.columnsList.map((column) => {
                        return(
                            <td key={`item_${this.props.data[this.props.tagId]}_${column}`} >{this.props.data[column]}</td>
                        )
                    })
                }
                
            </>
        );
    }
}

class Itemold2 extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
         isOpenItem : false,
        }
    }
    
    render(){
        return(
            <>
                <tr 
                    onClick={
                        this.props.numbList === 1?
                         this.toggleBodyItem
                         : null
                    } 
                    className="item"
                    >
                        <td>{this.props.column1}</td>
                        <td>{this.props.column2}</td>
                        <td>{this.props.column3}</td>
                        <td>{this.props.column4}</td>
                        <td>{this.props.column5}</td>
                </tr>
                {this.state.isOpenItem === false? null :
                    <ItemBody 
                        user={this.state.itemUser} 
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

class ItemVelho extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
         isOpenItem : false,
        }
        this.toggleBodyItem = this.toggleBodyItem.bind(this);
        this.viewButtonFunc = this.viewButtonFunc.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.isOpenItem !== this.state.isOpenItem){
            return true;
        }
        if(nextProps.currentCar !== this.props.currentCar){
            return true;
        }
        return false;
    }

    toggleBodyItem(){
        this.setState({isOpenItem : !this.state.isOpenItem});
    }

    viewButtonFunc(event){
        this.props.modalData(this.props.currentCar);
        this.props.onChildChangedModalUserData(this.props.user);
        this.props.openEditModal(event);
    }

    render(){
        
        const salaryFormated = this.props.salary?.replace(".", ",") || "";
        return(
            <>
                <tr onClick={this.toggleBodyItem} className="item"
                >
                    <td>{this.props.name}</td>
                    <td>{this.props.date}</td>
                    {/*Salary Column*/}
                    <td>
                        {this.props.currency} 
                        {this.props.salary? ":" : null} 
                        {salaryFormated} 
                    </td>

                    <td><button className="btnVisualizar" onClick={this.viewButtonFunc} >Visualizar</button></td>
                    <td>{this.props.status === true?
                        <FontAwesomeIcon style={{color : '#20B2AA'}} icon={faUser} /> : 
                    
                        this.props.status === false?
                        <FontAwesomeIcon style={{color : '#FF6347'}} icon={faUser} /> :
                        <FontAwesomeIcon style={{color : '#4F4F4F'}} icon={faUserSecret} />
                    }</td>
                </tr>
                {this.state.isOpenItem === false? null :
                    <ItemBody 
                        user={this.state.itemUser} 
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

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.tabOpenModal !== this.state.tabOpenModal){
            return true;
        }
        if(nextProps.currentCar !== this.props.currentCar){
            return true;
        }
        return false;
    }

    render(){
        return(
            <tr className="modal">
                <td>
                    <div className="tabItemBody" onClick={() => this.toggleModal(1)}> 
                        <span>Carro</span>
                    </div>
                    <div className="tabItemBody" onClick={() => this.toggleModal(2)}>
                        <span>Emprego</span>
                    </div> 
                    <div className="tabItemBody" onClick={() => this.toggleModal(3)}>
                        <span>Produto</span>
                    </div>
                    <div className="tabItemBody" onClick={() => this.toggleModal(4)}>
                        <span>Acessos</span>
                    </div>
                    <div className="tabItemBody"  onClick={() => this.toggleModal(5)}>
                        <span>Endereço</span> 
                    </div>
                </td>
                <td colSpan="5" rowSpan="1">
                    <Modal  
                        openModal={this.state.tabOpenModal} 
                        currentCar={this.props.currentCar}
                        currentJob={this.props.currentJob}
                        currentProduct={this.props.currentProduct}
                        currentAccess={this.props.currentAccess}
                        currentAdresses={this.props.currentAdresses}
                    />
                </td>
            </tr>
        )
    }
}

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tabOpenModal : this.props.openModal,
        }
        this.stringCutter = []
        if(this.props.currentAccess !== undefined){
            this.stringCutter = this.props.currentAccess.user_access_user_agent.split(" ");
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
                            <p className="tab">    
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
                            <p className="tab">          
                                Titulo: {this.props.currentJob?.user_job_title || ""} <br/>
                                Salário: {this.props.currentJob?.user_job_salary_currency_symbol || ""} {this.props.currentJob?.user_job_salary.replace(".", ",") || ""} <br/>
                                Endereço: {this.props.currentJob?.user_job_address || ""} <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 3? //Tab Produto
                        <>  
                            <div>
                                <b>Produto</b><br/><hr/>
                            </div>
                            <p className="tab">            
                                Nome: {this.props.currentProduct?.user_product_buyed_product_name || ""} <br/>
                                Fabricante: {this.props.currentProduct?.user_product_buyed_company_name || ""} <br/>
                                Preço: {this.props.currentProduct?.user_product_buyed_product_price.replace(".", ",") || ""} <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 4? //Tab Acessos
                        <>  
                            <div>
                                <b>Acessos</b><br/><hr/>
                            </div>
                            <p className="tab">          
                                Tecnologia: {this.props.currentAccess?.user_access_business_technoloy || ""} <br/>
                                Login: {this.props.currentAccess?.user_access_login || ""} <br/>
                                Endereço IP: {this.props.currentAccess?.user_access_ip_address || ""} <br/>
                                Endereço MAC: {this.props.currentAccess?.user_access_mac_address || ""} <br/>
                                Máquina: {this.stringCutter[0]} <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 5? //Tab Endereço
                        <>  
                            <div>
                                <b>Endereço</b><br/><hr/>
                            </div>
                            <p className="tab">  
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