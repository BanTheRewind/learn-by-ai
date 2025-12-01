# STEP 1: Setup

## What This Step Does
Creates the basic project structure and a minimal HTML file that you can open in a web browser. This verifies that your development environment works correctly.

## What I'm Building
- `index.html` - The main HTML file that the browser will load
- Basic page structure with a title
- A simple message to confirm the page loads

## Why This Matters
Every web project starts with an HTML file. This is the foundation that everything else builds upon. By getting this working first, we ensure the basics are in place before adding complexity.

## Technical Concepts Introduced
- **HTML (HyperText Markup Language)**: The standard language for creating web pages
- **DOCTYPE**: Tells the browser this is an HTML5 document
- **Head section**: Contains metadata (information about the page)
- **Body section**: Contains the visible content
- **File structure**: How to organize a web project

## Files Created
```
example/
├── index.html
└── sounds/
```

## How to Do This Yourself

### Step-by-step Instructions:

1. **Create the project folder**
   - Open your computer's file browser
   - Navigate to where you want to create the project
   - Create a new folder called `student`
   - Create a subfolder inside called `sounds`

2. **Create index.html**
   - Open a text editor (VS Code, Notepad, TextEdit, etc.)
   - Create a new file
   - Save it as `index.html` inside the `student` folder

3. **Add the HTML code**
   - Type or copy this code into `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Four Player Tic-Tac-Toe</title>
</head>
<body>
    <h1>Four Player Tic-Tac-Toe</h1>
    <p>Game loading...</p>
</body>
</html>
```

4. **Test it**
   - Find the `index.html` file in your file browser
   - Double-click it to open in your web browser
   - You should see "Four Player Tic-Tac-Toe" as a heading and "Game loading..." below it

### Understanding the Code:

- `<!DOCTYPE html>` - Tells the browser "this is HTML5"
- `<html lang="en">` - The root element, language is English
- `<head>` - Contains information about the page (not visible)
  - `<meta charset="UTF-8">` - Supports all characters/emojis
  - `<meta name="viewport"...>` - Makes it work on mobile devices
  - `<title>` - What shows in the browser tab
- `<body>` - Everything visible on the page
  - `<h1>` - A large heading (Heading 1)
  - `<p>` - A paragraph of text

## Success Criteria
✅ Opening `index.html` in a browser shows the title and message
✅ The browser tab shows "Four Player Tic-Tac-Toe"
✅ No errors appear in the browser

## Next Step
In Step 2, we'll add a menu where you can choose how many human players will play the game.
