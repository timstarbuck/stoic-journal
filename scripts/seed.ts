import { db } from "@/db";
import { stoicQuotesTable } from "@/db/schema";

const STOIC_QUOTES = [
  // Morning Quotes
  {
    text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "Earn your success based on service, not on sales.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "Every morning we have two choices: continue sleeping with our dreams, or wake up and pursue our goals.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "When you arise in the morning, think of what a precious privilege it is to be alive — to breathe, to think, to enjoy, to love.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "It is impossible for a man to learn what he thinks he already knows.",
    author: "Epictetus",
    category: "morning" as const,
  },
  {
    text: "No one is free who is not master of himself.",
    author: "Epictetus",
    category: "morning" as const,
  },
  {
    text: "Don't explain your philosophy. Embody it.",
    author: "Epictetus",
    category: "morning" as const,
  },
  {
    text: "Make the best use of what is in your power, and take the rest as it happens.",
    author: "Epictetus",
    category: "morning" as const,
  },
  {
    text: "Wealth consists not in having great possessions, but in having few wants and a contented mind.",
    author: "Epictetus",
    category: "morning" as const,
  },
  {
    text: "If you wish to approve of yourself, work towards improvement.",
    author: "Epictetus",
    category: "morning" as const,
  },
  {
    text: "Begin each day by thinking of what principles you will need to conduct yourself well.",
    author: "Epictetus",
    category: "morning" as const,
  },
  {
    text: "You don't have to see the whole staircase, just take the first step.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "Remember that you have to live only this — not your whole life. Just mind the moment.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "Confine yourself to the present.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "Nothing prevents us from saying the truth.",
    author: "Marcus Aurelius",
    category: "morning" as const,
  },
  {
    text: "You are not harmed by being in someone's debt, but by unjustly placing yourself in their debt.",
    author: "Seneca",
    category: "morning" as const,
  },
  {
    text: "We suffer more from imagination than from reality.",
    author: "Seneca",
    category: "morning" as const,
  },
  {
    text: "True happiness is to enjoy your present possessions.",
    author: "Seneca",
    category: "morning" as const,
  },

  // Evening Quotes
  {
    text: "You have survived every bad day so far. You can survive this one too.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "He who fears death will never act boldly.",
    author: "Seneca",
    category: "evening" as const,
  },
  {
    text: "It is not the man who has too little, but the man who craves more, that is poor.",
    author: "Seneca",
    category: "evening" as const,
  },
  {
    text: "Is it not possible that some lucky chance might befall you? Yes; but you must not rely or build your expectation upon it.",
    author: "Seneca",
    category: "evening" as const,
  },
  {
    text: "I will keep allowing life to change me as it will, and I will allow myself to change life until the last moment.",
    author: "Philip Roth (Stoic principle)",
    category: "evening" as const,
  },
  {
    text: "Everything is only for a day, both that which remembers and that which is remembered.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "Review your day. Look at what you've accomplished. Surely you can be proud of at least one thing.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "It is the power of the mind to be unconquerable.",
    author: "Seneca",
    category: "evening" as const,
  },
  {
    text: "Death smiles at us all, but a man can smile back.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "Malice, arrogance, the desire for revenge - these are thoughts that wound us.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb (Stoic principle)",
    category: "evening" as const,
  },
  {
    text: "You cannot control the results, only your actions.",
    author: "Epictetus",
    category: "evening" as const,
  },
  {
    text: "Does anything bad happen to good people? Only if they give up.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "Think of yourself as dead. You have lived your life. Now take what's left and live it properly.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "Often injustice lies in what you aren't doing, not only in what you are doing.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "You were born for a purpose. Find it and live it fully.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "Remember: you are dying. Make this moment worthwhile.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "How much trouble he avoids who does not look to what his neighbor says or does, but only to what he himself is doing.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
  {
    text: "Waste no time arguing what a good man should be. Be one.",
    author: "Marcus Aurelius",
    category: "evening" as const,
  },
];

async function seed() {
  try {

    
    console.log("Starting database seed...");

    // Check if quotes already exist
    const existingQuotes = await db
      .select()
      .from(stoicQuotesTable)
      .limit(1);

    if (existingQuotes.length > 0) {
      console.log("Quotes already exist. Skipping seed.");
      return;
    }

    // Insert all quotes
    await db.insert(stoicQuotesTable).values(STOIC_QUOTES);

    console.log(`✓ Successfully seeded ${STOIC_QUOTES.length} Stoic quotes`);
    console.log(
      `  - Morning quotes: ${STOIC_QUOTES.filter((q) => q.category === "morning").length}`
    );
    console.log(
      `  - Evening quotes: ${STOIC_QUOTES.filter((q) => q.category === "evening").length}`
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed().then(() => {
  process.exit(0);
});
