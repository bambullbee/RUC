import React from "react";

import { bubblePropsI } from "../types/types";

const Profile = ({ style }: bubblePropsI) => {
  return (
    <div className="prof" style={{ opacity: style }}>
      Profile
    </div>
  );
};

export default Profile;
