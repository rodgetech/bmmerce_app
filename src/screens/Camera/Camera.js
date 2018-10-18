import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements'

import Preview from './Preview';
import ActivityLoader from '../../components/ActivityLoader';
import { colors } from '../../styles';

export default class Camera extends React.Component {

  state = {
    image: '',
    showPreview: false,
    cameraLoading: true,
    takingPicture: false,
    flashOn: false,
  }

  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    const flashOn = params ? params.flashOn : false
    return {
      headerRight: (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{alignItems: 'center', marginRight: 18, backgroundColor: '#FFF', paddingVertical: 4, paddingHorizontal: 14, borderRadius: 2}}
          onPress={params.toggleFlash}
        >
          <Icon
            type='ionicon'
            name={`${flashOn ? 'ios-flash' : 'ios-flash-off'}`}
            color={colors.dark}
          />
        </TouchableOpacity>
      ),
    }
  };

  constructor (props) {
    super(props)
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      // if(this.state.cameraLoading) {
      //   this.setState({ cameraLoading: false });
      // }
      this.setState({ cameraLoading: false });
    });
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.onSetImageFromCamera = navigation.getParam('onSetImageFromCamera', null);
    this.props.navigation.setParams({
      flashOn: this.state.flashOn,
      toggleFlash: this.toggleFlash
    });
  }

  componentWillUnmount() { 
    this.navListener.remove();
  }

  toggleFlash = () => {
    this.setState({
      flashOn: !this.state.flashOn
    }, () => {
      this.props.navigation.setParams({
        flashOn: this.state.flashOn,
      });
    });
    
  }

  retake = () => {
    this.setState({
      showPreview: false,
    })
  }

  continue = () => {
    //const uri = this.state.image.replace("file://", "");
    const { navigation } = this.props;
    const edit = navigation.getParam('edit', false);
    const listing = navigation.getParam('listing', null);
    this.onSetImageFromCamera(this.state.image);
    if (edit) {
      this.props.navigation.navigate('EditListing', {listing});
    } else {
      this.props.navigation.navigate('Post')
    }
    // this.setState({
    //   image: '',
    //   renderCamera: true
    // });
  }

  takePicture = async () => {
    if (this.camera) {
      this.setState({takingPicture: true})
      const options = { base64: false, fixOrientation: true, skipProcessing: true, };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        takingPicture: false,
        image: data.uri,
        showPreview: true,
      })
    }
  }

  render() {
    // Rendered when the camera is initializing
    if (this.state.cameraLoading) { return <View style={{flex: 1, backgroundColor: "#000"}}></View> }
    // Render image preview
    if (this.state.showPreview) { 
      return (
        <Preview 
          onRetake={this.retake} 
          onContinue={this.continue}
          image={this.state.image}
        /> 
      )
    }
    return (
      <View style={styles.container}>
        <ActivityLoader
            loading={this.state.takingPicture} />
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flashOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                <TouchableOpacity
                    onPress={this.takePicture}
                    style = {styles.capture}
                    activeOpacity={0.9}
                >
                  
                    <Icon
                      name='photo-camera'
                      color={colors.dark}
                      size={50}
                    />
                </TouchableOpacity>
            </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 2,
    alignSelf: 'center',
    height: 85,
    width: 85,
    margin: 20,
    borderRadius: 85/2,
    justifyContent: 'center'
  }
});