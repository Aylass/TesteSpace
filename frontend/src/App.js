import './App.css';
import Table from './components/TableComponent/Table';
import users from './users/users';
import usersCars from './users/users_cars';
import usersJobs from './users/users_job';
import usersProducts from './users/users_products_buyed';
import usersAccess from './users/users_access';


function App() {
  console.log("app", usersAccess)
  return (
    <div className="App">
      <Table dataRow={users} dataCars={usersCars} dataJobs={usersJobs} dataProducts={usersProducts} dataAccess={usersAccess}></Table>
    </div>
  );
}

export default App;
