import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {login as authLogin } from "../Store/AuthSlice";
import { Posts } from "../Store/PostSlice";
import authentication from "../Appwrite/Auth";
import service from "../Appwrite/Config";

export default function SessionLoader({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSession = async () => {
      try {
        const user = await authentication.getUser();
        if (user) {
          dispatch(authLogin(user));
          const posts = await service.getallPost();
          if (posts) {
            dispatch(Posts(posts.documents));
          }
        }
      } catch (error) {
        console.log("SessionLoader Error:", error);
      }
    };
    loadSession();
  }, [dispatch]);

  return <>{children}</>;
}
