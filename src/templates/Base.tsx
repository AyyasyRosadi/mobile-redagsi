import { View, Platform, ScrollView } from "react-native";
import React, { ReactNode } from "react";

type BaseAttributes = {
  navigateTo?: string
  title?: string
  scroll?: boolean
  children?: React.ReactNode
}

const Base = ({ children, scroll }: BaseAttributes):ReactNode => {
  return (
    <View>
      {scroll ? (
        <ScrollView
          className={`${Platform.OS === "android" ? "mt-0" : "mt-0"} bg-white`}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          className={`${Platform.OS === "android" ? "mt-0" : "mt-0"} bg-white`}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default Base;
