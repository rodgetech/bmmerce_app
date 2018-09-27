import React from 'react';
import { 
  StyleSheet, 
  View,
  ActivityIndicator,
  Text,
  AppState
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Composer, Send, LoadEarlier } from 'react-native-gifted-chat';
import FastImage from 'react-native-fast-image'
import io from 'socket.io-client';

import { colors, fonts } from '../../styles';
import { moderateScale } from '../../utils/scaling';

let timeout = undefined;

export default class Engagement extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      inputText: '',
      userId: null,
      senderTyping: false,
      showIsTyping: false,
      appState: AppState.currentState,
      currentPage: 1,
    }
  }

  // Stack Header Override
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      headerRight: (
        params.listingImage && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontFamily: fonts.robotoCondensed, color: colors.green, fontSize: moderateScale(15, 2.5), paddingRight: 8}}>
            ${parseFloat(params.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </Text>
          <FastImage
            style={{height: 35, width: 35, marginRight: 18}}
            source={{
              uri: params.listingImage,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        )
      ),
    }
  };


  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    const { navigation } = this.props;

    const senderId = navigation.getParam('senderId', 'NO-ID');
    const engagementId = navigation.getParam('engagementId', 'NO-ID');
    const listingId = navigation.getParam('listingId', 'NO-ID');
    const recipientId = navigation.getParam('recipientId', 'NO-ID');
    const listingImage = navigation.getParam('image', null);
    const price = navigation.getParam('price', null);

    this.props.navigation.setParams({
      listingImage: listingImage,
      price: price,
    });

    // Fetch data
    //this.props.getEngagement(recipientId, listingId);
    this.props.getAccount();
    this.props.getEngagementMessages(recipientId, listingId, 1);
    this.props.markMessagesRead(engagementId);

    // Socket.IO initialize
    this.socket = io('http://192.168.0.12:6060', {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log("React Native App Connected")
      // Join unique room
      const userScope = `${listingId}-${senderId}`
      this.socket.emit('connectUser', userScope);

      // Receive new message data
      this.socket.on(`bmmerce:new-message`, (response) => {
        // console.log("NEW MESSAGE DATA:", response);
        if (this.state.appState === 'active' && this.socket.connected) {
          this.onNewMessage(response);
        }
      });

      // On typing event, show typing indicator to recipient
      this.socket.on(`onTyping`, (isTyping) => {
        if (this.state.appState === 'active' && this.socket.connected) {
          console.log("IS TYPINF: ", isTyping);
          this.setState({showIsTyping: isTyping});
        }
      })
    });

    this.socket.on('disconnect', () => {
      console.log("React Native App Disconnected")
    });
  }

  componentWillUnmount() {
    console.log("UNMOUNTING");
    AppState.removeEventListener('change', this.handleAppStateChange);

    const { navigation } = this.props;
    const listingId = navigation.getParam('listingId', 'NO-ID');
    const recipientId = navigation.getParam('recipientId', 'NO-ID');
    const indicateScope = `${listingId}-${recipientId}`;
    this.socket.emit('senderTyping', {indicateScope: indicateScope, typing: false});
    this.socket.disconnect();
  }

  handleAppStateChange = (nextAppState) => {
    const { navigation } = this.props;
    const recipientId = navigation.getParam('recipientId', 'NO-ID');
    const listingId = navigation.getParam('listingId', 'NO-ID');
    const engagementId = navigation.getParam('engagementId', 'NO-ID');
    if (nextAppState === 'active') {
      this.props.getEngagementMessages(recipientId, listingId, 1, false);
      this.props.markMessagesRead(engagementId);
    } else {
      const indicateScope = `${listingId}-${recipientId}`;
      this.socket.emit('senderTyping', {indicateScope: indicateScope, typing: false});
      this.setState({showIsTyping: false});
    }
    this.setState({appState: nextAppState});
  }

  // New message emitted, update messages state
  onNewMessage = (newMessage) => {
    console.log("IM STILL CALLED");
    const { navigation } = this.props;
    const engagementId = navigation.getParam('engagementId', 'NO-ID');
    console.log("GOT NEW MESSAGE");
    const message = {
      _id: newMessage.id,
      text: newMessage.body,
      createdAt: newMessage.created_at,
      user: {
        _id: newMessage.account.id,
        name: newMessage.account.name
      }
    };
    this.setState({showIsTyping: false});
    this.props.newEmittedMessage(message);
    this.props.markMessagesRead(engagementId);
  }

  sendMessage = () => {
    console.log("ON SEND MESSAGE", this.state.inputText);
    const { navigation } = this.props;
    const recipientId = navigation.getParam('recipientId', 'NO-ID');
    const listingId = navigation.getParam('listingId', 'NO-ID');
    const newMessage = {
      body: this.state.inputText,
      recipientId: recipientId,
      listingId: listingId
    }
    this.props.createEngagementMessage(newMessage);
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
            right: {
                backgroundColor: colors.green,
            }
        }}
        textStyle={{
          right: {
            color: "#FFF",
            fontFamily: fonts.robotoCondensed,
            fontSize: moderateScale(15, 2.5)
          },
          left: {
              color: colors.dark,
              fontFamily: fonts.robotoCondensed,
              fontSize: moderateScale(15, 2.5)
          }
        }}
      />
    );
  }

  renderSend = (props) => {
    return (
      <Send
        {...props}
        textStyle={{
          fontFamily: fonts.robotoCondensed,
          fontSize: moderateScale(15, 2.5),
          color: colors.green,
          fontWeight: 'normal',
          marginBottom: 14
        }}
        containerStyle={{
          elevation: 0,
        }}
      />
    );
  }

  renderComposer = (props) => {
    const { navigation } = this.props;
    const recipientName = navigation.getParam('recipientName', '');
    return (
      <Composer
        {...props}
        placeholder={`Message ${recipientName}...`}
        placeholderTextColor={colors.grey}
        textInputStyle={{
          fontFamily: fonts.robotoCondensed,
          fontSize: moderateScale(15, 2.5),
        }}
      />
    );
  }

  renderInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={{borderTopWidth: 1, borderTopColor: '#EDEDED', elevation: 0}} />
  }

  // @TODO repair set state when component unmounted
  handleInputText = (text) => {
    const { navigation } = this.props;
    const listingId = navigation.getParam('listingId', 'NO-ID');
    const recipientId = navigation.getParam('recipientId', 'NO-ID');
    const indicateScope = `${listingId}-${recipientId}`;

    this.setState({inputText: text});

    if (this.state.inputText !== '' && this.state.appState === 'active') {
      if (this.state.senderTyping) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.setState({senderTyping: false});
          this.socket.emit('senderTyping', {indicateScope: indicateScope, typing: false});
        }, 3000);
      } else {
        this.setState({senderTyping: true});
        this.socket.emit('senderTyping', {indicateScope: indicateScope, typing: true});
        timeout = setTimeout(() => {
          this.setState({senderTyping: false})
          this.socket.emit('senderTyping', {indicateScope: indicateScope, typing: false});
        }, 3000);
      }
    }
  }

  renderFooter = () => {
    const { navigation } = this.props;
    const recipientName = navigation.getParam('recipientName', '');
    if (this.state.showIsTyping && this.state.appState === 'active') {
      return (
          <Text style={{fontFamily: fonts.robotoCondensed, marginHorizontal: 10, marginBottom: 16, fontSize: moderateScale(15, 2.5), color: colors.green}}>
            {recipientName} is typing....
          </Text>
      );
    } else {
      return null
    }
  }

  loadEarlierMessages = () => {
    console.log("Load earlier messages");

    const { navigation } = this.props;
    const recipientId = navigation.getParam('recipientId', 'NO-ID');
    const listingId = navigation.getParam('listingId', 'NO-ID');

    this.setState({
      currentPage: this.state.currentPage + 1
    }, () => {
      console.log("TOTAL PAGES", this.props.totalPages);
      console.log("CURRENT PAGE", this.state.currentPage);
      this.props.getEngagementMessages(recipientId, listingId, this.state.currentPage)
    });
  }

  renderLoader = (props) => {
    return (
      <LoadEarlier
        {...props}
        textStyle={{
          fontSize: moderateScale(13, 2.5),
          fontFamily: fonts.robotoCondensed,
          color: colors.green
        }}
        wrapperStyle={{
          backgroundColor: "#FFF"
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
          {this.props.gettingMessages && this.state.currentPage == 1 ? (
            <ActivityIndicator size="large" color={colors.green} />
          ) : (
            <GiftedChat
              isLoadingEarlier={this.props.gettingMessages}
              loadEarlier={this.props.totalPages > 1 && this.state.currentPage != this.props.totalPages}
              onLoadEarlier={this.loadEarlierMessages}
              renderLoadEarlier={this.renderLoader}
              renderComposer={this.renderComposer}
              renderSend={this.renderSend}
              renderBubble={this.renderBubble}
              renderFooter={this.renderFooter}
              renderInputToolbar={this.renderInputToolbar}
              renderLoading={() => <ActivityIndicator size="large" color={colors.green} />}
              messages={this.props.messages}
              text={this.state.inputText}
              onInputTextChanged={text => this.handleInputText(text)}
              onSend={this.sendMessage}
              user={{
                _id: this.props.account.id,
              }}
              listViewProps={{
                showsVerticalScrollIndicator: false
              }}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5   
  },
});
