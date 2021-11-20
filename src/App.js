import { lazy, Suspense } from "react";
import Loader from "react-loader-spinner";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

const LoginPage = lazy(() => import("./pages/Login"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense
          fallback={
            <div className='flex h-screen justify-center items-center'>
              <Loader type='Oval' color='#9CA3AF' height={150} width={150} />
            </div>
          }
        >
          <Switch>
            <Route path={ROUTES.DASHBOARD} exact>
              <DashboardPage />
            </Route>

            <Route path={ROUTES.LOGIN}>
              <LoginPage />
            </Route>

            <Route path={ROUTES.SING_UP}>
              <SignUpPage />
            </Route>

            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
