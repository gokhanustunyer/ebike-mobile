import { StyleSheet, View, Text } from "react-native";
import { Image } from 'expo-image'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { Bike } from "../../../models/bike/bike";
import { bikeService } from '../../../services/all';
import { BikeLocation } from "../../../models/bikeLocation";
import BikeDetailsModal from "./BikeDetailsModal";
import { BikeDetailsResponse } from "../../../models/responseModels/bike/bikeDetailsResponseModel";


export const HomeScreen = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [bikes, setBikes] = useState<BikeDetailsResponse[] | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedBike, setSelectedBike] = useState<BikeDetailsResponse | null>(null);


    useEffect(() => {
        (async () => {
          let locationObject: Location.LocationObject = await Location.getCurrentPositionAsync({});
          let bikeLocation = new BikeLocation();
          bikeLocation.lat = locationObject.coords.latitude;
          bikeLocation.long = locationObject.coords.longitude;
          
          let bikes: BikeDetailsResponse[] = await bikeService.getCloseBikeByGeoLocation(bikeLocation);
          setBikes(bikes);
          setLocation(locationObject);
        })();
      }, []);

      const openBikeDetailModal = (bike: BikeDetailsResponse) => {
        setSelectedBike(bike);
        setModalVisible(true);
      }

      if (!location) {
        return (
          <View style={styles.loadingContainer}>
            <Text>Konum alınıyor...</Text>
          </View>
        );
      }
      if (!bikes) {
        return (
          <View style={styles.loadingContainer}>
            <Text>Bisikletler alınıyor...</Text>
          </View>
        );
      }
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.002,
            }}
            showsUserLocation
          >

          {bikes?.map((bike) => (
            <Marker key={bike.id} 
              coordinate={{
                latitude: bike.lat,
                longitude: bike.long,
              }}
              onPress={() => openBikeDetailModal(bike)}
            >
            <View style={styles.imageContainer}>
                <Image
                  source={bike.image}
                  style={styles.circularImgView}
                />
            </View>
            </Marker>
          ))}
          </MapView>

          <BikeDetailsModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            bike={selectedBike}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
      width: '100%',
      height: '100%',
    },
    imageContainer: {
      width: 50,
      height: 50,
      borderColor: 'gray',
      borderWidth: 3,
      borderRadius: 75, // Half of width and height to make it circula
      overflow: 'hidden'
    },
    circularImgView: {
        width: 50,
        height: 50,
    },
  });