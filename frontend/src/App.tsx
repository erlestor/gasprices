import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApolloWrapper from "./ApolloWrapper";
import Frontpage from "./components/frontpage/Frontpage";
import { GasStationPage } from "./components/gasStationPage/GasStationPage";

function App() {
  return (
    <ApolloWrapper>
      <BrowserRouter basename="/project3">
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/station/:id" element={<GasStationPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloWrapper>
  );
}

export default App;
