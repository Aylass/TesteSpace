import './App.css';
import React, { useEffect } from "react";
import Table from './components/TableComponent/Table';
import Menu from './components/MenuComponent/MenuComponent';
import NotificationComponent from "./components/NotificationComponent/NotificationComponent";
import Header from './components/HeaderComponent/HeaderComponent'
import PageContent from './components/PageContentComponent/PageContentComponent';
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
  const [auxCarList, setCarAuxList] = useState();
  const [auxJobList, setJobAuxList] = useState();
  const [auxProductList, setAuxProductList] = useState();
  const [auxAccessList, setAuxAccessList] = useState();
  const [auxAddressesList, setAuxAddressesList] = useState();

  const [chosenList, setChosenList] = useState(1);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [menuItems, setMenuItems] = useState();
  const [isConfigOpen, setIsConfigOpen] = useState(true);

  const [headerData, setHeaderData] = useState();
  const [selectHeaderOption, setSelectHeaderOption] = useState();
  
  useEffect(() => {
    
    fetch('http://localhost:8080/getData')
      .then(async function (response) {
        const data = await response.json();
        console.log("effect")
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
  function toggleSelectedHeaderOption(option){
    setSelectHeaderOption(option);
  }

  /**
     * @function frontend\src\App.toggleIsConfigOpen
     * @summary - Toggle variable that controlles config page
     */
  function toggleIsConfigOpen(btnConfig){
    if(btnConfig){
      setIsConfigOpen(!isConfigOpen);
    }else if(isConfigOpen === true){
      setIsConfigOpen(false);
    }
  }

  /**
     * @function frontend\src\App.verifyDataInconsistency
     * @summary - Verify if some of backend data are undefined
     */
  function verifyDataInconsistency(data) {
    console.log("oaaaaaaaaaaaaaaaaaaaaaa");
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
      setCarAuxList(data.car);
      setJobAuxList(data.job);
      setAuxAccessList(data.access);
      setAuxAddressesList(data.address);
      setAuxProductList(data.products);

      setMenuItems([
        {
          "label" : "Usuários",
          "btnFunction" : 1
        },
        {
          "label" : "Carros",
          "btnFunction" : 2
        },
        {
          "label" : "Trabalhos",
          "btnFunction" : 3
        }
      ]);

      setHeaderData([
        {
          "label" : "Criar",
          "btnFunction" : 1
        },
        {
          "label" : "Editar",
          "btnFunction" : 2
        },
        {
          "label" : "Deletar",
          "btnFunction" : 3
        },
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
    }
  }

  /**
   * @function frontend\src\App.saveEditedData
   * @summary - Save edited data
   */
  function saveEditedData(newUserList, newCarList, newCar, userID) {
    setCarAuxList(newCarList);
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
  console.log("app atualizando")

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
  }else{
    console.log(auxUsersList)
    const configList = ([
      {
        "id" : 0,
        "name" : "Usuários",
        "list" : auxUsersList,
        "fields" : [{
          label: "user_id"
        },{
          label: "user_first_name", 
          onChange: (data, id)=>{
            const auxUsersListCopy = auxUsersList;
            console.log("idddd",id)
            console.log("data",data)
            auxUsersListCopy[id].user_first_name = data;

            setAuxUsersList(auxUsersListCopy);
          }
        },{
          label: "user_birth_date", onChange:()=>{}
        },{
          label: "user_access_id", onChange:()=>{}
        },{
          label: "user_address_id", onChange:()=>{}
        },{
          label: "user_job_id", onChange:()=>{}
        },{
          label: "user_product_buyed_id", onChange:()=>{}
        },{
          label: "user_car_id", onChange:()=>{}
        },{
          label: "status", onChange:()=>{}
        }]
      },
      {
        "id" : 1,
        "name" : "Carros",
        "list" : auxCarList
      },
      {
        "id" : 2,
        "name" : "Trabalhos",
        "list" : auxJobList
      },
    ]);
    return (
      <div className="App">
        <Menu menuItems={menuItems} btnFunction={mainListChange} handleConfig={toggleIsConfigOpen}/>
        {isNotificationOpen?
          <NotificationComponent
            type="Error"
            title="Acesso ao banco"
            notificationDescription="Acesso ao banco de dados com"
            closeNotification={() => { }}
          />
          : isConfigOpen?
              <>
                <Header buttonsList={headerData} toggleSelectedHeaderOption={toggleSelectedHeaderOption}></Header>
                <PageContent lists={configList}></PageContent>
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

export default App;
