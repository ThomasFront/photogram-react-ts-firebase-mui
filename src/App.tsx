import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import RegisterAndLogin from "./pages/RegisterAndLogin/RegisterAndLogin"

function App() {

  return (
    <Routes>
      <Route path="/" element={<RegisterAndLogin />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
