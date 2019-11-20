import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(png)/" }
          relativeDirectory: { eq: "environment-icons" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div className="flex flex-col sm:flex-row justify-center">
      {data.allFile.edges.map((element, index) => {
        return (
          <Img
            key={index}
            fluid={element.node.childImageSharp.fluid}
            placeholderClassName="w-24"
            className="w-24 mx-auto sm:mx-8"
          />
        )
      })}
    </div>
  )
}

export default Image
