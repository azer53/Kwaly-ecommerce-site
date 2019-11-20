/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import CookieConsent from "react-cookie-consent"
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import KwalyLogo from "../components/images/kwalyLogo"
import Navigation from "./navigation"
import Footer from "./footer"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="leading-normal tracking-normal">
      <CookieConsent buttonStyle={{ background: "#c3dafe" }}>
        This website uses Cookies to enable the site's functionality. For more
        information please read our{" "}
        <a href="/gdpr" target="_blank">
          privacy policy
        </a>
      </CookieConsent>
      <div id="logo" className="mx-auto w-1/6 pt-10 lg:w-1/12">
        <Link to="/">
          <KwalyLogo />
        </Link>
      </div>
      <Navigation siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Footer siteTitle={data.site.siteMetadata.title} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
