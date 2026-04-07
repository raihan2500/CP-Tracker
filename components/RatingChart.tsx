import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Polyline, Rect } from "react-native-svg";
import { colors } from "./theme";

export function RatingChart() {
  const points = "10,80 40,65 70,70 100,48 130,56 160,30 190,42 220,18";
  return (
    <View style={styles.wrap}>
      <Svg width="100%" height="90" viewBox="0 0 230 90">
        <Rect x="0" y="0" width="230" height="90" fill="transparent" />
        <Polyline fill="none" stroke={colors.primary} strokeWidth="3" points={points} />
      </Svg>
      <View style={styles.rowBetween}>
        <Text style={styles.muted}>Last 8 contests</Text>
        <Text style={styles.muted}>Rating trend</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 10 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  muted: { color: colors.textSecondary, fontSize: 12 },
});
