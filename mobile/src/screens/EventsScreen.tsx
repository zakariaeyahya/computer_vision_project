import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EVENTS, CITIES, EVENT_TYPES, Event } from '../../mock';
import EventDetailsModal from '../components/events/EventDetailsModal';

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filteredEvents = EVENTS.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "Toutes" || event.city === selectedCity;
    const matchesType = selectedType === "Tous" || event.type === selectedType;
    return matchesSearch && matchesCity && matchesType;
  });

  const getEventIcon = (iconType: string) => {
    switch (iconType) {
      case "music":
        return <MaterialCommunityIcons name="music" size={24} color="#FFFFFF" />;
      case "trophy":
        return <MaterialCommunityIcons name="trophy" size={24} color="#FFFFFF" />;
      case "ticket":
        return <MaterialCommunityIcons name="ticket" size={24} color="#FFFFFF" />;
      case "users":
        return <MaterialCommunityIcons name="account-group" size={24} color="#FFFFFF" />;
      default:
        return <MaterialCommunityIcons name="calendar" size={24} color="#FFFFFF" />;
    }
  };

  const getEventColor = (iconType: string) => {
    switch (iconType) {
      case "music":
        return "#B0CE88";
      case "trophy":
        return "#FF6B6B";
      case "ticket":
        return "#4ECDC4";
      case "users":
        return "#45B7D1";
      default:
        return "#B0CE88";
    }
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const handleAddToTrip = (event: Event) => {
    console.log('handleAddToTrip called for:', event.name);
    console.log('Event details:', event);
    // Ici vous pouvez ajouter la logique pour ajouter l'événement au voyage
    console.log('Ajouter au voyage:', event.name);
    // Vous pouvez ajouter une notification ou une action ici
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Événements</Text>
        <Text style={styles.headerSubtitle}>
          Découvrez les événements à venir au Maroc
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un événement..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersSection}>
        <View>
          <Text style={styles.filterLabel}>Ville</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {CITIES.map((city) => (
              <TouchableOpacity
                key={city}
                style={[
                  styles.filterChip,
                  selectedCity === city && styles.filterChipActive,
                ]}
                onPress={() => setSelectedCity(city)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCity === city && styles.filterChipTextActive,
                  ]}
                >
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.filterLabel}>Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {EVENT_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  selectedType === type && styles.filterChipActive,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedType === type && styles.filterChipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            activeOpacity={0.8}
            onPress={() => handleEventPress(event)}
          >
            <View
              style={[
                styles.eventIconContainer,
                { backgroundColor: getEventColor(event.icon) },
              ]}
            >
              {getEventIcon(event.icon)}
            </View>

            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventName}>{event.name}</Text>
                <View style={styles.eventTypeBadge}>
                  <Text style={styles.eventTypeText}>{event.type}</Text>
                </View>
              </View>

              <Text style={styles.eventDescription}>{event.description}</Text>

              <View style={styles.eventDetails}>
                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons name="map-marker" size={14} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.city}</Text>
                </View>
                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons name="calendar" size={14} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.date}</Text>
                </View>
              </View>

              <View style={styles.eventFooter}>
                <Text style={styles.eventPrice}>{event.price}</Text>
                <TouchableOpacity 
                  style={styles.addToTripButton}
                  onPress={() => handleEventPress(event)}
                >
                  <Text style={styles.addToTripButtonText}>
                    Ajouter au voyage
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredEvents.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Aucun événement trouvé
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Essayez de modifier vos filtres
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modal des détails de l'événement */}
      {selectedEvent && isModalVisible && (
        <EventDetailsModal
          event={selectedEvent}
          visible={isModalVisible}
          onClose={handleCloseModal}
          onAddToTrip={handleAddToTrip}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBEB",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "400",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    fontWeight: "400",
  },
  filtersSection: {
    gap: 16,
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  filterScrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterChipActive: {
    backgroundColor: "#B0CE88",
    borderColor: "#B0CE88",
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eventIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  eventContent: {
    flex: 1,
    gap: 8,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    flex: 1,
  },
  eventTypeBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#B0CE88",
  },
  eventDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  eventDetails: {
    flexDirection: "row",
    gap: 16,
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  eventDetailText: {
    fontSize: 13,
    color: "#6B7280",
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#B0CE88",
  },
  addToTripButton: {
    backgroundColor: "#B0CE88" + "20",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addToTripButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#B0CE88",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#6B7280",
  },
});
