import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { DESTINATIONS } from '../../mock/destinations';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Coordonnées des villes marocaines
const CITY_COORDINATES = {
  'Tétouan': {
    lat: 35.5889,
    lng: -5.3626,
  },
  'Tanger': {
    lat: 35.7595,
    lng: -5.8340,
  },
  'Chefchaouen': {
    lat: 35.1711,
    lng: -5.2636,
  },
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  // Générer les marqueurs pour Leaflet
  const generateMarkersHTML = () => {
    return DESTINATIONS.map((destination) => {
      const coords = CITY_COORDINATES[destination.name as keyof typeof CITY_COORDINATES];
      if (!coords) return '';
      
      const color = destination.colors[0];
      
      return `
        var marker${destination.id} = L.circleMarker([${coords.lat}, ${coords.lng}], {
          color: 'white',
          fillColor: '${color}',
          fillOpacity: 1,
          radius: 12,
          weight: 3
        }).addTo(map);
        
        marker${destination.id}.bindPopup(\`
          <div style="text-align: center; padding: 8px;">
            <h3 style="margin: 0 0 8px 0; color: ${color}; font-size: 16px; font-weight: 600;">${destination.name}</h3>
            <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 12px;">${destination.nickname}</p>
            <button 
              onclick="window.ReactNativeWebView.postMessage('${destination.name}')"
              style="
                background: ${color};
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                font-size: 13px;
              "
            >
              Découvrir →
            </button>
          </div>
        \`);
      `;
    }).join('\n');
  };

  const handleMessage = (event: any) => {
    const destinationName = event.nativeEvent.data;
    navigation.navigate('DestinationDetails' as never, {
      destinationName: destinationName,
    } as never);
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin: 0; padding: 0; }
        html, body { height: 100%; width: 100%; }
        #map { height: 100%; width: 100%; }
        
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .leaflet-popup-content {
          margin: 0;
          min-width: 180px;
        }
        
        .leaflet-popup-tip-container {
          display: none;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        // Initialiser la carte centrée sur le nord du Maroc
        var map = L.map('map', {
          zoomControl: true,
          attributionControl: false
        }).setView([35.5, -5.5], 9);
        
        // Ajouter le fond de carte OpenStreetMap avec style clair
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          opacity: 0.9
        }).addTo(map);
        
        // Ajouter les marqueurs
        ${generateMarkersHTML()}
        
        // Désactiver le double-tap zoom pour éviter les conflits
        map.doubleClickZoom.disable();
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Map WebView */}
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.map}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />

      {/* Header */}
      <View style={[styles.header, { top: insets.top + 16 }]}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="#1A1A1A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Carte Interactive</Text>

        <View style={styles.headerButton} />
      </View>

      {/* Legend */}
      <View style={[styles.legend, { bottom: insets.bottom + 20 }]}>
        <Text style={styles.legendTitle}>Destinations</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#C41E3A' }]} />
          <Text style={styles.legendText}>Tétouan</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#1E40AF' }]} />
          <Text style={styles.legendText}>Tanger</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
          <Text style={styles.legendText}>Chefchaouen</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  legend: {
    position: 'absolute',
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  legendTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  legendText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});

