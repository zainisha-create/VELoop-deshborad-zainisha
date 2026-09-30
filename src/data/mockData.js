/**
 * VELOOP Rewards - Level-Up Dashboard Mock Data
 * Structured for direct drop-in replacement by production REST/GraphQL APIs
 */

export const INITIAL_USER_PROFILE = {
  userId: "vl_user_9921",
  username: "VeLooper",
  greeting: "Good Morning, VeLooper!",
  avatarUrl: null,
  currentLevel: 5,
  levelTitle: "Momentum",
  currentXP: 6420,
  requiredXP: 8000,
  baseLevelXP: 5000, // XP threshold where Level 5 started
  nextLevel: 6,
  nextLevelTitle: "Ascendant",
  xpToNext: 1580,
  progressPct: 80.25,
  balances: {
    ves: 1840,
    sves: 320,
    gems: 48,
    spins: 3
  },
  nextLevelReward: {
    type: "VEs",
    amount: 500,
    bonusGems: 25,
    bonusSpins: 2,
    perks: [
      "Higher daily XP limit (+25%)",
      "Access to Tier-II arcade challenges",
      "Priority VIP reward pool access"
    ]
  },
  todaysBoost: {
    xpEarnedToday: 215,
    xpDailyGoal: 300,
    tasksDone: 4,
    totalTasks: 8,
    streakDays: 7,
    streakMultiplier: "2X Multiplier"
  }
};

export const LEVEL_ROADMAP = [
  {
    level: 1,
    title: "Initiate",
    requiredXP: 1000,
    reward: { type: "VEs", amount: 50 },
    status: "completed",
    unlockedAt: "2026-08-10"
  },
  {
    level: 2,
    title: "Explorer",
    requiredXP: 2200,
    reward: { type: "VEs", amount: 100 },
    status: "completed",
    unlockedAt: "2026-08-25"
  },
  {
    level: 3,
    title: "Pathfinder",
    requiredXP: 3600,
    reward: { type: "VEs", amount: 150 },
    status: "completed",
    unlockedAt: "2026-09-08"
  },
  {
    level: 4,
    title: "Vanguard",
    requiredXP: 5000,
    reward: { type: "Gems", amount: 10 },
    status: "completed",
    unlockedAt: "2026-09-21"
  },
  {
    level: 5,
    title: "Momentum",
    requiredXP: 8000,
    reward: { type: "VEs", amount: 250 },
    status: "current",
    unlockedAt: "2026-09-28"
  },
  {
    level: 6,
    title: "Ascendant",
    requiredXP: 12000,
    reward: { type: "VEs", amount: 500, bonusGems: 25 },
    status: "next",
    unlockedAt: null
  },
  {
    level: 7,
    title: "Apex",
    requiredXP: 18000,
    reward: { type: "Gems", amount: 50, bonusSpins: 5 },
    status: "locked",
    unlockedAt: null
  },
  {
    level: 8,
    title: "Grandmaster",
    requiredXP: 26000,
    reward: { type: "VEs", amount: 1200 },
    status: "locked",
    unlockedAt: null
  },
  {
    level: 9,
    title: "Sovereign",
    requiredXP: 36000,
    reward: { type: "VEs", amount: 2500, bonusGems: 100 },
    status: "locked",
    unlockedAt: null
  },
  {
    level: 10,
    title: "Legend",
    requiredXP: 50000,
    reward: { type: "Vault Key", amount: 1, title: "Legendary Chest" },
    status: "locked",
    unlockedAt: null
  }
];

export const EARNING_FEATURES = [
  {
    id: "watch_earn",
    title: "Watch & Earn",
    subtitle: "Watch partner clips & sponsors",
    rewardText: "+50 XP",
    xpReward: 50,
    icon: "play",
    accentColor: "purple",
    status: "active",
    isComingSoon: false,
    ctaText: "Start Watching",
    details: "Watch short sponsored clips to earn instant XP. Refreshes every 4 hours."
  },
  {
    id: "daily_tasks",
    title: "Daily Tasks",
    subtitle: "Complete today's missions",
    rewardText: "+30 XP",
    xpReward: 30,
    icon: "check-circle",
    accentColor: "emerald",
    status: "active",
    isComingSoon: false,
    ctaText: "Claim Mission",
    details: "4 of 8 tasks finished today. Complete all to unlock +50 bonus XP."
  },
  {
    id: "refer_earn",
    title: "Refer & Earn",
    subtitle: "Invite friends & family",
    rewardText: "+100 XP",
    xpReward: 100,
    icon: "users",
    accentColor: "gold",
    status: "active",
    isComingSoon: false,
    ctaText: "Invite Friends",
    details: "Earn +100 XP and 50 VEs for every friend who joins VELOOP and reaches Level 2."
  },
  {
    id: "xp_catcher",
    title: "XP Catcher",
    subtitle: "Catch falling orbs & coins",
    rewardText: "+10 to +35 XP",
    xpReward: 25,
    icon: "gamepad",
    accentColor: "blue",
    status: "active",
    isComingSoon: false,
    ctaText: "Play Now",
    details: "Interactive skill challenge. Catch as many XP orbs and coins in 20 seconds!"
  },
  {
    id: "mini_games",
    title: "Mini Games",
    subtitle: "New skill arcades",
    rewardText: "+75 XP",
    xpReward: 75,
    icon: "dices",
    accentColor: "cyan",
    status: "coming_soon",
    isComingSoon: true,
    ctaText: "Coming Soon",
    details: "Trivia sprints, memory matches, and crypto puzzle quests currently in testing."
  },
  {
    id: "streak_bonus",
    title: "Streak Bonus",
    subtitle: "Maintain daily streak",
    rewardText: "+25 XP",
    xpReward: 25,
    icon: "flame",
    accentColor: "coral",
    status: "active",
    isComingSoon: false,
    ctaText: "Claim Day 7",
    details: "7-day check-in streak active. Daily check-in gives +25 XP and boosts multiplier!"
  }
];

