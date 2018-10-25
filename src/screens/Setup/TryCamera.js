import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import ImagePicker  from 'react-native-image-picker';   
import { Icon } from 'react-native-elements';
import Preview from './Preview';
import ActivityLoader from '../../components/ActivityLoader';
import { listingsOperations } from '../../modules/listings';
import { colors } from '../../styles';
import PostModal from './PostModal';
import resizeImage from '../../utils/image';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
  },
  capture: {
    backgroundColor: '#fff',
    height: 80,
    width: 80,
    margin: 20,
    borderRadius: 80/2,
    justifyContent: 'center'
  }
});

class TryCamera extends React.Component {

  state = {
    images: [],
    title: '',
    price: '',
    latitude: '',
    longitude: '',
    address: '',
    showPreview: false,
    cameraLoading: true,
    takingPicture: false,
    flashOn: false,
    showModal: false,
  }

  requestPermission = (permission) => {
    Permissions.request(permission).then(response => {
    });
  }

  constructor (props) {
    super(props)
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      // if(this.state.cameraLoading) {
      //   this.setState({ cameraLoading: false });
      // }
      this.setState({ cameraLoading: false });
      Permissions.check('camera').then(response => {
        if (response == 'undetermined' || response == 'denied') {
          this.requestPermission('camera');
        } 
      });
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
    this.setState({showModal: true});
    // const { navigation } = this.props;
    // const edit = navigation.getParam('edit', false);
    // const listing = navigation.getParam('listing', null);
    // this.onSetImageFromCamera(this.state.image);
    // if (edit) {
    //   this.props.navigation.navigate('EditListing', {listing});
    // } else {
    //   this.props.navigation.navigate('Post')
    // }
    // // this.setState({
    // //   image: '',
    // //   renderCamera: true
    // // });
  }

  takePicture = async () => {
    if (this.camera) {
      this.setState({takingPicture: true})
      const options = { base64: false, fixOrientation: true, skipProcessing: true, };
      const data = await this.camera.takePictureAsync(options);
      const resizedImage = await resizeImage(data.uri, 1000, 1000, 85);
      this.setState({
        takingPicture: false,
        showPreview: true,
        images: [
          resizedImage
        ]
      })
    }
  }

  onOpenImagePicker = () => {
    Permissions.check('photo').then(response => {
      if (response == 'undetermined' || response == 'denied') {
        this.requestPermission('photo');
      } else {
        this.openImagePicker();
      }
    });
  }

  openImagePicker = async () => {
    let options = {
      title: 'Select Listimg Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let image = `file://${response.path}`;
        const resizedImage = await resizeImage(image, 1000, 1000, 90);
        this.setState({
          takingPicture: false,
          showPreview: true,
          images: [
            resizedImage
          ]
        })
      }
    });
  }

  createListing = async () => {
    const {...newListing} = this.state;
    this.props.createListing(newListing);
  }

  render() {
    // Rendered when the camera is initializing
    if (this.state.cameraLoading) { return <View style={{flex: 1, backgroundColor: "#000"}}></View> }
    // Render image preview
    if (this.state.showPreview) { 
      return (
        <View style={{flex: 1, alignItems: 'stretch'}}>
          <ActivityLoader
            loading={this.props.creatingListing} />
          <Preview 
            onRetake={this.retake} 
            onContinue={this.continue}
            image={this.state.images[0]}
          /> 
          <PostModal 
            showModal={this.state.showModal} 
            hideModal={() => this.setState({showModal: false})}
            createListing={this.createListing}
            cancel={() => this.setState({showModal: false})}
            handleInput={(key, value) => {this.setState({[key]:value})}}
            handleSetAddress={(address, latitude, longitude) => this.setState({address, latitude, longitude})}
            values={{title, price, address, latitude, longitude, images} = this.state}
            skip={() => this.props.navigation.navigate('App')}
          />
        </View>
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
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 21, marginTop: 12}}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{alignItems: 'flex-end' }}
                onPress={this.toggleFlash}
              >
                <Icon
                  type='ionicon'
                  name={`${this.state.flashOn ? 'ios-flash' : 'ios-flash-off'}`}
                  color='#FFF'
                  size={40}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1,flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={this.onOpenImagePicker}
                  style = {{
                    backgroundColor: '#fff',
                    height: 45,
                    width: 45,
                    margin: 20,
                    borderRadius: 4,
                    justifyContent: 'center'
                  }}
                  activeOpacity={0.9}
                >
                    <Icon
                      name='image-plus'
                      type='material-community'
                      size={30}
                      color='#7B8285'
                    />
                </TouchableOpacity>
              </View>
              <View style={{flex: 2}}>
              <TouchableOpacity
                onPress={this.takePicture}
                style = {styles.capture}
                activeOpacity={0.9}
              >
                
                  <Icon
                    name='photo-camera'
                    color='#7B8285'
                    size={50}
                  />
              </TouchableOpacity>
              </View>
            </View>
        </RNCamera>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { creatingListing, createListingErrors } = state.listings.default;
  return { creatingListing, createListingErrors };
};

const mapDispatchToProps = (dispatch) => {
  const createListing = (newListing) => {
      dispatch(listingsOperations.createListing(newListing));
  };
  return { createListing };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TryCamera);

