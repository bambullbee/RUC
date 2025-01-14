import React from "react";

interface profilePhotoI {
  src: string;
}

const ProfilePhoto = ({ src }: profilePhotoI) => {
  return <img className="profile__img__pic" src={src} alt="Милый кот" />;
};

export default ProfilePhoto;
