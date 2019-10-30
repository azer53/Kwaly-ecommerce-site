import React from "react"
import Auth from "./auth"

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-white py-10 text-center text-sm">
        <span>©KWALY - {new Date().getYear() + 1900}</span>
        <Auth />
      </footer>
    )
  }
}

export default Footer
