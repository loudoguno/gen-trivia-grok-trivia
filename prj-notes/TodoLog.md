# TODO Log for Gen Trivia Game
outline of what i think needs to happen next and what i've done
---

# Log
[x] created simple static placeholder files for game (index.html, scripts.js
[x] temporarily hosting using GitHub Pages (need to review how this works) and deployed using GitHub actions
[x] explored and made decisions regarding:
  multiplayer game mechanics:
    - pivoted from multiplayer based on buzzer, to one where players compete concurrently based on points per time to answer. all players have a chance to answer all questions. fastes to answer correctly is rewarded with picking the next square and that's it
  Front-end
    websockets and node.js for managing real-time game-state
  Back-end
    database structure: 
      - going to use mySQL on local machine for prototype, will store for each round: round number, 6 round categories, for each category 5 questions, for each questions 1-4 acceptable answers. 
      - will store player name, how much time each answer took, wether the player answered correctly, incorrectly, or abstained (need to think more on what abstaining means...)
  API calls for text generation: 
    - split prompt into multiple parts
      - (1) generate 6 categories (consider favorites like current events, potent potables, movie title mashups, 
    - [ ] still need to explore using database of jeopardy questions for training a dedicated model...


# TODO
# TODO: Build AI-Powered Multiplayer Jeopardy Game

---

## Part 1. Setup OpenAI API
**Overview**: Configure access to OpenAI’s API to generate categories, questions, and acceptable answer variations. This will be the foundation for dynamic game content.  
**Resources Needed**: OpenAI API key, Node.js, `openai` npm package

- [ ] Install OpenAI SDK  
    - [ ] `npm install openai dotenv`
- [ ] Create `.env` file  
    - [ ] Add `OPENAI_API_KEY=your-key-here`
- [ ] Create `openaiUtils.js`  
    - [ ] Import OpenAI and initialize with API key from `.env`
- [ ] Write a function to generate categories  
    - [ ] Prompt: `Generate five unique Jeopardy categories in JSON format`
    - [ ] Parse the response and return an array
- [ ] Write a function to generate questions for a category  
    - [ ] Prompt: `Generate 6 Jeopardy questions with answers and acceptable variations for the category [CATEGORY]. Format response as JSON.`
    - [ ] Parse and normalize the data
    - [ ] Handle malformed JSON or unexpected formats

**Potential Issues**:
- Hitting rate limits — throttle API requests
- JSON parsing errors — use `try/catch` and validate structure
- Unexpected completions — use structured prompting

---

## Part 2. Set Up Local SQLite Database  
**Overview**: Store categories, questions, acceptable answers, and player responses in a structured way.  
**Resources Needed**: `sqlite3` npm package

- [ ] Install and set up SQLite  
    - [ ] `npm install sqlite3`
    - [ ] Create `database.js` file
    - [ ] Export initialized database connection
- [ ] Define database schema  
    - [ ] `categories` table: `id`, `name`
    - [ ] `questions` table: `id`, `category_id`, `question`, `correct_answer`, `acceptable_answers` (JSON array)
    - [ ] `player_answers` table: `id`, `player_id`, `question_id`, `answer`, `is_correct`, `time_taken`
- [ ] Seed the database  
    - [ ] Save generated categories and questions
    - [ ] Save acceptable answer variations as JSON blobs

**Potential Issues**:
- Schema mismatch errors — use `IF NOT EXISTS` and test inserts early
- JSON parsing — store acceptable answers as stringified JSON

---

## Part 3. Build Data Generator Script  
**Overview**: Orchestrate the process of generating and storing a full Jeopardy game round.  
**Resources Needed**: `openaiUtils.js`, `database.js`

- [ ] Create `generateGameData.js`  
    - [ ] Import category generator
    - [ ] Loop through categories and fetch questions
    - [ ] Save all data into the database
- [ ] Validate and log output  
    - [ ] Print a preview of stored categories and questions
    - [ ] Handle and retry failed generations

**Potential Issues**:
- Incomplete data chains — always check `length === 6` for question sets
- Rate limits — delay between question fetches per category

---

## Part 4. WebSocket Multiplayer Game Server  
**Overview**: Build the real-time multiplayer engine with Socket.io to handle player connections and game state.  
**Resources Needed**: `express`, `socket.io`

- [ ] Set up WebSocket server (`server.js`)  
    - [ ] `npm install express socket.io`
    - [ ] Create Express server
    - [ ] Attach Socket.io to HTTP server
- [ ] Define WebSocket events  
    - [ ] `connection`: log and identify player
    - [ ] `squareSelected`: broadcast question to all players
    - [ ] `submitAnswer`: record answer and response time
    - [ ] `revealResults`: send correct answers and scores
- [ ] Track game state in memory  
    - [ ] Current player turn
    - [ ] Selected questions
    - [ ] Player scores

**Potential Issues**:
- Out-of-sync state — validate all events against server state
- Disconnections — handle client dropouts gracefully

---

## Part 5. Frontend Integration  
**Overview**: Connect client to WebSocket server and display real-time gameplay updates.  
**Resources Needed**: `index.html`, browser console

- [ ] Add Socket.io client to HTML  
    - [ ] `<script src="/socket.io/socket.io.js"></script>`
- [ ] Connect to server on load  
    - [ ] `const socket = io();`
- [ ] Implement core events  
    - [ ] Send `squareSelected` on cell click
    - [ ] Listen for `questionShown` and display it
    - [ ] Submit answer via `submitAnswer`
    - [ ] Listen for `revealResults` and update UI

**Potential Issues**:
- Misfiring events — debounce user actions
- UI updates not synced — use consistent event-driven flow

---

## Part 6. Answer Matching and Scoring  
**Overview**: Compare submitted answers against acceptable variations for flexible scoring.  
**Resources Needed**: JSON-stored variations, string matching logic

- [ ] Normalize user input  
    - [ ] Convert to lowercase
    - [ ] Trim whitespace and punctuation
- [ ] Check against acceptable answers  
    - [ ] Use `acceptable_answers.includes(userAnswer)`
    - [ ] Optional: implement fuzzy matching for partial credit
- [ ] Store results in `player_answers`

**Potential Issues**:
- Ambiguous answers — store original text + match status
- Overmatching — keep variation lists conservative

---

## Part 7. Prepare for Production  
**Overview**: Plan to move to serverless/cloud-based architecture for deployment.  
**Resources Needed**: Supabase or Firebase, GitHub Actions

- [ ] Migrate from SQLite to cloud DB  
    - [ ] Export and reformat schema
    - [ ] Use cloud DB SDK for reads/writes
- [ ] Create API layer  
    - [ ] Use serverless functions to handle game logic
    - [ ] Add auth layer if needed
- [ ] Separate front-end for deployment  
    - [ ] Deploy static site to GitHub Pages / Vercel / Netlify
- [ ] Exclude local-only files from Git  
    - [ ] `.env`, `*.db`

**Potential Issues**:
- Cold start latency on serverless
- Cross-origin issues — ensure CORS headers are set properly

---

## Part 8. (Optional) Improve Answer Matching with AI  
**Overview**: Use OpenAI to evaluate correctness for subjective answers or obscure trivia.  
**Resources Needed**: OpenAI API

- [ ] Build fallback evaluation function  
    - [ ] Prompt: “Is the answer '[user answer]' acceptable for the question '[question]'?”
- [ ] Call AI when local match fails  
    - [ ] If no match found, send API request
    - [ ] Use score or judgment to award points

**Potential Issues**:
- Latency — add loading spinner or limit use
- Cost — cache previous evaluations

---

## Final Step: Test Full Game Loop

- [ ] Generate fresh data using OpenAI
- [ ] Serve game page and connect two clients
- [ ] Play through full game with scoring
- [ ] Check database for recorded answers

---

## Bonus: Add Admin Tools

- [ ] Export all question sets for moderation
- [ ] Add dashboard to review player stats
- [ ] Add game reset/next round controls
