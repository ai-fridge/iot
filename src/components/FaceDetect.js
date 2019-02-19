import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';
import {
  MODEL_FACE_URL,
  FACE_IMAGE_QUALITY,
  FACE_IMAGE_TYPE,
  FACE_EXTRACTED_IMAGE,
  INPUT_SIZE,
  SCORE_THRESHOLD,
} from '../config';
import * as faceapi from 'face-api.js';
import ifridgeApi from '../apis/ifridgeApi';
import WebCam from './WebCam';

const styles = theme => ({
  FaceDetectBox: {
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

class FaceDetect extends Component {
  state = {
    faceRequestCount: 0
  }

  async componentDidMount() {
    if (!this.isFaceDetectionModelLoaded()) {
      await this.loadModels()
    }

    if (this.hasWebCamRef()) {
      this.detectFaceInterval = null
      this.detectFace()
    }
  }

  componentWillUnmount() {
    clearInterval(this.detectFaceInterval)
  }

  async loadModels() {
    try {
      await Promise.all([
        faceapi.loadTinyFaceDetectorModel(MODEL_FACE_URL),
        faceapi.loadFaceDetectionModel(MODEL_FACE_URL),
        faceapi.loadFaceRecognitionModel(MODEL_FACE_URL)
      ]);
    } catch (error) {
      throw new Error(error)
    }
  }

  hasWebCamRef() {
    return !!this.webCamRef
  }

  getCurrentFaceDetectionNet() {
    if (!!faceapi.nets && !!faceapi.nets.tinyFaceDetector) {
      return faceapi.nets.tinyFaceDetector
    }
  }

  isFaceDetectionModelLoaded() {
    return !!this.getCurrentFaceDetectionNet().params
  }

  canvasResize() {
    const { clientWidth: width, clientHeight: height } = this.webCamRef.videoRef
    this.canvasWebCamRef.width = width
    this.canvasWebCamRef.height = height

    return { width, height }
  }

  async detectFace() {
    if (!this.hasWebCamRef) {
      return;
    }

    const videoRef = this.webCamRef.videoRef

    if (videoRef.paused || videoRef.ended || !this.isFaceDetectionModelLoaded()) {
      return setTimeout(() => this.detectFace())
    }

    const options = new faceapi.TinyFaceDetectorOptions({ INPUT_SIZE, SCORE_THRESHOLD })
    const detections = await faceapi.detectSingleFace(videoRef, options)

    if (detections) {
      const { width, height } = this.canvasResize()
      const detectionsForSize = await faceapi.resizeResults(detections, { width, height });
      // draw them into a canvas
      const canvas = this.canvasWebCamRef
      canvas.width = width
      canvas.height = height
      const drawDetection = await faceapi.drawDetection(
        canvas,
        detectionsForSize,
        { withScore: true }
      )

      console.log('drawDetection...')
      console.log(drawDetection)

      // extract images
      const regions = [detections.box.x, detections.box.y, width, height]
      this.extractImage(regions, this.webCamRef.videoRef)
    }

    // TODO: request limit
    // if (this.props.isFaceAuthentication !== null) {
      // this.detectFaceInterval = setTimeout(() => this.detectFace())
      // console.log('detectFaceInterval isFaceAuthentication')
      // console.log(this.props.isFaceAuthentication)
    // }
  }

  async extractImage(regions, videoRef) {
    const regionsToExtract = [
      new faceapi.Rect(...regions)
    ]
    const videoCanvas = await faceapi.createCanvasFromMedia(videoRef)
    const extractedCanvas = await faceapi.extractFaces(videoCanvas, regionsToExtract)
    this.displayExtractedFaces(extractedCanvas)
  }

  displayExtractedFaces(faceImages) {
    faceImages.forEach(canvas => this.facesContainerRef.append(canvas))

    const dataURL = faceImages[0].toDataURL(FACE_IMAGE_TYPE, FACE_IMAGE_QUALITY);
    this.faceRecognition(dataURL)
  }

  async faceRecognition(dataURL) {
    try {
      const response = await ifridgeApi.post('face/recognition', {
        file: dataURL
      })

      if (response.data) {
        this.props.handleAuthentication(response.data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <p>Move your head slowly to complete the area</p>
        <div className={classes.FaceDetectBox}>
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
          <div ref={(facesContainer) => { this.facesContainerRef = facesContainer }} />
          <img
            ref={(extractedImage) => { this.extractedImageRef = extractedImage }}
            src={FACE_EXTRACTED_IMAGE}
            alt="Extracted face."
          />
          {/* <canvas
            ref={(canvasOverLay) => { this.canvasOverLayRef = canvasOverLay }}
            width={300}
            height={300}
          /> */}
        </div>
      </div>
    );
  }
}

FaceDetect.defaultProps = {
  fridgeSwitch: false,
};

FaceDetect.propTypes = {
  classes: PropTypes.object.isRequired,
  fridgeSwitch: PropTypes.bool.isRequired,
  handleAuthentication: PropTypes.func.isRequired,
  isFaceAuthentication: PropTypes.bool,
};

export default withStyles(styles)(FaceDetect);