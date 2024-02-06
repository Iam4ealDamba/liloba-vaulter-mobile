// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import TabButton from "@/components/button/TabButton";
import colors from "@/utils/colors";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Redirect, Slot, Stack, Tabs } from "expo-router";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// ||||||||||||||||||||||||||||| Auth Layout Component ||||||||||||||||||||||||||||||||||||

const TabsLayout = () => {
  return (
    <GestureHandlerRootView className="" style={styled.container}>
      <BottomSheetModalProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: styled.tabBar,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.tw_secondary,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <FontAwesome name="home" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <FontAwesome name="user-circle" size={22} color={color} />
              ),
            }}
          />
        </Tabs>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
export default TabsLayout;

export const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: "absolute",
    height: 60,
    bottom: 16,
    marginHorizontal: 25,
    borderRadius: 16,
    backgroundColor: colors.tw_text,
  },
});
