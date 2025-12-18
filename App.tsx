/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { colors, getColorScheme } from './src/theme';

function App() {
  const isDarkMode = getColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Zero-Boilerplate Theme Demo
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Automatic Light/Dark Mode • No Context • No Hooks
        </Text>
      </View>

      <View style={styles.colorGrid}>
        <View style={[styles.colorBox, { backgroundColor: colors.primary }]}>
          <Text style={styles.colorLabel}>Primary</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: colors.secondary }]}>
          <Text style={styles.colorLabel}>Secondary</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: colors.success }]}>
          <Text style={styles.colorLabel}>Success</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: colors.error }]}>
          <Text style={styles.colorLabel}>Error</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: colors.warning }]}>
          <Text style={styles.colorLabel}>Warning</Text>
        </View>
        <View style={[styles.colorBox, { backgroundColor: colors.info }]}>
          <Text style={styles.colorLabel}>Info</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Usage Example
        </Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          Simply import colors and use them directly in your styles.
          No providers, no hooks, no boilerplate!
        </Text>
      </View>

      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  colorBox: {
    width: 100,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default App;
