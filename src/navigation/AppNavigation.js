import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { Ionicons } from  '@expo/vector-icons'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { THEME } from '../theme'

// Navigator Options
const navigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
    }
}

// Post Navigator
const PostNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Post: PostScreen
    },
    navigatorOptions
)

// Booked Navigator
const BookedNavigator = createStackNavigator(
    {
        Booked: BookedScreen,
        Post: PostScreen,
    },
    navigatorOptions
) 

// Bottom Tab Config
const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: 'All',
            tabBarIcon: info => (
                <Ionicons name='ios-albums' size={25} color={info.tintColor} />
            )
        }
    },
    booked: {
        screen: BookedNavigator,
        tabBarLabel: 'Booked',
        navigationOptions: {
            tabBarIcon: info => (
                <Ionicons name='ios-star' size={25} color={info.tintColor} />
            )
        }
    }
}

// Bottom Navigator
const BottomNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(bottomTabsConfig, {
        activeTintColor: THEME.WHITE,
        shifting: true,
        barStyle: {
            backgroundColor: THEME.MAIN_COLOR
        }
    }) 
    : createBottomTabNavigator(bottomTabsConfig, {
        tabBarOptions: {
            activeTintColor: THEME.MAIN_COLOR
        }
    })

// About Navigator
const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, navigatorOptions)

// Create Navigator
const CreateNavigator = createStackNavigator({
    Create: CreateScreen
}, navigatorOptions)

// Main Navigator
const MainNavigator = createDrawerNavigator({
    PostTabs: {
        screen: BottomNavigator,
        navigationOptions: {
            drawerLabel: 'Main Screen',
            drawerIcon: <Ionicons name="ios-home" size={20} color={THEME.MAIN_COLOR} />
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerLabel: 'About US',
            drawerIcon: <Ionicons name="ios-document" size={20} color={THEME.MAIN_COLOR} />
        }
    },
    Create: {
        screen: CreateNavigator,
        navigationOptions: {
            drawerLabel: 'Create Memory',
            drawerIcon: <Ionicons name="ios-create" size={20} color={THEME.MAIN_COLOR} />
        }
    }
}, {
    contentOptions: {
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle: {
          fontFamily: 'open-bold'
        }
    }
})
  
export const AppNavigation = createAppContainer(MainNavigator)