import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView, StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import withGradient from '../../components/GradientScreen';
import { Ionicons } from '@expo/vector-icons';
import {useFetchData} from '../../useFetchData';

const ProfileScreen = ({ onLogout }) => {
    useEffect(() => {
        const loadUserId = async () => {
          const id = await AsyncStorage.getItem('userId');
          setUserId(id);
        };

        loadUserId();
    }, []);

    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);
    const user_id = '1';

    console.log({user_id});

    // server urls here:
    const FULLNAME_URL = `http://localhost:8080/fullname/${user_id}`;
    const POSITION_URL = `http://localhost:8080/position/${user_id}`;
    const BIO_URL = `http://localhost:8080/bio/${user_id}`;

    // Fetch data hook calls here:
    const { data: dataFullName, loading: loadingFullName, error: errorFullName } = useFetchData(FULLNAME_URL);
    const { data: dataPosition, loading: loadingPosition, error: errorPosition } = useFetchData(POSITION_URL);
    const { data: dataBio, loading: loadingBio, error: errorBio } = useFetchData(BIO_URL);

    // loading states one call:
    if (loadingFullName || loadingPosition || loadingBio) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // error states for all:
    if (errorFullName) {
        return <Text>Error fetching full name: {errorFullName.message}</Text>;
    }

    if (errorPosition) {
        return <Text>Error fetching position: {errorPosition.message}</Text>;
    }

    if (errorBio) {
        return <Text>Error fetching position: {errorPosition.message}</Text>;
    }

    // constants here:
    const fullName = dataFullName[0].first_name + ' ' + dataFullName[0].last_name;
    const position = dataPosition[0].title;
    const bio = dataBio[0].bio;

    // map w info
    const info = {
        publications: [
            { id: '1', name: 'User 1', title: 'Title 1 is something unnecessarily long that will hopefully wrap into two lines', date: '2024-07-23', summary: 'This is a summary of publication. This is a summary of publication. This is a summary of publication. This is a summary of publication. This is a summary of publication. This is a summary of publication. This is a summary of publication.' },
            { id: '2', name: 'User 2', title: 'Title 2', date: '2024-07-22', summary: 'This is a summary of publication 2.' },
            { id: '3', name: 'User 3', title: 'Title 3', date: '2024-07-21', summary: 'This is a summary of publication 3.' },
            { id: '4', name: 'User 4', title: 'Title 4', date: '2024-07-20', summary: 'This is a summary of publication 4.' },
        ],
        readingPubs: [
            { id: '1', name: 'User 1', title: 'Title 1 is something unnecessarily long that will hopefully wrap into two lines', date: '2024-07-23', summary: 'This is a summary of publication. This is a summary of publication. This is a summary of publication. This is a summary of publication. This is a summary of publication. This is a summary of publication. This is a summary of publication.' },
            { id: '2', name: 'User 2', title: 'Title 2', date: '2024-07-22', summary: 'This is a summary of publication 2.' },
            { id: '3', name: 'User 4', title: 'Title 4', date: '2024-07-20', summary: 'This is a summary of publication 4.' },
        ],
        followers: [
            {
                key: '1',
                user_id: '1',
                name: "Audrey",
                department: "BRITE",
                position: "Intern",
                image: require('../../assets/images/topic_pngs/ai.png'),
            },
            {
                key: '2',
                user_id: '2',
                department: "BRITE",
                position: "Intern",
                image: require('../../assets/images/topic_pngs/ai.png'),
            }
        ],
        following: [
            {
                key: '3',
                user_id: '2',
                name: "Audrey",
                department: "BRITE",
                position: "Intern",
                image: require('../../assets/images/topic_pngs/ai.png'),
            },
        ]
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {userId && (
                  <Text style={styles.userIdText}>
                    User ID: {userId}
                  </Text>
                )}
                <View style={styles.researcherContainer}>
                    <Image
                        source={require('../../assets/images/topic_pngs/structuralbio.png')}
                        style={styles.researcherPhoto}
                    />
                    <Text style={styles.researcherName}>{fullName}</Text>
                    <Text style={styles.researcherPosition}>{position}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Reading List', {publications: info.readingPubs})}
                    >
                        <Ionicons name="bookmarks" size={40} color="#127475" />
                        <Text style={styles.iconButtonText}>Reading List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Followers', { profiles: info.followers, follow: true, title: "Followers" })}
                    >
                        <Ionicons name="people" size={42} color="#127475" />
                        <Text style={styles.iconButtonText}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Following', { profiles: info.following, follow: true, title: "Following"})}
                    >
                        <Ionicons name="people-outline" size={42} color="#127475" />
                        <Text style={styles.iconButtonText}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Public Collections', {user_id, privacy: 'all' })}
                    >
                        <Ionicons name="albums" size={42} color="#127475" />
                        <Text style={styles.iconButtonText}>My Collections</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.bioText}>
                        {bio}
                    </Text>
                </View>

                <View style={styles.sectionButtonContainer}>
                    <TouchableOpacity 
                        style={styles.fullButton}
                        // my pubs not working
                        onPress={() => navigation.navigate('MyPubs', {publications: info.publications})}
                    >
                        <Text style={styles.fullButtonText}>Publications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.fullButton}
                        onPress={() => navigation.navigate('Followed Topics')}
                    >
                        <Text style={styles.fullButtonText}>Topics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.fullButton}
                        onPress={() => navigation.navigate('Public Collections', {user_id, privacy: 'public' })}
                    >
                        <Text style={styles.fullButtonText}>Public Collections</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.fullButton}
                        onPress={() => navigation.navigate('Links', { user_id })}
                    >
                        <Text style={styles.fullButtonText}>Additional Links</Text>
                    </TouchableOpacity>
                  <Button title="Logout" onPress={onLogout} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 20,
        flex: 1,
    },
    content: {
        backgroundColor: 'transparent',
        paddingBottom: 20,
    },
    researcherContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    researcherPhoto: {
        width: 170,
        height: 170,
        borderRadius: 85,
        marginBottom: 10,
    },
    researcherName: {
        fontSize: 32,
        fontWeight: "bold",
        color: '#562C2C',
    },
    researcherPosition: {
        fontSize: 24,
        color: '#127475',
    },
    userIdText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#127475',
      marginBottom: 10,
      textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 2,
    },
    iconButton: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    iconButtonText: {
        fontSize: 12,
        color: '#562C2C',
    },
    bioText: {
        fontSize: 16,
        color: '#562C2C',
        marginTop: 10, 
        marginBottom: 5,
        marginHorizontal: 12,
        textAlign: 'center',
    },
    sectionButtonContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    fullButton: {
        width: '90%',
        padding: 10,
        backgroundColor: 'rgba(86, 44, 44, 0.3)',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    fullButtonText: {
        color: '#127475',
        fontSize: 16,
    },
});

export default withGradient(ProfileScreen);


                    






