import React, { useState, useEffect } from "react"

const InstaFeed2 = () => {
  /*   constructor(props) {
    super(props)
    this.state = {
      result: {
        graphql: {
          user: {
            edge_owner_to_timeline_media: {
              edges: [],
            },
          },
        },
      },
    }
  }
  componentDidMount() {
    fetch("https://www.instagram.com/kwaly_/?__a=1")
      .then(res => res.json())
      .then(data => {
        this.setState({ result: data })
      })
      .catch(console.log)
  } */
  const [hasError, setErrors] = useState(false)
  const [posts, setPosts] = useState({})

  async function fetchData() {
    const res = await fetch("https://www.instagram.com/kwaly_/?__a=1")
    res
      .json()
      .then(res =>
        setPosts(res.graphql.user.edge_owner_to_timeline_media.edges)
      )
      .catch(err => setErrors(err))
  }

  useEffect(() => {
    fetchData()
  })

  return (
    <div>
      <span>{JSON.stringify(posts)}</span>
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>
  )
}
export default InstaFeed2
