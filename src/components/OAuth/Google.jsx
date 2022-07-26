import React, { useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

function Login() {
    const {
        setLogin
    } = useStateContext();

    const onSuccess = (res) => {
        if (res.credential) {
            setLogin(res.credential, "google")
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("loginToken");
        if (token !== "false") {
            setLogin(token)
        }
        else {
            /*global google*/
            google.accounts.id.initialize({
                client_id: "812269451-qedg2r03ju0jeqfstbgua12d4tpftbdc.apps.googleusercontent.com",
                callback: onSuccess
            });

            google.accounts.id.renderButton(
                document.getElementById("googleSignInDiv"),
                { theme: "outline", size: "large" }
            )
        }

    }, []);


    return (

        <div id="googleSignInDiv" ></div>

    );
}

export default Login;