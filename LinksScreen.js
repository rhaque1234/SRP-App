// additional links page
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Linking, ActivityIndicator } from "react-native";
import { useRoute } from '@react-navigation/native';
import withGradient from "../../components/GradientScreen";
import allScreens from "../../styles";
import BackButton from '../../components/BackButton';
import {useFetchData} from '../../useFetchData';

const LinksScreen = () => {
    const route = useRoute(); 
    const { user_id } = route.params; 

    // Define the URL dynamically based on user_id
    const LINK_URL = `http://localhost:8080/links/${user_id}`;

    // fetch data
    const { data, loading, error } = useFetchData(LINK_URL);
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error fetching data: {error.message}</Text>;
    }

    // make links const out of fetched data
    const links = data.map(item => ({
        name: item.name,
        url: item.url,
    }));

    // Component for rendering each link row
    const LinkRow = ({ name, url }) => {
        const handlePress = () => {
            Linking.openURL(url);
        };

        return (
            <View style={styles.row}>
                <View style={styles.blueBox}>
                    <Text style={styles.blueBoxText}>{name}</Text>
                </View>
                <TouchableOpacity style={styles.redButton} onPress={handlePress}>
                    <Text style={styles.buttonText}>Go</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <Text style={allScreens.mainTitle}>Additional Links</Text>
            <ScrollView>
                {links.map((link, index) => (
                    <LinkRow key={index} name={link.name} url={link.url} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    blueBox: {
        flex: 1,
        borderColor: '#127475',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blueBoxText: {
        color: '#127475',
        fontSize: 16,
    },
    redButton: {
        flex: 1,
        backgroundColor: 'rgba(86, 44, 44, 0.3)',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#127475',
        fontSize: 16,
    },
});

export default withGradient(LinksScreen);




