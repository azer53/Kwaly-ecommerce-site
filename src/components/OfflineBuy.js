import React, { Component } from "react"

export default class OfflineBuy extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
  }

  isAuthenticated = () => {
    const testUrl = "http://localhost:34567/.netlify/functions/protected"

    //fetch("../.netlify/functions/protected").then(response =>
    fetch(testUrl).then(function(response) {
      if (response.status !== 200) {
        this.setState({
          visible: false,
        })
      } else {
        this.setState({
          visible: true,
        })
      }
    })
  }

  render() {
    const { visible } = this.state
    if (visible) {
      return (
        <>
          <p>{}</p>
          <button className="flex-auto w-2/3 mx-5 text-karla-uppercase shadow-lg border-2 hover:bg-gray-100 bg-gray-400">
            Buy me offline
          </button>
        </>
      )
    } else {
      return (
        <>
          <p>{}</p>
          <button
            className="flex-auto w-2/3 mx-5 text-karla-uppercase shadow-lg border-2 hover:bg-gray-100 bg-gray-400"
            onClick={this.isAuthenticated.bind(this)}
          >
            Offline buy denied
          </button>
        </>
      )
    }
  }
}
