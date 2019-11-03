// import React, { Component } from 'react'
// import { graphql, StaticQuery } from 'gatsby'
// import SkuCard from './skuCard'



// class Skus extends Component {
//     // Initialise Stripe.js with your publishable key.
//     // You can find your key in the Dashboard:
//     // https://dashboard.stripe.com/account/apikeys
//     state = {
//         stripe: null,
//     }
//     componentDidMount() {
//         const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)
//         this.setState({ stripe })
//     }

//     render() {
//         return (
//             <StaticQuery
//                 query={graphql`
//                 query SkusForProduct {
//                     allStripeSku {
//                       edges {
//                         node {
//                           price
//                           id
//                           currency
//                           product {
//                             name
//                           }
//                         }
//                       }
//                     }
//                   }
//         `}
//                 render={
//                     ({ allStripeSku }) => (
//                     <>
//                         {console.log(allStripeSku)}
//                         {allStripeSku.edges.map(({ node: sku }) => (
//                             <SkuCard key={sku.id} sku={sku} stripe={this.state.stripe} />
//                         ))}
//                     </>
//                 )}
//             />
//         )
//     }
// }

// export default Skus