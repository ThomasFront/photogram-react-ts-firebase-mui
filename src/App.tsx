import { Route, Routes } from "react-router-dom"
import RegisterAndLogin from "./pages/RegisterAndLogin/RegisterAndLogin"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
      </Routes>
    </>
  )
}

export default App
