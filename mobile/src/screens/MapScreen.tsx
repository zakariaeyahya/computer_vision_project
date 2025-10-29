import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { DESTINATIONS } from '../../mock/destinations';
import { TETOUAN_PLACES } from '../../mock/tetouanPlaces';
import { TANGER_PLACES } from '../../mock/tangerPlaces';
import { CHEFCHAOUEN_PLACES } from '../../mock/chefchaouenPlaces';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Coordonnées GPS des lieux/activités dans chaque ville
const PLACES_COORDINATES: Record<string, { lat: number; lng: number; city: string; icon: string }> = {
  // TÉTOUAN - 5 lieux
  'Médina de Tétouan': { lat: 35.5689, lng: -5.3689, city: 'Tétouan', icon: '🕌' },
  'Musée d\'Art Marocain': { lat: 35.5719, lng: -5.3656, city: 'Tétouan', icon: '🎨' },
  'Place Hassan II': { lat: 35.5734, lng: -5.3619, city: 'Tétouan', icon: '🏛️' },
  'Souk Artisanal': { lat: 35.5699, lng: -5.3640, city: 'Tétouan', icon: '🛍️' },
  'Plage de Martil': { lat: 35.6167, lng: -5.2800, city: 'Tétouan', icon: '🌊' },
  
  // TANGER - 5 lieux
  'Kasbah de Tanger': { lat: 35.7889, lng: -5.8102, city: 'Tanger', icon: '🏰' },
  'Cap Spartel': { lat: 35.7931, lng: -5.9243, city: 'Tanger', icon: '🌊' },
  'Médina de Tanger': { lat: 35.7785, lng: -5.8099, city: 'Tanger', icon: '🕌' },
  'Grottes d\'Hercule': { lat: 35.7926, lng: -5.9384, city: 'Tanger', icon: '🏛️' },
  'Café Hafa': { lat: 35.7836, lng: -5.8232, city: 'Tanger', icon: '☕' },
  
  // CHEFCHAOUEN - 5 lieux
  'Médina Bleue': { lat: 35.1711, lng: -5.2636, city: 'Chefchaouen', icon: '🔵' },
  'Place Outa el Hammam': { lat: 35.1692, lng: -5.2691, city: 'Chefchaouen', icon: '🕌' },
  'Kasbah et Musée': { lat: 35.1698, lng: -5.2684, city: 'Chefchaouen', icon: '🏰' },
  'Cascade d\'Akchour': { lat: 35.1083, lng: -5.1797, city: 'Chefchaouen', icon: '💧' },
  'Mosquée Espagnole': { lat: 35.1750, lng: -5.2630, city: 'Chefchaouen', icon: '⛰️' },
};

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  // Récupérer la couleur de la ville
  const getCityColor = (cityName: string): string => {
    const city = DESTINATIONS.find(d => d.name === cityName);
    return city ? city.colors[0] : '#6B7280';
  };

  // Générer les marqueurs pour tous les lieux
  const generateMarkersHTML = (): string => {
    return Object.entries(PLACES_COORDINATES).map(([placeName, placeData], index) => {
      const { lat, lng, city, icon } = placeData;
      const color = getCityColor(city);
      
      // Récupérer les détails du lieu depuis les mock
      const allPlaces = [...TETOUAN_PLACES, ...TANGER_PLACES, ...CHEFCHAOUEN_PLACES];
      const placeDetails = allPlaces.find(p => p.name === placeName);
      const description = placeDetails?.description || '';
      const duration = placeDetails?.duration || '';
      const price = placeDetails?.price || '';
      
      return `
        var marker${index} = L.circleMarker([${lat}, ${lng}], {
          color: 'white',
          fillColor: '${color}',
          fillOpacity: 0.9,
          radius: 8,
          weight: 2
        }).addTo(map);
        
        marker${index}.bindPopup(\`
          <div style="padding: 12px; min-width: 220px;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 24px; margin-right: 8px;">${icon}</span>
              <h3 style="margin: 0; color: ${color}; font-size: 15px; font-weight: 700;">${placeName}</h3>
            </div>
            <p style="margin: 0 0 8px 0; color: #4B5563; font-size: 12px; line-height: 1.4;">${description}</p>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 11px; color: #6B7280;">
              <span>⏱️ ${duration}</span>
              <span>💰 ${price}</span>
            </div>
            <div style="text-align: center; padding: 6px; background: #F3F4F6; border-radius: 6px; font-size: 11px; color: #6B7280; margin-bottom: 8px;">
              📍 ${city}
            </div>
            <button 
              onclick="window.ReactNativeWebView.postMessage('${city}')"
              style="
                width: 100%;
                background: ${color};
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                font-size: 12px;
              "
            >
              Plus d'infos sur ${city} →
            </button>
          </div>
        \`);
      `;
    }).join('\n');
  };

  const handleMessage = (event: WebViewMessageEvent) => {
    const destinationName = event.nativeEvent.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigation as any).navigate('DestinationDetails', { destinationName });
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
        mixedContentMode="always"
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        cacheEnabled={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
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
        <Text style={styles.legendTitle}>📍 {Object.keys(PLACES_COORDINATES).length} Lieux</Text>
        {DESTINATIONS.map((destination) => (
          <View key={destination.id} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: destination.colors[0] }]} />
            <Text style={styles.legendText}>{destination.name}</Text>
          </View>
        ))}
        <Text style={styles.legendSubtitle}>
          Activités et sites touristiques
        </Text>
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
  legendSubtitle: {
    fontSize: 10,
    fontWeight: '400',
    color: '#9CA3AF',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
