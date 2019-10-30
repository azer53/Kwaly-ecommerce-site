import React from "react"

import Layout from "../components/layout"
import BaseProduct from "../components/BaseProduct"
import { useIdentityContext } from "react-netlify-identity-widget"
import { Redirect } from "@reach/router" // highlight-line

const AdminPage = ({ data }) => {
  const identity = useIdentityContext() // see https://github.com/sw-yx/react-netlify-identity for api of this identity object
  const isLoggedIn = identity && identity.isLoggedIn
  const baseProducts = data.allStripeProduct.edges
  const allSkus = data.allStripeSku.edges

  if (isLoggedIn)
    return (
      <Layout>
        <div className="container mx-auto pt-4 pb-12">
          {baseProducts.map((product, index) => {
            const skus = allSkus.filter(
              variant => variant.node.product.id === product.node.id
            )
            return (
              <BaseProduct key={index} product={product.node} skus={skus} />
            )
          })}
        </div>
      </Layout>
    )
  else
    return (
      //<div>nothing to find here</div>
      <Redirect to={`/404`} noThrow />
    )
}

export const query = graphql`
  {
    allStripeProduct {
      edges {
        node {
          name
          id
        }
      }
    }
    allStripeSku {
      edges {
        node {
          id
          product {
            id
          }
          inventory {
            quantity
          }
          price
          attributes {
            size
          }
        }
      }
    }
  }
`

export default AdminPage
