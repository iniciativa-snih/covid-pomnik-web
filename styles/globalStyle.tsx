import React from "react"
import { css, Global } from "@emotion/react"

export const globalStyles = (
  <Global
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

      html,
      body {
        padding: 0;
        margin: 0;
        background: #fff;
        min-height: 100%;
        font-family: "Roboto", sans-serif;
        color: rgba(0, 0, 0, 0.7);
        font-size: 24px;
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `}
  />
)
