import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProblemCard } from "../components/ProblemCard";
import { SectionTitle } from "../components/SectionTitle";
import { styles } from "./styles";

export function PracticeScreen() {
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
