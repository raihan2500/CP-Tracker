import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "./Card";
import { colors } from "./theme";

type StatCardProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card style={styles.statCard}>
      <View style={styles.rowBetween}>
        <Text style={styles.statLabel}>{label}</Text>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  statCard: { width: "48%" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statLabel: { color: colors.textSecondary, fontSize: 13 },
  statValue: { color: colors.textPrimary, marginTop: 10, fontSize: 22, fontWeight: "700" },
});
