import React from "react"
import Layout from "../components/layout"
import Hero from "../components/smallHero"
import CallToAction from "../components/callToAction"
import SEO from "../components/seo"
import Products from "../components/stripe/products"



const IndexPage = () => (
  <Layout>
    <SEO title="Commerce 2020" />
    <Hero></Hero>
    <section className="bg-white border-b py-8">

      <div className="container mx-auto flex flex-wrap pt-4 pb-12">

        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Stripe products</h1>

        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <Products />


      </div>

    </section>


    <CallToAction></CallToAction>



  </Layout >
)

export default IndexPage
