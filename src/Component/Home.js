import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'native-base';
import { NavigationActions } from 'react-navigation'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            timestamp: null,
            err: null
        }
    }
    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: new Date().toLocaleString(),
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }




    render() {
        const { navigation } = this.props;
        const hashCode = navigation.state.params.hashCode;


        return (
            <View >
                <Text>
                    HashCode:  {hashCode}
                </Text>
                <Text>
                    Longitude: {this.state.longitude}
                </Text>
                <Text>
                    Latitude:  {this.state.latitude}
                </Text>
                <Text>
                    Time When QRcode is scan: {this.state.timestamp}
                </Text>
                <Text>
                    Is k aagy ap btado kya karna hai
                    </Text>
            </View>

        );
    }
}

export default Home;
