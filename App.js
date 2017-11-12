import React from 'react';
import {StyleSheet, View} from 'react-native';
import SimonGameApp from "./SimonGameApp";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SimonGameApp />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5ECFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
