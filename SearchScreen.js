import { SafeAreaView, Text, FlatList, View, ActivityIndicator } from 'react-native';
import {useFetchData} from '../../useFetchData';
import Topic from '../../components/Topic';

// const API_URL = 'http://localhost:8080/pubs';

export default function SearchScreen() {
    // const { data, loading, error } = useFetchData(API_URL);

    const { data: allTopics, loading: hi, error: sad } = useFetchData('http://localhost:8080/getAllTopics')

    if (hi) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (sad) {
        return <Text>Error fetching data: {error.message}</Text>;
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <Topic name={item.name} image={item.image} />
            </View>
        );
    };

    return (
        <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>Search functionality to come</Text>
            {/* <FlatList
                data={data}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                <View>
                    <Text>{item.title}</Text>
                </View>
                )}
            /> */}
            <FlatList
                data={allTopics}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                initialNumToRender={10}
                numColumns={2}
            />
        </SafeAreaView>
    );
}

