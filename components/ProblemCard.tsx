import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Card } from "./Card";
import { colors } from "./theme";

type ProblemCardProps = {
  name: string;
  platform: string;
  rating: number;
  tags: string;
  solved: boolean;
};

export function ProblemCard({ name, platform, rating, tags, solved }: ProblemCardProps) {
  return (
    <Card>
      <View style={styles.rowBetween}>
        <Text style={styles.itemTitle}>{name}</Text>
        <View style={[styles.statusPill, solved ? styles.statusSolved : styles.statusPending]}>
          <Text style={styles.statusText}>{solved ? "Solved" : "Pending"}</Text>
        </View>
      </View>
      <Text style={styles.itemSubtitle}>{platform}</Text>
      <Text style={styles.muted}>Rating: {rating} • {tags}</Text>
      <View style={styles.actionRow}>
        <Pressable style={styles.secondaryBtn}>
          <Feather name="check-circle" color={colors.success} size={16} />
          <Text style={styles.secondaryBtnText}>Mark as solved</Text>
        </Pressable>
        <Pressable style={styles.secondaryBtn}>
          <Feather name="x" color={colors.danger} size={16} />
          <Text style={styles.secondaryBtnText}>Remove</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  itemTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: "600" },
  itemSubtitle: { color: colors.textSecondary, marginTop: 4 },
  muted: { color: colors.textSecondary, fontSize: 12 },
  statusPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  statusSolved: { backgroundColor: "rgba(63,185,80,0.15)" },
  statusPending: { backgroundColor: "rgba(210,153,34,0.15)" },
  statusText: { color: colors.textPrimary, fontSize: 12, fontWeight: "600" },
  actionRow: { marginTop: 10, flexDirection: "row", gap: 8, flexWrap: "wrap" },
  secondaryBtn: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2A3440",
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  secondaryBtnText: { color: colors.textPrimary, fontSize: 12 },
});
