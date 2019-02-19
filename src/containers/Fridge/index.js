import React, { Component } from 'react';
import FridgeBox from '../../components/FridgeBox';

class FridgeContainer extends Component {
  state = {
    fridgeSwitch: false,
    isLogin: false,
    isFaceFound: false,
    isFaceAuthentication: null,
    name: 'Unknown',
    userId: 0,
    foods: []
  };

  handleFridgeSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
    // TODO:: when turnoff, grab a snapshot
  };

  handleAuthentication = (data) => {
    console.log('handleAuthentication faceDetect')
    console.log(data)
    this.setState({ ...data })
  }

  handleDetectFoods = (foods) => {
    console.log('handleFoods')
    this.setState({ foods })
  }

  render() {
    return (
      <div>
        <FridgeBox
          fridgeSwitch={this.state.fridgeSwitch}
          isLogin={this.isLogin}
          handleFridgeSwitch={this.handleFridgeSwitch}
          handleAuthentication={this.handleAuthentication}
          handleDetectFoods={this.handleDetectFoods}
          isFaceFound={this.state.isFaceFound}
          isFaceAuthentication={this.state.isFaceAuthentication}
          name={this.state.name}
          userId={this.state.userId}
          foods={this.state.foods}
        />
      </div>
    )
  }
}

export default FridgeContainer;
// export default (connect(mapStateToProps, { createTax })(FridgeContainer));
