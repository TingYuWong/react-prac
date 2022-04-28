import { Component, MouseEvent } from "react"

interface Props {
  images: string[]
}

class Carousel extends Component<Props, { active: number; }> {
  constructor(props: Props) {
    super(props)
    this.state = { active: 0 }
  }

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  }

  handleIndexClick = (e: MouseEvent<HTMLElement>) => {
    if(!(e.target instanceof HTMLElement)) return
    if(e.target.dataset.index) {
      this.setState({ active: +e.target.dataset.index })
    }
  }

  render() {
    const { active } = this.state
    const { images } = this.props

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img 
              alt="animal thumbnail"
              key={photo}
              src={photo}
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