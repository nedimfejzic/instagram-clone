import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAdress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isInvalid = password === "" || emailAdress === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("LOGIN FORM FIRED");

    try {
      setLoading(true);
      await firebase.auth().signInWithEmailAndPassword(emailAdress, password);
      setLoading(false);
      history.push(ROUTES.DASHBOARD);
    } catch (err) {
      console.log("ERR", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Login | Instagram";
  }, []);

  return (
    <div className='container mx-auto flex max-w-screen-md items-center  h-screen'>
      <div className='hidden md:block md:w-2/5'>
        <img
          className=''
          src='/images/iphone-with-profile.png'
          alt='Iphone with isnta'
        ></img>
      </div>
      <div className='flex w-full  flex-col md:w-3/5  mx-12 '>
        <div className='bg-white  py-8 px-8 mb-4 border border-gray-300'>
          <h1 className='flex justify-center w-full'>
            <img
              src='/images/logo.png'
              alt='Instagram logo'
              className='mt-2 mb-4 '
            ></img>
          </h1>

          {error && <p className='mb-4 text-sm text-red-600 '>{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              aria-label='Enter your email address.'
              type='email'
              placeholder='Email adress'
              className='text-sm text-gray-800 px-4 py-2 w-full rounded border border-gray-300 mb-2'
              onChange={(e) => setEmailAdress(e.target.value)}
            ></input>

            <input
              aria-label='Enter your password.'
              type='text'
              placeholder='password'
              className='text-sm text-gray-800 px-4 py-2 w-full rounded border border-gray-300 mb-2 '
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button
              type='submit'
              disabled={isInvalid}
              className={`my-1 py-2 px-4  bg-blue-400 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-sm  shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg
                 ${isInvalid && "opacity-50"}
                ${isInvalid && "cursor-not-allowed"}`}
            >
              {loading ? "Loading.." : "Log In"}
            </button>

            <div className='text-center mt-6'>
              <Link
                to={ROUTES.DASHBOARD}
                className=' text-sm font-medium text-blue-400'
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
        <div className='border border-gray-300 bg-white py-4 px-8 text-sm'>
          Don't have an account?
          <Link to={ROUTES.SING_UP} className='text-blue-400 font-medium pl-1'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
