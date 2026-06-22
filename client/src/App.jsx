import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TextAnalyzer from "./pages/TextAnalyzer.jsx";
import ImageAnalyzer from "./pages/ImageAnalyzer.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/text-analysis" element ={<TextAnalyzer/>} />
      <Route path="/img-analysis" element={<ImageAnalyzer/>} />
    </Routes>
  );
}

export default App;