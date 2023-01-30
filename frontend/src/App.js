import './App.css';
import React, { useEffect } from "react";
import Table from './components/TableComponent/Table';
import Menu from './components/MenuComponent/MenuComponent';
import NotificationComponent from "./components/NotificationComponent/NotificationComponent";
import { useState } from 'react';


function App() {

  const [mainList, setMainList] = useState();
  const [auxUsersList, setAuxUsersList] = useState();
  const [auxCarList, setCarAuxList] = useState();
  const [auxJobList, setJobAuxList] = useState();
  const [auxProductList,setAuxProductList] = useState();
  const [auxAccessList, setAuxAccessList] = useState();
  const [auxAddressesList, setAuxAddressesList] = useState();
  const [chosenList, setChosenList] = useState(1);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch('http://localhost:8080/getData')
      .then( async function(response) {
        console.log("passo")
        const data = await response.json();
        console.log(data)
        setMainList(data.user);
        setAuxUsersList(data.user);
        setCarAuxList(data.car);
        setJobAuxList(data.job);
        setAuxAccessList(data.access);
        setAuxAddressesList(data.address);
        setAuxProductList(data.products);
        // if((mainList === undefined)
        //   ||(auxCarList === undefined)
        //   ||(auxJobList === undefined)
        //   ||(auxAccessList === undefined)
        //   ||(auxAddressesList === undefined)
        //   ||(auxProductList === undefined)){
        //     console.log("caiu")
        //     console.log(mainList)
        //     console.log(auxCarList)
        //     console.log(auxJobList)
        //     console.log(auxAccessList)
        //     console.log(auxAddressesList)
        //     console.log(auxProductList)
        //   setIsLoading(false);
        //   setIsNotificationOpen(true);
        // }else{
          setIsLoading(false);
          setIsNotificationOpen(false);
        //}
      }).catch(
        err => {
          setIsLoading(false);
          setIsNotificationOpen(true);
          console.log("oii",err)
        });
  },[]);

  function mainListChange(numb) {
    //menu seleciona usuário
    setChosenList(numb);
    if((numb === 2)&&(numb !== chosenList)){ //menu seleciona carro
      setMainList(auxCarList);
      setChosenList(2);
    }else if((numb === 3)&&(numb !== chosenList)){//menu seleciona trabalho
      setMainList(auxJobList);
      setChosenList(3);
    }else if((numb === 1)&&(numb !== chosenList)){
      setMainList(auxUsersList);
      setChosenList(1);
    }
  }

  function saveEditedData(newUserList, newCarList){
    setCarAuxList(newCarList);
    setMainList(newUserList);
  }

  if(isLoading){
    return(
      <div class="lds-roller">
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
  }

  return(
    <div className="App">
      {isNotificationOpen? 
        <NotificationComponent 
            tipo="Error"
            titulo="Acesso ao banco"
            notificationDescription="Acesso ao bando de dados com"
            closeNotification={()=>{}}
        />
       : 
      <>
        <Menu mainListChange={mainListChange}/>
        <Table
          columns={chosenList === 1? ["user_first_name","user_birth_date","Salário","Carro","Status"] : Object.keys(mainList[0])}
          
          dataList={mainList}
          auxCarDataList={(chosenList !== 1)? "notNeeded": auxCarList}
          auxJobDataList={(chosenList !== 1)? "notNeeded": auxJobList}
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

export default App;
