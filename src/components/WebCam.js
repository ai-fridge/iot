import React, { Component } from 'react';
import PropTypes from 'prop-types';

const hasGetUserMedia = () => {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

const constrainLongType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.shape({
    ideal: PropTypes.number,
    exact: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
  }),
]);

const videoConstraintType = PropTypes.shape({
  height: constrainLongType,
  width: constrainLongType,
});

class WebCam extends Component {
  state = {
    hasUserMedia: false,
  };

  componentDidMount() {
    if (!hasGetUserMedia) {
      console.warn('getUserMedia() is not supported by your browser');
    }

    this.onPlay();
  }

  async onPlay() {
    console.log('WebCam onPlay')
    const constraints = {
      video: this.props.videoConstraints || true,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoRef.srcObject = stream;
      this.setState({ hasUserMedia: true });
    } catch (err) {
      this.setState({ hasUserMedia: false });
      console.error(err.name + ': ' + err.message);
    }
  }

  render() {
    return (
      <video
        ref={(video) => { this.videoRef = video }}
        autoPlay
        muted
        width={this.props.width}
        height={this.props.height}
        className={this.props.className}
        // controls="true"
      />
    );
  }
}

WebCam.defaultProps = {
  video: true,
  width: 640,
  height: 480,
  className: '',
};

WebCam.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  videoConstraints: videoConstraintType,
  className: PropTypes.string,
};

export default WebCam;