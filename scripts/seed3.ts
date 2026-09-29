import { db } from '@/db';
import { stoicQuotesTable } from '@/db/schema';

const STOIC_QUOTES = [
  // Morning Quotes
  {
    text: 'Begin the morning by saying to yourself: I shall meet with the busybody, the ungrateful, arrogant, deceitful, envious, unsocial.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'They are such by reason of their ignorance of what is good and evil.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'I can neither be injured by any of them, for no man will involve me in what is degrading.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'We were born to work together, like feet, like hands, like eyelids, like the rows of the upper and lower teeth.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'To be angry with another person is to be overcome by them.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Whatever anyone does or says, I must be good, just as if the gold, or the emerald, or the purple were always saying this.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The present is the only thing of which a man can be deprived, if it is true that this is the only thing which he has.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Do not act as if you had ten thousand years to throw away.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Let opinion be taken away, and no man will think himself wronged.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'A man’s worth is no greater than the worth of his ambitions.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The things which are not good for the hive are not good for the bee.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Do not suppose that what is hard for you to master is humanly impossible.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'How ridiculous and how strange to be surprised at anything which happens in life.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The mind adapts and converts to its own purposes the obstacle to our acting.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Take care that you are not made into a Caesar, that you are not dyed with this dye.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The time of human life is a point, and the substance of it is in a flux.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The universe is change; our life is what our thoughts make it.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Everywhere and at all times it is in your power piously to acquiesce in your present condition.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Do not be whirled around, but in every movement have respect to justice.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'If you do the work that is before you, following right reason seriously, vigorously, calmly, without allowing anything else to distract you, you will live happy.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Look within; within is the fountain of good, and it will ever bubble up, if you will ever dig.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Do not have such an opinion of things as he who does you wrong has of you.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The best way of avenging thyself is not to become like the wrong-doer.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Let each thing that you would do, say, or intend be like that of a dying person.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'He who follows reason in all things is both tranquil and active at the same time, and also cheerful and collected.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Whatever is in any way beautiful has its source of beauty in itself.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Be like the promontory against which the waves continually break; but it stands firm and tames the fury of the water around it.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Do not suppose that you are hurt, and your complaint will cease.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'The happiness of your life depends upon the quality of your thoughts.',
    author: 'Marcus Aurelius',
    category: 'morning' as const,
  },
  {
    text: 'Some things are in our control and others not.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'If you take what is not your own, you will lose what is your own.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Do not demand that things happen as you wish, but wish that they happen as they do happen, and you will go on well.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Remember that you are an actor in a play, which is as the playwright chooses; if short, then in a short one; if long, then in a long one.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'If you want to make progress, be content to be thought foolish and stupid with regard to external things.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'It is impossible to begin to learn that which one thinks one already knows.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Know, first, who you are, and then adorn yourself accordingly.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'If you want to be a good person, start by believing that you are a bad one.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Every habit and faculty is preserved and increased by its corresponding actions.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'First learn the meaning of what you say, and then speak.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'It is not enough to be hit or insulted; you must believe that you are harmed.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Do not pride yourself on any excellence that is not your own.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'If you wish to be a reader, read; if a writer, write.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'The essence of good and evil consists in the condition of the will.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'You may be unconquerable, if you enter into no combat in which it is not in your own power to conquer.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'It is the nature of the wise to resist pleasures, but the foolish to be a slave to them.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'If you would be good, first believe that you are bad.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'No great thing is created suddenly, any more than a bunch of grapes or a fig.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Difficulties are things that show what men are.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'It is better to die of hunger, exempt from grief and fear, than to live with a troubled spirit amid abundance.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'If you wish to be a writer, write.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Wealth consists not in having great possessions, but in having few wants.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'It is not events that disturb people, it is their judgments concerning them.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'If you want to improve, be content to be thought foolish and stupid.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'Practice yourself in little things; and thence proceed to greater.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'The first and most important field of philosophy is the practical application of principles.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'If you wish to be good, begin by being.',
    author: 'Epictetus',
    category: 'morning' as const,
  },
  {
    text: 'The first thing to learn is that all things are full of change.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'It is not that we have a short time to live, but that we waste much of it.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'As long as you live, keep learning how to live.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'He who is brave is free.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'Associate with people who are likely to improve you.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'It is the power of the mind to be unconquerable.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'Begin at once to live, and count each separate day as a separate life.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'He who fears death will never do anything worthy of a living man.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'No man was ever wise by chance.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'A happy life is one which is in accordance with its own nature.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'The greatest remedy for anger is delay.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'A good mind is a lord of a kingdom.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'Life is long, if you know how to use it.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'While we are postponing, life speeds by.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'It is not the man who has too little, but the man who craves more, that is poor.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'Difficulties strengthen the mind, as labor does the body.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'We suffer more often in imagination than in reality.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'The whole future lies in uncertainty: live immediately.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'It is a rough road that leads to the heights of greatness.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'Most powerful is he who has himself in his own power.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'No man is more unhappy than he who never faces adversity.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'He who does not prevent a crime when he can, encourages it.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'One of the most beautiful qualities of true friendship is to understand and to be understood.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'The greatest wealth is a poverty of desires.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'A gift consists not in what is done or given, but in the intention of the giver.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'The time will come when diligent research over long periods will bring to light things which now lie hidden.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'We are waves of the same sea, leaves of the same tree, flowers of the same garden.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'No one can be good for long who does not find pleasure in goodness.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'What progress, you ask, have I made? I have begun to be a friend to myself.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'A man who suffers before it is necessary, suffers more than is necessary.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'The best ideas are common property.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'It is not the place that matters, but the state of mind.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'You must live for another if you wish to live for yourself.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'No man is crushed by misfortune unless he has first been deceived by prosperity.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'He who has great power should use it lightly.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'Every new beginning comes from some other beginning’s end.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'It is the mind that makes rich.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'To be everywhere is to be nowhere.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'The day which we fear as our last is but the birthday of eternity.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'All cruelty springs from weakness.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'It is a great thing to know the season for speech and the season for silence.',
    author: 'Seneca',
    category: 'morning' as const,
  },
  {
    text: 'No man enjoys the true taste of life but he who is ready and willing to quit it.',
    author: 'Seneca',
    category: 'morning' as const,
  },

  // Evening Quotes
  {
    text: 'When you arise in the morning, think of what a precious privilege it is to be alive.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The best revenge is to be unlike him who performed the injury.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'It is not death that a man should fear, but he should fear never beginning to live.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'How much time he saves who does not look to see what his neighbor says or does.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The soul is dyed by the thoughts it lives with.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Nothing is more wretched than a man who traverses everything and explores the things beneath the earth, but lacks the power to look into himself.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'It is not the things themselves that trouble us, but our opinions about them.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The universe is change; life is opinion.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Soon you will have forgotten all things; soon all things will have forgotten you.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The first rule is to keep an untroubled spirit. The second is to look things in the face and know them for what they are.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The cucumber is bitter? Then throw it away. There are briars in the path? Then turn aside.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Do not disturb yourself by imagining your whole life at once.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The only wealth which you will keep forever is the wealth you have given away.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Whatever happens to you has been waiting to happen since the beginning of time.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The universe is made up of change, and life itself is but what you deem it.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'When you wake up in the morning, tell yourself that the people you meet will be meddling, ungrateful, arrogant, dishonest, jealous, and surly.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The things that are external to my mind have no relation at all to my mind.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'A man’s life is what his thoughts make of it.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Remember that all is opinion.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'If a man is mistaken, instruct him kindly and show him his error.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The longest-lived and the shortest-lived man, when they come to die, lose one and the same thing.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The universe is one living being, having one substance and one soul.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Do not waste what remains of your life in speculating about your neighbors.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The mind that is free from passions is a fortress, for a man has no stronger place of refuge.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Look within; do not allow the special quality or worth of anything to pass you by.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'For the stone thrown up into the air, it is no evil to come down, nor any good to have been carried up.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'The whole earth is a point, and how small a corner of it is this our dwelling place.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Take away the judgment, and you have taken away the thought: I am hurt.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Let not your mind run on what you lack as much as on what you have already.',
    author: 'Marcus Aurelius',
    category: 'evening' as const,
  },
  {
    text: 'Men are disturbed not by things, but by the views which they take of them.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'It is not he who gives abuse that affronts, but the view that you take of it as insulting.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'If you wish to be good, first believe that you are bad.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'If you would be a reader, read; if a writer, write.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'Do not seek to have events happen as you wish, but wish them to happen as they do happen.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'We have two ears and one mouth so that we can listen twice as much as we speak.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'It is a person’s own mind, not their enemy or foe, that lures them to evil ways.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'If you want to improve, be content to be thought foolish and stupid.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'Difficulties show men what they are.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'It is impossible for a man to learn what he thinks he already knows.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'If you would cure anger, do not feed it.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'Do not explain your philosophy. Embody it.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'First learn the meaning of what you say, and then speak.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'No man is free who is not master of himself.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'If you want to be a philosopher, prepare yourself to be laughed at and mocked.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'You become what you give your attention to.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'The greater the difficulty, the more glory in surmounting it.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'To accuse others for one’s own misfortune is a sign of want of education.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'Silence is safer than speech.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'He who laughs at himself never runs out of things to laugh at.',
    author: 'Epictetus',
    category: 'evening' as const,
  },
  {
    text: 'We are more often frightened than hurt; and we suffer more from imagination than from reality.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The greatest obstacle to living is expectancy, which hangs upon tomorrow and loses today.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'It is not the man who has too little, but the man who hankers after more, that is poor.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'Difficulties strengthen the mind, as labor does the body.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'A man who suffers before it is necessary, suffers more than is necessary.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'He who is everywhere is nowhere.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The mind that is anxious about future events is miserable.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'We are members of one great body, planted by nature in mutual relations.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'Every night, before going to sleep, let us examine our day.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The day of death is not the day of punishment, but the day of release from the bonds of this life.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'No man is good by chance. Virtue is something which must be learned.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'A kingdom founded on injustice never lasts.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The bravest sight in the world is to see a great man struggling against adversity.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'It is a great thing to know the season for speech and the season for silence.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'Anger, if not restrained, is frequently more hurtful to us than the injury that provokes it.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'We should not, like sheep, follow the flock in front of us.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The life we receive is not short, but we make it so.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'We are all born to help one another.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The greatest remedy for anger is delay.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'To wish to be well is a part of becoming well.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'There is no enjoying the possession of anything valuable unless one has someone to share it with.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'He who has done a good deed has his reward in having done it.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'We are all wicked; what one reproaches in another, he will find in his own bosom.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The mind is never right but when it is at peace with itself.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The wise man is content with himself.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'We should every night call ourselves to account: What infirmity have I mastered today?',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'No man can have a peaceful life who thinks too much about lengthening it.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The happy life is the one which is in harmony with its own nature.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'A great pilot can sail even when his canvas is rent.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'No one is more unhappy than he who never faces adversity.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'Fire tests gold, suffering tests brave men.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The greatest remedy for anger is delay.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'It is not because things are difficult that we do not dare; it is because we do not dare that things are difficult.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'If you live in harmony with nature, you will never be poor; if you live according to what others think, you will never be rich.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'A person who is always anxious is also always miserable.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The greatest riches are those that are possessed without fear.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The whole of life is but a moment of time. It is our duty, therefore, to use it, not to misuse it.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'Let us say what we feel, and feel what we say; let speech harmonize with life.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'No man was ever wise by chance.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'The greatest power is to be able to control yourself.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'It is the quality rather than the quantity that matters.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'As long as you live, keep learning how to live.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'We are all waves of the same sea, leaves of the same tree, flowers of the same garden.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'Life is long if you know how to use it.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'It is a rough road that leads to the heights of greatness.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'No man can be happy who is not wise, and no man can be wise who is not happy.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'He who has learned to die has unlearned how to be a slave.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'A man is as miserable as he thinks he is.',
    author: 'Seneca',
    category: 'evening' as const,
  },
  {
    text: 'There is no easy way from the earth to the stars.',
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
    const newQuotes = STOIC_QUOTES.filter((quote) => {
      if (existingTexts.has(quote.text)) return false;
      existingTexts.add(quote.text);
      return true;
    });

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
