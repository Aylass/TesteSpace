import './App.css';
import Table from './components/TableComponent/Table';
import users from './users/users';
import usersCars from './users/users_cars';
import usersJobs from './users/users_job'


function App() {
  console.log("app", usersJobs)
  return (
    <div className="App">
      <Table dataRow={users} dataCars={usersCars} dataJobs={usersJobs} ></Table>
    </div>
  );
}

export default App;
