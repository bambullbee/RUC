import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/app/store";
import {
  changeVisibility,
  changeBanner,
  changePaw,
} from "@/app/features/profileSlice";
import QuestionMarkSVG from "./UI/QuestionMarkSVG";
import PawSVG from "./UI/PawSVG";
import ProfilePhoto from "./UI/ProfilePhoto";

const Profile = () => {
  const dispatch = useDispatch();
  let style = { transform: "translate(-200%, 0)" };
  const profile = useSelector((state: RootState) => state.profile);
  if (profile.isVisible) {
    style.transform = "translate(0, 0)";
  }
  return (
    <div className="profile" style={style}>
      <div className="profile__container ">
        <div
          className="profile__img profile__item"
          onClick={() => {
            let controller = new AbortController();
          }}
        >
          {profile.photo.isPhoto && !profile.photo.error ? (
            <ProfilePhoto src={profile.photo.url} />
          ) : (
            <QuestionMarkSVG />
          )}
          <div className="profile-img__text">Ваше фото</div>
        </div>
        <div
          className="profile__img profile__item"
          onClick={() => {
            dispatch(changePaw());
          }}
        >
          {profile.paw ? <PawSVG colors={profile.paw} /> : <QuestionMarkSVG />}

          <div className="profile-img__text">Ваша лапка</div>
        </div>
        <div className="profile__info-item profile__item">
          <div className="profile__item__inner">Mood</div>
        </div>
        <div className="profile__info-item profile__item">
          <div className="profile__item__inner">Identity</div>
        </div>
        <div className="profile__loyalty profile__item">
          <div className="profile__item__inner">Loyalty</div>
        </div>
        <button
          className="profile__back-btn profile__item "
          onClick={() => {
            dispatch(changeVisibility());
          }}
        >
          <div className="profile__item__inner"> Back</div>
        </button>
        {profile.bannerUsed ? (
          ""
        ) : (
          <div
            className="profile-tip"
            onClick={() => {
              dispatch(changeBanner());
            }}
          >
            Нажимай на поле фото или лапки, чтобы получить актуальную информацию
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
