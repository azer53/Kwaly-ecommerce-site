import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DugiProfile from "../components/images/dugiProfile.js"
import RaffiProfile from "../components/images/raffiProfile.js"
import HeaderLarge from "../components/images/header-brand"
import HeaderMobile from "../components/images/header-mobile"

export default function Brand() {
  return (
    <Layout>
      <SEO title="About us" />
      <div className="">
        <div className="hidden md:block w-full lg:w-11/12 mx-auto mt-8">
          <HeaderLarge></HeaderLarge>
        </div>
        <div className="md:hidden w-full lg:w-11/12 mx-auto mt-8">
          <HeaderMobile></HeaderMobile>
        </div>
        <div className=" w-11/12 xl:w-8/12 lg:w-10/12 mx-auto py-8">
          <section>
            <h2 className="text-karla-uppercase mx-4 my-2 p-2 border-b-2">
              About Us
            </h2>
            <div className="my-12 bg-gray-300 rounded p-12 text-center">
              <h2 className="p-6 font-bold text-2xl text-gray-800">
                ORGANIC RECYCLED CLOTHING
              </h2>
              As surfers, skaters, snowboarders, skiers, adventurous travelers,
              we’re glad mother nature offers us the gift to enjoy these sports.
              However we’ve noticed a change in recent years, due to pollution.
              This is where we want to step forward and take our responsibility
              to make sure we can keep on riding! Therefore, Kwaly represents
              quality endurable clothing made out of organic and recycled
              materials. We support fair trade labor and strive to produce
              everything using green energy. Respect our planet, respect our
              playground.
            </div>
          </section>
          <section>
            <h2 className="text-karla-uppercase mx-4 my-2 p-2 border-b-2">
              Meet the team
            </h2>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 my-2 mx-4 p-8 rounded-lg bg-gray-200 shadow-xl">
                <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden">
                  <div className="sm:w-1/3 ">
                    <DugiProfile />
                  </div>
                  <div className="sm:w-2/3 bg-gray-100 p-8">
                    <h3 className="text-karla-uppercase text-gray-800 text-center mb-2">
                      dugi
                    </h3>
                    <div className="text-sm sm:text-base">
                      Creative at heart and always smiling or throwing shaka's.
                      Dugi also loves the outdoors and boardsports.
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 my-2 mx-4 p-8 rounded-lg bg-gray-200 shadow-xl">
                <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden">
                  <div className="sm:w-1/3 ">
                    <RaffiProfile />
                  </div>
                  <div className="sm:w-2/3 bg-gray-100 p-8">
                    <h3 className="text-karla-uppercase text-gray-800 text-center mb-2">
                      raffi
                    </h3>

                    <div className="text-sm sm:text-base">
                      Passionate about snowboarding and creating content. He's
                      also a drone pilot and guitar player.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

    </Layout>
  )
}
