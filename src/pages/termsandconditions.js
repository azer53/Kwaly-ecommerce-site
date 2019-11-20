import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Termsandconditions() {
  return (
    <Layout>
      <SEO title="terms & conditions" />
      <div className="w-11/12 md:w-8/12 mx-auto">
        <h1 className="w-full my-2 text-2xl font-bold leading-tight text-center text-gray-800 text-karla-uppercase">
          Algemene voorwaarden
        </h1>

        <StaticQuery
    query={graphql`
    query termsAndConditions {
        contentfulPage(contentfulid: {eq: "terms-and-conditions"}) {
          childContentfulPageContentRichTextNode {
            json
          }
        }
      }
      
    `}
    render={data => (
      <div className="markdown">
          {documentToReactComponents(data.contentfulPage.childContentfulPageContentRichTextNode.json)}
      </div>
    )}
  />
      </div>
    </Layout>
  )
}
