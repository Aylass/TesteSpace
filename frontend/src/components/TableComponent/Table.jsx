import React from "react";
import "./Table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserSecret, faArrowRight, faArrowLeft, faBriefcaseClock} from '@fortawesome/free-solid-svg-icons'
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
            this.setState({
                currentPage: 1,
                startsOn: 0,
                endsOn: 20,});
            return true;
        }
        if(nextProps.auxCarList !== this.props.auxCarList){
            this.setState({
                currentPage: 1,
                startsOn: 0,
                endsOn: 20,});
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

            let listCarsObjectCopy = [...this.props.auxCarDataList];
            let listUserObjectCopy = [...this.props.dataList];

            const newCarId = listCarsObjectCopy.length+1;
            modalCar.car_id = newCarId;
            listCarsObjectCopy.push(modalCar);

            for(let i=0; i<this.props.dataList.length; i++){
                const user = this.props.dataList[i];

                if(user.user_id === this.state.modalUser.user_id){
                    listUserObjectCopy[i].user_car_id = newCarId;
                    this.notificationDescription = `Carro de ${user.user_first_name} foi editado com`;
                    break;
                }
            }
            this.props.saveEditedData(listUserObjectCopy,listCarsObjectCopy,modalCar,this.state.modalUser.user_id);
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

        for (let index = this.state.startsOn; index < this.state.endsOn+1; index++) {
            const data = dataList[index];

            if(data !== undefined){
                list.push(
                    this.buildItem(data, columnsList,tagId,auxCarDataList,auxJobDataList)
                );
            }else{break;}
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
                        type={this.typeNotification}
                        title="Edi????o de Carro"
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
            optionsArray.push(<option key={'option_' + page} value={page}>{page} P??gina</option>);
        }

        return optionsArray;
    }

    /**
     * @function frontend\src\components\TableComponent\Table\Paginator.btnChangeOption
     * @summary - Manage next or previous pages
     */
    btnChangeOption(isRight){
        let count = this.props.currentPage;

        let newStart;
        let newEnd;

        if(isRight){//right
            count = count+1;
            newStart = parseInt(this.props.startsOn + 20);
            newEnd = parseInt(this.props.endsOn + 20);
        }else{//left
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
        const newOptionValue = parseInt(event.target.value);
        const newStart = 20 * (newOptionValue - 1);
        const newEnd =  20 * newOptionValue;

        //update end start
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
            nameData: this.props.modalData?.car_name || "Nome",
            modelData: this.props.modalData?.car_model || "Modelo",
            manufacturerData: this.props.modalData?.car_manufacturer || "Fabricante",
            typeData: this.props.modalData?.car_type || "Tipo",
            fuelData: this.props.modalData?.car_fuel || "Gasolina",
        }
    
        //Functions to close the Modal
        this.listenerClick = this.listenerClick.bind(this);
        this.listenerESC = this.listenerESC.bind(this);
        this.setIsEditing = this.setIsEditing.bind(this);

        //Handle inputs change
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onModelChanged = this.onModelChanged.bind(this);
        this.onManufacturerChanged = this.onManufacturerChanged.bind(this);
        this.onTypeChanged = this.onTypeChanged.bind(this);
        this.onFuelChanged = this.onFuelChanged.bind(this);

        //Save element reference
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.wrapperRef = React.createRef();
    }

    componentDidMount(){
        document.addEventListener('click', this.listenerClick);
        document.addEventListener('keydown', this.listenerESC);
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.listenerClick);
        document.removeEventListener('keydown', this.listenerESC);
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
                const newCar = {
                    car_id: this.props.modalData.car_id,
                    car_fuel: this.state.fuelData,
                    car_manufacturer: this.state.manufacturerData,
                    car_model: this.state.modelData,
                    car_name: this.state.nameData,
                    car_type: this.state.typeData
                }
            this.props.onChangedModalCar(newCar,this.props.modalUser);
            this.props.openNotification();
        }
    }

    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.hasSomeInputChanged
     * @summary - Verify if some input has changed
     */
    hasSomeInputChanged(name, model, manufacturer, type, fuel){
        if((name ===  this.props.modalData.car_name)
        && (model ===  this.props.modalData.car_model)
        && (manufacturer ===  this.props.modalData.car_manufacturer)
        && (type ===  this.props.modalData.car_type)
        && (fuel ===  this.props.modalData.car_fuel)
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
            nameData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(data.target.value, this.state.modelData, this.state.manufacturerData, this.state.typeData, this.state.fuelData)});
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onModelChanged
     * @summary - Save car model variable
     */
    onModelChanged(data){
        this.setState({
            modelData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nameData, data.target.value, this.state.manufacturerData, this.state.typeData, this.state.fuelData)});
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onManufacturerChanged
     * @summary - Save car manufacturer variable
     */
    onManufacturerChanged(data){
        this.setState({
            manufacturerData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nameData, this.state.modelData, data.target.value, this.state.typeData, this.state.fuelData)});
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onTypeChanged
     * @summary - Save car type variable
     */
    onTypeChanged(data){
        this.setState({
            typeData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nameData, this.state.modelData, this.state.manufacturerData, data.target.value, this.state.fuelData)});
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.onFuelChanged
     * @summary - Save car fuel variable
     */
    onFuelChanged(data){
        this.setState({
            fuelData: data.target.value,
            disabledSaveBtn: this.hasSomeInputChanged(this.state.nameData, this.state.modelData, this.state.manufacturerData, this.state.typeData, data.target.value)});
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.listenerClick
     * @summary - Listener mouse click and verify if element clicked is on EditModal component.
     */
    listenerClick(event){
        if (this.wrapperRef 
            && !this.wrapperRef.contains(event.target) 
            && this.props.isOpenModal
            && event.target.className !== "btnVisualizar"
        ) {
            this.props.changeIsOpenModal(false);
        }
    }
    /**
     * @function frontend\src\components\TableComponent\Table\EditModal.listenerClick
     * @summary - Listener ESC click and close EditModal
     */
    listenerESC(event){
            if(event.keyCode === 27)
                this.props.changeIsOpenModal(false);
    }

    render(){
        return(
            <div ref={this.setWrapperRef} className="modal">
                <div className="modal-content">
                    <button className="closeModalButton" onClick={() => this.props.changeIsOpenModal(false)}>X</button>

                        <b>{!this.state.isEditing? "": "Edi????o de "}Carro</b><br/><hr/>

                        <div className="inputGrid">
                            <p>Carro: </p>  <InputComponent disabled={!this.state.isEditing} data={this.state.nameData} onChange={this.onNameChanged} />    
                            <p>Modelo: </p> <InputComponent disabled={!this.state.isEditing} data={this.state.modelData} onChange={this.onModelChanged}/> 
                            <p>Fabricante: </p> <InputComponent disabled={!this.state.isEditing} data={this.state.manufacturerData} onChange={this.onManufacturerChanged}/> 
                            <p>Tipo: </p> <InputComponent disabled={!this.state.isEditing} data={this.state.typeData} onChange={this.onTypeChanged}/>
                            <p>Gasolina: </p> <InputComponent disabled={!this.state.isEditing} data={this.state.fuelData} onChange={this.onFuelChanged}/>
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

/**
     * @function frontend\src\components\TableComponent\Table\Item
     * @summary - Wrap all line data
     * @returns {Element} - Return a react element
     */
class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpenItem: false,
        }

        this.viewButtonFunc = this.viewButtonFunc.bind(this);
        this.setIsOpenItem = this.setIsOpenItem.bind(this);

        //Formate variables
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

    /**
     * @function frontend\src\components\TableComponent\Table\Item.setIsOpenItem
     * @summary - Toggle isOpenItem variable
     */
    setIsOpenItem(){
        this.setState({
            isOpenItem: !this.state.isOpenItem
        });
    }

    /**
     * @function frontend\src\components\TableComponent\Table\Item.viewButtonFunc
     * @summary - Handle view button behavior
     */
    viewButtonFunc(){
        this.props.changeIsOpenModal(true);
        let currentUserCar;
        currentUserCar = this.props.auxCarDataList.filter((car, index, array) => {return car.car_id === this.props.data.user_car_id});

        this.props.changeModalData(this.props.data, currentUserCar[0]);
    }

    /**
     * @function frontend\src\components\TableComponent\Table\Item.formateSalary
     * @summary - Formate salary data
     */
    formateSalary(){
        const salaryFormatted = this.props.auxJobDataList[this.props.data[this.props.tagId]]
                                                                .user_job_salary
                                                                ?.replace(".", ",") || "";

        const currencyFormatted = this.props.auxJobDataList[this.props.data[this.props.tagId]]
                                                                .user_job_salary_currency_symbol;

        return (currencyFormatted + " " + salaryFormatted);
    }
    /**
     * @function frontend\src\components\TableComponent\Table\Item.formateDate
     * @summary - Formate date data
     */
    formateDate(date){
        let newDate = new Date(date);

        const day = newDate.getDate() < 10? "0" + newDate.getDate() : newDate.getDate();
        const month = (newDate.getMonth() + 1) < 10? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);

        const dataFormatted = day + "/" + month + "/" + newDate.getFullYear(); 
        return(dataFormatted);
    }
    
    render(){
        let currentCar;
        if((this.props.auxCarDataList !== "notNeeded") && (this.props.auxJobDataList !== "notNeeded")){
            const currentUserCarId = this.props.data.user_car_id;
            
            currentCar = this.props.auxCarDataList.filter((car) => {return car.car_id === currentUserCarId});
        }

        return(
            <>            
                <tr key={`line_${this.props.data[this.props.tagId]}`} 
                    className="item" 
                    onClick={this.props.auxCarDataList !== "notNeeded" && this.props.auxJobDataList !== "notNeeded"? this.setIsOpenItem:null}>
                    
                    {this.props.auxCarDataList !== "notNeeded" && this.props.auxJobDataList !== "notNeeded"? 
                        this.props.columnsList.map((column) => {
                            if((column === "Sal??rio") 
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
                                const birthDate = this.formateDate(this.props.data[column]);
                                return(
                                    <td key={`item_${this.props.data[this.props.tagId]}_${column}`} >{birthDate}</td>
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
                            currentCar={currentCar?.[0]}
                            currentJob={this.props.auxJobDataList[this.props.data.user_job_id]}
                            currentProduct={this.props.auxProductList[this.props.data.user_product_buyed_id]}
                            currentAccess={this.props.auxAccessList[this.props.data.user_access_id]}
                            currentAddresses={this.props.auxAddressesList[this.props.data.user_address_id]}
                        />
                    : null
                }
            </>

        );
    }
}

/**
     * @function frontend\src\components\TableComponent\Table\ItemBody
     * @summary - Handle item body data
     * @returns {Element} - Return a react element
     */
class ItemBody extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            tabOpenModal : 1,
        }
        this.toggleModal = this.toggleModal.bind(this);
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

    /**
     * @function frontend\src\components\TableComponent\Table\ItemBody.toggleModal
     * @summary - Toggle item modal
     */
    toggleModal(tab){
        this.setState({tabOpenModal : tab});
    }

    render(){
        console.log("current car item",this.props.currentCar)
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
                        <span>Endere??o</span> 
                    </div>
                </td>
                <td colSpan="5" rowSpan="1">
                    <Modal  
                        openModal={this.state.tabOpenModal}

                        currentCar={this.props.currentCar}
                        currentJob={this.props.currentJob}
                        currentProduct={this.props.currentProduct}
                        currentAccess={this.props.currentAccess}
                        currentAddresses={this.props.currentAddresses}
                    />
                </td>
            </tr>
        )
    }
}

/**
     * @function frontend\src\components\TableComponent\Table\Modal
     * @summary - Handle item data in a modal
     * @returns {Element} - Return a react element
     */
class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tabOpenModal : this.props.openModal,
        }

        this.stringCutter = []
        //Formate the current user access data
        if(this.props.currentAccess !== undefined){
            this.stringCutter = this.props.currentAccess.user_access_user_agent.split(" ");
        }
    }

    render(){
        console.log("current car",this.props.currentCar)
        return(
            <>
                {
                    this.props.openModal === 1? //Tab Car
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
                        this.props.openModal === 2? //Tab Job
                        <>  
                            <div>
                                <b>Emprego</b><br/><hr/>
                            </div>
                            <p className="tab">          
                                Titulo: {this.props.currentJob?.user_job_title || ""} <br/>
                                Sal??rio: {this.props.currentJob?.user_job_salary_currency_symbol || ""} {this.props.currentJob?.user_job_salary.replace(".", ",") || ""} <br/>
                                Endere??o: {this.props.currentJob?.user_job_address || ""} <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 3? //Tab Product
                        <>  
                            <div>
                                <b>Produto</b><br/><hr/>
                            </div>
                            <p className="tab">            
                                Nome: {this.props.currentProduct?.user_product_buyed_product_name || ""} <br/>
                                Fabricante: {this.props.currentProduct?.user_product_buyed_company_name || ""} <br/>
                                Pre??o: {this.props.currentProduct?.user_product_buyed_product_price.replace(".", ",") || ""} <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 4? //Tab Access
                        <>  
                            <div>
                                <b>Acessos</b><br/><hr/>
                            </div>
                            <p className="tab">          
                                Tecnologia: {this.props.currentAccess?.user_access_business_technoloy || ""} <br/>
                                Login: {this.props.currentAccess?.user_access_login || ""} <br/>
                                Endere??o IP: {this.props.currentAccess?.user_access_ip_address || ""} <br/>
                                Endere??o MAC: {this.props.currentAccess?.user_access_mac_address || ""} <br/>
                                M??quina: {this.stringCutter[0]} <br/>
                            </p>
                        </>
                        :
                        this.props.openModal === 5? //Tab Address
                        <>  
                            <div>
                                <b>Endere??o</b><br/><hr/>
                            </div>
                            <p className="tab">  
                                Pa??s: {this.props.currentAddresses?.user_address_country || ""} <br/>         
                                Estado: {this.props.currentAddresses?.user_address_state || ""} <br/>
                                Cidade: {this.props.currentAddresses?.user_address_city || ""} <br/>
                                Rua: {this.props.currentAddresses?.user_address_street_address || ""} <br/>
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