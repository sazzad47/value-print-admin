import { useRefreshTokenMutation } from "../../state/api/user";
import { setUserToken } from "../../state";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";


export const useRefreshAccessToken = () => {
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = useCallback(async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    try {
      if (refresh_token) {
        const response = await refreshToken({ refresh: refresh_token });
       
        if ("data" in response) {
          const new_access_token = response.data.access;
          dispatch(setUserToken({ access_token: new_access_token }));
          setLoading(false);
        } else {
          // Handle token refreshing error or expired refresh token
          dispatch(setUserToken({ access_token: "" }));
          setLoading(false);
        }
      } else {
        // Handle missing refresh token
        dispatch(setUserToken({ access_token: "" }));
        setLoading(false);
      }
    } catch (error) {
      // Handle token refreshing error
      dispatch(setUserToken({ access_token: "" }));
      setLoading(false);
    }
  }, [dispatch, refreshToken]);


  return { refreshAccessToken, loading };
};
