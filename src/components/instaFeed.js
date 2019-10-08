import React from "react"

//import InstaItem from "./instaItem.js"

class InstaFeed extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        function InstaItem(props) {
            return <img className="flex-initial px-2 flex-fix" src={props.src} alt="" />
        }

        function Row(props) {
            const edges = props.edges.slice(0,5);
            const instaItems = edges.map((edge,index) =>

                <InstaItem key={index} src={edge.node.thumbnail_resources[1].src} />

            );
            return (
                 instaItems
            );
        }

        return (
            <div className="flex justify-center">
                {(this.props.edges.length > 0) ? <Row edges={this.props.edges} /> : <span className="text-karla-uppercase">loading</span>}
            </div>

        );
    }
}

export default InstaFeed





