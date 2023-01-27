import './App.css';
import React, { useEffect } from "react";
import Table from './components/TableComponent/Table';
import Menu from './components/MenuComponent/MenuComponent';
import users from './users/users';
import usersCars from './users/users_cars';
import usersJobs from './users/users_job';
import usersProducts from './users/users_products_buyed';
import usersAccess from './users/users_access';
import usersAddresses from './users/users_address';
import { useState } from 'react';


function App() {

  const [mainList, setMainList] = useState(users);
  const [auxCarList, setCarAuxList] = useState(Object.values(usersCars));
  const [auxJobList, setJobAuxList] = useState(Object.values(usersJobs));
  const [auxProductList,setAuxProductList] = useState(Object.values(usersProducts));
  const [auxAccessList, setAuxAccessList] = useState(Object.values(usersAccess));
  const [auxAddressesList, setAuxAddressesList] = useState(Object.values(usersAddresses));
  const [chosenList, setChosenList] = useState(1);
  
  useEffect(() => {
    fetch('http://localhost:8080/getData')
      .then( async function(response) {
        const data = await response.json();
        console.log(data)
        setMainList(data.user);
        setCarAuxList(data.car);
        setJobAuxList(data.job);
        setAuxAccessList(data.access);
      }).catch(err => console.log(err));
  },[]);

  function mainListChange(numb) {
    //menu seleciona usuário
    setCarAuxList("notNeeded");
    setJobAuxList("notNeeded");
    setChosenList(numb);
    if((numb === 2)&&(numb !== chosenList)){ //menu seleciona carro
      setMainList(Object.values(usersCars));
    }else if((numb === 3)&&(numb !== chosenList)){//menu seleciona trabalho
      setMainList(Object.values(usersJobs));
    }else if((numb === 1)&&(numb !== chosenList)){
      setMainList(users);
      setCarAuxList(Object.values(usersCars));
      setJobAuxList(Object.values(usersJobs));
    }
  }

  function saveEditedData(newUserList, newCarList){
    setCarAuxList(newCarList);
    setMainList(newUserList);
  }

  return(
    <div className="App">
      <Menu mainListChange={mainListChange}/>
      <Table
        columns={chosenList === 1? ["user_first_name","user_birth_date","Salário","Carro","Status"] : Object.keys(mainList[0])}
        
        dataList={mainList}
        auxCarDataList={auxCarList}
        auxJobDataList={auxJobList}
        auxProductList={auxProductList}
        auxAccessList={auxAccessList}
        auxAddressesList={auxAddressesList}
        tagId={Object.keys(mainList[0])[0]}

        saveEditedData={saveEditedData}
      />
    </div>
  );

}

export default App;
