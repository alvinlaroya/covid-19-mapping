import React from "react";

// react-native paper
import { IconButton } from "react-native-paper";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setUserSession } from "../../redux/actions";

// react navigation
import { useNavigation } from "@react-navigation/native";

// firetore
import { signOut } from "firebase/auth";
import { auth } from "../../_common/services/database";

const AuthButton = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const login = () => {
    navigation.navigate("SignIn");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserSession({}));
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return auth.currentUser ? (
    <IconButton icon="logout" iconColor="black" size={20} onPress={logout} />
  ) : (
    <IconButton icon="login" iconColor="black" size={20} onPress={login} />
  );
};

export default AuthButton;
