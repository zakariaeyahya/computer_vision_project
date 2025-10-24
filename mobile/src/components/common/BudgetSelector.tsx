/**
 * BudgetSelector Component
 *
 * A professional, interactive budget selection component with the following features:
 * - Visual progress bar showing budget selection
 * - Increment/decrement buttons for quick adjustments
 * - Direct text input for precise budget entry
 * - Min/Max range display
 * - Smooth animations and haptic feedback
 * - Accessible and user-friendly interface
 *
 * @author Senior Mobile Developer
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  ViewStyle,
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface BudgetSelectorProps {
  /** Current budget value */
  value: number;

  /** Callback when budget changes */
  onChange: (value: number) => void;

  /** Minimum budget allowed (default: 200) */
  minBudget?: number;

  /** Maximum budget allowed (default: 10000) */
  maxBudget?: number;

  /** Step for increment/decrement (default: 100) */
  step?: number;

  /** Currency symbol (default: 'dh') */
  currency?: string;

  /** Optional custom styles */
  style?: ViewStyle;

  /** Theme colors for dark/light mode */
  colors?: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    primary: string;
    border: string;
  };
}


export const BudgetSelector: React.FC<BudgetSelectorProps> = ({
  value,
  onChange,
  minBudget = 200,
  maxBudget = 10000,
  step = 100,
  currency = 'dh',
  style,
  colors,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /**
   * Calculate the percentage of budget relative to min/max range
   */
  const getBudgetPercentage = useCallback((): number => {
    return ((value - minBudget) / (maxBudget - minBudget)) * 100;
  }, [value, minBudget, maxBudget]);

  /**
   * Format budget value for display
   */
  const formatBudget = useCallback((amount: number): string => {
    return Math.round(amount).toLocaleString();
  }, []);

  /**
   * Handle budget increment
   */
  const handleIncrement = useCallback(() => {
    const newValue = Math.min(maxBudget, value + step);
    if (newValue !== value) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onChange(newValue);
      animateButton();
    }
  }, [value, maxBudget, step, onChange]);

  /**
   * Handle budget decrement
   */
  const handleDecrement = useCallback(() => {
    const newValue = Math.max(minBudget, value - step);
    if (newValue !== value) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onChange(newValue);
      animateButton();
    }
  }, [value, minBudget, step, onChange]);

  /**
   * Handle text input change
   */
  const handleTextChange = useCallback((text: string) => {
    // Remove non-numeric characters
    const cleanText = text.replace(/[^0-9]/g, '');

    if (cleanText === '') {
      onChange(minBudget);
      return;
    }

    const numValue = parseInt(cleanText, 10);

    // Clamp value between min and max
    const clampedValue = Math.min(maxBudget, Math.max(minBudget, numValue));
    onChange(clampedValue);
  }, [minBudget, maxBudget, onChange]);

  /**
   * Animate button press
   */
  const animateButton = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim]);

  /**
   * Get budget category label
   */
  const getBudgetCategory = useCallback((): string => {
    const percentage = getBudgetPercentage();
    if (percentage < 25) return 'Économique';
    if (percentage < 50) return 'Modéré';
    if (percentage < 75) return 'Confortable';
    return 'Premium';
  }, [getBudgetPercentage]);

  /**
   * Get category color
   */
  const getCategoryColor = useCallback((): string => {
    const percentage = getBudgetPercentage();
    if (percentage < 25) return '#10B981'; // Green
    if (percentage < 50) return '#2C5F2D'; // Dark Green
    if (percentage < 75) return '#F59E0B'; // Orange
    return '#1A1A1A'; // Dark
  }, [getBudgetPercentage]);

  const percentage = getBudgetPercentage();
  const categoryColor = getCategoryColor();

  // Default colors if not provided
  const defaultColors = {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#1F2937',
    textSecondary: '#6B7280',
    primary: '#2C5F2D',
    border: '#E5E7EB',
  };

  const themeColors = colors || defaultColors;

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: themeColors.surface,
        borderColor: themeColors.border,
      }, 
      style
    ]}>
      {/* Header: Budget Display */}
      <View style={styles.header}>
        <Text style={styles.emoji}>💰</Text>
        <View style={styles.headerContent}>
          <Animated.Text style={[
            styles.budgetValue, 
            { 
              transform: [{ scale: scaleAnim }],
              color: themeColors.text,
            }
          ]}>
            {formatBudget(value)} {currency}
          </Animated.Text>
          <Text style={[styles.categoryLabel, { color: categoryColor }]}>
            {getBudgetCategory()}
          </Text>
        </View>
      </View>

      {/* Budget Controls */}
      <View style={styles.controlsContainer}>
        {/* Decrement Button */}
        <TouchableOpacity
          style={[
            styles.controlButton,
            { 
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            },
            value <= minBudget && styles.controlButtonDisabled,
          ]}
          onPress={handleDecrement}
          disabled={value <= minBudget}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.controlButtonText,
            { color: themeColors.primary },
            value <= minBudget && styles.controlButtonTextDisabled,
          ]}>
            −
          </Text>
        </TouchableOpacity>

        {/* Budget Bar with Input */}
        <View style={styles.barContainer}>
          {/* Progress Bar Background */}
          <View style={[
            styles.barBackground,
            { 
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            }
          ]}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${percentage}%`,
                  backgroundColor: categoryColor,
                },
              ]}
            />
          </View>

          {/* Text Input Overlay */}
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              { color: themeColors.text },
              isFocused && { backgroundColor: themeColors.primary + '10' },
            ]}
            value={formatBudget(value)}
            onChangeText={handleTextChange}
            keyboardType="numeric"
            selectTextOnFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={6}
          />
        </View>

        {/* Increment Button */}
        <TouchableOpacity
          style={[
            styles.controlButton,
            { 
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            },
            value >= maxBudget && styles.controlButtonDisabled,
          ]}
          onPress={handleIncrement}
          disabled={value >= maxBudget}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.controlButtonText,
            { color: themeColors.primary },
            value >= maxBudget && styles.controlButtonTextDisabled,
          ]}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* Range Labels */}
      <View style={styles.rangeContainer}>
        <Text style={[styles.rangeText, { color: themeColors.textSecondary }]}>
          {formatBudget(minBudget)} {currency}
        </Text>
        <Text style={[styles.rangeText, { color: themeColors.textSecondary }]}>
          {formatBudget(maxBudget)} {currency}
        </Text>
      </View>

      {/* Quick Selection Buttons */}
      <View style={[styles.quickSelectContainer, { borderTopColor: themeColors.border }]}>
        <Text style={[styles.quickSelectLabel, { color: themeColors.textSecondary }]}>Choix rapide:</Text>
        <View style={styles.quickSelectButtons}>
          {[500, 1000, 2000, 5000].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.quickSelectButton,
                { 
                  backgroundColor: themeColors.surface,
                  borderColor: themeColors.border,
                },
                value === amount && styles.quickSelectButtonActive,
              ]}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                onChange(amount);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.quickSelectButtonText,
                  { color: themeColors.textSecondary },
                  value === amount && styles.quickSelectButtonTextActive,
                ]}
              >
                {formatBudget(amount)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  emoji: {
    fontSize: 36,
  },
  headerContent: {
    alignItems: 'center',
  },
  budgetValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },

  // Controls
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#2C5F2D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  controlButtonDisabled: {
    opacity: 0.4,
    backgroundColor: '#F9FAFB',
  },
  controlButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  controlButtonTextDisabled: {
    color: '#9CA3AF',
  },

  // Bar
  barContainer: {
    flex: 1,
    position: 'relative',
    height: 48,
  },
  barBackground: {
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
  },
  barFill: {
    height: '100%',
    opacity: 0.25,
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },

  // Range
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rangeText: {
    fontSize: 13,
    fontWeight: '500',
  },

  // Quick Select
  quickSelectContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
  },
  quickSelectLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickSelectButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  quickSelectButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  quickSelectButtonActive: {
    backgroundColor: '#2C5F2D',
    borderColor: '#2C5F2D',
  },
  quickSelectButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  quickSelectButtonTextActive: {
    color: '#FFFFFF',
  },
});

export default BudgetSelector;
