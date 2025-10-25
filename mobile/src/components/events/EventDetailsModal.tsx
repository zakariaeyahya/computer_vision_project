import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Event {
  id: string;
  name: string;
  type: string;
  city: string;
  date: string;
  description: string;
  price: string;
  icon: "music" | "trophy" | "ticket" | "users";
}

interface EventDetailsModalProps {
  event: Event | null;
  visible: boolean;
  onClose: () => void;
  onAddToTrip?: (event: Event) => void;
}

export default function EventDetailsModal({
  event,
  visible,
  onClose,
  onAddToTrip,
}: EventDetailsModalProps) {
  if (!event) return null;

  const getEventIcon = (iconType: string) => {
    const iconSize = 32;
    switch (iconType) {
      case "music":
        return <MaterialCommunityIcons name="music" size={iconSize} color="#FFFFFF" />;
      case "trophy":
        return <MaterialCommunityIcons name="trophy" size={iconSize} color="#FFFFFF" />;
      case "ticket":
        return <MaterialCommunityIcons name="ticket" size={iconSize} color="#FFFFFF" />;
      case "users":
        return <MaterialCommunityIcons name="account-group" size={iconSize} color="#FFFFFF" />;
      default:
        return <MaterialCommunityIcons name="calendar" size={iconSize} color="#FFFFFF" />;
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

  const getEventDetails = (event: Event) => {
    const details: { icon: string; label: string; value: string; description?: string }[] = [
      {
        icon: "map-marker",
        label: "Lieu",
        value: event.city,
        description: getCityDescription(event.city),
      },
      {
        icon: "calendar-range",
        label: "Date",
        value: event.date,
        description: "Durée et horaires détaillés disponibles",
      },
      {
        icon: "currency-usd",
        label: "Prix",
        value: event.price,
        description: "Inclut l'accès à toutes les activités",
      },
      {
        icon: "clock-outline",
        label: "Durée",
        value: getEventDuration(event.type),
        description: "Temps estimé pour profiter pleinement",
      },
      {
        icon: "account-group",
        label: "Capacité",
        value: getEventCapacity(event.type),
        description: "Nombre de participants maximum",
      },
      {
        icon: "weather-partly-cloudy",
        label: "Météo recommandée",
        value: getWeatherRecommendation(event.city),
        description: "Conditions idéales pour l'événement",
      },
    ];

    return details;
  };

  const getCityDescription = (city: string) => {
    switch (city) {
      case "Tétouan":
        return "Ville historique avec médina UNESCO, parfaite pour découvrir l'art andalou";
      case "Tanger":
        return "Ville cosmopolite au carrefour de l'Europe et de l'Afrique";
      case "Chefchaouen":
        return "Ville bleue nichée dans les montagnes du Rif, paradis des photographes";
      default:
        return "Destination exceptionnelle au Maroc";
    }
  };

  const getEventDuration = (type: string) => {
    switch (type) {
      case "Culture":
        return "2-4 heures";
      case "Musique":
        return "3-6 heures";
      case "Sport":
        return "1-3 heures";
      case "Nature":
        return "4-8 heures";
      case "Gastronomie":
        return "2-3 heures";
      default:
        return "2-4 heures";
    }
  };

  const getEventCapacity = (type: string) => {
    switch (type) {
      case "Culture":
        return "200-500 personnes";
      case "Musique":
        return "1000-5000 personnes";
      case "Sport":
        return "50-200 personnes";
      case "Nature":
        return "20-50 personnes";
      case "Gastronomie":
        return "30-100 personnes";
      default:
        return "100-300 personnes";
    }
  };

  const getWeatherRecommendation = (city: string) => {
    switch (city) {
      case "Tétouan":
        return "Temps doux, idéal en printemps/automne";
      case "Tanger":
        return "Climat méditerranéen, agréable toute l'année";
      case "Chefchaouen":
        return "Montagne, frais en été, chaud en journée";
      default:
        return "Conditions météo favorables";
    }
  };

  const getEventHighlights = (event: Event) => {
    const highlights: string[] = [];
    
    switch (event.type) {
      case "Culture":
        highlights.push("Découverte du patrimoine UNESCO", "Artisanat traditionnel", "Musique andalouse");
        break;
      case "Musique":
        highlights.push("Artistes locaux et internationaux", "Ambiance festive", "Découverte musicale");
        break;
      case "Sport":
        highlights.push("Vue panoramique exceptionnelle", "Défi sportif", "Esprit d'équipe");
        break;
      case "Nature":
        highlights.push("Paysages à couper le souffle", "Randonnée guidée", "Photographie nature");
        break;
      case "Gastronomie":
        highlights.push("Cuisine authentique", "Produits locaux", "Découverte culinaire");
        break;
    }
    
    return highlights;
  };

  const handleAddToTrip = () => {
    if (onAddToTrip) {
      onAddToTrip(event);
    }
  };

  const eventDetails = getEventDetails(event);
  const highlights = getEventHighlights(event);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />

        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#000000" />
          </TouchableOpacity>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header avec icône et type */}

            <View style={styles.headerSection}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: getEventColor(event.icon) },
                ]}
              >
                {getEventIcon(event.icon)}
              </View>

              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{event.type}</Text>
              </View>

              <Text style={styles.title}>{event.name}</Text>
              <Text style={styles.description}>{event.description}</Text>
            </View>

            {/* Détails de l'événement */}
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Informations pratiques</Text>
              <View style={styles.detailsContainer}>
                {eventDetails.map((detail, index) => (
                  <View key={index} style={styles.detailRow}>
                    <View style={styles.detailIconContainer}>
                      <MaterialCommunityIcons 
                        name={detail.icon as string} 
                        size={20} 
                        color="#B0CE88" 
                      />
                    </View>
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>{detail.label}</Text>
                      <Text style={styles.detailValue}>{detail.value}</Text>
                      <Text style={styles.detailDescription}>{detail.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Points forts */}
            <View style={styles.highlightsSection}>
              <Text style={styles.sectionTitle}>Points forts</Text>
              <View style={styles.highlightsContainer}>
                {highlights.map((highlight, index) => (
                  <View key={index} style={styles.highlightItem}>
                    <MaterialCommunityIcons 
                      name="check-circle" 
                      size={16} 
                      color="#B0CE88" 
                    />
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Recommandations */}
            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Recommandations</Text>
              <View style={styles.recommendationsContainer}>
                <View style={styles.recommendationItem}>
                  <MaterialCommunityIcons name="clock-alert" size={20} color="#FF6B6B" />
                  <Text style={styles.recommendationText}>
                    Arrivez 30 minutes avant le début
                  </Text>
                </View>
                <View style={styles.recommendationItem}>
                  <MaterialCommunityIcons name="camera" size={20} color="#4ECDC4" />
                  <Text style={styles.recommendationText}>
                    Appareil photo recommandé
                  </Text>
                </View>
                <View style={styles.recommendationItem}>
                  <MaterialCommunityIcons name="weather-sunny" size={20} color="#FFA726" />
                  <Text style={styles.recommendationText}>
                    Protection solaire conseillée
                  </Text>
                </View>
              </View>
            </View>

            {/* Bouton d'action */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleAddToTrip}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Ajouter au voyage</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFFBEB",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "90%",
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 16,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  typeBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  typeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#B0CE88",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  detailIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#B0CE88" + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  detailDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  highlightsSection: {
    marginBottom: 24,
  },
  highlightsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  highlightText: {
    fontSize: 15,
    color: "#000000",
    flex: 1,
  },
  recommendationsSection: {
    marginBottom: 24,
  },
  recommendationsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  recommendationText: {
    fontSize: 15,
    color: "#000000",
    flex: 1,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B0CE88",
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    shadowColor: "#B0CE88",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
