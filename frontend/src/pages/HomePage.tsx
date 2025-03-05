import { useEffect } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import {
  fetchPaginatedCards,
} from "@/store/card-actions";
import { signIn } from "@/store/user-actions";
import CardList from "@/components/cards/CardList";
import Header from "@/components/header/Header";
import Pagination from "@/components/ui/Pagination";
import { CredentialResponse } from "@react-oauth/google";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import WelcomeSection from "@/components/auth/WelcomeSection";

const HomePage = () => {
  const dispatch = useInfoDispatch();
  const user = useInfoSelector((state) => state.user);
  const { info, loading } = useInfoSelector((state) => state.cards);

  useEffect(() => {
    if (user.id > 0) {
      dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
    }
  }, [user.id, dispatch]);

  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      dispatch(signIn({ credential: credentialResponse.credential }));
    }
  };

  return (
    <div className="flex flex-col h-full">
      {!user.isSignedIn && (
        <WelcomeSection onLoginSuccess={handleGoogleLoginSuccess} />
      )}
      {user.isSignedIn && (
        <>
          <header className="mb-6">
            <Header />
          </header>
          <div className="flex-1 min-h-[70vh] h-[70vh] overflow-auto border border-gray-600 p-5 rounded-md shadow-md bg-primary-light sm:p-2.5">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="h-full">
                {info.length > 0 ? (
                  <CardList cards={info} />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-center text-secondary-light opacity-70">There are no cards created</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-6">
            <Pagination />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
