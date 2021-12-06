import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Cellular from 'expo-cellular';
import * as Network from 'expo-network';
import * as Application from 'expo-application';

export default function App() {
  //The cellular methods
  const getCellularStuff = async () => {
    const allowVoip = await Cellular.allowsVoipAsync();
    const carrierName = await Cellular.getCarrierNameAsync();
    const cellGen = await Cellular.getCellularGenerationAsync(); //this is a number
    const isoCountryCode = await Cellular.getIsoCountryCodeAsync();
    const mobileCountryCode = await Cellular.getMobileCountryCodeAsync();
    const mobileNetworkCode = await Cellular.getMobileNetworkCodeAsync();
    const cellGenName = await Cellular.CellularGeneration[cellGen];
    console.log(carrierName, isoCountryCode);
    console.log(mobileCountryCode, mobileNetworkCode);
    console.log(cellGen, cellGenName);
  };

  getCellularStuff();

  //the network and application methods
  const getNetworkStuff = async () => {
    const ip = await Network.getIpAddressAsync();
    const state = await Network.getNetworkStateAsync();
    const isAirplane = await Network.isAirplaneModeEnabledAsync();
    console.log(ip, state);
    console.log({ isAirplane });

    const appID = Application.applicationId;
    const appName = Application.applicationName;
    console.log(appID, appName); //Android application id, iOS bundle id
    const version = Application.nativeApplicationVersion;
    console.log('version', version);
    const installedAt = await Application.getInstallationTimeAsync();
    console.log(installedAt);

    if (Platform.OS === 'ios') {
      const releaseType = Application.getIosApplicationReleaseType();
      console.log(Application.ApplicationReleaseType[releaseType]);
    }
  };
  getNetworkStuff();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
