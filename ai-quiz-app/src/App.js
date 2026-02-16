import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import MainLayout from "./layout/MainLayout";
import Processing from "./pages/Processing";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />

          {/* ⭐ ADD THIS */}
          <Route path="/processing" element={<Processing />} />

          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
