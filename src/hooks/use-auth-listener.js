import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

const useAuthListener = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      console.log("authUser", authUser);
      if (authUser) {
        //imamo korisnika
        //mozemo ga spasiti u localStorage
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        //nema usera, ocisti localStorage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return listener;
  }, []);

  return { user };
};

export default useAuthListener;
