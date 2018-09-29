import React from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Permissions from 'react-native-permissions';
import { Button, Input, Icon } from 'react-native-elements';
import ImagePicker  from 'react-native-image-picker';   
import FastImage from 'react-native-fast-image';
import { colors, fonts } from '../../styles'
import ActivityLoader from '../../components/ActivityLoader';
import {
  currentPosition
} from '../../utils/geocode';
import resizeImage from '../../utils/image';
import { moderateScale } from '../../utils/scaling';

export default class Post extends React.Component {

  constructor() {
    super();
    this.state = {
      images: [],
      title: '',
      price: '',
      description: '',
      latitude: '',
      longitude: '',
      loading: true
    }
  }

  // Header custom right button
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      headerRight: (
        <TouchableOpacity
          onPress={
            () => navigation.navigate('Camera', {onSetImageFromCamera: params.setImageFromCamera})
          }
        >
          <Icon
            name='md-camera'
            type='ionicon'
            color='#FFF'
            size={28}
            containerStyle={{marginRight: 18, marginTop: 4}}
          />
        </TouchableOpacity>
      ),
    }
  };

  requestPermission = (permission) => {
    Permissions.request(permission).then(response => {
    })
  }

  componentDidMount = () => {
    // Check permissions for camera and photos
    Permissions.checkMultiple(['camera', 'photo', 'location']).then(response => {
      //response is an object mapping type to permission
      if (response.camera == 'undetermined' || response.camera == 'denied') {
        this.requestPermission('camera');
      }
      // if (response.photo == 'undetermined') {
      //   this.requestPermission('photo');
      // }
      if (response.location == 'location' || response.location == 'denied') {
        this.requestPermission('location');
      }
    })

    this.props.navigation.setParams({
      setImageFromCamera:this.setImageFromCamera
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
        });
      },
      (error) => {
          return error
      }, {
          enableHighAccuracy: false,
          timeout: 10000
      },
    );
  }

  createListing = async () => {
    const {...newListing} = this.state;
    this.props.createListing(newListing);
  }

  removeImage = (uri) => {
    this.setState({
      images: this.state.images.filter(image => image !== uri)
    })
  }

  setImageFromCamera = async (image) => {
    const resizedImage = await resizeImage(image, 1000, 1000, 85);
    this.setState({
      images: [
        ...this.state.images,
        resizedImage
      ]
    })
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
        console.log("SUCCESS", response.path)

        const resizedImage = await resizeImage(image, 1000, 1000, 90);
        console.log("RESIZED", resizedImage);
        this.setState({
          images: [
            ...this.state.images,
            resizedImage
          ]
        })
      }
    });
  }

  renderSelectedImages = () => {
    let selectedImages = [];
    let currentIndex = this.state.images.length > 0 ? this.state.images.length : 1;
    for (let i = 1; i < 4; i++) {
      selectedImages.push (
          i == currentIndex ? (
              <TouchableOpacity 
                onPress={this.openImagePicker}
                style={styles.selectedImage}
                key={i}
                activeOpacity={0.8}
                >
                  <Icon
                    name='image-plus'
                    type='material-community'
                    color='#787878'
                    size={35}
                  />
              </TouchableOpacity>
          ) : (
              this.state.images[i] !== undefined ? (
                  <TouchableOpacity 
                    style={styles.selectedImage}
                    onPress={() => this.removeImage(this.state.images[i])}
                    key={i}
                    activeOpacity={0.8}
                    >
                      <Image
                        style={StyleSheet.absoluteFill}
                        source={{ uri: this.state.images[i]}}
                      />
                      <Icon
                        name='md-trash'
                        type='ionicon'
                        color='#FFF'
                        size={26}
                      />
                  </TouchableOpacity>
              ) : (
                <View style={styles.selectedImage} key={i}></View>
              )
          )
      )
    }
    return selectedImages;
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: "#FFF"}}>
        <ActivityLoader
          loading={this.props.creatingListing} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: '#F7F7F7', height: 280}}>
            {this.state.images[0] && 
              <FastImage
                style={StyleSheet.absoluteFill}
                source={{ uri: this.state.images[0], priority: FastImage.priority.normal }}
                resizeMode={FastImage.resizeMode.cover}
              />
            }
            <View style={styles.selectedImages}>
              {this.renderSelectedImages()}
            </View>
          </View>
          <View style={{marginTop: 26, marginBottom: 24, marginHorizontal: 18}}>
            <Input 
                underlineColorAndroid='transparent'
                placeholder="Title"
                containerStyle={{marginBottom: 20, width: '100%'}}
                inputStyle={{fontFamily: fonts.robotoCondensed, paddingHorizontal: 0, color: colors.dark, fontSize: moderateScale(18, 2.5), height: '100%', borderWidth: 0}}
                inputContainerStyle={{borderColor: "#CCC", borderBottomWidth: 1}}
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
            />
            <Input 
                placeholder="Price"
                underlineColorAndroid='transparent'
                containerStyle={{marginBottom: 20, width: '100%'}}
                inputStyle={{fontFamily: fonts.robotoCondensed, color: colors.dark, fontSize: moderateScale(18, 2.5), height: '100%'}}
                inputContainerStyle={{borderColor: "#CCC", borderBottomWidth: 1}}
                onChangeText={(price) => this.setState({price})} 
                value={this.state.price}
                keyboardType="numeric"
            /> 
            <Input 
                placeholder="Description"
                underlineColorAndroid='transparent'
                containerStyle={{marginBottom: 20, width: '100%'}}
                inputStyle={{fontFamily: fonts.robotoCondensed, paddingHorizontal: 0, color: colors.dark, fontSize: moderateScale(18, 2.5), height: '100%'}}
                inputContainerStyle={{borderColor: "#CCC", borderBottomWidth: 1}}
                onChangeText={(description) => this.setState({description})} 
                value={this.state.description}
            />
            <Button 
              title="Post Listing"
              titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), fontWeight: 'normal'}}
              onPress={this.createListing}
              buttonStyle={{marginTop: 10, backgroundColor: colors.green, paddingVertical: 4, elevation: 0}} 
              disabled={this.state.loading || this.state.images.length == 0}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  selectedImages: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#rgba(0, 0, 0, 0.5)'
  },
  selectedImage: {
    flex: 1.2,
    margin: 18,
    height: 62,
    backgroundColor: "#f7f7f7",
    borderRadius: 3,
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 2
  }
});
