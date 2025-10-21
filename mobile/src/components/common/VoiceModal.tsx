import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Dimensions 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface VoiceModalProps {
  visible: boolean;
  onClose: () => void;
  onStart?: () => void;
  onStop?: (duration: number) => void;
}

const { width } = Dimensions.get('window');

export default function VoiceModal({ 
  visible, 
  onClose, 
  onStart, 
  onStop 
}: VoiceModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRecording) {
      onStart?.();
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);

      // Animation pour l'icône
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      return () => {
        clearInterval(intervalId);
        animationValue.stopAnimation();
      };
    } else {
      onStop?.(time);
      setTime(0);
      animationValue.stopAnimation();
    }
  }, [isRecording, time, onStart, onStop, animationValue]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    setIsRecording(!isRecording);
  };

  const handleClose = () => {
    setIsRecording(false);
    setTime(0);
    onClose();
  };

  const spin = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Reconnaissance Vocale</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <TouchableOpacity
              style={[
                styles.micButton,
                isRecording && styles.micButtonActive
              ]}
              onPress={handleStartStop}
              activeOpacity={0.8}
            >
              {isRecording ? (
                <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
                  <View style={styles.spinnerInner} />
                </Animated.View>
              ) : (
                <Feather name="mic" size={32} color="#FFFFFF" />
              )}
            </TouchableOpacity>

            <Text style={[styles.timer, isRecording && styles.timerActive]}>
              {formatTime(time)}
            </Text>

            <View style={styles.visualizer}>
              {[...Array(48)].map((_, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.bar,
                    isRecording && {
                      height: isRecording ? 20 + Math.random() * 80 : 4,
                      backgroundColor: isRecording ? '#10B981' : '#E5E7EB',
                    }
                  ]}
                />
              ))}
            </View>

            <Text style={styles.status}>
              {isRecording ? "Écoute en cours..." : "Appuyez pour commencer"}
            </Text>

            <Text style={styles.instruction}>
              {isRecording 
                ? "Parlez maintenant, votre voix sera convertie en texte"
                : "Appuyez sur le microphone pour commencer l'enregistrement"
              }
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: width * 0.9,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 30,
    alignItems: 'center',
    gap: 20,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  micButtonActive: {
    backgroundColor: '#EF4444',
  },
  spinner: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  spinnerInner: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  timer: {
    fontFamily: 'monospace',
    fontSize: 24,
    color: '#6B7280',
    fontWeight: '600',
  },
  timerActive: {
    color: '#EF4444',
  },
  visualizer: {
    height: 40,
    width: width * 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  bar: {
    width: 3,
    height: 4,
    borderRadius: 1.5,
    backgroundColor: '#E5E7EB',
  },
  status: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },
  instruction: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
