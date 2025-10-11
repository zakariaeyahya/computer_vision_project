import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ItineraryHeaderProps {
  destination: string;
  duration: number;
  budget: number;
}

const ItineraryHeader: React.FC<ItineraryHeaderProps> = ({
  destination,
  duration,
  budget,
}) => {
  const [showChatModal, setShowChatModal] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Bonjour ! Je suis votre assistant de voyage pour ${destination}. Comment puis-je vous aider ?`,
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: message,
    };

    setChatMessages([...chatMessages, userMessage]);
    setMessage('');

    // Simuler une réponse de l'IA après 1 seconde
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        sender: 'ai',
        text: 'Je suis un chatbot en cours de développement. Bientôt, je pourrai vous aider avec vos questions sur votre voyage !',
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <>
      <LinearGradient
        colors={['#C41E3A', '#8B0000']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* AI Chatbot Button */}
        <TouchableOpacity
          style={styles.aiButton}
          onPress={() => setShowChatModal(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.aiButtonEmoji}>🤖</Text>
        </TouchableOpacity>

        <Text style={styles.headerEmoji}>✨</Text>
        <Text style={styles.headerTitle}>Votre itinéraire à {destination}</Text>
        <View style={styles.headerInfo}>
          <View style={styles.headerInfoItem}>
            <Text style={styles.headerInfoIcon}>📅</Text>
            <Text style={styles.headerInfoText}>{duration} jours</Text>
          </View>
          <View style={styles.headerDivider} />
          <View style={styles.headerInfoItem}>
            <Text style={styles.headerInfoIcon}>💰</Text>
            <Text style={styles.headerInfoText}>{budget} dh</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Chat Modal */}
      <Modal
        visible={showChatModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowChatModal(false)}
      >
        <View style={styles.chatContainer}>
          {/* Chat Header */}
          <LinearGradient
            colors={['#2C5F2D', '#97BC62']}
            style={styles.chatHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.chatHeaderContent}>
              <View style={styles.chatHeaderLeft}>
                <Text style={styles.chatHeaderEmoji}>🤖</Text>
                <View>
                  <Text style={styles.chatHeaderTitle}>Assistant IA</Text>
                  <Text style={styles.chatHeaderSubtitle}>En ligne</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowChatModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Chat Messages */}
          <ScrollView style={styles.chatMessages} contentContainerStyle={styles.chatMessagesContent}>
            {chatMessages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageContainer,
                  msg.sender === 'user' ? styles.userMessage : styles.aiMessage,
                ]}
              >
                {msg.sender === 'ai' && (
                  <Text style={styles.messageEmoji}>🤖</Text>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      msg.sender === 'user' ? styles.userText : styles.aiText,
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Chat Input */}
          <View style={styles.chatInputContainer}>
            <TextInput
              style={styles.chatInput}
              placeholder="Posez votre question..."
              placeholderTextColor="#9CA3AF"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              activeOpacity={0.8}
            >
              <Text style={styles.sendButtonText}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 32,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    position: 'relative',
  },
  headerEmoji: {
    fontSize: 50,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 16,
  },
  headerInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerInfoIcon: {
    fontSize: 18,
  },
  headerInfoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  // AI Button
  aiButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  aiButtonEmoji: {
    fontSize: 28,
  },

  // Chat Modal
  chatContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  chatHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  chatHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chatHeaderEmoji: {
    fontSize: 40,
  },
  chatHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chatHeaderSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
  },

  // Chat Messages
  chatMessages: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  chatMessagesContent: {
    padding: 20,
    gap: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  userMessage: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  messageEmoji: {
    fontSize: 24,
    marginTop: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 14,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#2C5F2D',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#1F2937',
  },

  // Chat Input
  chatInputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
    alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2C5F2D',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#2C5F2D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sendButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default ItineraryHeader;

