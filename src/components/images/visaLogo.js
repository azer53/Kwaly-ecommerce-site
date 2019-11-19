import React from "react"
import {  useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import {WebpMachine} from "webp-hero"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const polyfill = ()=>{
  const webpMachine = new WebpMachine()
  webpMachine.polyfillDocument();
}

const VisaLogo = ()=> {
const data  = useStaticQuery(graphql`
      query {
        visaLogo: file(relativePath: { eq: "visa.webp" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `)
      return (
        <Img
        fluid={data.visaLogo.childImageSharp.fluid} onLoad={polyfill}
      />
      )
  }

  export default VisaLogo