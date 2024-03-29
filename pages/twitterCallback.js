import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TwitterCallbackPage = () => {
  const router = useRouter();
  const [twitt, settwitt] = useState(null);

  const saveUserDataToLocalStorage = (user) => {
    localStorage.setItem("twitteruserData", JSON.stringify(user));
  };

  const saveUserDataToLocal = (user) => {
    localStorage.setItem("twitterData", JSON.stringify(user));
  };

  useEffect(() => {
    // Get the query parameters from the URL
    const { oauth_token, oauth_verifier } = router.query;

    const fetchTokens = async () => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oauth_token, oauth_verifier }),
      };

      try {
        const response = await fetch("/api/twitterCallback", requestOptions);
        const data = await response.json();

        if (data.screen_name) {
          settwitt(data);
          saveUserDataToLocalStorage(data);

          const twitterDataRequestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: data.oauth_token,
              access_token_secret: data.oauth_token_secret,
            }),
          };

          const twitterDataResponse = await fetch(
            "/api/twitterData",
            twitterDataRequestOptions
          );
          const twitterData = await twitterDataResponse.json();

          saveUserDataToLocal(twitterData);

          router.push("/profile");
          return data;
        } else {
          // seterror(true);
          return data;
        }
      } catch (error) {
        console.error("Failed to exchange tokens:", error);
      }
    };

    fetchTokens();
  }, [router.query]);

  return (
    <div>
      <h1>Processing...</h1>
      {/* You can show a loading spinner or other UI elements while the exchange is in progress */}
    </div>
  );
};

export default TwitterCallbackPage;
