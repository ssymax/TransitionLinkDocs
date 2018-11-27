import React from 'react'
import styled from 'styled-components'
import Grid from 'styled-components-grid'
import Edges from '../components/Edges'
import * as theme from '../theme'
import SidebarMenu from '../components/Menus/SidebarMenu'

export default function SidebarLayout(props) {
  return (
    <LayoutStyles>
      <Edges>
        <Grid>
          <SidebarSpace size={{ md: 1 / 4 }}>
            <Grid.Unit visible={{ xs: true, md: false }}>
              <DefaultSidebar show />
            </Grid.Unit>
          </SidebarSpace>
          <Content size={{ md: 3 / 4 }}>{props.children}</Content>
        </Grid>
      </Edges>
    </LayoutStyles>
  )
}

export const DefaultSidebar = ({ show, fixed }) => {
  return (
    <SidebarStyles show={show} fixed={fixed}>
      <SidebarMenu />
      <GithubLink
        href="https://github.com/TylerBarnes/gatsby-plugin-transition-link"
        target="_blank"
      >
        View source on Github
      </GithubLink>

      <TyLink href="https://tylerbarnes.ca" target="_blank">
        Made with Love by <span>TY</span>.
      </TyLink>
    </SidebarStyles>
  )
}

const GithubLink = styled.a`
  display: block;
  margin-bottom: 80px;
`

const TyLink = styled.a`
  &,
  span {
    color: ${theme.color.lightGreen};
  }
  span {
    text-decoration: underline;
  }
`

const SidebarStyles = styled.nav`
  ${props =>
    props.fixed
      ? `
    position: fixed;
    top: 210px;
    z-index: 10;
    max-width: 200px
  `
      : null};
  font-size: 16px;

  li {
    margin-bottom: 5px;
  }

  ${props =>
    !props.show
      ? `
        display: none;
      `
      : null};
`

const SidebarSpace = styled(Grid.Unit)`
  padding-top: 88px;
`

const LayoutStyles = styled.section`
  padding: 120px 0;
  min-height: 100vh;
  background: white;
`

const Content = styled(Grid.Unit)``
