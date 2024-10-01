// collections screen
import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Collection from "../../components/Collection"; // Assuming Collection is in components directory
import SearchComp from "../../components/SearchComp";
import withGradient from "../../components/GradientScreen";
import BackButton from "../../components/BackButton";
import allScreens from "../../styles";
import {useFetchData} from '../../useFetchData';
import { useRoute } from '@react-navigation/native';



// Screen rendering
function MyCollections() {
  const route = useRoute(); 
  const { user_id, privacy } = route.params; 

  // Define the URL (filter private vs public here!)
  let URL; // Use `let` to declare the variable

  if (privacy === 'all') { // Use `===` for comparison
    URL = `http://localhost:8080/allcollections/${user_id}`;
  } else {
    URL = `http://localhost:8080/publiccollections/${user_id}`;
  }

  // fetch data
  const { data, loading, error } = useFetchData(URL);
  if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
      return <Text>Error fetching data: {error.message}</Text>;
  }

  // Transform fetched data into collections format
  const collections = data.map((item, index) => ({
    key: (index + 1).toString(), // Ensure key is a string and unique
    name: item.name,
    description: item.description // If you need to use the description in the future
  }));

  // Render each item
  const renderItem = ({ item }) => (
    <View style={styles.collectionContainer}>
        <Collection name={item.name} color='rgba(86, 44, 44, 0.3)' /> 
    </View>
  );

  return (
      <View style={styles.container}>
          <View style={styles.headerContainer}>
              <BackButton />
              <SearchComp visible={true} />
          </View>

          <Text style={allScreens.mainTitle}>My Collections</Text>

          <View style={styles.topSection}>
              <FlatList
                  data={collections}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.key}
                  numColumns={2}
                  columnWrapperStyle={styles.row}
                  contentContainerStyle={styles.listContainer}
              />
          </View>
      </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  topSection: {
    flex: 1, // Flex to fill the remaining space
  },
  listContainer: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'flex-start',
  },
  collectionContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
});

export default withGradient(MyCollections);
