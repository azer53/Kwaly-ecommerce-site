import React, { Component } from 'react'
import Img from "gatsby-image"
import Layout from "../components/layout"

export default class productTemplate extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            quantity: 1
        };

    }

    IncrementItem = () => {
        this.setState({ quantity: parseInt(this.state.quantity, 10) + 1 });
    }
    DecreaseItem = () => {
        if (this.state.quantity > 0)
            this.setState({ quantity: parseInt(this.state.quantity, 10) - 1 });
    }

    handleChange(event) {
        this.setState({ quantity: event.target.value })
    }

    render() {

        const product = this.props.data.contentfulClothes;


        return (
            <Layout>
                <div className="w-full flex flex-col sm:flex-row sm:w-10/12 lg:w-8/12 sm:mx-auto mt-12 p-4 ">
                    <div className="flex-1 sm:mx-4 md:mx-10">
                        <Img fluid={product.productImages[0].fluid}></Img>
                    </div>
                    <div className="flex-1 flex-col md:mx-10 ">
                        <h1 className="text-karla-uppercase text-2xl my-8 sm:my-4">
                            {product.displayName}
                        </h1>
                        <div className="my-3">
                            <select className="p-2  border-gray-500 border-2 text-karla-uppercase">
                                {product.sizeInventory.map((sizeItem) => {
                                    return sizeItem.quantity === 0 ? <option value="{sizeItem.size}"  disabled >{sizeItem.size} - sold out</option> : <option value="{sizeItem.size}" >{sizeItem.size}</option> 
                                })}
                            </select>

                        </div>
                        <div className="flex flex-row justify-start border-t-2 border-gray-200 mt-5 pt-5">
                            <button onClick={this.DecreaseItem} className="p-2  border-gray-500 border-2">-</button>
                            <input type="number" name="quantity" min="1" max="99" step="1" value={this.state.quantity} onChange={this.handleChange} className="text-center border-gray-500 border-2 px-2 py-1 w-10 mx-4" />
                            <button onClick={this.IncrementItem} className="p-2  border-gray-500 border-2">+</button>
                            <button className="flex-auto w-2/3 mx-5 text-karla-uppercase shadow-lg border-2 hover:bg-gray-100">Add To Cart</button>
                        </div>
                        <div className="my-8" dangerouslySetInnerHTML={{ __html: product.description.childMarkdownRemark.html }}>
                        </div>



                    </div>
                </div>

            </Layout>

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
                entry
                stripeSku
                displayName
                description {
                    childMarkdownRemark {
                      html
                    }
                  }
                sizeInventory {
                    quantity
                    size
                  }
                productImages {
                  fluid(maxWidth: 600) {
                    ...GatsbyContentfulFluid
                  }
                }
                clothingType {
                  type
                }
              }
            }`
