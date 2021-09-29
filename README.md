# Fate Character Codex

A [Nashville Software School C38](https://github.com/nss-day-cohort-38) front-end capstone project by [Keith Potempa](https://github.com/keithrpotempa)

## Overview 

In this React SPA, users can create, store, and view characters for [Fate Core](https://www.evilhat.com/home/fate-core/), a [tabletop roleplaying game](https://en.wikipedia.org/wiki/Tabletop_role-playing_game) by [Evil Hat Productions](https://www.evilhat.com).

## Demo Video
[![Fate Character Codex Demo](https://img.youtube.com/vi/uC1eQSiaTs8/0.jpg)](https://youtu.be/uC1eQSiaTs8)


## Screenshots
![Character List](./images/1_compressed.jpg)
![Form Types](./images/3_compressed.jpg)
![Form Skills Multiselect](./images/4_compressed.jpg)
![Form Review & Save](./images/5_compressed.jpg)



## Use Case

Creating characters in Fate is a relatively [simple process](https://fate-srd.com/fate-core/character-creation), so the publisher does not produce extensive libraries or resources of characters for use by players / game masters. This project hopes to provide an accessible resource to efficiently build characters; to help reduce the preparation time and overall accessibility of the game. 

Players and Game Masters can use Fate Character Codex to:
 - efficiently create characters of various different types
 - make decisions during character creation one step at a time, with short, relevant prompts from the rulebooks provided for each step
 - manage changes to saved characters throughout campaign play
 - track stress and consequences during a session
 - find characters and creatures created by other users to instantly use in their own games

## Character Types Supported 

[Fate Core:](https://www.evilhat.com/home/fate-core/)  
- Player Characters (PCs)
- Non-Player Characters (NPCs)
  - Nameless NPCs (Average, Fair, Good)
  - Supporting NPCs
  - Main NPC

[Fate Adversary Toolkit:](https://www.evilhat.com/home/fate-adversary-toolkit/) 
- Enemies
  - Threats
  - Hitters
  - Bosses
  - Fillers (Average, Fair, Good)

## React Technologies Used

This project utilizes the following:
* Hooks, state, props, routes, components, modules
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* [Semantic UI](https://semantic-ui.com/) for React component buttons, cards, containers, dividers, dropdowns, forms, grids, icons, inputs, items, labels,lists, etc.
* [React Hooks Paginator](https://www.npmjs.com/package/react-hooks-paginator) for pagination
* [React Confirm Alert](https://www.npmjs.com/package/react-confirm-alert) for confirm alerts
* [React Router](https://reacttraining.com/react-router/) for page routing

## Other Technologies Used

1. Firebase Hosting
1. Firebase Authentication
1. Firebase Realtime Database backend

## Entity Relationship Diagram
![ERD](./images/FCC_FE_ERD.png)

## Local Setup
If you would like to test this code locally, you can follow these steps to get started:

1. `git clone git@github.com:keithrpotempa/fate-character-codex.git && cd fate-character-codex`
1. `npm install` to build dependencies
1. `npm start` to run the application in development mode

