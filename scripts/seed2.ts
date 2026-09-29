import { db } from '@/db';
import { stoicQuotesTable } from '@/db/schema';

const STOIC_QUOTES = [
  // Morning Quotes
  {
    text: 'At dawn, when you have trouble getting out of bed, tell yourself: I have to go to work—as a human being.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Do not act as if you were going to live ten thousand years. Death hangs over you. While you live, while it is in your power, be good.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The soul becomes dyed with the colour of its thoughts.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Do every act of your life as if it were the last act of your life.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'If it is not right, do not do it; if it is not true, do not say it.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Let no act be done without a purpose, nor otherwise than according to the perfect principles of art.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The universe is transformation; our life is what our thoughts make it.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'A man should be upright, not kept upright.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Do not waste the rest of your life in thoughts about others, when you do not refer your thoughts to some object of common utility.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Whatever the universal nature assigns to any man at any time is for the good of that man at that time.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Do not be disgusted, nor discouraged, nor dissatisfied, if you do not succeed in doing everything according to right principles; but when you have failed, return again.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'First say to yourself what you would be; and then do what you have to do.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'No great thing is created suddenly, any more than a bunch of grapes or a fig.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'It is difficulties that show what men are.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Practice yourself, for heaven’s sake, in little things; and then proceed to greater.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Be not swept off your feet by the vividness of the impression, but say: Impression, wait for me a little.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'The beginning of philosophy is to know the condition of one’s own mind.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Begin at once to live, and count each separate day as a separate life.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'While we are postponing, life speeds by.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'Associate with those who will make a better man of you. Welcome those whom you yourself can improve.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'The whole future lies in uncertainty: live immediately.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'The greatest remedy for anger is delay.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'No one can live happily who has regard to himself alone and transforms everything into a question of his own usefulness.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'It is not that we have a short time to live, but that we waste a lot of it.',
    author: 'Seneca',
    category: 'morning' as const,
  },

  // Evening Quotes
  {
    text: 'Nowhere can man find a quieter or more untroubled retreat than in his own soul.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'How much more grievous are the consequences of anger than the causes of it.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Nothing happens to any man that he is not formed by nature to bear.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The best revenge is not to be like your enemy.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'If you are pained by any external thing, it is not this thing that disturbs you, but your own judgment about it.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The present is the only thing of which a man can be deprived, if it is true that this is the only thing which he has.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'If someone is able to show me that what I think or do is not right, I will happily change.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Look within. Within is the fountain of good, and it will ever bubble up, if you will ever dig.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The things that are in truth very beautiful are the most useful.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Do not seek to have events happen as you wish, but wish them to happen as they do, and all will be well with you.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'It is not events that disturb people, it is their judgments concerning them.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'If you want to be a philosopher, prepare yourself from now on to be laughed at and mocked by many.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'If you have assumed any character beyond your powers, you have both disgraced yourself in that one and neglected the one which you might have fulfilled.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'It is better to die of hunger, exempt from grief and fear, than to live with a troubled spirit amid abundance.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'When you are offended at any man’s fault, turn to yourself and study your own failings.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'It is not he who reviles or strikes you who insults you, but your opinion that these things are insulting.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'Remember that you are an actor in a play, which is as the playwright chooses.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'No man was ever wise by chance.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'Difficulties strengthen the mind, as labour does the body.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'He who is brave is free.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'We should every night call ourselves to an account: What infirmity have I mastered today? What passions opposed? What temptation resisted?',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'Sometimes even to live is an act of courage.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'Life is long if you know how to use it.',
    author: 'Seneca',
    category: 'evening' as const,
  },
];

async function seed() {
  try {
    console.log('Starting additional quote seed...');

    const existingQuotes = await db
      .select({ text: stoicQuotesTable.text })
      .from(stoicQuotesTable);
    const existingTexts = new Set(existingQuotes.map((quote) => quote.text));
    const newQuotes = STOIC_QUOTES.filter(
      (quote) => !existingTexts.has(quote.text)
    );

    if (newQuotes.length === 0) {
      console.log('All additional quotes already exist. Skipping seed.');
      return;
    }

    await db.insert(stoicQuotesTable).values(newQuotes);

    console.log(
      `Successfully seeded ${newQuotes.length} additional Stoic quotes`
    );
    console.log(
      `  - Morning quotes: ${newQuotes.filter((quote) => quote.category === 'morning').length}`
    );
    console.log(
      `  - Evening quotes: ${newQuotes.filter((quote) => quote.category === 'evening').length}`
    );
  } catch (error) {
    console.error('Error seeding additional quotes:', error);
    process.exit(1);
  }
}

seed().then(() => {
  process.exit(0);
});
