// Home / primary feed screen 
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView, SectionList, StyleSheet, View, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import withGradient from "../../../components/GradientScreen";
import allScreens from "../../../styles";
import Topic from "../../../components/Topic";
import Publication from "../../../components/Publication";
import Collection from "../../../components/Collection";
import Researcher from "../../../components/Researcher";
import More from "../../../components/More";
import {createSections} from './sectionData';
import {useFetchData} from '../../../useFetchData';

const HomeScreen = ({ navigation, userId }) => {

    const renderHeader = ({ section }) => (
        <Text style={allScreens.subtitle}>{section.title}</Text>
    );

    const { data: publications, loading, error } = useFetchData('http://localhost:8080/newpubshome');

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const sections = createSections(publications);

    const renderHorizontal = (items) => (
        <ScrollView horizontal contentContainerStyle={{ backgroundColor: 'transparent' }}>
            {items.map((item) => (
                <View key={item.key} style={styles.topicItemContainer}>
                    {item.type === 'Publication' && (
                        <Publication 
                            name={item.som_faculty_names} 
                            date={item.pub_date} 
                            title={item.title} 
                            summary={item.abstract} 
                            navigation={navigation} 
                            press={() => navigation.navigate('HPubDetail', { feature: item })} 
                        />
                    )}
                    {item.type === 'Topic' && (
                        <Topic 
                            name={item.topicName} 
                            image={item.image} 
                            press={() => navigation.navigate('HTopicHome', { user_id: userId })} 
                        />
                    )}
                    {item.type === 'Collection' && (
                        <Collection name={item.name} color={item.color} />
                    )}
                    {item.type === 'Researcher' && (
                        <Researcher 
                            user_id = {item.user_id} 
                            photo={item.image} 
                            name={item.name} 
                            position={item.position} />
                    )}
                    {item.type === 'More' && (
                    <More 
                        press={() => {
                            if (item.key === '18') {
                                navigation.navigate("Details", {user_id: userId});
                                // key 23 needs to navigate to explore home but not working
                            } else if (item.key === '23') {
                                navigation.navigate("ExploreStackGroup");
                            }
                        }} 
                    />
                )}
                </View>
            ))}
        </ScrollView>
    );

    const renderSectionFooter = ({ section }) => (
        renderHorizontal(section.data, section.title)
    );

    const renderItem = ({ item, section }) => {
        return null; // renderItem is not used directly, rendering happens in renderSectionFooter
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={allScreens.mainTitle}>Home</Text>
            {userId && (
                <Text style={styles.userIdText}>
                Welcome, User ID: {userId}
                </Text>
            )}
            <SectionList
                sections={sections}
                renderSectionHeader={renderHeader}
                renderSectionFooter={renderSectionFooter}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                stickySectionHeadersEnabled={false}
            />
        </SafeAreaView>
      );
    };

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 20,
        flex: 1,
    },
    userIdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#127475',
        marginBottom: 10,
        textAlign: 'center',
    },
    topicItemContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        padding: 10,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default withGradient(HomeScreen);
