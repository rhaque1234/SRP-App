import React, { useState } from 'react';
import { FlatList, View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import Researcher from "../../../components/Researcher";
import BackButton from "../../../components/BackButton";
import withGradient from "../../../components/GradientScreen";
import allScreens from "../../../styles";

const ProfileList = ({ route, navigation }) => {
    const { profiles, follow, title } = route.params; // Access title here
    const [viewMode, setViewMode] = useState('grid'); // Default to grid view

    return (
        <SafeAreaView style={styles.container}>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={allScreens.mainTitle}>{title}</Text>
            <View style={styles.switchContainer}>
                <Button title="Grid View" onPress={() => setViewMode('grid')} />
                <Button title="List View" onPress={() => setViewMode('list')} />
            </View>
            <FlatList 
                key={viewMode} 
                data={profiles}
                renderItem={({ item }) => (
                    <Researcher
                        photo={item.image} 
                        user_id={item.user_id}
                        bio={viewMode === 'list' ? 'Shortened biography & main focuses' : ''}
                        department={viewMode === 'list' ? 'Department' : ''}
                        mutuals={viewMode === 'list' ? 'mutuals' : ''}
                        showFollowButton={follow}
                    />
                )}
                numColumns={viewMode === 'grid' ? 2 : 1}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ alignItems: 'center' }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
});

export default withGradient(ProfileList);
