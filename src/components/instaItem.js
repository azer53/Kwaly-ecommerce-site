import React from "react"

import { Link } from "gatsby"

class InstaFeed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: props.src
        }
    }

    render() {

        return (

               <img src={ this.state.result.graphql.user.edge_owner_to_timeline_media.edges[0].node.thumbnail_resources[1].src }/>



        );
    }
}



export default InstaFeed





