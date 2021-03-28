import React, { useState } from "react"
import { default as MenuComponent } from "cheeseburger-menu"
import { default as MenuIcon } from "react-hamburger-menu"
import styled from "@emotion/styled"
import Image from "next/image"
import { usePlausible } from "next-plausible"
import { PlausibleEvents } from "../../common/plausibleEvents"
import Link from "next/link"
import { mainEmailAddress } from "../../common/config"

export const Menu = (): JSX.Element => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const plausible = usePlausible()

  const setMenuIsOpenHandler = (state: boolean) => {
    setMenuIsOpen(state)
    plausible(state ? PlausibleEvents.OpenMenu : PlausibleEvents.CloseMenu)
  }

  return (
    <Nav>
      <MenuComponentWithStyle right noShadow isOpen={menuIsOpen} closeCallback={setMenuIsOpenHandler}>
        <MenuContentWrapper>
          <div>
            <ul>
              <li>
                <a href="#">GDPR</a>
              </li>
              <li>
                <Link href="https://www.facebook.com/IniciativaSnih">
                  <a title="Facebook Iniciativa Sníh" target="_blank" rel="noopener noreferrer">
                    Facebook Iniciativa Sníh
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p>
              Pokud chcete přidat příběh, svou vzpomínku na vašeho blízkého, pošlete email na{" "}
              <a href={`mailto:${mainEmailAddress}`} rel="noopener noreferrer">
                {mainEmailAddress}
              </a>{" "}
              se jménem, datem úmrtí, věkem a příběhem.
            </p>

            <Image src="/images/snih-logo.png" alt="snih-logo.png" width={210} height={54} />
          </div>
        </MenuContentWrapper>
      </MenuComponentWithStyle>

      <MenuIconWithStyle isOpen={menuIsOpen} menuClicked={setMenuIsOpenHandler} width={22} height={16} strokeWidth={3} color="rgba(0, 0, 0, 0.8)" />
    </Nav>
  )
}

const Nav = styled.nav`
  position: fixed;
  z-index: 1000;

  .cheeseburger-menu-outer {
    padding: 20px;

    .cheeseburger-menu-inner {
      height: calc(100vh - 40px);
    }
  }
`

const MenuIconWithStyle = styled(MenuIcon)`
  margin: 20px 0 0 20px;
  cursor: pointer;
`

const MenuComponentWithStyle = styled(MenuComponent)``

const MenuContentWrapper = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  div {
    h3 {
      margin-top: 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin-bottom: 10px;
        padding-left: 0px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
`
