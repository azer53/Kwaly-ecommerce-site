require("./src/css/style.css")

// ES5 way
// exports.onClientEntry = () => {
// ES6 way
exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
  }
}
