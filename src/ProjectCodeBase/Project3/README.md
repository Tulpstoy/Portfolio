# PokéTeamPlanner

A Web App for building and analyzing Pokémon teams. Built with React and Vite. And Using the PokéAPI.

https://pokeapi.co/

## Features

- Browse all Pokémon across generations 1-9
- View detailed Pokémon information including stats, types, and forms
- Build teams of up to 6 Pokémon
- Analyze team strengths, weaknesses, and type coverage
- Filter Pokémon by generation and special forms (Mega, Gigantamax, Regional variants, etc.)
- Search functionality to quickly find specific Pokémon

## Page Structure

- **Home** (`/`): Browse and filter Pokémon
  - Generation filters
  - Special form filters (Normal, Mega, Gigantamax, Alolan, Galarian, Hisuian, Paldean)
  - Search bar
  - Pokémon grid display

- **Pokémon Details** (`/pokemon/:id`): Detailed view of a specific Pokémon
  - Stats, types, and measurements
  - Form variants if available
  - Add/Remove from team functionality using a "favourites" button

- **My Team** (`/team`): Team management and analysis
  - Active team slots (max 6)
  - Team type analysis
    - Weaknesses
    - Resistances
    - Immunities
    - Uncovered types

## Technical Stack

- React 18
- Vite
- React Router for navigation
- PokéAPI for Pokémon data

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`
