import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "./theme";

type SectionTitleProps = {
  title: string;
  action?: React.ReactNode;
};

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: "600" },
});
