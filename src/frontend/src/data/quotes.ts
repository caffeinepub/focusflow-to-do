export const MILLIONAIRE_QUOTES = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  { text: "You become what you believe.", author: "Oprah Winfrey" },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Rich people have small TVs and big libraries. Poor people have small libraries and big TVs.",
    author: "Zig Ziglar",
  },
  {
    text: "If you are not willing to risk the usual, you will have to settle for the ordinary.",
    author: "Jim Rohn",
  },
  {
    text: "The fastest way to change yourself is to hang out with people who are already the way you want to be.",
    author: "Reid Hoffman",
  },
  {
    text: "It's not about money or connections — it's the willingness to outwork and outlearn everyone.",
    author: "Mark Cuban",
  },
  {
    text: "Opportunities don't happen. You create them.",
    author: "Chris Grosser",
  },
  {
    text: "I never dreamed about success. I worked for it.",
    author: "Estée Lauder",
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
  {
    text: "The secret to success is to know something nobody else knows.",
    author: "Aristotle Onassis",
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
  },
  { text: "The harder I work, the luckier I get.", author: "Gary Player" },
  {
    text: "In order to succeed, we must first believe that we can.",
    author: "Nikos Kazantzakis",
  },
  {
    text: "The difference between who you are and who you want to be is what you do.",
    author: "Bill Phillips",
  },
  {
    text: "Wealth is the ability to fully experience life.",
    author: "Henry David Thoreau",
  },
  {
    text: "The real test is not whether you avoid failure; it's whether you let it harden or shame you.",
    author: "Barack Obama",
  },
  {
    text: "Stop doubting yourself. Work hard and make it happen.",
    author: "Anonymous",
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
  },
  {
    text: "The biggest risk is not taking any risk.",
    author: "Mark Zuckerberg",
  },
  { text: "Either you run the day or the day runs you.", author: "Jim Rohn" },
  {
    text: "The goal is not to be rich. The goal is to be legendary.",
    author: "Anonymous",
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
  },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  {
    text: "Your net worth is a reflection of your network and your work ethic combined.",
    author: "Porter Gale",
  },
  {
    text: "Do not be embarrassed by your failures, learn from them and start again.",
    author: "Richard Branson",
  },
  {
    text: "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    author: "Ayn Rand",
  },
  {
    text: "The secret of success is constancy of purpose.",
    author: "Benjamin Disraeli",
  },
];

export function getDailyQuote() {
  const dateStr = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  const idx = hash % MILLIONAIRE_QUOTES.length;
  return MILLIONAIRE_QUOTES[idx];
}
