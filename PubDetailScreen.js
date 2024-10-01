// publication details screen
import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Linking, ScrollView } from "react-native";
import withGradient from "../../components/GradientScreen";
import allScreens from "../../styles";
import BackButton from '../../components/BackButton';

const PubDetailScreen = () => {
    const [visibleDropdown, setVisibleDropdown] = useState(null);

    const handlePress = () => {
        Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/39096902/');
    };

    const toggleDropdown = (dropdown) => {
        setVisibleDropdown(visibleDropdown === dropdown ? null : dropdown);
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <Text style={allScreens.mainTitle}>Pub Name</Text>
            <TouchableOpacity style={styles.bigButton} onPress={handlePress}>
                <Text style={styles.bigButtonText}>View Full Publication</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.smallButton} onPress={() => toggleDropdown('authors')}>
                    <Text style={styles.smallButtonText}>Authors</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton} onPress={() => toggleDropdown('info')}>
                    <Text style={styles.smallButtonText}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton} onPress={() => toggleDropdown('topics')}>
                    <Text style={styles.smallButtonText}>Topics</Text>
                </TouchableOpacity>
            </View>
            {visibleDropdown === 'authors' && (
                <View style={styles.dropdown}>
                    <Text style={styles.dropdownItem}>Person A</Text>
                    <Text style={styles.dropdownItem}>Person B</Text>
                    <Text style={styles.dropdownItem}>Person C</Text>
                </View>
            )}
            {visibleDropdown === 'info' && (
                <View style={styles.dropdown}>
                    <Text style={styles.dropdownItem}>Date</Text>
                </View>
            )}
            {visibleDropdown === 'topics' && (
                <View style={styles.dropdown}>
                    <Text style={styles.dropdownItem}>Topic A</Text>
                    <Text style={styles.dropdownItem}>Topic B</Text>
                    <Text style={styles.dropdownItem}>Topic C</Text>
                </View>
            )}
            <View>
                <Text style={allScreens.subtitle}>Full Abstract</Text>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.abstract}>
                        Neutrophils are sentinel immune cells with essential roles for antimicrobial defense. Most of our knowledge on neutrophil tissue navigation derived from wounding and infection models, whereas allergic conditions remained largely neglected. Here, we analyzed allergen-challenged mouse tissues and discovered that degranulating mast cells (MCs) trap living neutrophils inside them. MCs release the attractant leukotriene B4 to re-route neutrophils toward them, thus exploiting a chemotactic system that neutrophils normally use for intercellular communication. After MC intracellular trap (MIT) formation, neutrophils die, but their undigested material remains inside MC vacuoles over days. MCs benefit from MIT formation, increasing their functional and metabolic fitness. Additionally, they are more pro-inflammatory and can exocytose active neutrophilic compounds with a time delay (nexocytosis), eliciting a type 1 interferon response in surrounding macrophages. Together, our study highlights neutrophil trapping and nexocytosis as MC-mediated processes, which may relay neutrophilic features over the course of chronic allergic inflammation.
                    </Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 20,
        flex: 1,
    },
    bigButton: {
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(86, 44, 44, 0.3)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    bigButtonText: {
        color: '#127475',
        fontSize: 16,
    },
    smallButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#C6E3E2', 
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    smallButtonText: {
        color: '#562C2C',
        fontSize: 16,
    },
    dropdown: {
        backgroundColor: '#FDF6F1',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginVertical: 10,
    },
    dropdownItem: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#562C2C',
    },
    scrollContainer: {
        maxHeight: '70%',  
    },
    abstract: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#562C2C',
    },
});

export default withGradient(PubDetailScreen);








