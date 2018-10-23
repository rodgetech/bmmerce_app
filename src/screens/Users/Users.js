import React from 'react';
import { 
  StyleSheet, 
  View,
  FlatList,
  Text
} from 'react-native';
import Loader from '../../components/Loader';
import { colors } from '../../styles';
import { UserItem } from '../../common';

export default class AccountListings extends React.Component {

    componentDidMount() {
        this.props.getUsers(1, 20);
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

    render() {
        return (
            <View style={styles.container}>
                {!this.props.gettingUsers ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.props.users}
                        renderItem={({item}) => (
                            <UserItem user={item} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                ) : (
                    <Loader
                        loading={this.props.gettingUserListings} 
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
  },
});
