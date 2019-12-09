import React from "react"
import Layout from "../components/layout"
import Hero from "../components/hero"
import SEO from "../components/seo"
import BlackShirt from "../components/images/black-shirt.js"
import PinkShirt from "../components/images/pink-shirt.js"
import InstaFeed from "../components/instaFeed.js"
import { Link } from "gatsby"
import LazyLoad from "react-lazyload"

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="KWALY - ORGANIC RECYCLED CLOTHING" />
        <Hero></Hero>
        <section className="bg-white py-8 my-8">
          <div className="lg:w-5/12 mx-auto">
            <div className="mx-auto text-center text-karla-uppercase text-2xl">
              <h2 className="mb-8">EMBROIDERED SERIES</h2>
              <Link to="./shop">
                <div className="flex justify-center hover:shadow-2xl shadow-xl p-4">
                  <div className="flex-1 px-8">
                    <PinkShirt />
                  </div>
                  <div className="flex-1 px-8">
                    <BlackShirt />
                  </div>
                </div>
                <div>
                  <button className="hover:shadow-xl text-karla-uppercase bg-gray-300 p-4 text-lg shadow-lg -mt-4">
                    Find out more!
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="lg:w-10/12 mx-auto">
            <LazyLoad height={200} offset={100}>
              <InstaFeed />
            </LazyLoad>
          </div>
        </section>
      </Layout>
    )
  }
}
export default IndexPage
