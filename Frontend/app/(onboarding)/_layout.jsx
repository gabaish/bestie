import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="LandingScreen" options={{ headerShown: false }} />
      <Stack.Screen name="RegistrationScreen" options={{ headerShown: false }} />
      <Stack.Screen name="addDog" options={{ headerShown: false }} />
      <Stack.Screen name="[QuestionnaireScreen]" options={{ headerShown: false }} />
      <Stack.Screen name="RegisterWithEmail" options={{ headerShown: false }} />
    </Stack>
  );
}
