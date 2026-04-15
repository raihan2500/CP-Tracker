import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Card } from "../components/Card";
import { colors } from "../components/theme";
import { styles } from "./styles";

export function ContestsScreen() {
  const [filter, setFilter] = useState("All");
  const [calendarMode, setCalendarMode] = useState(false);
  const filters = ["All", "Codeforces", "AtCoder", "CodeChef"];
  const contests = [
    { id: "1", name: "Codeforces Round #990", platform: "Codeforces", time: "Apr 10, 20:05", duration: "2h 15m" },
    { id: "2", name: "AtCoder Beginner Contest 401", platform: "AtCoder", time: "Apr 11, 17:30", duration: "1h 40m" },
    { id: "3", name: "CodeChef Starters 198", platform: "CodeChef", time: "Apr 12, 20:00", duration: "2h" },
  ];

  const filtered = filter === "All" ? contests : contests.filter((c) => c.platform === filter);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Upcoming Contests</Text>
          <Pressable style={styles.iconBtn} onPress={() => setCalendarMode((s) => !s)}>
            {calendarMode ? <Feather name="sliders" color={colors.textPrimary} size={16} /> : <Feather name="calendar" color={colors.textPrimary} size={16} />}
          </Pressable>
        </View>

        <View style={styles.filterRow}>
          {filters.map((item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[styles.filterTab, filter === item && styles.filterTabActive]}
            >
              <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        {calendarMode && (
          <Card>
            <Text style={styles.sectionTitle}>Calendar View</Text>
            <Text style={styles.muted}>Calendar mode is enabled for quick schedule scanning.</Text>
          </Card>
        )}

        {filtered.map((contest) => (
          <Card key={contest.id}>
            <Text style={styles.itemTitle}>{contest.name}</Text>
            <Text style={styles.itemSubtitle}>{contest.platform}</Text>
            <View style={styles.contestMeta}>
              <Feather name="clock" color={colors.textSecondary} size={14} />
              <Text style={styles.muted}>{contest.time}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.muted}>{contest.duration}</Text>
            </View>
            <Pressable style={styles.primaryBtn}>
              <Feather name="bell" color="#0D1117" size={16} />
              <Text style={styles.primaryBtnText}>Set Reminder</Text>
            </Pressable>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
