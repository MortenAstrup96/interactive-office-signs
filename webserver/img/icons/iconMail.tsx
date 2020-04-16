import React from "react";

const IconMail = ({
                      style = {},
                      fill = "rgba(0,0,0,0.72)",
                      width = "50px",
                      className = "",
                      viewBox = "0 0 32 32"
                  }) => (
    <svg
        width={width}
        style={style}
        height={width}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={`svg-icon ${className || ""}`}
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path fill={fill}
              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z"/>
    </svg>

);

export default IconMail;
