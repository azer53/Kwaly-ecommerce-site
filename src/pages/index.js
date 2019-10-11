import React from "react"
import Layout from "../components/layout"
import ActionCard from "../components/actionCard"
import PricingCard from "../components/pricingCard"
import Hero from "../components/hero"
import CallToAction from "../components/callToAction"
import SEO from "../components/seo"
import BlackShirt from "../components/images/black-shirt.js"
import PinkShirt from "../components/images/pink-shirt.js"
import InstaFeed from "../components/instaFeed.js"
import { Link } from "gatsby"

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: {
        graphql: {
          user: {
            edge_owner_to_timeline_media: {
              edges: []
            }
          }
        }
      }
    }
  }
  componentDidMount() {
    fetch('https://www.instagram.com/kwaly_/?__a=1')
      .then(res => res.json())
      .then((data) => {
        this.setState({ result: data });
        console.log(this.state.result);
      })
      .catch(console.log)
  }

  render() {
    return (
      <Layout>
        <SEO title="KWALY - ORGANIC RECYCLED CLOTHING" />
        <Hero></Hero>
        <section className="bg-white py-8 my-8">

          <div className="lg:w-5/12 mx-auto">

            <div className="mx-auto text-center text-karla-uppercase text-2xl">
              <h2 className="mb-8">
                EMBROIDERED SERIES
              </h2>
              <div className="flex justify-center shadow-xl p-4">
                <div className="flex-1 px-8">
                  <PinkShirt />
                </div>
                <div className="flex-1 px-8">
                  <BlackShirt />
                </div>
              </div>
              <div>

                <button className="text-karla-uppercase bg-gray-300 p-4 text-lg shadow-lg -mt-4">
                  <Link to="./shop">Find out more!</Link>
                </button>
              </div>
            </div>
          </div>

        </section>
        <section>
          <div className="lg:w-10/12 mx-auto">

            <InstaFeed edges={this.state.result.graphql.user.edge_owner_to_timeline_media.edges} />

          </div>


        </section>
      </Layout >
    )
  }
}
export default IndexPage
