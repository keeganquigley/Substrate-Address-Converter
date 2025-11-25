export interface Network {
  name: string;
  prefix: number;
  category: "Relay Chain" | "System Chain" | "Parachain";
  symbol?: string;
}

export const NETWORKS: Network[] = [
  // Relay Chains
  { name: "Polkadot", prefix: 0, category: "Relay Chain", symbol: "DOT" },
  { name: "Kusama", prefix: 2, category: "Relay Chain", symbol: "KSM" },
  { name: "Westend (Testnet)", prefix: 42, category: "Relay Chain", symbol: "WND" },
  { name: "Paseo (Testnet)", prefix: 42, category: "Relay Chain", symbol: "PAS" },
  
  // System Chains
  { name: "Polkadot Asset Hub", prefix: 0, category: "System Chain", symbol: "DOT" },
  { name: "Kusama Asset Hub", prefix: 2, category: "System Chain", symbol: "KSM" },
  { name: "Polkadot Collectives", prefix: 0, category: "System Chain" },
  { name: "Polkadot Bridge Hub", prefix: 0, category: "System Chain" },
  
  // Parachains - Polkadot
  { name: "Acala", prefix: 10, category: "Parachain", symbol: "ACA" },
  { name: "Astar", prefix: 5, category: "Parachain", symbol: "ASTR" },
  { name: "Moonbeam", prefix: 1284, category: "Parachain", symbol: "GLMR" },
  { name: "Parallel", prefix: 172, category: "Parachain", symbol: "PARA" },
  { name: "HydraDX", prefix: 63, category: "Parachain", symbol: "HDX" },
  { name: "Interlay", prefix: 2032, category: "Parachain", symbol: "INTR" },
  { name: "Centrifuge", prefix: 36, category: "Parachain", symbol: "CFG" },
  { name: "Phala", prefix: 30, category: "Parachain", symbol: "PHA" },
  { name: "Nodle", prefix: 37, category: "Parachain", symbol: "NODL" },
  { name: "Bifrost Polkadot", prefix: 6, category: "Parachain", symbol: "BNC" },
  
  // Parachains - Kusama
  { name: "Karura", prefix: 8, category: "Parachain", symbol: "KAR" },
  { name: "Moonriver", prefix: 1285, category: "Parachain", symbol: "MOVR" },
  { name: "Shiden", prefix: 5, category: "Parachain", symbol: "SDN" },
  { name: "Khala", prefix: 30, category: "Parachain", symbol: "PHA" },
  { name: "Bifrost Kusama", prefix: 6, category: "Parachain", symbol: "BNC" },
  
  // Generic Substrate
  { name: "Generic Substrate", prefix: 42, category: "Relay Chain" },
];
