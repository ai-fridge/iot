import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';
import WebCam from './WebCam';
import ifridgeApi from '../apis/ifridgeApi';
import { FRIDGE_EXTRACTED_IMAGE } from '../config'

const styles = theme => ({
  FridgeDetectBox: {
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const fridgeDetect = async (data, handleDetectFoods) => {
  try {
    const response = await ifridgeApi.post('object/detection', data)

    if (response && !!response.data.foods) {
      handleDetectFoods(response.data.foods)
    } else {
      console.log('Not detect any food in the fridge')
    }
  } catch (e) {
    console.error(e)
  }
}

class FridgeDetect extends Component {
  async componentDidMount() {
    if (this.hasWebCamRef) {
      setTimeout(() => { this.screenshot() }, 2000);
    }
  }

  hasWebCamRef() {
    return !!this.webCamRef.videoRef
  }

  async screenshot() {
    const videoRef = this.webCamRef.videoRef

    if (videoRef.paused || videoRef.ended) {
      return setTimeout(() => this.screenshot())
    }

    const img = this.extractedImageRef;
    const canvas = document.createElement('canvas');
    // const { clientWidth: width, clientHeight: height } = this.webCamRef.videoRef
    canvas.width = 640;
    canvas.height = 480;
    canvas.getContext('2d').drawImage(videoRef, 0, 0);
    const imgUrl = canvas.toDataURL('image/jpeg');
    const data = {
      user_id: this.props.userId,
      file: imgUrl
    }

    img.src = imgUrl;
    await fridgeDetect(data, this.props.handleDetectFoods)
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <p>Fridge</p>
        <div className={classes.FridgeDetectBox}>
          <WebCam
            ref={(webCam) => { this.webCamRef = webCam }}
            video="false"
            width="100%"
            height="100%"
          />
          <canvas
            ref={(canvasWebCam) => { this.canvasWebCamRef = canvasWebCam }}
            width={300}
            height={300}
            className={classes.overlay}
          />
        </div>
        {/* extract box */}
        <div>
          <img
            ref={(extractedImage) => { this.extractedImageRef = extractedImage }}
            src={FRIDGE_EXTRACTED_IMAGE}
            alt="Screenshot fridge"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    );
  }
}

FridgeDetect.propTypes = {
  classes: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  handleDetectFoods: PropTypes.func.isRequired,
};

export default withStyles(styles)(FridgeDetect);