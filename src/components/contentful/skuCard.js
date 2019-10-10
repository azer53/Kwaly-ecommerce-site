
import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"


const formatPrice = (amount, currency) => {
    
    let numberFormat = new Intl.NumberFormat(["en-US"], {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
    })
    return numberFormat.format(amount)
}

const SkuCard = class extends React.Component {
    async redirectToCheckout(event, sku, quantity = 1) {
        event.preventDefault()
        const { error } = await this.props.stripe.redirectToCheckout({
            items: [{ sku, quantity }],
            successUrl: window.location.origin + '/success',
            cancelUrl: window.location.origin + '/cancel',
        })

        if (error) {
            console.warn("Error:", error)
        }
    }

    render() {
        const sku = this.props.sku
        return (

                <div className="w-10/12 md:w-1/3 p-8 mx-auto sm:mx-2 flex flex-col flex-grow flex-shrink shadow-lg">
                    <Link to="./shop#">
                    <div className="">

                                <Img fluid={sku.productImages[0].fluid} placeholderClassName="" />
                    <div className="pt-8 text-karla-uppercase">
                    {sku.displayName}
                    </div>
                    <div>
                    € {sku.price}
                    </div>
                    
                    </div>
                    </Link>
                </div>
        )
    }
}

export default SkuCard

