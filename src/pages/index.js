import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Card from "../components/card"
import Hero from "../components/hero"
import CallToAction from "../components/callToAction"


const IndexPage = () => (
  <Layout>
    {/*     <Card name="test" />
    <Card name="eli" /> */}
    <Hero></Hero>
    <section className="bg-white border-b py-8">

      <div className="container mx-auto flex flex-wrap pt-4 pb-12">

        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Title</h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a href="#" className="flex flex-wrap no-underline hover:no-underline">
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">xGETTING STARTED</p>
              <div className="w-full font-bold text-xl text-gray-800 px-6">Lorem ipsum dolor sit amet.</div>
              <p className="text-gray-800 text-base px-6 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-start">
              <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Action</button>
            </div>
          </div>
        </div>



        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a href="#" className="flex flex-wrap no-underline hover:no-underline">
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">xGETTING STARTED</p>
              <div className="w-full font-bold text-xl text-gray-800 px-6">Lorem ipsum dolor sit amet.</div>
              <p className="text-gray-800 text-base px-6 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-center">
              <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Action</button>
            </div>
          </div>
        </div>



        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <a href="#" className="flex flex-wrap no-underline hover:no-underline">
              <p className="w-full text-gray-600 text-xs md:text-sm px-6">xGETTING STARTED</p>
              <div className="w-full font-bold text-xl text-gray-800 px-6">Lorem ipsum dolor sit amet.</div>
              <p className="text-gray-800 text-base px-6 mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>
            </a>
          </div>
          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
            <div className="flex items-center justify-end">
              <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Action</button>
            </div>
          </div>
        </div>


      </div>

    </section>

    <section className="bg-gray-100 py-8">



      <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">

        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Pricing</h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>



        <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">

          <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
            <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
              <div className="p-8 text-3xl font-bold text-center border-b-4">Free</div>
              <ul className="w-full text-center text-sm">
                <li className="border-b py-4">Thing</li>
                <li className="border-b py-4">Thing</li>
                <li className="border-b py-4">Thing</li>
              </ul>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">£0 <span className="text-base">for one user</span></div>
              <div className="flex items-center justify-center">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Sign Up</button>
              </div>
            </div>
          </div>



          <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <div className="w-full p-8 text-3xl font-bold text-center">Basic</div>
              <div className="h-1 w-full gradient my-0 py-0 rounded-t"></div>
              <ul className="w-full text-center text-base font-bold">
                <li className="border-b py-4">Thing</li>
                <li className="border-b py-4">Thing</li>
                <li className="border-b py-4">Thing</li>
                <li className="border-b py-4">Thing</li>
              </ul>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="w-full pt-6 text-4xl font-bold text-center">£x.99 <span className="text-base">/ per user</span></div>
              <div className="flex items-center justify-center">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Sign Up</button>
              </div>
            </div>
          </div>



          <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
            <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
              <div className="p-8 text-3xl font-bold text-center border-b-4">Pro</div>
              <ul className="w-full text-center text-sm">
                <li className="border-b py-4">Thing</li>
                <li className="border-b py-4">Thing</li>
                <li className="border-b py-4">Thing</li>
              </ul>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">£x.99 <span className="text-base">/ per user</span></div>
              <div className="flex items-center justify-center">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Sign Up</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <CallToAction></CallToAction>



  </Layout >
)

export default IndexPage
