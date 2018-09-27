import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  Alert
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Message extends React.Component {

  state = {
    messages: [],
    inputText: '',
  }

  componentDidMount() {
    const { navigation } = this.props;
    const listedById = navigation.getParam('listedBy', 'NO-ID');
  }

  onSend(messages = []) {
    console.log(messages);
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  }

  handleInputText = (text) => {
    console.log(text);
    this.setState({inputText: text});
  }

  sendMessage = () => {
    console.log("SEND", this.state.inputText);
    const { navigation } = this.props;
    const listedById = navigation.getParam('listedBy', 'NO-ID');
    const listingId = navigation.getParam('listingId', 'some default value');
    const newMessage = {
      body: this.state.inputText,
      recipientId: listedById,
      listingId: listingId
    }
    this.props.createMessage(newMessage);
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          text={this.state.inputText}
          onInputTextChanged={text => this.handleInputText(text)}
          onSend={this.sendMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
});
