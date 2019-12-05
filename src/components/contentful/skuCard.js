import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"

const SkuCard = class extends React.Component {

  render() {
    const sku = this.props.sku
    console.log(sku)
    return (
      <div className="hover:underline hover:shadow-2xl mx-1 my-4 w-10/12 product-card p-8 flex flex-col flex-grow-0 flex-shrink shadow-lg ">
        <Link to={"shop/" + sku.slug}>
          <div className="">
            {sku.productImages ? (
              <Img fluid={sku.productImages[0].fluid} placeholderClassName="" />
            ) : (
              <div></div>
            )}
            <div className="pt-8 text-karla-uppercase">{sku.title}</div>
            <div>
            <span
                className={`${
                  sku.variants[0].salePrice ? `line-through text-gray-600` : ``
                }`}
              >
                € {sku.variants[0].price}
              </span>
              <span className={`${sku.variants[0].salePrice ? `inline-block` : `hidden`} mx-4 font-bold`}>
                <span className="text-green-900">€ {sku.variants[0].salePrice}</span>
              </span>
              </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default SkuCard
