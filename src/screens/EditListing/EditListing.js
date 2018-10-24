import React from 'react';
import { 
  StyleSheet, 
  View,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import ImagePicker  from 'react-native-image-picker'
import FastImage from 'react-native-fast-image';
import resizeImage from '../../utils/image';
import ActivityLoader from '../../components/ActivityLoader';
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';

export default class EditListing extends React.Component {

    state = {
        id: '',
        title: '',
        price: '',
        description: '',
        images: [],
        loading: true
    }

    // Stack Header Override
    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state;
            return {
                headerRight: (
                    <Icon
                        onPress={
                            () => navigation.navigate(
                                    'Camera', 
                                    {
                                        onSetImageFromCamera: params.setImageFromCamera,
                                        listing: params.listing,
                                        edit: true
                                    }
                                )
                        }
                        name='md-camera'
                        type='ionicon'
                        color='#FFF'
                        size={28}
                        containerStyle={{marginRight: 18, marginTop: 4}}
                    />
                ),
        }
    };

    componentDidMount() {
        const { navigation } = this.props;
        const listing = navigation.getParam('listing', null);
        this.setState({
            id: listing.id,
            title: listing.title,
            price: listing.price,
            description: listing.description,
            images: listing.images.map(image => ({id: image.id, url: image.listing_image.url})),
            loading: false
        });
        this.props.navigation.setParams({
            setImageFromCamera:this.setImageFromCamera,
            listing: listing
        });
    }

    onDeleteImage = (image) => {
        Alert.alert(
            'Delete Image',
            'Are you sure you want to do this?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Continue', onPress: () => this.deleteImage(image)},
            ],
            { cancelable: true }
          )
    }

    deleteImage = (selectedImage) => {
        console.log("ON DELETE", selectedImage);
        if (selectedImage.hasOwnProperty('id')) {
            console.log("SERVER DELETE");
            this.props.deleteImage(selectedImage.id);
        }
        this.setState({
            images: this.state.images.filter(image => image.url !== selectedImage.url)
        })
    }
    
    setImageFromCamera = async (image) => {
        console.log("FRM CAMERS CREEN:", image)
        const resizedImage = await resizeImage(image, 1000, 1000, 85);
        this.setState({
            images: [
                ...this.state.images,
                {url: resizedImage}
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
            const resizedImage = await resizeImage(image, 1000, 1000, 85);
        
            this.setState({
              images: [
                ...this.state.images,
                {url: resizedImage}
              ]
            })
          }
        });
    }

    updateListing = () => {
        this.props.updateListing({
            ...this.state
        })
    }

    deleteListing = () => {
        Alert.alert(
            'Delete Listing',
            'Are you sure you want to do this?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Continue', onPress: () => this.props.deleteListing(this.state.id)},
            ],
            { cancelable: true }
        )
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
                            color={colors.green}
                            size={30}
                        />
                    </TouchableOpacity>
                ) : (
                    this.state.images[i] !== undefined ? (
                        <TouchableOpacity 
                            style={styles.selectedImage}
                            onPress={() => this.onDeleteImage(this.state.images[i])}
                            key={i}
                            activeOpacity={0.8}
                        >
                            <FastImage
                                style={StyleSheet.absoluteFill}
                                source={{
                                    uri: this.state.images[i].url,
                                    priority: FastImage.priority.high
                                }}
                                resizeMode={FastImage.resizeMode.cover}
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
        if (this.state.loading) return null;
        return (
            <View style={{flex:1, backgroundColor: "#FFF"}}>
                <ActivityLoader
                    loading={this.props.updatingListing} />
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                >
                    <View style={{ backgroundColor: '#F7F7F7', height: 250 }}>
                        <FastImage
                            style={StyleSheet.absoluteFill}
                            source={{
                                uri: this.state.images[0].url,
                                priority: FastImage.priority.normal
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <View style={styles.selectedImages}>
                            {this.renderSelectedImages()}
                        </View>
                    </View>
                    <View style={{marginTop: 26, marginBottom: 24, marginHorizontal: 18}}>
                        <Input 
                            placeholder="Title"
                            underlineColorAndroid='transparent'
                            containerStyle={{marginBottom: 20, width: '100%'}}
                            inputStyle={{fontFamily: fonts.robotoCondensed, paddingHorizontal: 0, color: colors.dark, fontSize: moderateScale(18, 2.5), height: '100%'}}
                            inputContainerStyle={{borderColor: "#CCC", borderBottomWidth: 1}}
                            onChangeText={(title) => this.setState({title})} 
                            value={this.state.title}
                        />
                        <Input 
                            placeholder="Price"
                            underlineColorAndroid='transparent'
                            containerStyle={{marginBottom: 20, width: '100%'}}
                            inputStyle={{fontFamily: fonts.robotoCondensed, paddingHorizontal: 0, color: colors.green, fontSize: moderateScale(18, 2.5), height: '100%'}}
                            inputContainerStyle={{borderColor: "#CCC", borderBottomWidth: 1}}
                            onChangeText={(price) => this.setState({price})} 
                            value={parseFloat(this.state.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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
                            title="Update"
                            onPress={this.updateListing}
                            buttonStyle={{marginTop: 10, backgroundColor: colors.green, paddingVertical: 4, elevation: 0}}
                            titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), fontWeight: 'normal'}}
                        />
                    </View>
                    <View style={{marginTop: 20, backgroundColor: colors.gray, justifyContent: 'flex-end', paddingVertical: 10}}>
                        <Icon
                            name='md-trash'
                            type='ionicon'
                            color={colors.dark}
                            size={26}
                            onPress={this.deleteListing}
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
    backgroundColor: '#fff',
  },
  selectedImages: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#rgba(123, 130, 133, 0.5)'
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
