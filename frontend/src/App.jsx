import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import OrderHistory from './component/OrderHistory';
import Navbar from "./component/navbar";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Orderpage from "./pages/orderPage";
import UserProfile from "./pages/UserProfile";
import GamePage from "./pages/gamepage";

function App() {
  return (
    <VStack minH="100vh" minW="100vw" bgColor="gray.100">
      <Router>
        <Navbar />
        <Routes>
            <Route path= {"/homepage"} element={<Homepage/>}/>
            <Route path= {"/products/:id"} element= {<Orderpage/>}/>
            <Route path= {"/user/:id"} element={<UserProfile />} />
            <Route path= {"/login"} element={<Login />}/>
            <Route path= {"/register"} element={<Register />}/>
            <Route path= {"/"} element={<GamePage />}/>
            <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </Router>
    </VStack>
  );
}

export default App;
