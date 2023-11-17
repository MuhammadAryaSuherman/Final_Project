import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./component/navbar";
import Homepage from "./pages/homepage";

function App() {
  return (
    <VStack minH="100vh" minW="100vw" bgColor="white">
      <Router>
        <Navbar />
          <Routes>
            <Route path= {"/"} element={<Homepage/>}/>
          </Routes>
      </Router>
    </VStack>
  );
}

export default App;
