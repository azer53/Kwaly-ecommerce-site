import React, { useContext, useState } from 'react'
import Img from "gatsby-image"
import Layout from "../components/layout"
import {
    GlobalDispatchContext,
    GlobalStateContext,
} from "../context/GlobalContextProvider"


function ProductTemplate({ data }) {
    const dispatch = useContext(GlobalDispatchContext)
    //const state = useContext(GlobalStateContext)
    const product = data.contentfulProduct
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState(data.contentfulProduct.variants[0].size);
    const [selectedPrice, setSelectedPrice] = useState(data.contentfulProduct.variants[0].price);
    
    product.selectedSize = selectedSize
    product.price = selectedPrice 
    
    const handleChange = (event) => {
        const entry = parseInt(event.target.value, 10)
        if (!Number.isInteger(entry) || entry < 1) {
            setQuantity(1);
        }
        else {
            setQuantity(entry)
        }
    }

    const handleSelectedSizeChange = (event) => {
        setSelectedSize(event.target.value);
        setSelectedPrice(product.variants.find(x => x.size == event.target.value).price)
    }

    const IncrementItem = () => {
        setQuantity(parseInt(quantity, 10) + 1);
    }

    const DecreaseItem = () => {
        if (quantity > 1)
            setQuantity(parseInt(quantity, 10) - 1);
    }

    const addToCart = (product) => {
        product.orderQuantity = quantity;
        product.selectedSize = selectedSize;
        let orderProduct = Object.assign({}, product); 
        dispatch({
            type: "ADD_TO_CART",
            value: orderProduct
        })
    }

    return (
        <Layout>
            <div className="w-full flex flex-col sm:flex-row sm:w-10/12 lg:w-8/12 sm:mx-auto mt-12 p-4 ">
                <div className="flex-1 sm:mx-4 md:mx-10">
                    <Img fluid={product.productImages[0].fluid}></Img>
                </div>
                <div className="flex-1 flex-col md:mx-10 ">
                    <h1 className="text-karla-uppercase text-2xl my-8 sm:my-4 text-gray-800">
                        {product.title}
                    </h1>

                    <div className="my-3">
                        <select value={selectedSize} onChange={handleSelectedSizeChange} className="p-2  border-gray-500 border-2 text-karla-uppercase">
                            {product.variants.map((variant) => {
                                return variant.initialStockLevel === 0 ? <option key={variant.size} value={variant.size} disabled >{variant.size} - sold out</option> : <option key={variant.size} value={variant.size}>{variant.size}</option>
                            })}
                        </select>
                        <div className="px-6 inline-block text-karla-uppercase">
                            € {product.price}
                        </div>
                    </div>
                    <div className="flex flex-row justify-start border-t-2 border-gray-200 mt-5 pt-5">
                        <button onClick={DecreaseItem} className="p-2  border-gray-500 border-2">-</button>
                        <input type="number" name="quantity" min="1" max="99" step="1" value={quantity} onChange={handleChange} className="text-center border-gray-500 border-2 px-2 py-1 w-10 mx-4" />
                        <button onClick={IncrementItem} className="p-2  border-gray-500 border-2">+</button>
                        <button onClick={() => { addToCart(product) }} className="flex-auto w-2/3 mx-5 text-karla-uppercase shadow-lg border-2 hover:bg-gray-100">Add To Cart</button>
                    </div>
                    <div className="my-8" dangerouslySetInnerHTML={{ __html: product.description.childMarkdownRemark.html }}>
                    </div>



                </div>
            </div>

        </Layout>

    )
}
export default ProductTemplate
export const query = graphql`
        query($productSlug: String!) {
            contentfulProduct(slug: {eq: $productSlug}) {
                id
                color
                title
                description {
                    childMarkdownRemark {
                      html
                    }
                  }
                variants {
                    initialStockLevel
                    size
                    price
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
