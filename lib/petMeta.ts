export interface PetMeta {
  emoji: string;
  tier: 1 | 2 | 3 | 4 | 5 | 6;
  description: string;
}

export const PET_META: Record<string, PetMeta> = {
  ant:       { emoji: "🐜", tier: 1, description: "Dies to give friends a stat boost — reliable early sacrifice" },
  beaver:    { emoji: "🦫", tier: 1, description: "Buffs two random friends on sell — core economy unit" },
  cricket:   { emoji: "🦗", tier: 1, description: "Spawns a zombie cricket on death — persistent board presence" },
  duck:      { emoji: "🦆", tier: 1, description: "Gives all shop animals +1 health on sell" },
  fish:      { emoji: "🐟", tier: 2, description: "Levels up teammates on level-up — core scaling unit" },
  flamingo:  { emoji: "🦩", tier: 1, description: "Gives the two friends behind +1/+1 on faint" },
  hedgehog:  { emoji: "🦔", tier: 1, description: "Deals 1 damage to all on faint — great for clearing summons" },
  horse:     { emoji: "🐴", tier: 1, description: "Gives a temp +1 attack to the next pet to summon" },
  mosquito:  { emoji: "🦟", tier: 1, description: "Snipes a random enemy for 1 damage at battle start" },
  otter:     { emoji: "🦦", tier: 1, description: "Gives a random friend +1/+1 on buy" },
  pig:       { emoji: "🐷", tier: 1, description: "Gives +1 gold back on sell" },
  blowfish:  { emoji: "🐡", tier: 2, description: "Hurt: deals 3 damage to a random enemy" },
  crab:      { emoji: "🦀", tier: 2, description: "Copies the health of the healthiest friend" },
  dodo:      { emoji: "🦤", tier: 2, description: "Gives attack to the friend ahead at battle start" },
  dog:       { emoji: "🐕", tier: 2, description: "Gains +1/+1 whenever a friend is summoned" },
  kangaroo:  { emoji: "🦘", tier: 2, description: "Gains +2/+2 when the friend ahead attacks" },
  ox:        { emoji: "🐂", tier: 2, description: "Gains melon armor and +2 attack when the friend ahead faints" },
  peacock:   { emoji: "🦚", tier: 2, description: "Gains +2 attack whenever hurt" },
  rat:       { emoji: "🐀", tier: 2, description: "Spawns a 1/1 dirty rat onto the enemy team on faint" },
  shrimp:    { emoji: "🦐", tier: 2, description: "Gives a random friend +1 health when a friend is sold" },
  spider:    { emoji: "🕷️", tier: 2, description: "Spawns a 2/2 spider on faint" },
  swan:      { emoji: "🦢", tier: 2, description: "Gives +1 gold at start of each turn" },
  badger:    { emoji: "🦡", tier: 3, description: "Deals own attack as damage to neighbors on faint" },
  camel:     { emoji: "🐪", tier: 3, description: "Gives the friend behind +1/+2 whenever hurt" },
  deer:      { emoji: "🦌", tier: 3, description: "Transforms into a 5/5 bus with splash attack on faint" },
  dolphin:   { emoji: "🐬", tier: 3, description: "Deals 5 damage to the lowest health enemy at battle start" },
  giraffe:   { emoji: "🦒", tier: 3, description: "Gives the three friends ahead +1/+1 at end of turn" },
  hippo:     { emoji: "🦛", tier: 3, description: "Gains +2/+2 each time a non-summoned enemy faints" },
  monkey:    { emoji: "🐒", tier: 3, description: "Gives the right-most friend +3/+3 at end of turn" },
  penguin:   { emoji: "🐧", tier: 3, description: "Gives other level-2 or 3 friends +1/+1 at end of turn" },
  rabbit:    { emoji: "🐇", tier: 3, description: "Gives the eating friend +1 health whenever a friend eats" },
  sheep:     { emoji: "🐑", tier: 3, description: "Spawns two 2/2 rams on faint" },
  snail:     { emoji: "🐌", tier: 3, description: "Gives all friends +1/+1 after a lost battle on buy" },
  turtle:    { emoji: "🐢", tier: 3, description: "Gives the friends behind melon armor on faint" },
  whale:     { emoji: "🐋", tier: 3, description: "Swallows the friend ahead, re-summons on faint" },
  bison:     { emoji: "🦬", tier: 4, description: "Gains +2/+2 at end of turn if you have another level-3 friend" },
  dragon:    { emoji: "🐉", tier: 4, description: "Gives all friends +1/+1 when you buy a tier-1 animal" },
  gorilla:   { emoji: "🦍", tier: 4, description: "Has a chance to gain coconut shield when hurt" },
  leopard:   { emoji: "🐆", tier: 4, description: "Snipes the highest attack enemy for 50% damage at battle start" },
  mammoth:   { emoji: "🦣", tier: 4, description: "Gives all friends +2/+2 on faint" },
  skunk:     { emoji: "🦨", tier: 4, description: "Reduces the highest health enemy's max health by 33% at battle start" },
  crocodile: { emoji: "🐊", tier: 5, description: "Deals 8 damage to the last enemy at battle start" },
  eagle:     { emoji: "🦅", tier: 5, description: "Summons a level-matched animal from tier 4–5 on faint" },
  shark:     { emoji: "🦈", tier: 5, description: "Gains +2/+1 whenever a friendly animal faints in battle" },
  scorpion:  { emoji: "🦂", tier: 5, description: "Has peanut — one-hit kills any unit it damages" },
  tiger:     { emoji: "🐯", tier: 5, description: "Causes the friend ahead to repeat their attack after they attack" },
  boar:      { emoji: "🐗", tier: 6, description: "Gains +2/+1 before attacking" },
  cat:       { emoji: "🐱", tier: 6, description: "Multiplies the attack and health of food by 2" },
  cow:       { emoji: "🐄", tier: 6, description: "Gives two random friends milk (+1/+1 food) on buy" },
  fly:       { emoji: "🪰", tier: 6, description: "Spawns a 5/5 zombie fly when a friendly animal faints" },
  fly2:      { emoji: "🪰", tier: 6, description: "Spawns a 5/5 zombie fly when a friendly animal faints" },
  sloth:     { emoji: "🦥", tier: 1, description: "Does nothing. Gloriously useless." },
};

export const PETS = Object.keys(PET_META).filter(k => k !== "fly2" && k !== "dolphin" && k !== "mammoth" && k !== "skunk" && k !== "snail" && k !== "tiger");

export function getTier(winRate: number, pickCount: number): "S" | "A" | "B" | "C" | "D" {
  if (winRate >= 0.85) return "S";
  if (winRate >= 0.80) return "A";
  if (winRate >= 0.75) return "B";
  if (winRate >= 0.65) return "C";
  return "D";
}

export const TIER_COLORS: Record<string, string> = {
  S: "#B8FF3F",
  A: "#FFB347",
  B: "#E8E8F0",
  C: "#8888A0",
  D: "#FF6B6B",
};
