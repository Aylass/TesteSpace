import './App.css';
import React, { useEffect } from "react";
import Table from './components/TableComponent/Table';
import Menu from './components/MenuComponent/MenuComponent';
import NotificationComponent from "./components/NotificationComponent/NotificationComponent";
import Header from './components/HeaderComponent/HeaderComponent'
import { useState } from 'react';

/**
     * @function frontend\src\App
     * @summary - Handle application behavior
     * @returns {Element} - Return a react element
     */
function App() {

  //const [configList, setConfigList] = useState();

  const [mainList, setMainList] = useState();

  const [auxUsersList, setAuxUsersList] = useState();
  const [auxCarList, setAuxCarList] = useState();
  const [auxJobList, setAuxJobList] = useState();
  const [auxProductList, setAuxProductList] = useState();
  const [auxAccessList, setAuxAccessList] = useState();
  const [auxAddressesList, setAuxAddressesList] = useState();

  const [chosenList, setChosenList] = useState(0);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [menuItems, setMenuItems] = useState();

  const [selectHeaderOption, setSelectHeaderOption] = useState();

  useEffect(() => {

    fetch('http://localhost:8080/getData')
      .then(async function (response) {
        const data = await response.json();
        verifyDataInconsistency(data);
      }).catch(
        err => {
          setIsLoading(false);
          setIsNotificationOpen(true);
        });
  }, []);
  /**
   * @function frontend\src\App.toggleSelectedHeaderOption
   * @summary - Toggle variable that controlles current config option selected
   */
  function toggleSelectedHeaderOption(option) {
    setSelectHeaderOption(option);
  }

  /**
     * @function frontend\src\App.verifyDataInconsistency
     * @summary - Verify if some of backend data are undefined
     */
  function verifyDataInconsistency(data) {
    if ((data.user === undefined)
      || (data.car === undefined)
      || (data.job === undefined)
      || (data.access === undefined)
      || (data.address === undefined)
      || (data.products === undefined)
    ) {
      setIsLoading(false);
      setIsNotificationOpen(true);
    } else {
      setMainList(data.user);

      setAuxUsersList(data.user);
      setAuxCarList(data.car);
      setAuxJobList(data.job);
      setAuxAccessList(data.access);
      setAuxAddressesList(data.address);
      setAuxProductList(data.products);

      setMenuItems([
        {
          "label": "Usuários",
          "btnFunction": 1
        },
        {
          "label": "Carros",
          "btnFunction": 2
        },
        {
          "label": "Trabalhos",
          "btnFunction": 3
        }
      ]);

      setTimeout(() => { setIsLoading(false) }, 800)
    }
  }

  /**
     * @function frontend\src\App.mainListChange
     * @summary - Handle main list change when Menu component says
     */
  function mainListChange(numb) {
    //menu seleciona usuário
    setChosenList(numb);
    if ((numb === 2) && (numb !== chosenList)) { //menu seleciona carro
      setMainList(auxCarList);
      setChosenList(2);
    } else if ((numb === 3) && (numb !== chosenList)) {//menu seleciona trabalho
      setMainList(auxJobList);
      setChosenList(3);
    } else if ((numb === 1) && (numb !== chosenList)) {
      setMainList(auxUsersList);
      setChosenList(1);
    } else if ((numb === 0) && (numb !== chosenList)) {
      setMainList(auxUsersList);
      setChosenList(0);
    }
  }

  /**
   * @function frontend\src\App.onChangeConfigInput
   * @summary - Handle config inputs
   */
  function onChangeConfigInput(objectToEdit, list, setList, idField, action){
    console.log("oi",idField)
    if(action === 2){// edit
      let auxListCopy = deepCloneArray(list);
      
      for (let index = 0; index < list.length; index++) {
        const item = auxListCopy[index];
        if (item[idField] === objectToEdit[idField]) {
          auxListCopy[index] = objectToEdit;
        }
      }
      setList(auxListCopy);
    }
    if(action === 3){//delete
      const listLength = list.length;
      let itemToDelete;

      let newList=[];
      do{
        itemToDelete = list.pop()
        if(itemToDelete[idField] !== objectToEdit[idField]){
          newList.push(itemToDelete);
        }
      }while(newList.length < listLength-1);
      setList(newList);
    } 
  }

  /**
   * @function frontend\src\App.saveEditedData
   * @summary - Save edited data
   */
  function saveEditedData(newUserList, newCarList, newCar, userID) {
    setAuxCarList(newCarList);
    setAuxUsersList(newUserList);
    setMainList(newUserList);

    const updateUserCar = {
      "car_id": newCar.car_id,
      "user_id": userID,
      "newCar": newCar
    }

    fetch('http://localhost:8080/updateUsersCars', {
      method: "POST",
      body: JSON.stringify(updateUserCar),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(async function (response) {
        const res = await response.json();
      }).catch(
        err => {
          setIsLoading(false);
          setIsNotificationOpen(true);
        });
  }

  if (isLoading) {
    return (
      <div className="lds-roller">
        {/*bolinhas*/}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  } else {

    const headerData = ([
      {
        "label": "Criar",
        "isEditDisable": false,
        "btnFunction": 1,
        "function": (newObject)=>{
          //setAuxUsersList(newObject);
          console.log("Funcao Criar")
        }
      },
      {
        "label": "Editar",
        "btnFunction": 2,
        "isEditDisable": false,
        "function": (objectToEdit, list, setList, dataId)=>{
          onChangeConfigInput(objectToEdit, list, setList, dataId, 2);
          
          const aux2 = new Date(objectToEdit.user_birth_date);
          const aux = jsDateToDbTimestampStr(aux2, false);

          objectToEdit.user_birth_date = aux.trim();

          fetch('http://localhost:8080/updateUser', {
            method: "POST",
            body: JSON.stringify(objectToEdit),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          })
            .then(async function (response) {
              const res = await response.json();
            }).catch(
              err => {
                setIsLoading(false);
                setIsNotificationOpen(true);
              });
          }
      },
      {
        "label": "Deletar",
        "btnFunction": 3,
        "isEditDisable": true,
        "function": (objectToEdit, list, setList, dataId)=>{
          onChangeConfigInput(objectToEdit, list, setList, dataId, 3);
          console.log("Funcao Deletar")
          let listName = "";
          if(chosenList <= 1){
            listName = "users"
          }else if(chosenList === 2){
            listName = "users_cars";
          }else if(chosenList === 3){
            listName = "users_job";
          }

          const body = {
            "list": listName,
            "condition": `${dataId} = ${objectToEdit[dataId]}`
          }

          fetch('http://localhost:8080/deleteItem', {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          })
            .then(async function (response) {
              const res = await response.json();
            }).catch(
              err => {
                setIsLoading(false);
                setIsNotificationOpen(true);
          });
        }
      },
    ]);
    const configList = ([
      {
        "id": 0,
        "name": "Usuários",
        "list": auxUsersList,
        "setList": setAuxUsersList,
        "fields": [{
          label: "user_id"
        }, {
          label: "user_first_name",
        }, {
          label: "user_birth_date", 
        }, {
          label: "user_access_id", 
        }, {
          label: "user_address_id", 
        }, {
          label: "user_job_id", 
        }, {
          label: "user_product_buyed_id", 
        }, {
          label: "user_car_id", 
        }, {
          label: "status", 
        }]
      },
      {
        "id": 1,
        "name": "Carros",
        "list": auxCarList,
        "setList": setAuxCarList,
        "fields": [{
          label: "car_id"
        }, {
          label: "car_fuel",
        },{
          label: "car_manufacturer",
        },{
          label: "car_model",
        },{
          label: "car_name",
        },{
          label: "car_type",
        }]
      },
      {
        "id": 2,
        "name": "Trabalhos",
        "list": auxJobList,
        "setList": setAuxJobList,
        "fields": [{
          label: "user_job_id"
        },{
          label: "user_job_title",
        },{
          label: "user_job_address",
        },{
          label: "user_job_salary",
        },{
          label: "user_job_salary_currency_symbol",
        },
      ]
      }
    ]);


    return (
      <div className="App">
        <Menu menuItems={menuItems} btnFunction={mainListChange}/>
        {isNotificationOpen ?
          <NotificationComponent
            type="Error"
            title="Acesso ao banco"
            notificationDescription="Acesso ao banco de dados com"
            closeNotification={() => { }}
          />
          : chosenList === 0 ?
            <>
              <Header 
                buttonsList={headerData} 
                changeSelectedHeaderOption={toggleSelectedHeaderOption}
                configList={configList}
              ></Header>
            </>
            :
            <>
              <Table
                columns={chosenList === 1 ? ["user_first_name", "user_birth_date", "Salário", "Carro", "Status"] : Object.keys(mainList[0])}

                dataList={mainList}
                auxCarDataList={(chosenList !== 1) ? "notNeeded" : auxCarList}
                auxJobDataList={(chosenList !== 1) ? "notNeeded" : auxJobList}
                auxProductList={auxProductList}
                auxAccessList={auxAccessList}
                auxAddressesList={auxAddressesList}
                tagId={Object.keys(mainList[0])[0]}

                saveEditedData={saveEditedData}
              />
            </>
        }
      </div>
    );
  }
}

/**
 * @function module:web/javascripts/genericFunctions.deepCloneObject
 * @summary Clones an object in deep level
 * @param {object} obj - The object to be copied
 * @returns {object} The clone of the passed object
 */
export function deepCloneObject(obj) {
  if (obj == null || obj == undefined || typeof obj !== 'object' || Array.isArray(obj)) {
    return null;
  }
  //Create an empty object
  var cloneObject = {};

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      //If it is an array
      if (Array.isArray(obj[property])) {
        cloneObject[property] = deepCloneArray(obj[property]);
      }
      //If it is an object
      else if (typeof obj[property] === 'object') {
        //Checks if it is a react object
        cloneObject[property] = deepCloneObject(obj[property]);
      }
      else {
        cloneObject[property] = obj[property];
      }
    }
  }

  return cloneObject;
}

/**
* @function module:web/javascripts/genericFunctions.deepCloneArray
* @summary Clones an array in deep level
* @param {array} array - The array to be copied
* @returns {array} The clone of the passed array
*/
export function deepCloneArray(array) {
  if (!Array.isArray(array)) {
    return null;
  }

  //Create an empty array
  var cloneArray = [];

  for (var i = 0; i < array.length; i++) {
    //If it is an array
    if (Array.isArray(array[i])) {
      cloneArray.push(deepCloneArray(array[i]));
    }
    //If it is an object
    else if (typeof array[i] === 'object') {
      cloneArray.push(deepCloneObject(array[i]));
    }
    else {
      cloneArray.push(array[i]);
    }
  }

  return cloneArray;
}

/**
* @function module:web/javascripts/genericFunctions.jsDateToDbTimestampStr
* @summary Converts a valid js date to a db timestamp string
* @param {object} jsDate - The js date object
* @param {boolean} shouldUseMilliseconds - Boolean than indicate if should concat milliseconds ".MS"
* @returns {string} - The db timestamp string (YYYY-MM-DD HH:MM:SS)
*/
export function jsDateToDbTimestampStr(jsDate, shouldUseMilliseconds) {

  let timestamp = '';

  //YYYY-
  let year = jsDate.getUTCFullYear();
  if (year < 1000) {
      year = '0' + year;
  }

  timestamp += (year) + '-';

  //MM-
  timestamp += ('0' + (jsDate.getUTCMonth() + 1)).slice(-2) + '-';

  //DD
  timestamp += ('0' + jsDate.getUTCDate()).slice(-2) + ' ';

  return timestamp;
}

/**
* @function module:web/javascripts/genericFunctions.dbTimestampStrToJsDate
* @summary Converts a dbTimestamp date string to a Js date using UTC timezone
* @param {string} d - The dbTimestamp date string
* @returns {object} - The new js date
*/
export function dbTimestampStrToJsDate(d) {
  if ((typeof d != 'string') || (d.length < 10)) {
      return null;
  }

  var year = parseInt(d.substring(0, 4));
  var month = parseInt(d.substring(5, 7)) - 1;
  var day = parseInt(d.substring(8, 10));

  var hour = 0;
  var minute = 0;
  var second = 0;

  if (d.length != 10) {
      hour = d.substring(11, 13);
      minute = d.substring(14, 16);
      second = d.substring(17, 19);
  }

  var jsDate = new Date(Date.UTC(year, month, day, hour, minute, second));

  if (jsDate.getTime && !isNaN(jsDate.getTime())) {
      return jsDate;
  }
  else {
      return null;
  }
}

export default App;
