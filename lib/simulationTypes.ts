export interface SimPet {
  pet: string;
  attack: number;
  health: number;
  level: number;
}

export interface SimShopPet {
  pet: string;
  cost: number;
  frozen: boolean;
}

export interface SimAction {
  type: "buy" | "sell" | "reorder" | "freeze" | "buy_food" | "end_turn";
  detail: string;
}

export interface SimBattle {
  opponent_team: (SimPet | null)[];
  result: "win" | "loss" | "draw";
  lives_after: number;
  wins_after: number;
  log: string[];
}

export interface SimTurn {
  turn: number;
  gold: number;
  lives: number;
  wins: number;
  team: (SimPet | null)[];
  shop: SimShopPet[];
  actions: SimAction[];
  battle: SimBattle;
}

export interface SimulationRun {
  run_id: string;
  strategy: string;
  final_result: "win" | "loss";
  total_turns: number;
  total_wins: number;
  turns: SimTurn[];
}

export type SimState = "idle" | "loading" | "success" | "unavailable" | "error";
