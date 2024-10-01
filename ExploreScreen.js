import { SafeAreaView, Text, ScrollView, SectionList, StyleSheet, View, Button } from "react-native";
import withGradient from "../../../components/GradientScreen";
import allScreens from "../../../styles";
import Topic from "../../../components/Topic";
import Researcher from "../../../components/Researcher";
import More from "../../../components/More";
import {useFetchData} from "../../../useFetchData";

const Search = ({ navigation, userId }) => {
    const user_id = userId;
    //const user_id = 1
    const {data, loading, error} = useFetchData(`http://localhost:8080/getUserTopics/${user_id}`)
    console.log(data)

    // Sample data (temporary)
    const sections = [
        {
            title: "Browse by Topic",
            data: data
        },
        {
            title: "Recommended for You",
            data: [
                {
                    key: '3',
                    user_id: '1',
                    image: require('../../../assets/images/favicon.png'),
                },
                {
                    key: '4',
                    user_id: '1',
                    image: require('../../../assets/images/favicon.png'),
                }
            ]
        }
    ];

    const feature = {
        topic: "Genetics",
        title: "Reverse-engineering spinal cord injury",
        image: require('../../../assets/images/genomics_example_background.png'),
        link: 'https://www.nature.com/articles/d41586-024-02307-7',
        date: "July 16th, 2024",
        followers: [
            {
                key: '3',
                user_id: '1',
                image: require('../../../assets/images/favicon.png'),
            },
            {
                key: '3',
                user_id: '3',
                image: require('../../../assets/images/favicon.png'),
            }
        ]
    };

    const renderHeader = ({ section }) => (
        <Text style={allScreens.subtitle}>{section.title}</Text>
    );

    const renderHorizontal = (items, sectionTitle) => (
        <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}>
            {items.map(item => (
                <View key={item.topic_id} style={styles.topicItemContainer}>
                    {sectionTitle === 'Browse by Topic' ? (
                        <Topic
                            name={item.topic_name}
                            image={item.image}
                            press={() => navigation.navigate('TopicHome', { topic_id: item.topic_id, topic_name: item.topic_name, user_id: userId })}
                        />
                    ) : (
                        <Researcher
                            user_id={item.user_id}
                            photo={item.image}
                            name={item.name}
                            position={item.position}
                        />
                    )}
                </View>
            ))}
    
            {sectionTitle === 'Browse by Topic' && (
                <More
                    press={() => {
                        navigation.navigate('All Topics', {user_id: userId});
                    }}
                />
            )}
        </ScrollView>
    );
    

    const renderSectionFooter = ({ section }) => (
        renderHorizontal(section.data, section.title)
    );

    const renderItem = ({ item }) => {
        return null; // renderItem is not used directly, rendering happens in renderSectionFooter
    };

    return (
        <SafeAreaView style={styles.container}>
            {userId && (
                <Text style={styles.userIdText}>
                Welcome, User ID: {userId}
                </Text>
            )}
            <Text style={allScreens.mainTitle}>Explore Profiles</Text>
            <SectionList
                sections={sections}
                renderSectionHeader={renderHeader}
                renderSectionFooter={renderSectionFooter}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 20
    },
    horizontalScrollView: {
        backgroundColor: 'transparent'
    },
    topicItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        padding: 10
    },
    userIdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#127475',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default withGradient(Search);
