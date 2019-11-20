import React from "react"

class InstaFeed extends React.Component {
  render() {
    function InstaItem(props) {
      return <img className="" src={props.src} alt="" loading="lazy" />
    }

    function Row(props) {
      const edges = props.edges.slice(0, 5)
      const instaItems = edges.map((edge, index) => (
        <div key={index} className="flex-initial px-2 w-1/5">
          <div className="instaContainer">
            <InstaItem key={index} src={edge.node.thumbnail_resources[2].src} />
            <a
              href={"https://www.instagram.com/p/" + edge.node.shortcode}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="overlay">
                <span className="text-xs sm:text-sm text-karla-uppercase text-center instaText">
                  see post on instagram
                </span>
              </div>
            </a>
          </div>
        </div>
      ))
      return instaItems
    }

    return (
      <div>
        <div className="flex justify-center">
          {this.props.edges.length > 0 ? (
            <Row edges={this.props.edges} />
          ) : (
            <span className="text-karla-uppercase">
              loading instagram feed...
            </span>
          )}
        </div>

        <div className="text-center">
          <a href="https://www.instagram.com/kwaly_/">
            <button className="text-karla-uppercase text-sm my-8 p-4 bg-gray-300 shadow-lg">
              Follow us on Instagram
            </button>
          </a>
        </div>
      </div>
    )
  }
}

export default InstaFeed
