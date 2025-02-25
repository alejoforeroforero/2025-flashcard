import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: CredentialResponse) => void;
}

const GoogleLoginButton = ({ onSuccess }: GoogleLoginButtonProps) => {
  return (
    <div className="flex flex-col items-center">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          console.log("Login failed");
        }}
        useOneTap
        shape="pill"
        theme="filled_blue"
        text="continue_with"
        size="large"
      />
    </div>
  );
};

export default GoogleLoginButton;