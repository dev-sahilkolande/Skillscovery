export const revisionData = {
  totalCards: "42 Cards Total",
  items: [
    {
      id: "rev-1",
      title: "Raft Consensus Algorithm",
      cardsCount: "14 cards",
      tagColor: "bg-tertiary-container/30 text-tertiary",
      dueText: "Due in 2 hours",
      dueIconColor: "text-tertiary",
      isOverdue: false,
    },
    {
      id: "rev-2",
      title: "Cache Invalidation Patterns",
      cardsCount: "8 cards",
      tagColor: "bg-primary-container/30 text-primary",
      dueText: "Due in 5 hours",
      dueIconColor: "text-primary",
      isOverdue: false,
    },
    {
      id: "rev-3",
      title: "Vector Embeddings & ANN",
      cardsCount: "20 cards",
      tagColor: "bg-error-container/30 text-error",
      dueText: "Overdue by 1 day",
      dueIconColor: "text-error",
      isOverdue: true,
    },
  ],
};

export const scheduleData = {
  totalBlocks: "3 Blocks",
  sessions: [
    {
      id: "sess-1",
      time: "09:00 - 10:30 AM",
      status: "Completed",
      statusColor: "text-tertiary",
      title: "Go Concurrency Deep-Dive",
      description: "Worker pool patterns & select statements",
      stateType: "completed",
    },
    {
      id: "sess-2",
      time: "14:00 - 15:30 PM (NOW)",
      status: "In Progress",
      statusColor: "text-secondary font-semibold",
      title: "Kafka Partitioning & Raft",
      description: "Distributed commit logs and leader election",
      stateType: "current",
    },
    {
      id: "sess-3",
      time: "19:00 - 20:00 PM",
      status: "Upcoming",
      statusColor: "text-outline",
      title: "Paper Review: Dynamo Paper",
      description: "Amazon's highly available key-value store",
      stateType: "upcoming",
    },
  ],
};
