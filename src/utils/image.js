import ImageResizer from 'react-native-image-resizer';

const imageResize = (uri, maxWidth, maxHeight, quality) => {
    return ImageResizer.createResizedImage(uri, maxWidth, maxHeight, 'JPEG', quality)
        .then(({
            uri
        }) => {
            return uri;
        })
        .catch(err => {
            return err;
        });
}

export default imageResize;