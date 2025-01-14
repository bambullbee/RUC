import React from "react";

interface pawSVGI {
  colors: [string, string, string, string, string];
}

const PawSVG = ({ colors }: pawSVGI) => {
  return (
    <svg
      className="profile__img__pic"
      width="100%"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.2217 25.0606C23.2217 27.1743 20.9932 25.0606 18.2441 25.0606C15.495 25.0606 13.2665 27.1743 13.2665 25.0606C13.2665 22.947 15.495 18.5 18.2441 18.5C20.9932 18.5 23.2217 22.947 23.2217 25.0606Z"
        fill={colors[0]}
      />
      <ellipse
        cx="1.78074"
        cy="2.99543"
        rx="1.78074"
        ry="2.99543"
        transform="matrix(0.983143 -0.18284 0.164891 0.986312 9 13.9012)"
        fill={colors[1]}
      />
      <ellipse
        cx="1.78074"
        cy="2.99543"
        rx="1.78074"
        ry="2.99543"
        transform="matrix(-0.983143 -0.18284 -0.164891 0.986312 27 13.9012)"
        fill={colors[2]}
      />
      <ellipse
        cx="15.3998"
        cy="12.125"
        rx="2.13327"
        ry="4.125"
        fill={colors[3]}
      />
      <ellipse
        cx="20.3774"
        cy="12.125"
        rx="2.13327"
        ry="4.125"
        fill={colors[4]}
      />
    </svg>
  );
};

export default PawSVG;
