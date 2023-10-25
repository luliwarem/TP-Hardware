import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Pressable,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import * as React from "react";
  import { NavigationContainer } from "@react-navigation/native";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  
  // Screens
  import NumeroEmergencia from "./NumeroEmergencia";
  import Contactos from "./Contactos";
  import Clima from "./Clima";
  import QR from "./QR";
  
  //Screen names
  const numeroEmergenciaName = "Emergencia";
  const contactosName = "Contactos";
  const climaName = "Clima";
  const QRName = "QR";
  
  const Tab = createBottomTabNavigator();
  
  export default function NavBar() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={numeroEmergenciaName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
              if (rn === numeroEmergenciaName) {
                iconName = focused ? "call" : "call-outline";
              } else if (rn === contactosName) {
                iconName = focused ? "person" : "person-outline";
              } else if (rn === QRName) {
                iconName = focused ? "qr-code" : "qr-code-outline";
              } else if (rn === climaName) {
                iconName = focused ? "partly-sunny" : "partly-sunny-outline";
              } 

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "blue",
            inactiveTintColor: "gray",
            labelStyle: { fontSize: 10 },
            tabBarStyle: { padding: 10, height: 100},
          }}
        >
          <Tab.Screen name={numeroEmergenciaName} component={NumeroEmergencia} options={{ headerShown: false }}  />
          <Tab.Screen name={contactosName} component={Contactos} options={{ headerShown: false }}  />
          <Tab.Screen name={climaName} component={Clima} options={{ headerShown: false }}  />
          <Tab.Screen name={QRName} component={QR} options={{ headerShown: false }}  />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 300,
      height: "15%",
    },
    botoncito: {
      width: "auto",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      shadowOffset: {
        width: 2,
        height: 3,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      padding: 10,
      fontFamily: "sans-serif",
      marginBottom: 10,
    },
  
    gradient: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
  });