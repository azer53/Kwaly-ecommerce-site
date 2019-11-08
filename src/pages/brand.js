import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DugiProfile from "../components/images/dugiProfile.js"
import RaffiProfile from "../components/images/raffiProfile.js"

export default function Brand() {
  return (
    <Layout>
      <SEO title="About us" />
      <div className="w-11/12 xl:w-8/12 lg:w-10/12 mx-auto py-8">
        <h1 className="my-2 text-5xl font-bold leading-tight text-center text-gray-800 text-karla-uppercase">
          About Kwaly
        </h1>

        <h2 className="text-karla-uppercase mx-4 my-2 p-2 border-b-2">Meet the team</h2>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 my-2 mx-4 p-8 rounded-lg bg-gray-200 shadow-xl">
            <div className="flex flex-row rounded-lg overflow-hidden">
              <div className="w-1/3 ">
                <DugiProfile />
              </div>
              <div className="w-2/3 bg-gray-100 p-8">
                <h3 className="text-karla-uppercase text-gray-800 text-center mb-2">
                  dugi
                </h3>
                <div>Some filler text about Dugi, what you wanna know?</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 my-2 mx-4 p-8 rounded-lg bg-gray-200 shadow-xl">
            <div className="flex flex-row rounded-lg overflow-hidden">
              <div className="w-1/3 ">
                <RaffiProfile />
              </div>
              <div className="w-2/3 bg-gray-100 p-8">
                <h3 className="text-karla-uppercase text-gray-800 text-center mb-2">
                  raffi
                </h3>

                <div>
                  Raffi loves: snow, guitar, music and the earth!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
