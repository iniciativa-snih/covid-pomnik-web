import React, { useState } from "react"
import { default as MenuComponent } from "cheeseburger-menu"
import { default as MenuIcon } from "react-hamburger-menu"
import styled from "@emotion/styled"

export const Menu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  return (
    <Nav>
      <MenuComponentWithStyle right noShadow isOpen={menuIsOpen} closeCallback={() => setMenuIsOpen(false)}>
        <MenuContentWrapper>
          <div>
            <h3>Památník obětí pandemie</h3>
            <ul>
              <li>Menu item 1</li>
            </ul>
          </div>
          <div>
            <span>info@domena.cz</span>
          </div>
        </MenuContentWrapper>
      </MenuComponentWithStyle>

      <MenuIconWithStyle isOpen={menuIsOpen} menuClicked={() => setMenuIsOpen(true)} width={22} height={16} strokeWidth={3} color="rgba(0, 0, 0, 0.8)" />
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
        padding-left: 20px;
      }
    }
  }
`
