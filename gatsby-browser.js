import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
require("./src/css/style.css")

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
// ES5 way
// exports.onClientEntry = () => {
// ES6 way
export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}

export const onInitialClientRender = () => {
  document.addEventListener("scroll", function() {

    let navbar = document.getElementById("nav-content")

    var sticky = navbar.offsetTop;

    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
      navbar.classList.add("border-b")
    } 
    if(window.pageYOffset === 0) {
      navbar.classList.remove("sticky")
      navbar.classList.remove("border-b")
    }
  })
}
