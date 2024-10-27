import { Redirect } from 'expo-router';

export default function Index() {
  // Automatically redirect to the onboarding flow when the app starts
  return <Redirect href="/(onboarding)/onboardingNavigator" />;
}
