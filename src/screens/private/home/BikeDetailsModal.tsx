// MarkerModal.tsx
import React from 'react';
import { StyleSheet, View, Image, Modal, Text, TouchableOpacity, ModalProps } from 'react-native';
import { Bike } from '../../../models/bike/bike';
import { BikeDetailsResponse } from '../../../models/responseModels/bike/bikeDetailsResponseModel';


interface BikeDetailsModalProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  bike: BikeDetailsResponse | null;
}

const BikeDetailsModal: React.FC<BikeDetailsModalProps> = ({ visible, onClose, bike }) => {

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {bike && (
            <>
              <Image
                source={{ uri: bike.image }}
                style={styles.modalImage}
              />
              <Text>
                Dakikalık Ücret: {bike.pricePerMin}
              </Text>
              <Text>
                Açılış Ücreti: {bike.startingFee}
              </Text>
              <Text>
                Uzaklık: {Math.floor(bike.distance)} metre
              </Text>
            </>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  modalDescription: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3396ff',
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BikeDetailsModal;
