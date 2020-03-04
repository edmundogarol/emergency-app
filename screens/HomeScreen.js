import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";

const Choice = ({ type }) => {
  const getLabel = {
    fire: "Fire/Smoke",
    bushfire: "Bushfire",
    medical: "Medical Emergency",
    gas: "Gas Leak",
    hazmat: "Hazmat",
    animal: "Animal Hazard"
  };

  const emergencyImgs = {
    fire: require("../assets/images/fire.png"),
    bushfire: require("../assets/images/bushfire.png"),
    medical: require("../assets/images/medical.png"),
    gas: require("../assets/images/gas.png"),
    hazmat: require("../assets/images/hazmat.png"),
    animal: require("../assets/images/animal.png")
  };

  function sendEmail() {
    let body = {
      personalizations: [
        {
          to: [{ email: "edmundo.a.garol@outlook.com" }],
          subject: "This is an emergency notification from EmergencyApp"
        }
      ],
      from: { email: "emergency.app@edmundo.com" },
      content: [{ type: "text/plain", value: "There is an emergency!" }]
    };

    fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 202) {
        alert(`Sent ${getLabel[type]} emergency email.`);
      }
    });
  }

  return (
    <TouchableOpacity
      style={styles.emergencyChoice}
      title={getLabel[type]}
      onPress={() => sendEmail()}
    >
      <Image source={emergencyImgs[type]} style={styles.emergencyChoiceImg} />
      <Text>{getLabel[type]}</Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Choice type="fire" />
          <Choice type="bushfire" />
          <Choice type="medical" />
          <Choice type="gas" />
          <Choice type="hazmat" />
          <Choice type="animal" />
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
  );
}

const styles = StyleSheet.create({
  emergencyChoice: {
    margin: 10,
    alignItems: "center"
  },
  emergencyChoiceImg: {
    width: 100,
    height: 100
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "80%",
    margin: "auto"
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
