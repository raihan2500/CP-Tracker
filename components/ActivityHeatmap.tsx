import React from "react";
import { StyleSheet, View } from "react-native";

export function ActivityHeatmap() {
  const values = [2, 5, 1, 0, 3, 4, 2, 1, 5, 2, 0, 3, 4, 1, 2, 5, 2, 3, 1, 4, 5, 2, 1, 3, 4, 1, 5, 2];
  return (
    <View style={styles.heatmapGrid}>
      {values.map((v, i) => (
        <View
          key={`${i}-${v}`}
          style={[
            styles.heatCell,
            {
              backgroundColor: v === 0 ? "#1F2933" : `rgba(88,166,255,${0.2 + v * 0.14})`,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heatmapGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
  heatCell: { width: 18, height: 18, borderRadius: 4 },
});
