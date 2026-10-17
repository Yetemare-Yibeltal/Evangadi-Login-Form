import { Route ,Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import axios from "./axiosConfig";

function App() {
  const navigate = useNavigate();
  async function checkUser() {
    try {
      axios.get('/users/check',{
        headers:{ 
          Authorization:'Bearer ' + token,

        }
      })
    } catch (error) {
      console.log(error.response);
      navigate('/login')
    }
  }
  useEffect(()=>{
    checkUser();
  })
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
