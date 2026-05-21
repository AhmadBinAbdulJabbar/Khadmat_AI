import { StatusBar } from "expo-status-bar";
import { type ReactNode, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { OrchestratorResult, runServiceOrchestration } from "./src/agentic";

const EXAMPLES = [
  "Mujhe kal subah G-13 mein AC technician chahiye",
  "Tomorrow evening Clifton mein tutor chahiye",
  "مجھے کل صبح جی تیرہ میں اے سی ٹیکنیشن چاہیے",
];

export default function App() {
  const scrollRef = useRef<ScrollView>(null);
  const [input, setInput] = useState(EXAMPLES[0]);
  const [thinking, setThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [runCount, setRunCount] = useState(1);
  const [lastRequest, setLastRequest] = useState(EXAMPLES[0]);
  const [result, setResult] = useState<OrchestratorResult>(() =>
    runServiceOrchestration(EXAMPLES[0], {
      sessionId: "sess_demo_ac_g13",
      now: new Date("2026-05-20T10:00:00+05:00"),
      bookingRef: "BK-20260520-DEMO",
    }),
  );

  const providers = useMemo(() => result.providers.slice(0, 3), [result.providers]);

  const submit = (value = input) => {
    const request = value.trim();
    if (!request || thinking) return;
    const nextRun = runCount + 1;

    setInput(request);
    setLastRequest(request);
    setErrorMessage("");
    setThinking(true);
    scrollRef.current?.scrollTo({ y: 0, animated: true });

    setTimeout(() => {
      try {
        setResult(
          runServiceOrchestration(request, {
            sessionId: `sess_mobile_${nextRun}`,
            now: new Date(`2026-05-20T10:00:${String(nextRun).padStart(2, "0")}+05:00`),
            bookingRef: `BK-20260520-R${String(nextRun).padStart(2, "0")}`,
          }),
        );
        setRunCount(nextRun);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Could not run the workflow.");
      } finally {
        setThinking(false);
      }
    }, 700);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboard}
        >
          <View style={styles.stickyHeader}>
            <View style={styles.header}>
              <View>
                <Text style={styles.kicker}>GOOGLE ANTIGRAVITY</Text>
                <Text style={styles.title}>Khadmat AI</Text>
              </View>
              <View style={styles.logo}>
                <Text style={styles.logoText}>K</Text>
              </View>
            </View>

            <View style={styles.inputPanel}>
              <Text style={styles.inputLabel}>Service request</Text>
              <View style={styles.inputRow}>
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={() => submit()}
                  placeholder="Urdu, Roman Urdu, or English"
                  placeholderTextColor="#7d8b86"
                  returnKeyType="send"
                  style={styles.input}
                />
                <Pressable
                  accessibilityLabel="Run service workflow"
                  accessibilityRole="button"
                  disabled={thinking}
                  hitSlop={10}
                  onPress={() => submit()}
                  style={({ pressed }) => [
                    styles.sendButton,
                    pressed ? styles.sendButtonPressed : null,
                    thinking ? styles.sendButtonDisabled : null,
                  ]}
                >
                  {thinking ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.sendText}>Go</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.runStatus}>
              <View style={styles.runPulse} />
              <View style={styles.flex}>
                <Text style={styles.runLabel}>{thinking ? "Agents running" : `Run #${runCount} complete`}</Text>
                <Text style={styles.runText} numberOfLines={2}>
                  {lastRequest}
                </Text>
              </View>
              <Text style={styles.runBadge}>{thinking ? "LIVE" : result.booking.booking_ref}</Text>
            </View>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <View style={styles.examples}>
              {EXAMPLES.map((example) => (
                <Pressable key={example} onPress={() => submit(example)} style={styles.exampleChip}>
                  <Text style={styles.exampleText}>{example}</Text>
                </Pressable>
              ))}
            </View>

          <Card>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.sectionLabel}>Service Request</Text>
                <Text style={styles.cardTitle}>{result.intent.service_type}</Text>
              </View>
              <Text style={styles.languageBadge}>{result.intent.language}</Text>
            </View>
            <View style={styles.twoCol}>
              <Metric label="Location" value={result.intent.location} />
              <Metric label="Time" value={result.intent.time} />
            </View>
          </Card>

          <Card highlighted>
            <View style={styles.cardHeader}>
              <View style={styles.flex}>
                <Text style={styles.sectionLabelGreen}>Recommended Provider</Text>
                <Text style={styles.providerTitle}>{result.selected_provider.name}</Text>
              </View>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreLabel}>Score</Text>
                <Text style={styles.score}>{result.selected_provider.score}</Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaPill}>{result.selected_provider.distance}</Text>
              <Text style={styles.metaPill}>{result.selected_provider.rating}/5</Text>
              <Text style={styles.metaPill}>{result.selected_provider.time}</Text>
            </View>
            <Text style={styles.bodyText}>{result.reasoning}</Text>
          </Card>

          <Card>
            <Text style={styles.cardTitle}>Booking Receipt</Text>
            <Receipt label="Reference" value={result.booking.booking_ref} mono />
            <Receipt label="Status" value={result.booking.status} accent />
            <Receipt label="Slot" value={result.booking.scheduled_time} />
            <Receipt label="Price" value={result.booking.price_estimate} />
          </Card>

          <Card>
            <Text style={styles.cardTitle}>Follow-up</Text>
            <Text style={styles.bodyText}>{result.reminder.message}</Text>
            <Text style={styles.bodyText}>{result.follow_up.completion_check}</Text>
          </Card>

          <Card>
            <Text style={styles.cardTitle}>Agent Trace</Text>
            {result.trace_steps.map((step) => (
              <View key={`${step.agent_name}-${step.tool_called}`} style={styles.traceItem}>
                <View style={styles.traceHeader}>
                  <Text style={styles.traceAgent}>{step.agent_name}</Text>
                  <Text style={styles.traceStatus}>{step.status}</Text>
                </View>
                <Text style={styles.traceDetail}>{step.detail}</Text>
                <Text style={styles.traceTool}>{step.tool_called}</Text>
              </View>
            ))}
          </Card>

          <Card>
            <Text style={styles.cardTitle}>Top Options</Text>
            {providers.map((provider, index) => (
              <View key={provider.id} style={styles.providerRow}>
                <View style={styles.flex}>
                  <Text style={styles.providerName}>
                    {index + 1}. {provider.name}
                  </Text>
                  <Text style={styles.providerMeta}>
                    {provider.distance} | {provider.rating}/5 | {provider.time}
                  </Text>
                </View>
                <Text style={styles.providerScore}>{provider.score}</Text>
              </View>
            ))}
          </Card>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Card({ children, highlighted }: { children: ReactNode; highlighted?: boolean }) {
  return <View style={[styles.card, highlighted ? styles.highlightedCard : null]}>{children}</View>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function Receipt({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <View style={styles.receiptRow}>
      <Text style={styles.receiptLabel}>{label}</Text>
      <Text style={[styles.receiptValue, mono ? styles.mono : null, accent ? styles.accentText : null]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef3f1",
  },
  keyboard: {
    flex: 1,
    backgroundColor: "#fbfdfc",
  },
  stickyHeader: {
    backgroundColor: "#fbfdfc",
    borderBottomWidth: 1,
    borderColor: "#cfe4dc",
    elevation: 8,
    shadowColor: "#21362f",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kicker: {
    color: "#1d9e75",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: {
    marginTop: 2,
    color: "#14231f",
    fontSize: 24,
    fontWeight: "800",
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d9e75",
  },
  logoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  inputPanel: {
    padding: 14,
    backgroundColor: "#e9f7f2",
  },
  inputLabel: {
    marginBottom: 8,
    color: "#0f6e56",
    fontSize: 12,
    fontWeight: "800",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#b9d9ce",
    backgroundColor: "white",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    minHeight: 42,
    color: "#17211f",
    fontSize: 14,
    paddingVertical: 0,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d9e75",
  },
  sendButtonPressed: {
    opacity: 0.8,
  },
  sendButtonDisabled: {
    opacity: 0.55,
  },
  sendText: {
    color: "white",
    fontSize: 13,
    fontWeight: "800",
  },
  content: {
    padding: 14,
    paddingBottom: 30,
    gap: 12,
  },
  runStatus: {
    alignItems: "center",
    backgroundColor: "#14231f",
    borderRadius: 18,
    flexDirection: "row",
    gap: 10,
    padding: 12,
  },
  runPulse: {
    backgroundColor: "#5dffbd",
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  runLabel: {
    color: "#d7fff0",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  runText: {
    color: "#b9c7c2",
    fontSize: 12,
    marginTop: 2,
  },
  runBadge: {
    color: "white",
    fontSize: 11,
    fontWeight: "800",
  },
  errorBox: {
    backgroundColor: "#fff0f0",
    borderColor: "#f3c5c5",
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  errorText: {
    color: "#9b1c1c",
    fontSize: 13,
    fontWeight: "700",
  },
  examples: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  exampleChip: {
    borderWidth: 1,
    borderColor: "#dfe7e3",
    backgroundColor: "white",
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  exampleText: {
    color: "#53635e",
    fontSize: 11,
  },
  card: {
    borderWidth: 1,
    borderColor: "#dfe7e3",
    backgroundColor: "white",
    borderRadius: 22,
    padding: 16,
    shadowColor: "#21362f",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  highlightedCard: {
    borderColor: "#b9d9ce",
    backgroundColor: "#f4fbf8",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  sectionLabel: {
    color: "#7d8b86",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  sectionLabelGreen: {
    color: "#1d9e75",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  cardTitle: {
    color: "#14231f",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  providerTitle: {
    color: "#14231f",
    fontSize: 21,
    fontWeight: "800",
  },
  languageBadge: {
    overflow: "hidden",
    borderRadius: 999,
    backgroundColor: "#e9f7f2",
    color: "#0f6e56",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: "800",
  },
  twoCol: {
    flexDirection: "row",
    gap: 10,
  },
  metric: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#f6f8f7",
    padding: 12,
  },
  metricLabel: {
    color: "#7d8b86",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 4,
  },
  metricValue: {
    color: "#14231f",
    fontSize: 14,
    fontWeight: "800",
  },
  flex: {
    flex: 1,
  },
  scoreBox: {
    minWidth: 66,
    borderRadius: 16,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 8,
  },
  scoreLabel: {
    color: "#7d8b86",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  score: {
    color: "#0f6e56",
    fontSize: 22,
    fontWeight: "900",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  metaPill: {
    overflow: "hidden",
    borderRadius: 999,
    backgroundColor: "white",
    color: "#53635e",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: "700",
  },
  bodyText: {
    color: "#34423d",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  receiptRow: {
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderColor: "#edf1ef",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  receiptLabel: {
    color: "#7d8b86",
    fontSize: 13,
  },
  receiptValue: {
    flex: 1,
    color: "#14231f",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
  },
  mono: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  accentText: {
    color: "#0f6e56",
  },
  traceItem: {
    borderRadius: 16,
    backgroundColor: "#f6f8f7",
    padding: 12,
    marginTop: 8,
  },
  traceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 4,
  },
  traceAgent: {
    color: "#14231f",
    fontSize: 13,
    fontWeight: "800",
  },
  traceStatus: {
    overflow: "hidden",
    borderRadius: 999,
    backgroundColor: "#e9f7f2",
    color: "#0f6e56",
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 10,
    fontWeight: "800",
  },
  traceDetail: {
    color: "#53635e",
    fontSize: 12,
    lineHeight: 17,
  },
  traceTool: {
    marginTop: 4,
    color: "#7d8b86",
    fontSize: 10,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  providerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 16,
    backgroundColor: "#f6f8f7",
    padding: 12,
    marginTop: 8,
  },
  providerName: {
    color: "#14231f",
    fontSize: 14,
    fontWeight: "800",
  },
  providerMeta: {
    color: "#53635e",
    fontSize: 12,
    marginTop: 3,
  },
  providerScore: {
    overflow: "hidden",
    borderRadius: 999,
    backgroundColor: "white",
    color: "#0f6e56",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: "900",
  },
});
