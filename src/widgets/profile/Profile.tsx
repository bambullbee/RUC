import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/app/store";
import {
  changeVisibility,
  changeBanner,
  changePaw,
  fetchCatPhoto,
} from "@/app/features/profileSlice";
import QuestionMarkSVG from "./UI/QuestionMarkSVG";
import PawSVG from "./UI/PawSVG";
import ProfilePhoto from "./UI/ProfilePhoto";
import { useAppDispatch } from "@/shared/withTypes/useDispatch";
import { MobileBottomMargin } from "@/shared";

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
        <button
          className={`profile__img profile__item ${
            profile.photo.loading === "pending" ? "profile__img__loading" : ""
          }`}
          onClick={() => {
            dispatch(fetchCatPhoto() as any);
          }}
        >
          {profile.photo.url && !profile.photo.error ? (
            <ProfilePhoto src={profile.photo.url} />
          ) : profile.photo.loading === "error" ? (
            <div className="photo-error">{profile.photo.error}</div>
          ) : (
            <QuestionMarkSVG />
          )}
          <div className="profile-img__text">Ваше фото</div>
        </button>
        <button
          className="profile__img profile__item"
          onClick={() => {
            dispatch(changePaw());
          }}
        >
          {profile.paw ? <PawSVG colors={profile.paw} /> : <QuestionMarkSVG />}

          <div className="profile-img__text">Ваша лапка</div>
        </button>
        <div className="profile__info-item profile__item">
          <div className="profile__item__inner">
            Настроение
            <br />
            {profile.mood ? `${profile.mood}` : "???"}
          </div>
        </div>
        <div className="profile__info-item profile__item">
          <div className="profile__item__inner">
            Личность
            <br /> {profile.species ? profile.species : "???"}
          </div>
        </div>
        <div className="profile__loyalty profile__item">
          <div className="profile__item__inner">
            Котячье признание: {profile.loyalty ? profile.loyalty : "0"} лапок
            из 9
          </div>
        </div>
        <button
          className="profile__back-btn profile__item "
          onClick={() => {
            dispatch(changeVisibility());
          }}
        >
          <div className="profile__item__inner"> Назад</div>
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
        <MobileBottomMargin />
      </div>
    </div>
  );
};

export default Profile;
