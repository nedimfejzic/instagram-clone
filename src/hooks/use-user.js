import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserObjectByUserId } from "../services/firebase";
export default function useUser() {
  const [activeUser, setActiveUser] = useState({
    fullName: "",
    username: "",
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUser() {
      //call firestore
      const [result] = await getUserObjectByUserId(user.uid);
      setActiveUser(result);
    }

    if (user?.uid) {
      getUser();
    }
  }, [user]);

  return { user: activeUser };
}
