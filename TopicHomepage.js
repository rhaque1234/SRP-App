// format of each topic page

import { SafeAreaView, View, Text, StyleSheet, Button, Linking, ScrollView, ActivityIndicator } from 'react-native'
import allScreens from '../../../styles';
import Buttons from '../../../components/Buttons';
import withGradient from '../../../components/GradientScreen';
import Topic from '../../../components/Topic';
import BackButton from '../../../components/BackButton';
import { FlatList } from 'react-native';
import Researcher from '../../../components/Researcher';
import {insertData, deleteData, useFetchData} from '../../../useFetchData';
import { LinearGradient } from 'expo-linear-gradient';

// feature contains information about the featured paper at the top of each topic

const TopicHome = ({ route, navigation }) => {
    const { topic_id, topic_name, user_id } = route.params;
    console.log('TOPIC HOME', topic_id, ' ', topic_name, ' ', user_id)

    // fetch recent paper from this topic
    const {data, loading, error} = useFetchData(`http://localhost:8080/highlightTopicPub/${topic_name}`)
    console.log("Topic Home", data)

    // function to open URL to the full paper
    const openExternalURL = (url) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    if (error) {
        return <Text>Error fetching data: {error.message}</Text>;
    }

    // sample followers - placeholder
    const followers = [
        { key: '3', user_id: '1', name: "User Name", department: "Department of Medicine", position: "Professor of Cellular Biology", image: require('../../../assets/images/favicon.png')},
        { key: '4', user_id: '2', name: "User Name", department: "Department of Bioinformatics", position: "Professor of Genomics", image: require('../../../assets/images/adaptive-icon.png')}
    ];

    // specify date formatting to be e.g. Dec 31, 2024
    const date = new Date(data[0].pub_date);
    const options = {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
    }

    // add this topic to the user
    const addTopic = () => {
        console.log('ADD TOPIC: ', user_id, topic_id);
        insertData('http://localhost:8080/followTopic', { uid: user_id, topic_id: topic_id });
    };

    const deleteTopic = () => {
        console.log('DELETE TOPIC:', user_id, topic_id);
        deleteData('http://localhost:8080/unfollowTopic', { uid: user_id, topic_id: topic_id });
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <BackButton />
            <Button title="Test unfollow" onPress={deleteTopic} />
            <Button title="Test follow" onPress={addTopic} />
            <Text style={allScreens.mainTitle}>{topic_name}</Text>
            <View style={topicStyles.header}>
                <Buttons onName={"Following"} offName={"Follow"} press={addTopic}/>
            </View>
            <ScrollView>
                <View style={{minHeight: 300, flex: 1}}>
                    {/* background image */}
                    <LinearGradient 
                        colors={['#D8CDC6', '#562C2C']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ flex: 1 }}>
                    {/* <ImageBackground source={require('../../../assets/images/topic_pngs/ai.png')} imageStyle={topicStyles.backgroundImage} style={topicStyles.backgroundStyle}> */}
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        {/* title of paper */}
                            <View style={topicStyles.paperBack}>
                                <Text style={[allScreens.subtitle, {fontWeight: 'bold'}]}>{data[0].title}</Text>
                                <Text style={allScreens.topicTitle}>{date.toLocaleDateString('en-US', options)}</Text>
                                <Text style={allScreens.primaryText}>{data[0].som_faculty_names.join('; ')}</Text>
                                {/* view full paper button */}
                                <Buttons onName={"View full paper"} offName={"View full paper"} onPress={() => openExternalURL(`https://doi.org/${data[0].doi}`)}/>
                            </View>
                        </View>
                    {/* </ImageBackground> */}
                    </LinearGradient>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Topic name="Publications" image={require("../../../assets/scientific_logo.png")} press={() => navigation.navigate('TopicPubs', {topic_id})}/>
                    <Topic name="Followers" image={require("../../../assets/profile.png")} press={() => navigation.navigate('TopicFollowers', {followers, topic_id})}/>
                </View>
                <Text style={allScreens.subtitle}>Connect with {topic_name} followers </Text>
                <FlatList
                    data={followers}
                    renderItem = {({item}) => 
                        <Researcher user_id={item.user_id} photo={item.image} name={item.name} position={item.position}/>}
                    keyExtractor={item => item.key}
                    horizontal
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default withGradient(TopicHome);

const topicStyles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingBottom: 20
    },
    backgroundImage: {
        opacity: 0.5,
        resizeMode: 'cover'
    },
    backgroundStyle: {
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    paperBack: {
        backgroundColor: 'rgba(225, 239, 238, 0.8)',
        padding: 10,
        paddingBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center'
    }
})