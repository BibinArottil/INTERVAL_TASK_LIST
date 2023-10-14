import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import List from "./components/List"
import AddTask from './pages/AddTask';
import UpdateTask from './pages/UpdateTask';
import ViewTask from './pages/ViewTask';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<List/>}/>
          <Route path='/add' element={<AddTask/>}/>
          <Route path='/update/:id' element={<UpdateTask/>}/>
          <Route path='/view-task/:id' element={<ViewTask/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
