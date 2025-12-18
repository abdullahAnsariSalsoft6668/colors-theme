/**
 * Example Usage of Zero-Boilerplate Theme System
 * 
 * This file demonstrates various ways to use the theme system.
 * Copy these patterns into your components.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, getColorScheme } from './index';

/**
 * Example 1: Basic Component with Themed Styles
 */
export function ThemedCard() {
  return (
    <View style={[styles.card, { 
      backgroundColor: colors.surface,
      borderColor: colors.border,
    }]}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>
        Card Title
      </Text>
      <Text style={[styles.cardBody, { color: colors.textSecondary }]}>
        This card automatically adapts to light and dark mode.
      </Text>
    </View>
  );
}

/**
 * Example 2: Button Component with Multiple States
 */
export function ThemedButton({ 
  title, 
  onPress, 
  variant = 'primary' 
}: { 
  title: string; 
  onPress: () => void; 
  variant?: 'primary' | 'secondary' | 'danger';
}) {
  const getButtonColor = () => {
    switch (variant) {
      case 'primary': return colors.primary;
      case 'secondary': return colors.secondary;
      case 'danger': return colors.error;
      default: return colors.primary;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: getButtonColor() }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

/**
 * Example 3: List Item with Separators
 */
export function ThemedListItem({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <View style={[styles.listItem, { backgroundColor: colors.background }]}>
        <Text style={[styles.listTitle, { color: colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.listSubtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={[styles.separator, { backgroundColor: colors.border }]} />
    </>
  );
}

/**
 * Example 4: Status Badge Component
 */
export function StatusBadge({ 
  status 
}: { 
  status: 'success' | 'error' | 'warning' | 'info' 
}) {
  const getStatusColor = () => {
    switch (status) {
      case 'success': return colors.success;
      case 'error': return colors.error;
      case 'warning': return colors.warning;
      case 'info': return colors.info;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
    </View>
  );
}

/**
 * Example 5: Conditional Styling Based on Theme
 */
export function ThemedHeader() {
  const isDark = getColorScheme() === 'dark';

  return (
    <View style={[
      styles.header,
      { 
        backgroundColor: colors.surface,
        // Add shadow only in light mode
        ...(isDark ? {} : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        })
      }
    ]}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        Header Title
      </Text>
    </View>
  );
}

/**
 * Example 6: Form Input with Theme
 */
export function ThemedInput({ 
  placeholder, 
  value, 
  onChangeText 
}: { 
  placeholder: string; 
  value: string; 
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={[styles.inputContainer, { 
      backgroundColor: colors.surface,
      borderColor: colors.border,
    }]}>
      <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
        {placeholder}
      </Text>
      {/* Note: TextInput would go here with proper props */}
      <Text style={{ color: colors.text }}>{value || 'Input value'}</Text>
    </View>
  );
}

/**
 * Example 7: Complete Screen Layout
 */
export function ThemedScreen() {
  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]}>
      <ThemedHeader />
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Buttons
        </Text>
        <ThemedButton title="Primary" onPress={() => {}} variant="primary" />
        <ThemedButton title="Secondary" onPress={() => {}} variant="secondary" />
        <ThemedButton title="Danger" onPress={() => {}} variant="danger" />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Status Badges
        </Text>
        <View style={styles.badgeRow}>
          <StatusBadge status="success" />
          <StatusBadge status="error" />
          <StatusBadge status="warning" />
          <StatusBadge status="info" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          List Items
        </Text>
        <ThemedListItem 
          title="First Item" 
          subtitle="With subtitle" 
        />
        <ThemedListItem 
          title="Second Item" 
          subtitle="Another subtitle" 
        />
        <ThemedListItem 
          title="Third Item" 
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Cards
        </Text>
        <ThemedCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Card styles
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Button styles
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // List styles
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  listSubtitle: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    marginLeft: 16,
  },

  // Badge styles
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginRight: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // Header styles
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Input styles
  inputContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 4,
  },

  // Screen styles
  screen: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
});
