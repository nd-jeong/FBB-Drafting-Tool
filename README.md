# Project-4-FBB-Drafting

# Project Overview

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Create Back-end / Authentication / API | Incomplete
|Day 2| Finish Back-end / API | Incomplete
|Day 3| Create front-end components | Incomplete
|Day 4| Complete front-end components | Incomplete
|Day 5| CSS + MVP  | Incomplete
|Day 6| CSS + Post MVP | Incomplete
|Day 7| Post MVP | Incomplete
|Day 8| Present | Incomplete

## Project Description

This app will be a drafting tool for fantasy basketball teams. It will incorperate authentication by requiring users to create accounts. Each account can have one or more leagues and each league can have from 8 - 14 teams. The user will be able to setup the number of players and positions and the order of picks for each team in the league. Each team will get a turn to select a player for their team which will remove that player from the entire player pool. When a player is added to a team, there will be some sort of visual tool (most likely a graph) to show the team's strength in several categories relative to the averages of all available players. The pool of available players will be able to be filtered by position, strength in a particular category, and ADP (average draft pick).  

## Wireframes

Landing Page
https://drive.google.com/open?id=1-T1YfitMMXGEbbhi2u1YNI1A2NK7it7n

User's League Component
https://drive.google.com/open?id=1-VpBdhlfunS1YxMUNWxnhC-Xous7IhCj

Create League Form
https://drive.google.com/open?id=1-XoJrezBMh2BXJA2fEheySAeQd7TGxki

Team Overview Component
https://drive.google.com/open?id=1-fbRhzuLaFF3fqZCbhmYi0MtTEk8KuD6

Drafting Component
https://drive.google.com/open?id=1-kkkvD6czRSlRZqz7mnEiF0X_gpokR7a

## Priority Matrix

https://drive.google.com/open?id=1-Jc-4OS_-n2m7RmYFye1J74-i6yonV6o

### MVP/PostMVP - 5min

#### MVP 

- User authentication
- Make API call and populate database with results
- Users can create leagues with custom team names and draft order
- User takes turns drafting a player to each team
- User can see their team's strengths through infographics

#### PostMVP 

- Add timer for mock drafts
- Allow more advanced statistics (Double-double, triple-double, etc)
- Allow users to preview exchanging players to see the effect on their team
- Users can create leagues with custom settings

## Architectural Design

https://drive.google.com/open?id=1-K7sKj4KAA7mjG4XUfT7eoofkEg1X0fn

## ERD

https://www.lucidchart.com/invitations/accept/3ee24fc7-d76c-49ac-844e-82e7be70da21

## UI Components

| Component | Description | 
| --- | :---: |  
| Header | This will render the header including the nav | 
| Landing Page | This will render the user login page |
| New User Form | This will render the form to create a new user |
| User's leagues | This will render the user's leagues |
| New League Form | This will render the form to create a new league | 
| League Overview | This will render the teams in each league | 
| Team Overview | This will render the players in the team as well as graphs to show the team's strength | 
| Drafting Page | This will render the table of all available players that will be drafted. It will include a search bar as well as filters. | 

| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: |
| Create databases | H | 6hrs|  |
| Work with API to populate database | H | 8hrs|  |
| Authentication | H | 4hrs|  |
| Create landing page | H | 3hrs|  |
| Create new user form component | H | 3hrs|  |
| Create user's league component | H | 3hrs|  |
| Create league overview component | H | 8hrs|  |
| Create new league form component | H | 3hrs|  |
| Create team overview component | H | 6hrs|  |
| Create drafting page component | H | 12hrs|  |
| Total | H | 56hrs|  | 

## Helper Functions

| Function | Description | 
| --- | :---: |  
|  |  | 

## Additional Libraries
| Library | What it Does | 
| --- | :---: |  
| Bootstrap/Material UI | Used to help style my application | 
| Sports Radar API | Used to get all player info | 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

## Change Log

 Use this section to document what changes were made and the reasoning behind those changes.  

#### SAMPLE.....
| Original Plan | Outcome | 
| --- | :---: |  
| Have one Book component | Split that component into BookInfo and BookInteraction as the component grew too complicated | 

## Issues and Resolutions
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object