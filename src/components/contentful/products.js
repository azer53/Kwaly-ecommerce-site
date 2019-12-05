import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import SkuCard from './skuCard'



class Skus extends Component {
    // Initialise Stripe.js with your publishable key.
    // You can find your key in the Dashboard:
    // https://dashboard.stripe.com/account/apikeys
    state = {
        stripe: null,
    }
    componentDidMount() {
        const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)
        this.setState({ stripe })
    }

    render() {
        return (
            <StaticQuery
                query={graphql`
                                query allContentfulProducts {
                                    allContentfulProduct {
                                    edges {
                                    node {
                                        id
                                        title
                                        color
                                        slug
                                        productImages {
                                        fluid(maxWidth: 600) {
                                            ...GatsbyContentfulFluid
                                            }
                                        }
                                        clothingType {
                                            type
                                          }
                                          variants{
                                              price
                                              size
                                              salePrice
                                          }
                                    }
                                    }
                                }
                                }

        `}
                render={
                    ({ allContentfulProduct }) => (
                        <div className="mx-auto flex w-10/12 flex-col sm:flex-row flex-wrap">
                            {allContentfulProduct.edges.map(({ node: sku }) => (
                                <SkuCard key={sku.id} sku={sku} stripe={this.state.stripe} />
                            ))}
                        </div>
                    )}
            />
        )
    }
}

export default Skus