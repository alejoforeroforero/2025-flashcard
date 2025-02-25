import { useEffect } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import {
  fetchPaginatedCards,
  getCardsByCategory,
  searchCards,
} from "@/store/card-actions";
import { signIn } from "@/store/user-actions";
import { GoogleLogin } from "@react-oauth/google";
import CardList from "@/components/cards/CardList";
import Header from "@/components/header/Header";
import Pagination from "@/components/ui/Pagination";
import { CredentialResponse } from "@react-oauth/google";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const HomePage = () => {
  const dispatch = useInfoDispatch();

  const user = useInfoSelector((state) => state.user);

  const {
    info,
    totalCount,
    currentPage,
    mode,
    categoryIdView,
    query,
    loading,
  } = useInfoSelector((state) => state.cards);

  useEffect(() => {
    if (user.id > 0) {
      if (currentPage === 0) {
        if (mode === "all") {
          dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
        } else if (mode === "category") {
          dispatch(getCardsByCategory({ id: categoryIdView, page: 0 }));
        } else if (mode === "search") {
          const searchParams = {
            query: query,
            page: 0,
            userId: user.id,
          };
          dispatch(searchCards(searchParams));
        }
      }
    }
  }, [user, currentPage, mode, categoryIdView, query, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (mode === "all") {
      dispatch(fetchPaginatedCards({ page: newPage, userId: user.id }));
    } else if (mode === "category") {
      dispatch(getCardsByCategory({ id: categoryIdView, page: newPage }));
    } else if (mode === "search") {
      const searchParams = {
        query: query,
        page: newPage,
        userId: user.id,
      };
      dispatch(searchCards(searchParams));
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      dispatch(signIn({ credential: credentialResponse.credential }));
    }
  };

  // const handleLogin = () => {
  //   dispatch(signInB());
  // };

  return (
    <>
      {!user.isSignedIn && (
        <div className="login">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log("Login failed");
            }}
          />
          {/* <button onClick={handleLogin}>Login</button> */}
        </div>
      )}
      {user.isSignedIn && (
        <>
          <header>
            <Header />
          </header>
          <div className="card-general-container">
            {loading && <LoadingSpinner />}
            {!loading && (
              <div className="card-list-container">
                {info.length > 0 && <CardList cards={info} />}
                {info.length < 1 && <p>There is no cards created</p>}
              </div>
            )}
          </div>
          <div>
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              handlePageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
