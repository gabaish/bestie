import { Stack } from 'expo-router';
import React from 'react';
import { UserProvider } from './contexts/UserContext';


export default function Layout() {
  return (
    <UserProvider>
    <Stack>
      {/* This will automatically pull from the "onboarding" and "tabs" folders */}
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="conversation/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="friend/[friendProfile]" options={{ headerShown: false }} />
    </Stack>
    </UserProvider>
  );
}
