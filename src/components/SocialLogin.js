import React, { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const SocialLogin = () => {
    const [profile, setProfile] = useState(null);

    const onSuccess = (response) => {
        console.log(jwt_decode(response.credential));
        setProfile(jwt_decode(response.credential));
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            {profile &&
                <div className="d-flex flex-column justify-content-around">
                    <h4>{profile.name}</h4>
                    <img className="rounded-circle m-2" src={profile.picture} alt="..." />
                    <button className="btn btn-danger"
                        onClick={() => {
                            googleLogout();
                            setProfile(null)
                        }}>Logout</button>
                </div>}
                {(!profile)&&
                 <div className="mb-3">
                 <GoogleOAuthProvider clientId="613262602831-t5emdt2kfdbp1ssjuv93gba5uek67llt.apps.googleusercontent.com">
                     <GoogleLogin
                         onSuccess={onSuccess}
                         onError={(error) => {
                             console.log(`Login Failed  ${error}`);
                         }}
                         useOneTap
                         shape="square"
                         size="medium"
                         text="signin"
                         theme="filled_blue"
 
                     />
                 </GoogleOAuthProvider>
             </div>}
           

            <LoginSocialFacebook
                appId="881983986783666"
                onResolve={(response) => {
                    console.log(response);
                    //setProfile(response.data);
                }}
                onReject={(error) => {
                    console.log(error);
                }}
            >
                <FacebookLoginButton>
                    <span>Sign in</span>
                </FacebookLoginButton>
            </LoginSocialFacebook>
        </div>

    );
};

export default SocialLogin;
