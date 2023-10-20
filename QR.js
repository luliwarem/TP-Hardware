import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCode from "react-qr-code";

export default function QR() {
  const [nombres, setNombres] = useState();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [showQR, setshowQR] = useState(false);

  const askForCameraPermission = () => {
    (async () => {})();
  };

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync()
      .then((res) => {
        console.log(res);
        setHasPermission(res.granted === "granted");
      })
      .catch((error) => console.log());
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setText(data);
    const obj = data;
    setNombres(obj);
    console.log(obj);
  };

  const handleQR = () => {
    setshowQR(!showQR);
  };

  return (
    <>
      {hasPermission === null ? (
        <View style={styles.cameraContainer}>
          <Text> Requesting for camera permission</Text>
          <Button
            title={"Allow camera"}
            onPress={() => askForCameraPermission()}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.textContainer}>
            {nombres ? (
              <Text style={styles.escanea}>Valor escaneado: {nombres}</Text>
            ) : (
              <Text style={styles.escanea}>Escanea el codigo QR</Text>
            )}
          </View>
          <Button
              style={styles.botoncito}
              onPress={() => handleQR()}
              title="Ver mi QR"

            >
            </Button>
          {showQR && (
            <QRCode
              size={600}
              style={{ height: "auto", maxWidth: "80%", width: "100%" }}
              value="Luciana Waremkraut"
              viewBox={`0 0 256 256`}
              fgColor="#000000"
            />
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "black",
    margin: -85,
  },
  escanea: {
    textAlign: "center",
    color: "white",
    padding: 10,
    fontWeight: "bold",
    fontSize: 17,
  },
  cameraContainer: {
    flex: 1,
    margin: 200,
  },
  botoncito: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginBottom: 10,
  },
});
