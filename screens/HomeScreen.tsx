import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { ActivityHeatmap } from "../components/ActivityHeatmap";
import { Card } from "../components/Card";
import { RatingChart } from "../components/RatingChart";
import { SectionTitle } from "../components/SectionTitle";
import { StatCard } from "../components/StatCard";
import { colors } from "../components/theme";
import { styles } from "./styles";

export function HomeScreen() {
  const recentProblems = [
    { id: "1", name: "Two Buttons", platform: "Codeforces", time: "2h ago" },
    { id: "2", name: "Frog 2", platform: "AtCoder", time: "5h ago" },
    { id: "3", name: "MAXHAMDIST", platform: "CodeChef", time: "Yesterday" },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Hello, User</Text>
        <Text style={styles.subtitle}>Keep your CP momentum going.</Text>

        <View style={styles.statsGrid}>
          <StatCard label="Rating" value="1762" icon={<Feather name="award" color={colors.primary} size={16} />} />
          <StatCard label="Solved" value="842" icon={<Feather name="check-circle" color={colors.success} size={16} />} />
          <StatCard label="Streak" value="14 days" icon={<Feather name="activity" color={colors.warning} size={16} />} />
          <StatCard label="Upsolve" value="7" icon={<Feather name="clock" color={colors.textSecondary} size={16} />} />
        </View>

        <Card>
          <SectionTitle title="Activity Heatmap" />
          <ActivityHeatmap />
        </Card>

        <Card>
          <SectionTitle title="Rating Progress" />
          <RatingChart />
        </Card>

        <Card>
          <SectionTitle title="Recent Activity" />
          {recentProblems.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>{item.platform}</Text>
              </View>
              <Text style={styles.muted}>{item.time}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
