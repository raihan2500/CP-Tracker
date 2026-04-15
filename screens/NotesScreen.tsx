import React, { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Card } from "../components/Card";
import { colors } from "../components/theme";
import { styles } from "./styles";

type Note = { id: string; title: string; content: string; date: string };

export function NotesScreen() {
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
