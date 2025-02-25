import { CredentialResponse } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";

interface WelcomeSectionProps {
  onLoginSuccess: (credentialResponse: CredentialResponse) => void;
}

const WelcomeSection = ({ onLoginSuccess }: WelcomeSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-primary-light rounded-lg shadow-md max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-accent mb-4 text-center">Welcome to FlashCard App</h1>
      
      <div className="text-secondary text-center mb-8">
        <p className="mb-4">
          Create and organize your own flashcards to enhance your learning experience.
        </p>
        <p className="mb-4">
          With our app, you can create custom categories, search through your cards, 
          and review your knowledge at your own pace.
        </p>
        <p className="font-semibold mb-6">
          Sign in with your Google account to get started!
        </p>
      </div>
      
      <div className="mt-4">
        <GoogleLoginButton onSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};

export default WelcomeSection;