import React, { useRef } from "react";
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
} from "react-native";

class App extends React.Component<any, any> {
  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
      drawerPosition: "left",
      drawer: React.createRef<HTMLDivElement>(),
      value: "",
    };
  }
  onChangeText = (value: string) => {
    this.setState({
      ...this.state,
      value,
    });
  };
  navigationView = () => {
    const { drawer, value } = this.state;
    return (
      <View style={[styles.container, styles.navigationContainer]}>
        <Text style={styles.paragraph}>I'm in the Drawer!</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "100%",
          }}
          onChangeText={(text) => this.onChangeText(text)}
          value={value}
        />
        <Button
          title="Close drawer"
          onPress={() => drawer.current.closeDrawer()}
        />
        <Button title={"2-Button Alert"} onPress={this.createTwoButtonAlert} />

        <Button
          title={"3-Button Alert"}
          onPress={this.createThreeButtonAlert}
        />
      </View>
    );
  };
  changeDrawerPosition = () => {
    if (this.state.drawerPosition === "left") {
      this.setState({
        ...this.state,
        drawerPosition: "right",
      });
    } else {
      this.setState({
        ...this.state,
        drawerPosition: "left",
      });
    }
  };
  createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );

  createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  render() {
    const { drawerPosition, drawer } = this.state;
    return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={this.navigationView}
      >
        <View style={styles.container}>
          <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
          <Button
            title="Change Drawer Position"
            onPress={() => this.changeDrawerPosition()}
          />
          <Text style={styles.paragraph}>
            Swipe from the side or press button below to see it!
          </Text>
          <Button
            title="Open drawer"
            onPress={() => drawer.current.openDrawer()}
          />
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
});

export default App;
