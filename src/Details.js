// import { useParams } from "react-router-dom"

// const Details = () => {
//   const { id } = useParams()
//   return <div>Hi abracadabra {id}</div>
// }

import { Component } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from './Carousel'
import Modal from './Modal'
import ErrorBoundary from './ErrorBoundary'
import { useSelector } from 'react-redux'


class Details extends Component {
  constructor(props) { // detail包在route裡面 所以props是app.js傳過來的！
    super(props) // 有這行才能用this.props
    this.state = { loading: true, showModal: false }
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    )

    const json = await res.json()
    this.setState({ loading: false, ...json.pets[0] })
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    if(this.state.loading) {
      return (
        <h2>loading...</h2>
      )
    }

    const { animal, breed, city, state, 
      description, name, images, showModal } = this.state // could destructure!
    return (
      <div className='details'>
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          <button
            style={{ backgroundColor: this.props.theme }}
            onClick={this.toggleModal}
          >
            Adopt {name}
          </button>
          <p>{description}</p>
        </div>
        {
          showModal ? (
            <Modal>
              <div className='buttons'>
                <h1>Would like to adopt {name}</h1>
                <a href="#" onClick={this.toggleModal}>Yes</a>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null
        }
      </div>
    )
  }
}

const Wrapper = () => {
  const params = useParams()
  const theme = useSelector(state => state.theme)
  return (
    <ErrorBoundary>
      <Details params={params} theme={theme}/>
    </ErrorBoundary>
  )
}

export default Wrapper


