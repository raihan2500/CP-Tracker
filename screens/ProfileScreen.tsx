import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Svg, { Polyline } from "react-native-svg";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { colors } from "../components/theme";
import { styles } from "./styles";

export function ProfileScreen() {
  const friends = [
    { id: "f1", name: "Aarav", rating: 1890, solved: 1120 },
    { id: "f2", name: "Mia", rating: 1784, solved: 980 },
    { id: "f3", name: "Noah", rating: 1710, solved: 851 },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <View style={styles.rowGap}>
            <View style={styles.avatar}><Feather name="user" color={colors.textPrimary} size={20} /></View>
            <View>
              <Text style={styles.itemTitle}>User</Text>
              <Text style={styles.itemSubtitle}>Candidate Master Aspirant</Text>
            </View>
          </View>
        </Card>

        <Card>
          <SectionTitle title="Connected Handles" />
          <Text style={styles.itemSubtitle}>Codeforces: user_cf</Text>
          <Text style={styles.itemSubtitle}>AtCoder: user_at</Text>
          <Text style={styles.itemSubtitle}>CodeChef: user_cc</Text>
        </Card>

        <Card>
          <SectionTitle title="Stats Summary" />
          <Text style={styles.itemSubtitle}>Global Rank: #842</Text>
          <Text style={styles.itemSubtitle}>Average Weekly Solves: 31</Text>
          <Text style={styles.itemSubtitle}>Max Streak: 36 days</Text>
        </Card>

        <Card>
          <SectionTitle title="Friend Leaderboard" />
          {friends.map((f, idx) => (
            <View key={f.id} style={styles.listItem}>
              <Text style={styles.itemSubtitle}>{idx + 1}. {f.name}</Text>
              <Text style={styles.muted}>{f.rating} • {f.solved} solved</Text>
            </View>
          ))}
        </Card>

        <Card>
          <SectionTitle title="Comparison" />
          <Text style={styles.muted}>User vs Friend (rating trend)</Text>
          <Svg width="100%" height="90" viewBox="0 0 230 90" style={{ marginTop: 8 }}>
            <Polyline fill="none" stroke={colors.primary} strokeWidth="3" points="10,70 45,52 80,60 115,36 150,44 185,20 220,27" />
            <Polyline fill="none" stroke={colors.textSecondary} strokeWidth="2" points="10,76 45,70 80,66 115,51 150,58 185,43 220,39" />
          </Svg>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
