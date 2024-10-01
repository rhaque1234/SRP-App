// practice screen for displaying topics
import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import Topic from "../../components/Topic";
import SearchComp from "../../components/SearchComp";
import withGradient from "../../components/GradientScreen";
import BackButton from "../../components/BackButton";
import allScreens from "../../styles";
import {useFetchData} from '../../useFetchData';

// Get screen height
const { height: screenHeight } = Dimensions.get('window');

// temporary
//const user_id = 3

// Screen rendering
function DetailsScreen({ route, navigation }) {
  const {user_id} = route.params;
  console.log(user_id)

  // get all topics information from SQL
  const { data: allTopics, loading: load, error: err } = useFetchData('http://localhost:8080/getAllTopics')

  if (load) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (err) {
      return <Text>Error fetching data: {error.message}</Text>;
  }

  const renderItem = ({ item }) => (
      <View style={styles.topicContainer}>
          <Topic
            name={item.name}
            image={item.image ? item.image : 'http://localhost:8080/images/topic_pngs/medicine.png'}
            press={() => navigation.navigate("HTopicHome", {topic_id: item.id, topic_name: item.name, user_id: user_id})}
          />
      </View>
  );

  return (
      <SafeAreaView style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
              <BackButton />
              <View>
                  <SearchComp visible={true} />
              </View>
          </View>

          <Text style={allScreens.mainTitle}>All Topics</Text>
          
          <View style={{flex: 1}}>
              <FlatList
                  data={allTopics}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.name}
                  numColumns={2}
                  columnWrapperStyle={styles.row}
                  contentContainerStyle={styles.listContainer}
              />
          </View>
      </SafeAreaView>
  );
}


// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  topSection: {
    height: screenHeight * 0.5, // Take up half of the screen height
  },
  listContainer: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'flex-start',
  },
  topicContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
});

export default withGradient(DetailsScreen);

// All topics data
const topics = [
  { name: 'AI in Medicine', image: require('../../assets/images/topic_pngs/ai.png') },
  { name: 'Anesthesiology, Perioperative and Pain Medicine  ', image: require('../../assets/images/topic_pngs/apap.png') },
  { name: 'Biomedical Data Science, Bioinformatics', image: require('../../assets/images/topic_pngs/biomed.png') },
  { name: 'Cardiac Surgery', image: require('../../assets/images/topic_pngs/cardio.png') },
  { name: 'Chemical and Systems Biology', image: require('../../assets/images/topic_pngs/chem.png') },
  { name: 'Comparative Medicine', image: require('../../assets/images/topic_pngs/compar.png') },
  { name: 'Dermatology', image: require('../../assets/images/topic_pngs/derma.png') },
  { name: 'Developmental Biology', image: require('../../assets/images/topic_pngs/dev.png') },
  { name: 'Emergency Medicine', image: require('../../assets/images/topic_pngs/emergency.png') },
  { name: 'Epidemiology and Population Health', image: require('../../assets/images/topic_pngs/epidem.png') },
  { name: 'General Medicine', image: require('../../assets/images/topic_pngs/generalmed.png') },
  { name: 'Genetics', image: require('../../assets/images/topic_pngs/genetic.png') },
  { name: 'Health Policy', image: require('../../assets/images/topic_pngs/healthpolicy.png') },
  { name: 'Immunology', image: require('../../assets/images/topic_pngs/immunology.png') },
  { name: 'Molecular and Cellular Physiology', image: require('../../assets/images/topic_pngs/molecular.png') },
  { name: 'Neurology and Neurological Sciences', image: require('../../assets/images/topic_pngs/neurology.png') },
  { name: 'Neurosurgery', image: require('../../assets/images/topic_pngs/neurosurg.png') },
  { name: 'Obstetrics & Gynecology', image: require('../../assets/images/topic_pngs/ob.png') },
  { name: 'Ophthalmology', image: require('../../assets/images/topic_pngs/ophthalmology.png') },
  { name: 'Orthopaedic Surgery', image: require('../../assets/images/topic_pngs/ortho.png') },
  { name: 'Otolaryngology', image: require('../../assets/images/topic_pngs/oto.png') },
  { name: 'Pathology', image: require('../../assets/images/topic_pngs/pathology.png') },
  { name: 'Pediatrics', image: require('../../assets/images/topic_pngs/ped.png') },
  { name: 'Psychiatry and Behavioral Sciences', image: require('../../assets/images/topic_pngs/psyc.png') },
  { name: 'Radiation Oncology', image: require('../../assets/images/topic_pngs/radiation.png') },
  { name: 'Radiology', image: require('../../assets/images/topic_pngs/radiology.png') },
  { name: 'Stem Cell Biology and Regenerative Medicine', image: require('../../assets/images/topic_pngs/stem.png') },
  { name: 'Structural Biology', image: require('../../assets/images/topic_pngs/structuralbio.png') },
  { name: 'Surgery', image: require('../../assets/images/topic_pngs/surgery.png') },
  { name: 'Urology', image: require('../../assets/images/topic_pngs/urology.png') },
];
