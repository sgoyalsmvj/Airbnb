import React, { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import { Button } from "@/components/ui/button";
const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subPage } = useParams();
  if (subPage === undefined) {
    subPage = "profile";
  }
  if (!ready) {
    return "Loading..";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  async function logout() {
    await axios.get("/logout");
    setRedirect("/");
    setUser(null);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  
  return (
    <div>
     <AccountNav/>  
      {subPage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <Button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
      {subPage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
