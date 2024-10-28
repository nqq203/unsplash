import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Gallery from "./pages/Gallery";
import PhotoDetail from "./pages/PhotoDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/photos" replace />} />
        <Route path="/photos" element={<Gallery />}/>
        <Route path="/photos/:id" element={<PhotoDetail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
