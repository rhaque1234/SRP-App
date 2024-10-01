import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../../components/LoginScreen';
import SignupScreen from '../../components/Signup';
import Search from '../screens/SearchScreen';
import Profile from '../screens/ProfileScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import TopicHome from '../screens/Topics/TopicHomepage';
import TopicPublications from '../screens/Explore/TopicPublications';
import ProfileList from '../screens/Explore/ProfileList';
import MyCollections from '../screens/MyCollections';
import PubDetailScreen from '../screens/PubDetailScreen';
import LinksScreen from '../screens/LinksScreen';

// Authentication stack
const AuthStack = createNativeStackNavigator();
function AuthStackGroup() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}


// Main app stack

const Stack = createNativeStackNavigator();


const MainAppStack = createNativeStackNavigator();
function MainApp() {
  return (
    <MainAppStack.Navigator screenOptions={{ headerShown: false }}>
      <MainAppStack.Screen name="TabGroup" component={TabGroup} />
    </MainAppStack.Navigator>
  );
}

// Home stack
const HomeStack = createNativeStackNavigator();
function HomeStackGroup({ userId }) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home">
        {(props) => <HomeScreen {...props} userId={userId} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="HTopicHome" component={TopicHome} />
      <HomeStack.Screen name="HPubDetail" component={PubDetailScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

// Explore stack
const ExploreStack = createNativeStackNavigator();
function ExploreStackGroup({ userId }) {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="ExploreHome">
        {(props) => <ExploreScreen {...props} userId={userId} />}
      </ExploreStack.Screen>
      <ExploreStack.Screen name="All Topics" component={DetailsScreen} />
      <ExploreStack.Screen name="TopicHome" component={TopicHome} />
      <ExploreStack.Screen name="TopicPubs" component={TopicPublications} />
      <ExploreStack.Screen name="TopicFollowers" component={ProfileList} />
      <ExploreStack.Screen name="TopicFollowersList" component={ProfileList} />
    </ExploreStack.Navigator>
  );
}

// Profile stack
const ProfileStack = createNativeStackNavigator();
function ProfileStackGroup({ onLogout, userId }) {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile">
        {(props) => <Profile {...props} onLogout={onLogout} userId={userId} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="Reading List" component={TopicPublications} />
      <ProfileStack.Screen name="Followers" component={ProfileList} />
      <ProfileStack.Screen name="Following" component={ProfileList} />
      <ProfileStack.Screen name="My Collections" component={MyCollections} />
      <ProfileStack.Screen name="MyPubs" component={TopicPublications} />
      <ProfileStack.Screen name="Followed Topics" component={DetailsScreen} />
      <ProfileStack.Screen name="Public Collections" component={MyCollections} />
      <ProfileStack.Screen name="Links" component={LinksScreen} />
    </ProfileStack.Navigator>
  );
}

// Bottom tab navigator
const Tab = createBottomTabNavigator();

function TabGroup({ onLogout, userId }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "earth" : "earth-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#127475',
        tabBarInactiveTintColor: '#562C2C',
        tabBarStyle: {
          backgroundColor: '#D8CDC6',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeStackGroup {...props} userId={userId} />}
      </Tab.Screen>
      <Tab.Screen name="Explore">
        {(props) => <ExploreStackGroup {...props} userId={userId} />}
      </Tab.Screen>
      <Tab.Screen name="Search">
        {(props) => <Search {...props} userId={userId} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {(props) => <ProfileStackGroup {...props} onLogout={onLogout} userId={userId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Main app stack


function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };

    loadUserId();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
      setLoading(false); 
      //Hello 
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return null; // Optionally, show a loading screen or spinner here
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="TabGroup">
          {(props) => <TabGroup {...props} onLogout={handleLogout} userId={userId} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;
