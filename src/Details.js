// import { useParams } from "react-router-dom"

// const Details = () => {
//   const { id } = useParams()
//   return <div>Hi abracadabra {id}</div>
// }

import { Component } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from './Carousel'

class Details extends Component {
  constructor(props) { // detail包在route裡面 所以props是app.js傳過來的！
    super(props) // 有這行才能用this.props
    this.state = { loading: true }
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    )

    const json = await res.json()
    this.setState({ loading: false, ...json.pets[0] })
  }

  render() {
    if(this.state.loading) {
      return (
        <h2>loading...</h2>
      )
    }

    const { animal, breed, city, state, description, name, images } = this.state // could destructure!
    return (
      <div className='details'>
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}
const Wrapper = () => {
  const params = useParams()
  return <Details params={params}/>
}

export default Wrapper


