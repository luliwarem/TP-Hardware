import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Formik } from "formik";

export default function NumeroEmergencia() {
  const validarTelefono = (numeroEmergencia) => {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(numeroEmergencia);
  };

  const setItem = async (values) => {
    if (validarTelefono(values.numeroEmergencia)) {
      try {
        const jsonValue = JSON.stringify(values);
        await AsyncStorage.setItem("Numero de Emergencia", jsonValue);
      } catch (error) {
        alert("Error al ingresar! Complete los datos correctamente");
      }
    }
    else{
        alert("Ingrese el telefono en un formato valido")
    }
  };

  const handleKeyPress = (event, values) => {
    if (event.key === "Enter") {
      setItem(values);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Configura un Numero de Emergencia</Text>
      <Formik
        initialValues={{ numeroEmergencia: "" }}
        onSubmit={setItem}
      >
        {({ handleSubmit, handleChange, values }) => (
          <View>
            <TextInput
              style={styles.input}
              value={values.numeroEmergencia}
              onChangeText={handleChange("numeroEmergencia")}
              placeholder="Numero de Emergencia"
              onKeyPress={(e) => handleKeyPress(e, values)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text>Guardar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center"
  },
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
  },
  button: {
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 80,
    borderRadius: 20,

    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
