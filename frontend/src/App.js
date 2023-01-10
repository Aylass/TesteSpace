import './App.css';
import Table from './components/TableComponent/Table';
import users from './users/users';
import usersCars from './users/users_cars';
import usersJobs from './users/users_job';
import usersProducts from './users/users_products_buyed';
import usersAccess from './users/users_access';
import usersAddresses from './users/users_address';


function App() {
  return (
    <div className="App">
      <Table 
        dataRow={users} 
        dataCars={usersCars} 
        dataJobs={usersJobs} 
        dataProducts={usersProducts} 
        dataAccess={usersAccess}
        dataAddresses={usersAddresses}
      ></Table>
    </div>
  );
}

export default App;
