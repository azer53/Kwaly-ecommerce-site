import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import SkuCard from './skuCard'
import Img from "gatsby-image"


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
                                query allContentfulClothes {
                                allContentfulClothes {
                                    edges {
                                    node {
                                        id
                                        color
                                        gender
                                        price
                                        size
                                        typeOfClothes
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
                                    }
                                    }
                                }
                                }

        `}
                render={
                    ({ allContentfulClothes }) => (
                        <div className="mx-auto flex w-10/12 flex-col sm:flex-row">
                            {allContentfulClothes.edges.map(({ node: sku }) => (
                                <SkuCard key={sku.id} sku={sku} stripe={this.state.stripe} />
                            ))}
                        </div>
                    )}
                />
        )
    }
}

export default Skus