import { onAuthStateChanged, signOut } from "firebase/auth";
import { authFirebase } from "../utils/firebase";
import { useEffect, useState } from "react";
import RouterUrl from "../const/RouterUrl";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(authFirebase, async (user) => {
            if (user && !localStorage.getItem("register")) {
               setAuthenticated(true);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Spinner/>;
    }

    if (authenticated) {
        return <Navigate to={RouterUrl.HOME} replace />;
    }

    return children;
};

export default PublicRoute;