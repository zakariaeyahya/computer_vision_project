import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import VoiceModal from '../common/VoiceModal';

interface ItineraryHeaderProps {
  destination: string;
  duration: number;
  budget: number;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'image' | 'audio' | 'document';
  attachment?: {
    uri: string;
    name?: string;
    size?: number;
    type?: string;
  };
}

export default function ItineraryHeader({ destination, duration, budget }: ItineraryHeaderProps) {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Bonjour ! Je suis votre assistant IA pour votre voyage à ${destination}. Comment puis-je vous aider ?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
        timestamp: new Date(),
        type: 'text',
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Simuler une réponse IA
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "Merci pour votre message ! Je vais vous aider à personnaliser votre itinéraire.",
          isUser: false,
          timestamp: new Date(),
          type: 'text',
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          text: "Image partagée",
          isUser: true,
          timestamp: new Date(),
          type: 'image',
          attachment: {
            uri: result.assets[0].uri,
            name: result.assets[0].fileName || 'image.jpg',
            size: result.assets[0].fileSize,
            type: result.assets[0].type,
          },
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sélectionner une image');
    }
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'text/plain'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          text: "Document partagé",
          isUser: true,
          timestamp: new Date(),
          type: 'document',
          attachment: {
            uri: result.assets[0].uri,
            name: result.assets[0].name,
            size: result.assets[0].size,
            type: result.assets[0].mimeType,
          },
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sélectionner un document');
    }
  };


  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <>
      {/* Header Principal */}
      <View style={styles.header}>
        {/* Informations du voyage */}
        <View style={styles.tripInfo}>
          <Text style={styles.destination}>{destination}</Text>
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="calendar-range" size={16} color="#1A1A1A" />
              <Text style={styles.metaText}>{duration} jour{duration > 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="currency-eur" size={16} color="#1A1A1A" />
              <Text style={styles.metaText}>{formatBudget(budget)}</Text>
            </View>
          </View>
        </View>

        {/* Bouton Chat IA */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => setIsChatVisible(true)}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="robot" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Chat Modal */}
      <Modal
        visible={isChatVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsChatVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.chatContainer}>
            {/* Header du Chat */}
            <View style={styles.chatHeader}>
              <View style={styles.chatHeaderInfo}>
                <MaterialCommunityIcons name="robot" size={24} color="#1A1A1A" />
                <Text style={styles.chatTitle}>Assistant IA</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsChatVisible(false)}
              >
                <MaterialCommunityIcons name="close" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            {/* Messages */}
            <ScrollView 
              style={styles.messagesContainer}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageContainer,
                    message.isUser ? styles.userMessage : styles.aiMessage,
                  ]}
                >
                  {/* Message Content */}
                  {message.type === 'image' && message.attachment && (
                    <View style={styles.attachmentContainer}>
                      <Image 
                        source={{ uri: message.attachment.uri }} 
                        style={styles.attachmentImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.attachmentName}>{message.attachment.name}</Text>
                    </View>
                  )}
                  
                  {message.type === 'document' && message.attachment && (
                    <View style={styles.attachmentContainer}>
                      <View style={styles.documentIcon}>
                        <MaterialCommunityIcons name="file-document" size={24} color="#1A1A1A" />
                      </View>
                      <View style={styles.documentInfo}>
                        <Text style={styles.documentName}>{message.attachment.name}</Text>
                        <Text style={styles.documentSize}>
                          {message.attachment.size ? `${(message.attachment.size / 1024).toFixed(1)} KB` : 'Taille inconnue'}
                        </Text>
                      </View>
                    </View>
                  )}
                  
                  {message.type === 'audio' && message.attachment && (
                    <View style={styles.attachmentContainer}>
                      <View style={styles.audioIcon}>
                        <MaterialCommunityIcons name="play" size={24} color="#1A1A1A" />
                      </View>
                      <View style={styles.audioInfo}>
                        <Text style={styles.audioName}>Message vocal</Text>
                        <Text style={styles.audioDuration}>Appuyez pour écouter</Text>
                      </View>
                    </View>
                  )}
                  
                  <Text style={[
                    styles.messageText,
                    message.isUser ? styles.userMessageText : styles.aiMessageText,
                  ]}>
                    {message.text}
                  </Text>
                  
                  <Text style={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* Input */}
            <View style={styles.inputContainer}>
              {/* Media Buttons - Left side */}
              <View style={styles.mediaButtonsContainer}>
                <TouchableOpacity 
                  style={styles.mediaButton}
                  onPress={handlePickImage}
                >
                  <MaterialCommunityIcons name="image" size={20} color="#1A1A1A" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.mediaButton}
                  onPress={handlePickDocument}
                >
                  <MaterialCommunityIcons name="file-document" size={20} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
              
              <TextInput
                style={styles.textInput}
                placeholder="Posez votre question..."
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
              
              {/* Right side buttons - Audio and Send */}
              <View style={styles.rightButtonsContainer}>
                <TouchableOpacity 
                  style={styles.microphoneButton}
                  onPress={() => setVoiceModalVisible(true)}
                >
                  <Feather name="mic" size={18} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSendMessage}
                  disabled={!inputText.trim()}
                >
                  <MaterialCommunityIcons 
                    name="send" 
                    size={20} 
                    color={inputText.trim() ? "#FFFFFF" : "#9CA3AF"} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Voice Modal */}
      <VoiceModal
        visible={voiceModalVisible}
        onClose={() => setVoiceModalVisible(false)}
        onStart={() => console.log('Voice recording started')}
        onStop={(duration) => console.log(`Voice recording stopped after ${duration} seconds`)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tripInfo: {
    flex: 1,
  },
  destination: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  chatButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: '#FFFBEB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
    overflow: 'hidden',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#1A1A1A',
  },
  messageTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Media buttons styles
  mediaButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  mediaButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  microphoneButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  // Attachment styles
  attachmentContainer: {
    marginBottom: 8,
  },
  attachmentImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 4,
  },
  attachmentName: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  documentSize: {
    fontSize: 12,
    color: '#6B7280',
  },
  audioIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  audioInfo: {
    flex: 1,
  },
  audioName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  audioDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
});