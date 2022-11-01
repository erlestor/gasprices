import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApolloWrapper from "./ApolloWrapper";
import Frontpage from "./Components/frontpage/Frontpage";
import { GasStationPage } from "./Components/gasStationPage/GasStationPage";

function App() {
  return (
    <ApolloWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/station/:id" element={<GasStationPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloWrapper>
  );
}

export default App;
