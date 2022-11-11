import * as React from "react";
const SvgYoutube = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#fff",
        fillOpacity: 1,
      }}
      d="M2.637 13.71h12.726A2.64 2.64 0 0 0 18 11.075V2.637A2.64 2.64 0 0 0 15.363 0H2.637A2.64 2.64 0 0 0 0 2.637v8.437a2.64 2.64 0 0 0 2.637 2.637ZM1.055 2.638c0-.871.71-1.582 1.582-1.582h12.726c.871 0 1.582.71 1.582 1.582v8.437c0 .871-.71 1.582-1.582 1.582H2.637c-.871 0-1.582-.71-1.582-1.582Zm0 0"
    />
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#fff",
        fillOpacity: 1,
      }}
      d="M6.363 3.324v7.168l6.348-3.644Zm1.055 1.79 3.144 1.75-3.144 1.804Zm0 0"
    />
  </svg>
);
export default SvgYoutube;
