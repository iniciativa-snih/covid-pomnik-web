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
        overflow-x: hidden;

        .disable-scrolling {
          overflow: hidden;
        }
      }

      .content {
        display: block;
        flex: 0 0 83.33333333%;
        max-width: 83.33333333%;

        section {
          margin: 40px 0 40px 0;
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

      .PersonsWrapper {
        height: 100vh;
        position: relative;
      }

      .height {
        height: 100%;
      }

      .MessagesWrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        pointer-events: none;
      }
    `}
  />
)
