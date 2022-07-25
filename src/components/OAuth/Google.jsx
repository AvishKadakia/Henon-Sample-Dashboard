import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import { useStateContext } from '../contexts/ContextProvider';
// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

function Login() {

    const onSuccess = (res) => {
        //Implement fail check
        console.log(res)
        console.log('JWT Id Token:', res.credential);
        const data = jwt_decode(res.credential)
        console.log(data)

        // aud: "812269451-qedg2r03ju0jeqfstbgua12d4tpftbdc.apps.googleusercontent.com"
        // azp: "812269451-qedg2r03ju0jeqfstbgua12d4tpftbdc.apps.googleusercontent.com"
        // email: "kadakiaa@lakeheadu.ca"
        // email_verified: true
        // exp: 1658781037
        // family_name: "Kadakia"
        // given_name: "Avish Manish"
        // hd: "lakeheadu.ca"
        // iat: 1658777437
        // iss: "https://accounts.google.com"
        // jti: "fb19db27281529e1bdd5a8f7e51325084317ed06"
        // name: "Avish Manish Kadakia"
        // nbf: 1658777137
        // picture: "https://lh3.googleusercontent.com/a/AItbvmlyLFGHhhlOhhEGP0X0vZeOCm1D9LCdc2xIqgdm=s96-c"
        // sub: "109600866839399218198"

    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login.`
        );
    };
    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "812269451-qedg2r03ju0jeqfstbgua12d4tpftbdc.apps.googleusercontent.com",
            callback: onSuccess
        });

        google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            { theme: "outline", size: "large" }
        )
    }, []);


    return (
        <div>
            {/* <GoogleLogin
                
                
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            /> */}
            <div id="googleSignInDiv" ></div>
        </div>
    );
}

export default Login;