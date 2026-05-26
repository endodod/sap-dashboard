# sap-dashboard

A public dashboard visualising what a reinforcement learning agent learned playing Super Auto Pets. Part of a three-repo project spanning game simulation, agent training, and data analysis.

---

## The project

This is the frontend for an end-to-end ML pipeline:

1. [**sap-sim**](https://github.com/endodod/sap-sim) — a Python simulation of SAP used as the training environment
2. [**sap-agent**](https://github.com/endodod/sap-agent) — a reinforcement learning agent (PPO) trained against the simulation
3. **sap-dashboard** ← you are here — a Next.js app showing what the agent discovered

## What's in the dashboard

- **Pet tier list** — agent-derived rankings backed by win-rate data, filterable by round
- **Synergy explorer** — which pet pairs the agent learned to combine
- **Training curves** — reward and win rate over training time
- **Matchup simulator** — input two teams, get a live battle result from the sim

## Live

[sap.paulkuehn.ch](https://sap.paulkuehn.ch)

## Stack

Next.js · TypeScript · Vercel

## Status

Under active development — Summer 2025.
