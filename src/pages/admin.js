import React from "react"

import Layout from "../components/layout"
import { useIdentityContext } from "react-netlify-identity-widget"
import { Redirect } from "@reach/router" // highlight-line

const AdminPage = () => {
  const identity = useIdentityContext() // see https://github.com/sw-yx/react-netlify-identity for api of this identity object
  const isLoggedIn = identity && identity.isLoggedIn
  if (isLoggedIn)
    return (
      <Layout>
        <h1>Admin</h1>
      </Layout>
    )
  else
    return (
      //<div>nothing to find here</div>
      <Redirect to={`/404`} noThrow />
    )
}

export default AdminPage
