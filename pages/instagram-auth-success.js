import { useEffect, useState } from "react";

function InstagramAuthSuccess() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async (accessToken) => {
      const userDataEndpoint = `https://graph.instagram.com/me?fields=username,full_name,bio&access_token=${accessToken}`;
      const response = await fetch(userDataEndpoint);
      const data = await response.json();

      return data;
    };

    const fetchUserAndSetData = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      if (code) {
        // Exchange the code for an access token
        const clientId = 593016509511308;
        const redirectUri =
          "https://launchpad.myriadflow.com/instagram-auth-success";
        const tokenEndpoint = `https://api.instagram.com/oauth/access_token`;

        const formData = new FormData();
        formData.append("client_id", clientId);
        formData.append("client_secret", "31bc35c742bb3c9e9330ffa7c5914030");
        formData.append("grant_type", "authorization_code");
        formData.append("redirect_uri", redirectUri);
        formData.append("code", code);

        const response = await fetch(tokenEndpoint, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.access_token) {
          const user = await fetchUserData(data.access_token);
          setUserData(user);
        }
      }
    };

    fetchUserAndSetData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Instagram User: {userData.username}</h1>
          <p>Full Name: {userData.full_name}</p>
          <p>Bio: {userData.bio}</p>
          {/* Add more user data fields as needed */}
        </div>
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
}

export default InstagramAuthSuccess;
