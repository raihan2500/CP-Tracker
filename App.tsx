import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Svg, { Polyline } from "react-native-svg";
import { ActivityHeatmap } from "./components/ActivityHeatmap";
import { Card } from "./components/Card";
import { ProblemCard } from "./components/ProblemCard";
import { RatingChart } from "./components/RatingChart";
import { SectionTitle } from "./components/SectionTitle";
import { StatCard } from "./components/StatCard";
import { colors } from "./components/theme";

type Note = { id: string; title: string; content: string; date: string };

const Tab = createBottomTabNavigator();

function HomeScreen() {
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

function ContestsScreen() {
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

function PracticeScreen() {
  const upsolve = [
    { id: "u1", name: "D. Zero Remainder Array", platform: "Codeforces", rating: 1500, tags: "math", solved: false },
    { id: "u2", name: "E - Knapsack 2", platform: "AtCoder", rating: 1700, tags: "dp", solved: false },
  ];
  const bookmarks = [
    { id: "b1", name: "Chef and Card Game", platform: "CodeChef", rating: 1300, tags: "greedy", solved: true },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title="Upsolve Queue" />
        {upsolve.map((p) => (
          <ProblemCard key={p.id} {...p} />
        ))}

        <SectionTitle title="Bookmarks" />
        {bookmarks.map((p) => (
          <ProblemCard key={p.id} {...p} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function NotesScreen() {
  const [query, setQuery] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "n1",
      title: "Binary Search Checklist",
      content: "Mid overflow, monotonicity proof, edge cases.",
      date: "Apr 7",
    },
    {
      id: "n2",
      title: "DP Patterns",
      content: "State, transition, initialization, optimization.",
      date: "Apr 6",
    },
  ]);

  const visibleNotes = useMemo(
    () =>
      notes.filter(
        (n) =>
          n.title.toLowerCase().includes(query.toLowerCase()) ||
          n.content.toLowerCase().includes(query.toLowerCase())
      ),
    [notes, query]
  );

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return;
    const newNote: Note = {
      id: `${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      date: "Today",
    };
    setNotes((prev) => [newNote, ...prev]);
    setTitle("");
    setContent("");
    setEditorOpen(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.rowGap}>
          <View style={styles.searchWrap}>
            <Feather name="search" color={colors.textSecondary} size={16} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
              placeholder="Search notes"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <Pressable style={styles.primaryBtn} onPress={() => setEditorOpen((s) => !s)}>
            <Feather name="edit-3" color="#0D1117" size={16} />
            <Text style={styles.primaryBtnText}>+ New Note</Text>
          </Pressable>
        </View>

        {editorOpen && (
          <Card>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Note title"
              placeholderTextColor={colors.textSecondary}
              style={styles.titleInput}
            />
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Write your note..."
              placeholderTextColor={colors.textSecondary}
              style={styles.contentInput}
              multiline
            />
            <Pressable style={styles.primaryBtn} onPress={saveNote}>
              <Text style={styles.primaryBtnText}>Save</Text>
            </Pressable>
          </Card>
        )}

        <FlatList
          data={visibleNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 10 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle} numberOfLines={2}>
                {item.content}
              </Text>
              <Text style={styles.muted}>{item.date}</Text>
            </Card>
          )}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

function ProfileScreen() {
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

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.background,
            card: colors.card,
            text: colors.textPrimary,
            border: "#222B36",
            primary: colors.primary,
          },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: {
              backgroundColor: colors.card,
              borderTopColor: "#222B36",
              height: 62,
              paddingTop: 8,
              paddingBottom: 8,
            },
            tabBarIcon: ({ color, size }) => {
              if (route.name === "Home") return <Feather name="home" color={color} size={size} />;
              if (route.name === "Contests") return <Feather name="calendar" color={color} size={size} />;
              if (route.name === "Practice") return <Feather name="code" color={color} size={size} />;
              if (route.name === "Notes") return <Feather name="book-open" color={color} size={size} />;
              return <Feather name="users" color={color} size={size} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Contests" component={ContestsScreen} />
          <Tab.Screen name="Practice" component={PracticeScreen} />
          <Tab.Screen name="Notes" component={NotesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  greeting: { color: colors.textPrimary, fontSize: 28, fontWeight: "700" },
  subtitle: { color: colors.textSecondary, marginTop: 6, marginBottom: 14 },
  title: { color: colors.textPrimary, fontSize: 24, fontWeight: "700" },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: "600" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statCard: { width: "48%" },
  statLabel: { color: colors.textSecondary, fontSize: 13 },
  statValue: { color: colors.textPrimary, marginTop: 10, fontSize: 22, fontWeight: "700" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rowGap: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#26303A",
    padding: 9,
  },
  filterRow: { flexDirection: "row", gap: 8, marginTop: 14, marginBottom: 12, flexWrap: "wrap" },
  filterTab: {
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "#27303A",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterTabActive: { borderColor: colors.primary, backgroundColor: "#1A2633" },
  filterText: { color: colors.textSecondary, fontSize: 13 },
  filterTextActive: { color: colors.primary, fontWeight: "600" },
  contestMeta: { marginTop: 8, marginBottom: 12, flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { color: colors.textSecondary },
  primaryBtn: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  primaryBtnText: { color: "#0D1117", fontWeight: "700" },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#222B36",
  },
  itemTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: "600" },
  itemSubtitle: { color: colors.textSecondary, marginTop: 4 },
  muted: { color: colors.textSecondary, fontSize: 12 },
  heatmapGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
  heatCell: { width: 18, height: 18, borderRadius: 4 },
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
  searchWrap: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#26303A",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: { flex: 1, color: colors.textPrimary, paddingVertical: 10 },
  titleInput: {
    borderWidth: 1,
    borderColor: "#293340",
    borderRadius: 10,
    color: colors.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  contentInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#293340",
    borderRadius: 10,
    color: colors.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#202A35",
    justifyContent: "center",
    alignItems: "center",
  },
});
