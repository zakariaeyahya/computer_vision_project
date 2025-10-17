/**
 * OnboardingScreen - Écrans d'introduction de l'application
 * 3 slides avant d'accéder à l'app principale
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { onboardingSlides, type OnboardingSlide } from '../../mock/onboardingSlides';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      // Dernier slide, aller vers l'app principale
      navigation.replace('MainTabs');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
    }
  };

  const handleSkip = () => {
    navigation.replace('MainTabs');
  };

  const getContentStyle = (position?: 'top' | 'center' | 'bottom') => {
    switch (position) {
      case 'top':
        return { justifyContent: 'flex-start' as const, paddingTop: 100 };
      case 'bottom':
        return { justifyContent: 'flex-end' as const, paddingBottom: 150 };
      default:
        return { justifyContent: 'center' as const };
    }
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <ImageBackground
      source={item.backgroundImage}
      style={styles.slide}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: item.backgroundColor }]}>
        {/* Image/Emoji */}
        {item.image !== '' && (
          <View style={styles.imageContainer}>
            <Text style={styles.emoji}>{item.image}</Text>
          </View>
        )}

        {/* Contenu */}
        <View style={[styles.content, getContentStyle(item.contentPosition)]}>
          <Text style={[styles.title, { color: item.textColor || '#000000' }]}>{item.title}</Text>
          <Text style={[styles.description, { color: item.textColor || '#000000' }]}>{item.description}</Text>
        </View>

        {/* Indicateurs */}
        <View style={styles.pagination}>
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Boutons */}
        <View style={styles.buttonsContainer}>
          {/* Bouton Retour */}
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}

          {/* Bouton Skip (sauf sur le dernier slide) */}
          {currentIndex < onboardingSlides.length - 1 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* Bouton Next/Get Started */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex === onboardingSlides.length - 1 ? 'Get Started' : 'Next →'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
    opacity: 0.9,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 120,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 30,
    backgroundColor: '#FFFFFF',
  },
  inactiveDot: {
    width: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  skipButton: {
    flex: 1,
    marginLeft: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  nextButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    marginLeft: 'auto',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
});

export default OnboardingScreen;

