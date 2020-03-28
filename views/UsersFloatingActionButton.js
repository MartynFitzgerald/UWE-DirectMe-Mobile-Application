import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';

export default class UsersFloatingActionButton extends Component {
    state = {
      open: false,
    };
  
    render() {
        return (
            <Provider>
            <Portal>
                <FAB.Group
                style={styles.fab}
                open={this.state.open}
                icon={this.state.open ? 'tag-plus' : 'tag-plus'}
                actions={[
                    { icon: 'tag-plus', onPress: () => console.log('Pressed add') },
                    { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star')},
                    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
                    { icon: 'star', label: 'Remind', onPress: () => console.log('Pressed notifications') },
                ]}
                onStateChange={({ open }) => this.setState({ open })}
                onPress={() => {
                    if (this.state.open) {
                    // do something if the speed dial is open
                    }
                }}
                />
            </Portal>
            </Provider>
        );
    }
}
  
const styles = StyleSheet.create({
    fab: {
    },
  })