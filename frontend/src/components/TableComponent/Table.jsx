import React from "react";
import "./Table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserSecret, faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import InputComponent from "../InputComponent/Input";
import NotificationComponent from "../NotificationComponent/NotificationComponent";
import translation from '../../users/Translation';

/**
     * @function frontend\src\components\TableComponent\Table.jsx
     * @summary - Shows data in table format
     * @returns {Element} - Return a react element
     */
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

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.dataList !== this.props.dataList){
            return true;
        }
        if(nextProps.auxCarList !== this.props.auxCarList){
            return true;
        }
        if(nextState.isOpenModal !== this.state.isOpenModal){
            return true;
        }
        if(nextState.currentPage !== this.state.currentPage){
            return true;
        }
        if(nextState.isNotification !== this.state.isNotification){
            return true;
        }
        return false;
    }

    /*Notification*/
    /**
     * @function frontend\src\components\TableComponent\Table.isNotificationOpen
     * @summary - Toggle notification
     */
    isNotificationOpen(){
        this.setState({
            isNotification: !this.state.isNotification,});
    }

    /*Edit Modal*/
    /**
     * @function frontend\src\components\TableComponent\Table.changeIsOpenModal
     * @summary - Toggle edit modal
     */
    changeIsOpenModal(bool){
        this.setState({
            isOpenModal: bool
        });
    }
    /**
     * @function frontend\src\components\TableComponent\Table.changeModalData
     * @summary - Change modal user and car data
     */
    changeModalData(user, car){
        this.setState({
            modalUser: user,
            modalData: car
        });
    }

    /**
     * @function frontend\src\components\TableComponent\Table.onChangedModalCar
     * @summary - Change modal car to the edited new car
     */
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
    /**
     * @function frontend\src\components\TableComponent\Table.onPageChange
     * @summary - Toggle current page
     */
    onPageChange(start, end, current){
        this.setState({
            startsOn: start,
            endsOn: end,
            currentPage: current
        });
    }

    /*Builds*/
     /**
     * @function frontend\src\components\TableComponent\Table.buildHeader
     * @summary - Shows list as table header
     * @returns {Element} - Return a react element
     */
    buildHeader(listHeader){
        return(
            <thead key={`Header`}>
                <tr key={`HeaderColumn`}>
                    {listHeader.map((column) => {
                            return <th key={`column_${column}`}>{translation[column]? translation[column] : column}</th>
                        })}
                </tr>
            </thead>
        );
    }
    /**
     * @function frontend\src\components\TableComponent\Table.buildBody
     * @summary - Shows list as table list
     * @returns {Element} - Return a react element
     */
    buildBody(dataList, columnsList, tagId, auxCarDataList, auxJobDataList){
        const list = [];
        for (let index = this.state.startsOn; index < this.state.endsOn; index++) {
            const data = dataList[index];
            list.push(
                this.buildItem(data, columnsList,tagId,auxCarDataList,auxJobDataList)
            );
        }
        return list;
    }
    /**
     * @function frontend\src\components\TableComponent\Table.buildItem
     * @summary - Shows each item in a Item component
     * @returns {Element} - Return a react element
     */
    buildItem(data, columnsList,tagId,auxCarDataList,auxJobDataList){
        return(
            <Item 
                key={Math.random()}
                isOpenModal={this.state.isOpenModal}
                changeIsOpenModal={this.changeIsOpenModal}
                
                columnsList={columnsList}
                data={data}
                tagId={tagId}

                auxCarDataList={auxCarDataList}
                auxJobDataList={auxJobDataList}
                auxProductList={this.props.auxProductList}
                auxAccessList={this.props.auxAccessList}
                auxAddressesList={this.props.auxAddressesList}

                changeModalData={this.changeModalData}
            ></Item>
        );
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
                    key={Math.random()}
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
                <table key={`Table${Math.random()}`}>
                    {this.buildHeader(this.props.columns,this.props.chosenList)}
                    <tbody key={`Tbody${Math.random()}`}>
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

/**
     * @function frontend\src\components\TableComponent\Table\Paginator
     * @summary - Manage page change
     * @returns {Element} - Return a react element
     */
class Paginator extends React.Component{
    constructor(props){
        super(props);
        const totalItems = this.props.totalItems;
        const numMaxPages = Math.ceil(totalItems / 20);
        
        this.numPages = numMaxPages;
        
        this.btnChangeOption = this.btnChangeOption.bind(this);
        this.handlePageOptionChange = this.handlePageOptionChange.bind(this);
    }  

    /**
     * @function frontend\src\components\TableComponent\Table\Paginator.selectOptions
     * @summary - Manage main list selected
     */
    selectOptions(){
        const optionsArray = [];
        for (let page = 1; page <= this.numPages; page++) {
            optionsArray.push(<option key={'option_' + page} value={page}>{page} Pagina</option>);
        }
        return optionsArray;
    }

    /**
     * @function frontend\src\components\TableComponent\Table\Paginator.selectOptions
     * @summary - Manage next or previous pages
     */
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

    /**
     * @function frontend\src\components\TableComponent\Table\Paginator.handlePageOptionChange
     * @summary - Manage next or previous pages variables
     */
    handlePageOptionChange(event) {
        let newOptionValue = parseInt(event.target.value);
        let newStart = 20 * (newOptionValue - 1);
        let newEnd =  20 * newOptionValue;

        //atualizar end start
        this.props.onPageChange(newStart, newEnd, newOptionValue);
    }

    render(){
        return(
            <div className="paginatorWrapper">
                <p className="paginatorPara">Exibindo: {this.props.startsOn+1}-{this.props.endsOn}</p>
                <p className="paginatorPara">Total: {this.props.totalItems}</p>

                <button className='btnPaginator' onClick={()=>this.btnChangeOption(false)}>{<FontAwesomeIcon icon={faArrowLeft} />}</button>
                <select className="selector" id="select" onChange={this.handlePageOptionChange} value={this.props.currentPage}>
                    {this.selectOptions()}
                </select>
                <button className='btnPaginator' onClick={()=>this.btnChangeOption(true)}>{<FontAwesomeIcon icon={faArrowRight} />}</button>
            </div>   
        )
    }
}

/**
     * @function frontend\src\components\TableComponent\Table\EditModal
     * @summary - Manage and handle edit car from a current user
     * @returns {Element} - Return a react element
     */
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
    
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.setWrapperRef
     * @summary - Verify current node has reference
     */
    setWrapperRef(node){
        if(node !== undefined)
        this.wrapperRef = node;
    }

    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.setIsEditing
     * @summary - Create a new car to call Table.onChangedModalCar
     */
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

    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.hasSomeInputChanged
     * @summary - Verify if some input has changed
     */
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
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onNameChanged
     * @summary - Save car name variable
     */
    onNameChanged(data){
        this.setState({
            nomeData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(data.target.value, this.state.modeloData, this.state.fabricanteData, this.state.tipoData, this.state.gasolinaData)});
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onModeloChanged
     * @summary - Save car model variable
     */
    onModeloChanged(data){
        this.setState({
            modeloData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nomeData, data.target.value, this.state.fabricanteData, this.state.tipoData, this.state.gasolinaData)});
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onFabricanteChanged
     * @summary - Save car manufacturer variable
     */
    onFabricanteChanged(data){
        this.setState({
            fabricanteData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nomeData, this.state.modeloData, data.target.value, this.state.tipoData, this.state.gasolinaData)});
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onTipoChanged
     * @summary - Save car type variable
     */
    onTipoChanged(data){
        this.setState({
            tipoData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nomeData, this.state.modeloData, this.state.fabricanteData, data.target.value, this.state.gasolinaData)});
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onGasolinaChanged
     * @summary - Save car fuel variable
     */
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
        this.state = {
            isOpenItem: false,
        }

        this.viewButtonFunc = this.viewButtonFunc.bind(this);
        this.setIsOpenItem = this.setIsOpenItem.bind(this);
        this.formateSalary = this.formateSalary.bind(this);
        this.formateDate = this.formateDate.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.auxCarDataList !== this.props.auxCarDataList){
            return true;
        }
        if(nextState.isOpenItem !== this.state.isOpenItem){
            return true;
        }
        return false;
    }

    setIsOpenItem(){
        this.setState({
            isOpenItem: !this.state.isOpenItem
        });
    }

    viewButtonFunc(){
        this.props.changeIsOpenModal(true);
        this.props.changeModalData(this.props.data, this.props.auxCarDataList[this.props.data.user_car_id]);
    }

    formateSalary(){
        const salaryFormated = this.props.auxJobDataList[this.props.data[this.props.tagId]]
                                                                .user_job_salary
                                                                ?.replace(".", ",") || "";
        const currencyFormated = this.props.auxJobDataList[this.props.data[this.props.tagId]]
                                                                .user_job_salary_currency_symbol;
        return currencyFormated + " " + salaryFormated;
    }
    formateDate(date){
        let newdate = new Date(date);
        const day = newdate.getDate() < 10? "0" + newdate.getDate() : newdate.getDate();
        const month = (newdate.getMonth() + 1) < 10? "0" + (newdate.getMonth() + 1) : (newdate.getMonth() + 1);
        let dataFormated = day + "/" + month + "/" + newdate.getFullYear(); 
        return(dataFormated);
    }
    
    render(){
        return(
            <>            
                <tr key={`line_${this.props.data[this.props.tagId]}`} 
                    className="item" 
                    onClick={this.props.auxCarDataList !== "notNeeded" && this.props.auxJobDataList !== "notNeeded"? this.setIsOpenItem:null}>
                    
                    {this.props.auxCarDataList !== "notNeeded" && this.props.auxJobDataList !== "notNeeded"? 
                        this.props.columnsList.map((column) => {
                            if((column === "Salário") 
                            && (this.props.auxJobDataList[this.props.data[this.props.tagId]] !== undefined)){
                                const salary = this.formateSalary();
                                return(
                                    <td key={`item_${this.props.data[this.props.tagId]}_${column}`} >
                                        {salary}
                                    </td>
                                )
                            }
                            else if(column === "Carro"){
                                return(
                                    <td key={`item_${this.props.data[this.props.tagId]}_${column}`} >
                                        <button className="btnVisualizar" onClick={this.viewButtonFunc} >Visualizar</button>
                                    </td>
                                )
                            }
                            else if(column === "Status"){
                                return(
                                    <td key={`item_${this.props.data[this.props.tagId]}_${column}`}>
                                        {this.props.data.status === true?
                                            <FontAwesomeIcon style={{color : '#20B2AA'}} icon={faUser} /> 
                                        : 
                                        this.props.data.status === false?
                                            <FontAwesomeIcon style={{color : '#FF6347'}} icon={faUser} /> 
                                        :
                                            <FontAwesomeIcon style={{color : '#4F4F4F'}} icon={faUserSecret} />
                                    }</td>
                                )
                            }else if(column === "user_birth_date"){
                                const birthdate = this.formateDate(this.props.data[column]);
                                return(
                                    <td key={`item_${this.props.data[this.props.tagId]}_${column}`} >{birthdate}</td>
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
                </tr>
                {this.props.auxCarDataList !== "notNeeded" && this.props.auxJobDataList !== "notNeeded" && 
                    this.state.isOpenItem === true?
                        <ItemBody 
                            user={this.props.data} 
                            currentCar={this.props.auxCarDataList[this.props.data.user_car_id]}
                            currentJob={this.props.auxJobDataList[this.props.data.user_job_id]}
                            currentProduct={this.props.auxProductList[this.props.data.user_product_buyed_id]}
                            currentAccess={this.props.auxAccessList[this.props.data.user_access_id]}
                            currentAdresses={this.props.auxAddressesList[this.props.data.user_address_id]}
                        />
                    : null
                }
            </>

        );
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
            <tr key={`itemBody_${this.props.user}`} className="modal">
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