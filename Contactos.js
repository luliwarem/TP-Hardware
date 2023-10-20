import { View, StyleSheet, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

export default function Contactos() {
  const [contactos, setContactos] = useState([])

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const {data}  = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }

        setContactos(data)
      }
    })();
  }, []);

  const Item = ({ Name, LastName, PhoneNumbers}) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {Name} {LastName}
      </Text>
      {PhoneNumbers.map((p) => (
        <Text style={styles.title}>{p.number}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contactos}
        renderItem={({ item }) => (
          <Item
            Name={item.firstName ?? "" }
            LastName={item.lastName ?? ""}
            PhoneNumbers={item.phoneNumbers ?? []}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    width: 330,
    borderRadius: 20,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 15,
    marginTop: 7,
  },
  image: {
    width: 300,
    height: 240,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    marginTop: 7,
  },
});
