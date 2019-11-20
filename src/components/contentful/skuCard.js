import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"

const SkuCard = class extends React.Component {

  render() {
    const sku = this.props.sku
    console.log(sku)
    return (
      <div className="hover:underline hover:shadow-2xl my-4 w-10/12 md:w-1/3 p-8 mx-auto sm:mx-2 flex flex-col flex-grow flex-shrink shadow-lg">
        <Link to={"shop/" + sku.slug}>
          <div className="">
            {sku.productImages ? (
              <Img fluid={sku.productImages[0].fluid} placeholderClassName="" />
            ) : (
              <div></div>
            )}
            <div className="pt-8 text-karla-uppercase">{sku.title}</div>
            <div>€ {sku.variants[0].price}</div>
          </div>
        </Link>
      </div>
    )
  }
}

export default SkuCard
