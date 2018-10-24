import React from 'react';
import { 
  StyleSheet, 
  View,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import Loader from '../../components/Loader';
import { colors } from '../../styles';
import { UserItem } from '../../common';

export default class AccountListings extends React.Component {

    state = {
        page: 1,
    }

    componentDidMount() {
        this.props.getUsers(1, 15);
    }

    renderSeparator = () => {
        return (
            <View 
                style={{
                    height: 1, 
                    width: '100%', 
                    backgroundColor: colors.gray
                }}
            />
        )
    }

    handleLoadMore = () => {
        this.setState({
          page: this.state.page + 1,
        }, 
        () => {
          this.props.getUsers(
            this.state.page,
            15
          )
        });
      }

    renderFooter = () => {
        if (this.props.gettingUsers) {
            return (
              <View style={{paddingVertical: 20}}>
                <ActivityIndicator 
                  animating
                  size="large"
                  color={colors.green}
                />
              </View>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.users}
                    renderItem={({item}) => (
                        <UserItem 
                            user={item} 
                            navigate={this.props.navigation.navigate}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    onEndReachedThreshold={0.5}
                    onEndReached={({ distanceFromEnd }) => {
                        if (this.state.page != this.props.totalPages && this.props.totalPages !== 1) {
                            this.handleLoadMore();
                        }
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
