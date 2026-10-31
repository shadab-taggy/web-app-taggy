// Style-tag groups from the Figma onboarding step 3 ("Add tags").
export const tagGroups = [
  {
    id: "style",
    label: "My Style",
    tags: [
      "Classic & Clean", "Relaxed & Casual", "Neutral & Minimal", "Bold & Confident",
      "Smart Everyday", "Sporty Style", "Covered & Cool", "Mix & Match",
      "Laid-Back Luxe", "After Dark",
    ],
  },
  {
    id: "find-me",
    label: "You Can Find Me",
    tags: [
      "By the sea", "By the pool", "Brunching", "Corporate Mode", "Dad on Duty",
      "Gym Gym Gym", "Boys' Night", "Wellness Days", "Evenings Out",
      "Breakfast Club", "Mall Hopping", "On the Course",
    ],
  },
  {
    id: "staples",
    label: "Wardrobe Staples",
    tags: [
      "Go-To Tee", "Team Tailored", "Matching Sets", "Short-Sleeve Shirts",
      "Laid-Back Linen", "The Overshirt", "Smart Shorts", "Fresh Sneakers",
      "Slides, Obviously", "Golf Gear", "Gym Sets", "Accessorised Right",
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    tags: [
      "Wellness Guru", "Family Guy", "Desk to Dinner", "Style Comes Easy",
      "Seen Around", "Loyal to Routine", "Groomed Daily", "Styled to Chill",
      "Fashion Lover", "Spontaneous",
    ],
  },
  {
    id: "spending",
    label: "Spending Style",
    tags: [
      "High-Low Mixer", "Quality Over Quantity", "Trend-Aware", "Smart Spender",
      "Wardrobe Investor", "Monthly Refresh", "Impulse Guy", "Label Loyalist",
      "Minimal Basket",
    ],
  },
] as const;

export const MAX_TAGS_PER_GROUP = 1;
