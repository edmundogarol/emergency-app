import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, Image } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "react-native-login-screen";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [background, setBackground] = React.useState("");
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  let password = "";

  function loginAttempt() {
    // Temporary password which would be replaced by retrieving authentication
    // through an API call
    if (password === "1234") {
      setLoggedIn(true);
    } else {
      setBackground("red");
      throw "error";
    }
  }

  function changePassword(passwordInput) {
    password = passwordInput;
    console.log('password', password);
  }
  
  const LoginScreenComponent = () => {
    return (
      <LoginScreen
        source={require("./assets/images/background.png")}
        disableSettings
        disableSwitch
        onPressLogin={loginAttempt}
        backgroundColor={background}
        logoComponent={
          <Image
            source={require("./assets/images/emergency.png")}
            style={{ height: 100, width: 100 }}
          />
        }
        passwordOnChangeText={password => changePassword(password)}
        usernamePlaceholder="admin"
      />
    );
  };

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    console.log('render');
    return !isLoggedIn ? (
      <LoginScreenComponent />
    ) : (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
