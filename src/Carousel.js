import { Component } from "react"

class Carousel extends Component {
  constructor() {
    super()
    this.state = { active: 0 }
  }

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  }

  handleIndexClick = (e) => {
    this.setState({ active: e.target.dataset.index })
  }

  render() {
    const { active } = this.state
    const { images } = this.props

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" data-testid="hero"/>
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img 
              alt="animal thumbnail"
              key={photo}
              src={photo}
              data-testid={`thumbnails${index}`}
              data-index={index}
              className={index == active ? 'active' : ''}
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel