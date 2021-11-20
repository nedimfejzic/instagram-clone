import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [emailAdress, setEmailAdress] = useState("nedim.gz@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isInvalid =
    username === "" || name === "" || emailAdress === "" || password === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const usernameExist = await doesUsernameExist(username);
    if (usernameExist) {
      setError("Username already in use.");
    } else {
      //username is free
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAdress, password);

        //created user
        // now update display name in fireauth

        await createdUserResult.user.updateProfile({
          displayName: name,
        });

        // store it in firebase now
        // create doc/row in user collection/table

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          emailAdress: emailAdress,
          fullName: name,
          username: username.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });

        setLoading(false);

        //all okay
        history.push(ROUTES.DASHBOARD);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    document.title = "SignUp | Instagram";
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
              aria-label='Enter your username.'
              type='text'
              placeholder='Your full name'
              className='text-sm text-gray-800 px-4 py-2 w-full rounded border border-gray-300 mb-2'
              onChange={(e) => setName(e.target.value)}
            ></input>{" "}
            <input
              aria-label='Enter your username.'
              type='text'
              placeholder='Username'
              className='text-sm text-gray-800 px-4 py-2 w-full rounded border border-gray-300 mb-2'
              onChange={(e) => setUsername(e.target.value)}
            ></input>{" "}
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
              {loading ? "Loading.." : "Sign Up"}
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
          Have an account?
          <Link to={ROUTES.LOGIN} className='text-blue-400 font-medium pl-1'>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
