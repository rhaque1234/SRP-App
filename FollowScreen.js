import { FlatList, SafeAreaView, Text } from "react-native";
import Researcher from "../../components/Researcher";
import withGradient from "../../components/GradientScreen";
import allScreens from "../../styles";

const Follow = ({route, topicName}) => {
    const {followers} = route.params;
    const renderItem = ({item}) => {
        return (
            <Researcher photo={item.image} name={item.name} position={item.position}/>
        );
    }
    return (
        <SafeAreaView style={{alignItems: 'center'}}>
            <Text style={allScreens.mainTitle}>{topicName} Followers</Text>
            <FlatList 
                data={followers}
                renderItem={renderItem}
                keyExtractor={(item) => item.key.toString()}
                numColumns={2}
                contentContainerStyle={{justifyContent: 'center', paddingTop: 15}}
            />
        </SafeAreaView>
    );
}

export default withGradient(Follow);