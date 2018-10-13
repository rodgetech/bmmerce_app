import React from 'react';
import { 
  StyleSheet, 
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

export default class ImageView extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    const image = navigation.getParam('image', null);
    return (
      <View style={styles.container}>
        <FastImage
            style={{flex: 1, backgroundColor: '#000'}}
            source={{ uri: image, priority: FastImage.priority.high }}
            resizeMode={FastImage.resizeMode.center}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
});