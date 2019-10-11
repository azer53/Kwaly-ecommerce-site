import React, { Component } from 'react'
import Img from "gatsby-image"

export default class productTemplate extends Component {

    render() {

        const product = this.props.data.contentfulClothes;
        

        return (
            <div>
                <Img fluid={product.productImages[0].fluid}></Img>
            </div>
        )
    }
}
export const query = graphql`
        query($productSlug: String!) {
            contentfulClothes(slug: {eq: $productSlug}) {
                id
                color
                gender
                price
                size
                stock
                entry
                stripeSku
                displayName
                description {
                  description
                }
                productImages {
                  fluid(maxWidth: 300) {
                    ...GatsbyContentfulFluid
                  }
                }
                clothingType {
                  type
                }
              }
            }`
