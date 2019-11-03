
// import React from "react"

// const formatPrice = (amount, currency) => {
//     let price = (amount / 100).toFixed(2)
//     let numberFormat = new Intl.NumberFormat(["en-US"], {
//         style: "currency",
//         currency: currency,
//         currencyDisplay: "symbol",
//     })
//     return numberFormat.format(price)
// }

// const SkuCard = class extends React.Component {
//     async redirectToCheckout(event, sku, quantity = 1) {
//         event.preventDefault()
//         const { error } = await this.props.stripe.redirectToCheckout({
//             items: [{ sku, quantity }],
//             successUrl: window.location.origin + '/success',
//             cancelUrl: window.location.origin + '/cancel',
//         })

//         if (error) {
//             console.warn("Error:", error)
//         }
//     }

//     render() {
//         const sku = this.props.sku
//         return (

//             <>
//                 <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
//                     <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
//                         <a href="#" className="flex flex-wrap no-underline hover:no-underline">
//                             <p className="w-full text-gray-600 text-xs md:text-sm px-6">{sku.product.name}</p>
//                             <div className="w-full font-bold text-xl text-gray-800 px-6">{sku.product.name}</div>
//                             <p className="text-gray-800 text-base px-6 mb-5">
//                                 Price: {formatPrice(sku.price, sku.currency)}
//                             </p>
//                         </a>
//                     </div>
//                     <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
//                         <div className="flex items-center justify-start">
//                             <button onClick={event => this.redirectToCheckout(event, sku.id)} className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Buy</button>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }
// }

// export default SkuCard

