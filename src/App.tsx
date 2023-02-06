import { Route, Routes } from "react-router-dom"
import Posts from "./components/Posts/Posts"
import Profile from "./components/Profile/Profile"
import SpecificUser from "./components/SpecificUser/SpecificUser"
import Users from "./components/Users/Users"
import { Home } from "./pages/Home/Home"
import RegisterAndLogin from "./pages/RegisterAndLogin/RegisterAndLogin"

function App() {

  return (
    <Routes>
      <Route path="/" element={<RegisterAndLogin />} />
      <Route element={<Home />}>
        <Route path="/home" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<SpecificUser />} />
      </Route>
    </Routes>
  )
}

export default App