export const INITIAL_XP_ACTIVITIES = [
  {
    id: "act_1",
    type: "referral",
    title: "Referral Bonus",
    description: "Invited friend @marcus_v registered",
    timestamp: "Today, 10:45 AM",
    xpChange: 20,
    rewardType: "XP",
    icon: "users",
    category: "Referral"
  },
  {
    id: "act_2",
    type: "task",
    title: "Daily Mission Completed",
    description: "Verified account security & email",
    timestamp: "Today, 09:12 AM",
    xpChange: 50,
    rewardType: "XP",
    icon: "check-circle",
    category: "Tasks"
  },
  {
    id: "act_3",
    type: "game",
    title: "Mini Game Win",
    description: "Scored 92 in XP Catcher Arcade",
    timestamp: "Today, 08:30 AM",
    xpChange: 75,
    rewardType: "XP",
    icon: "gamepad",
    category: "Games"
  },
  {
    id: "act_4",
    type: "game_reward",
    title: "XP Catcher Reward",
    description: "Coin collector conversion payout",
    timestamp: "Today, 07:50 AM",
    xpChange: 10,
    veChange: 10,
    rewardType: "VEs",
    icon: "coins",
    category: "Games"
  },
  {
    id: "act_5",
    type: "streak",
    title: "Streak Bonus",
    description: "Day 7 streak multiplier awarded",
    timestamp: "Today, 07:20 AM",
    xpChange: 25,
    rewardType: "XP",
    icon: "flame",
    category: "Tasks"
  },
  {
    id: "act_6",
    type: "watch",
    title: "Watch & Earn",
    description: "Completed Web3 partner spotlight",
    timestamp: "Yesterday, 06:15 PM",
    xpChange: 35,
    rewardType: "XP",
    icon: "play",
    category: "Tasks"
  }
];

export const GAME_CONFIG = {
  name: "XP CATCHER",
  durationSeconds: 20,
  maxDailyAttempts: 5,
  items: {
    goldCoin: {
      type: "gold",
      name: "VE Coin",
      points: 5,
      xpValue: 1,
      veValue: 1,
      speedRange: [140, 220],
      spawnWeight: 50
    },
    xpOrb: {
      type: "xp",
      name: "XP Orb",
      points: 10,
      xpValue: 2,
      veValue: 0,
      speedRange: [160, 240],
      spawnWeight: 35
    },
    crystalGem: {
      type: "gem",
      name: "Prism Gem",
      points: 25,
      xpValue: 5,
      veValue: 2,
      speedRange: [200, 280],
      spawnWeight: 15
    }
  },
  tiers: [
    { minScore: 80, rating: "Outstanding!", xpReward: 30, veReward: 12, grade: "S" },
    { minScore: 50, rating: "Great Run!", xpReward: 20, veReward: 8, grade: "A" },
    { minScore: 25, rating: "Good Effort!", xpReward: 15, veReward: 5, grade: "B" },
    { minScore: 0, rating: "Keep Practicing!", xpReward: 10, veReward: 2, grade: "C" }
  ]
};

export const TOOLTIP_COPY = {
  xp: "XP (Experience Points) tracks your engagement and progress across the VELOOP platform. Earning XP advances your tier, unlocking exclusive reward multipliers, staking bonuses, and partner drops.",
  level: "Your level reflects your tier rank in VELOOP Rewards. Higher levels unlock enhanced daily earning ceilings, access to competitive arcades, and exclusive token claims.",
  reward: "The displayed next-level reward is reserved for your account upon reaching the designated XP threshold. Rewards are credited directly to your connected VELOOP wallet.",
  boost: "Today's Boost aggregates your daily streak, tasks completed, and active XP multipliers. Return daily before midnight UTC to maintain your streak.",
  roadmap: "The progression roadmap displays your past milestones and future unlocked reward gates. Tap any tier node to inspect associated benefits.",
  game: "XP Catcher is a skill-based mini-game. All rewards are engagement-driven, deterministic, and safe. You receive up to 5 attempts daily."
};
