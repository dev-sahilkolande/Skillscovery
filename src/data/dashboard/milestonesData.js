export const telemetryData = {
  tabs: ["Day", "Week", "Month"],
  activeTab: "Week",
  dailyVelocity: [
    { day: "09:00", hours: "1.5h", height: "45%", peak: false },
    { day: "12:00", hours: "1.0h", height: "30%", peak: false },
    { day: "15:00", hours: "2.0h", height: "70%", peak: false, isHighlighted: true },
    { day: "18:00", hours: "2.5h", height: "95%", peak: true },
    { day: "21:00", hours: "1.2h", height: "38%", peak: false },
  ],
  weeklyVelocity: [
    { day: "Mon", hours: "2.8h", height: "52%", peak: false },
    { day: "Tue", hours: "3.4h", height: "65%", peak: false },
    { day: "Wed", hours: "2.1h", height: "42%", peak: false },
    { day: "Thu", hours: "4.5h", height: "95%", peak: true },
    { day: "Fri", hours: "3.6h", height: "70%", peak: false },
    { day: "Sat", hours: "4.1h", height: "80%", peak: false, isHighlighted: true },
    { day: "Sun", hours: "", height: "20%", peak: false, isDisabled: true },
  ],
  monthlyVelocity: [
    { day: "Wk 1", hours: "22.4h", height: "68%", peak: false },
    { day: "Wk 2", hours: "31.5h", height: "95%", peak: true },
    { day: "Wk 3", hours: "26.8h", height: "78%", peak: false, isHighlighted: true },
    { day: "Wk 4", hours: "18.2h", height: "52%", peak: false },
  ],
  categoryBreakdown: [
    {
      name: "Coding",
      hours: "14.2h",
      textColor: "text-primary",
      dotColor: "bg-primary",
    },
    {
      name: "Sys Design",
      hours: "8.4h",
      textColor: "text-secondary",
      dotColor: "bg-secondary",
    },
    {
      name: "AI Research",
      hours: "6.1h",
      textColor: "text-tertiary",
      dotColor: "bg-tertiary",
    },
    {
      name: "Audio/Cast",
      hours: "4.0h",
      textColor: "text-outline",
      dotColor: "bg-outline",
    },
  ],
};

export const roadmapData = {
  title: "Full-Stack Distributed Architectures",
  milestones: [
    {
      id: "01",
      nodeNumber: "Node 01 · Completed",
      status: "completed",
      score: "Passed with 98%",
      title: "Microservices with Go & Domain-Driven Design",
      description:
        "Gained deep fluency in clean architecture, context cancellation, and thread-safe sync primitives.",
    },
    {
      id: "02",
      nodeNumber: "Node 02 · In Progress (72%)",
      status: "in-progress",
      badge: "Active Focus",
      progress: 72,
      title: "Event-Driven Streaming with Apache Kafka",
      nextModule: "Next: Consumer Group Rebalancing",
    },
    {
      id: "03",
      nodeNumber: "Node 03 · Next Up",
      status: "next-up",
      estTime: "Est. 12 hrs",
      title: "Kubernetes Operators & Cloud Orchestration",
      description:
        "Automating stateful workloads and custom resource definitions.",
    },
    {
      id: "04",
      nodeNumber: "Node 04 · Locked",
      status: "locked",
      title: "High-Performance gRPC & Protobuf Protocols",
    },
  ],
};
