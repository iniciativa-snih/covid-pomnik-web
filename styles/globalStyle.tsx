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

        .disable-scrolling {
          overflow: hidden;
        }
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      a {
        color: rgba(0, 0, 0, 0.8);
      }

      footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        font-size: 12px;
        text-align: center;
        padding: 5px 0 5px 0;
        z-index: 999;
      }
    `}
  />
)
