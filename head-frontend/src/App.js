import { Route, Routes } from "react-router-dom";
import ROUTES from "./consts/routes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import IMAGES from "./consts/Images";

function App() {
  return ( 
    <div>
      <img src={IMAGES.JPG_BACKGROUND} className="rotate-90 fixed w-full -translate-y-1/2 max-2xl:-z-50" alt=""/>
      <Routes>
        <Route path={ROUTES.ADMIN_ROUTES} element={<AdminRoutes/>}/>
        <Route path={ROUTES.USER_ROUTES} element={<UserRoutes/>}/>
      </Routes>
    </div>
  );
}

export default App;
