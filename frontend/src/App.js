import './App.css';
import Table from './components/TableComponent/Table';
import users from './users/users';
import usersCars from './users/users_cars';


function App() {
  return (
    <div className="App">
      <Table dataRow={users} dataCars={usersCars} ></Table>
    </div>
  );
}

export default App;
