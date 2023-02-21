// react native paper
import { Avatar } from "react-native-paper";

const SicatAvatar = ({ size, style }) => {
  return (
    <Avatar.Image
      size={size}
      source={require("../../../assets/sicat_logo.jpg")}
      style={style}
    />
  );
};

export default SicatAvatar;
