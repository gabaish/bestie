import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* This will automatically pull from the "onboarding" and "tabs" folders */}
      <Stack.Screen name="(onboarding)/onboardingNavigator" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
