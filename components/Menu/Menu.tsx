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
      <MenuComponentWithStyle left noShadow isOpen={menuIsOpen} closeCallback={() => setMenuIsOpenHandler(false)}>
        <MenuContentWrapper>
          <div>
            <h2>Památník obětí pandemie v České republice</h2>
            <h3>Pravidla pro zasílání informací</h3>
            <ol>
              <li>Vážíme se vašich zpráv a informací ke zveřejnění</li>
              <li>Zasílejte výhradně pouze informace týkající se na zemřelé na COVID 19 v České republice</li>
              <li>
                Pro zveřejnění potřebujeme informace minimálně s křestním jménem a iniciály příjmení a s krátkou vzpomínkou, na vaše přání je možné zveřejnit
                celé příjmení, případně i fotografii
              </li>
              <li>Pro umístění v časové řadě památníku je důležité, abyste zaslali i datum úmrtí</li>
              <li>V případě nesrovnalostí či sporů bude jednotlivý záznam odstraněný a po dořešení bude možnost znovu záznam umístit</li>
              <li>
                Zasílejte prosím na adresu{" "}
                <a href={`mailto:${mainEmailAddress}`} rel="noopener noreferrer">
                  {mainEmailAddress}
                </a>
              </li>
            </ol>

            <ul>
              <li>
                <Link href="https://www.iniciativa-snih.cz/">
                  <a title="Iniciativa Sníh" target="_blank" rel="noopener noreferrer">
                    Iniciativa Sníh
                  </a>
                </Link>
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
            <Link href="https://www.iniciativa-snih.cz/">
              <a title="Iniciativa Sníh" target="_blank" rel="noopener noreferrer">
                <Image src="/images/logo_Iniciativa_snih_09.svg" alt="logo_Iniciativa_snih_09.svg" width={300} height={56} />
              </a>
            </Link>
          </div>
        </MenuContentWrapper>
      </MenuComponentWithStyle>

      <MenuIconWithStyle isOpen={menuIsOpen} menuClicked={() => setMenuIsOpenHandler(true)} width={22} height={16} strokeWidth={3} color="rgba(0, 0, 0, 0.8)" />
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
    h2,
    h3 {
      margin-top: 0;
    }

    ol {
      margin-bottom: 30px;

      li {
        margin-bottom: 5px;
        line-height: 1.3;
      }
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
