import { Link } from "gatsby"
import React from "react"
import KwalyLogo from "./images/kwalyLogo"
import { useIdentityContext } from "react-netlify-identity-widget"

const Navigation = () => {
  const identity = useIdentityContext() // see https://github.com/sw-yx/react-netlify-identity for api of this identity object
  const isLoggedIn = identity && identity.isLoggedIn
  const [isHamburgerExpanded, setHamburgerExpanded] = React.useState(false)

  return (
    <div>
      <nav className="toggleColour" id="header">
        <div className="mx-auto w-1/6 mt-10 lg:w-1/12">
          <Link to="/">
            <KwalyLogo />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setHamburgerExpanded(!isHamburgerExpanded)}
            className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-400 hover:text-gray-500 hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          id="nav-content"
          className={`${
            isHamburgerExpanded ? `block` : `hidden`
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto mt-8`}
        >
          <div className="text-sm lg:flex-grow flex justify-center">
            <Link
              to={`/shop`}
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mx-4"
            >
              SHOP
            </Link>
            <Link
              to={`/brand`}
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mx-4"
            >
              BRAND
            </Link>
            <Link
              to={`/page-2`}
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mx-4"
            >
              SOCIAL
            </Link>
            <Link
              to={`/admin`}
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-500 mx-4 uppercase"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
