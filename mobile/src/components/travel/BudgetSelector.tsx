import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type BudgetType = 'SMALL' | 'MEDIUM' | 'LARGE';

interface BudgetSelectorProps {
  budget: BudgetType;
  onSelect: (budget: BudgetType) => void;
}

const budgetOptions = [
  { value: 'SMALL' as BudgetType, label: 'Petit', amount: '<500dh', emoji: '💰' },
  { value: 'MEDIUM' as BudgetType, label: 'Moyen', amount: '500-1000dh', emoji: '💰💰' },
  { value: 'LARGE' as BudgetType, label: 'Grand', amount: '>1000dh', emoji: '💰💰💰' },
];

const BudgetSelector: React.FC<BudgetSelectorProps> = ({ budget, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Budget</Text>
      <View style={styles.budgetContainer}>
        {budgetOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.budgetOption,
              budget === option.value && styles.budgetOptionActive,
            ]}
            onPress={() => onSelect(option.value)}
          >
            <Text
              style={[
                styles.budgetEmoji,
                budget === option.value && styles.budgetEmojiActive,
              ]}
            >
              {option.emoji}
            </Text>
            <Text
              style={[
                styles.budgetLabel,
                budget === option.value && styles.budgetLabelActive,
              ]}
            >
              {option.label}
            </Text>
            <Text
              style={[
                styles.budgetAmount,
                budget === option.value && styles.budgetAmountActive,
              ]}
            >
              {option.amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  budgetContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  budgetOption: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  budgetOptionActive: {
    borderColor: '#2C5F2D',
    backgroundColor: '#F0F9FF',
  },
  budgetEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  budgetEmojiActive: {
    transform: [{ scale: 1.1 }],
  },
  budgetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  budgetLabelActive: {
    color: '#2C5F2D',
  },
  budgetAmount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  budgetAmountActive: {
    color: '#2C5F2D',
    fontWeight: '600',
  },
});

export default BudgetSelector;

