# Project Structure Documentation

## Directory Overview

```
grok-jeopardy/
├── assets/                 # Global assets directory
│   └── music/             # Music files for the game
├── prj-notes/             # Project documentation and notes
│   ├── alt-implementation/# Alternative implementation files (for reference)
│   │   ├── index2.html
│   │   ├── script2.js
│   │   └── styles2.css
│   ├── notes.md           # General project notes and ideas
│   ├── PROJECT_STRUCTURE.md
│   └── TodoLog.md         # Project todo list and progress tracking
├── site/                  # Main website files
│   ├── howtoplay.html     # How to play page
│   ├── howtoplay.md       # How to play content in markdown
│   ├── index.html         # Main game page
│   ├── music/             # Site-specific music files
│   ├── script.js          # Main game logic
│   └── styles.css         # Main stylesheet
└── README.md              # Project overview and setup instructions
```

## File Descriptions

### Core Game Files
- `site/index.html`: The main game interface
- `site/script.js`: Contains the game logic, board management, and user interactions
- `site/styles.css`: Main stylesheet for the game interface

### Documentation
- `README.md`: Project overview, setup instructions, and basic information

### How to Play
- `site/howtoplay.html`: The how to play page
- `site/howtoplay.md`: Markdown content for the how to play page

### Assets
- `assets/music/`: Global music files for the game
- `site/music/`: Site-specific music files

### Project Notes
- `prj-notes/`: Directory containing project documentation and reference materials
  - `alt-implementation/`: Contains an alternative implementation of the game (for reference)
  - `notes.md`: General project notes and ideas
  - `PROJECT_STRUCTURE.md`: This file, documenting the project structure
  - `TodoLog.md`: Project todo list and progress tracking

## Notes
- The alternative implementation in `prj-notes/alt-implementation/` is kept for reference but is not part of the active codebase
- The project uses a `site/` directory for the main website files to support GitHub Pages deployment
- Music files are organized in both `assets/` and `site/` directories to support different deployment scenarios
- All project documentation and notes are now centralized in the `prj-notes/` directory 