import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native'
import PublicationList from "../../../components/PublicationList";
import withGradient from "../../../components/GradientScreen";
import SearchComp from '../../../components/SearchComp';
import BackButton from '../../../components/BackButton'
import {useFetchData} from '../../../useFetchData'

const TopicPubs = ({ route }) => {
    const { topic_id } = route.params; // Extract publications from route params
    console.log("topic id", topic_id)

    const { data, loading, error } = useFetchData(`http://localhost:8080/getTopicPubs/${topic_id}`)
    console.log(data)

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    if (error) {
        return <Text>Error fetching data: {error.message}</Text>;
    }

    return (
        <>
            <SafeAreaView>
                <BackButton />
                <SearchComp visible={true} />
            </SafeAreaView>
            <View style={{ flex: 1 }}>
                <PublicationList publications={data} />
            </View>
        </>
    );
}

export default withGradient(TopicPubs);