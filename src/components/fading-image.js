// @flow
import * as React from 'react'
import styled from 'react-emotion'
import imagesLoaded from 'imagesloaded'

const Image = styled.img`
  opacity: ${props => (props.isLoading ? 0 : 1)};
  transition: opacity 0.3s;
`

type Props = {}
type State = {
  isLoading: boolean,
}

class FadingImage extends React.Component<Props, State> {
  _image: ?React.ElementRef<typeof Image>
  _imgLoad: any

  state = {
    isLoading: true,
  }

  componentDidMount() {
    this._imgLoad = imagesLoaded(this._image)
    this._imgLoad.on('done', this._handleLoaded)
  }

  componentWillUnmount() {
    this._imgLoad.off('done', this._handleLoaded)
  }

  _handleLoaded = () => {
    this.setState({ isLoading: false })
  }

  render() {
    const { isLoading } = this.state
    return (
      <Image
        innerRef={ref => {
          this._image = ref
        }}
        isLoading={isLoading}
        {...this.props}
      />
    )
  }
}

export default FadingImage
