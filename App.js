import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import User from "./User";

const users = [
  "mrlemoos",
  "renanconsalter",
  "Dal-Alba",
  "eduardo-mior",
  "diogoizele",
  "graubersb",
  "lemooos",
  "marcelosbsistemas",
  "rogersbsistemas",
  "tiago-sbsistemas",
  "sbsistemas-company",
];

const { height } = Dimensions.get("screen");

function App() {
  const animationRef = React.useRef(new Animated.Value(0)).current;

  const animateOut = React.useCallback(() => {
    Animated.timing(animationRef, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
      delay: 1000,
    }).start(({ finished }) => {
      if (finished) {
        BackHandler.exitApp();
      }
    });
  }, [animationRef]);

  const animateIn = React.useCallback(() => {
    Animated.timing(animationRef, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      delay: 1000,
    }).start();
  }, [animationRef]);

  React.useEffect(() => {
    animateIn();

    return () => {
      animateOut();
    };
  }, []);

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.title}>Perfis do GitHub</Text>
      </View>
      <Animated.ScrollView
        style={[
          styles.users,
          {
            transform: [
              {
                translateY: animationRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
            ],
          },
        ]}
      >
        {users.map((user) => (
          <User user={user} />
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  users: {
    paddingHorizontal: 18,
  },
});
