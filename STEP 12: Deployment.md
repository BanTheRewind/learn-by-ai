# STEP 12: Deployment

## What This Step Does
Teaches you how to deploy your game to the internet for FREE using GitHub Pages, and optionally how to use your own custom domain name.

## What You'll Learn
- Using Git for version control
- Publishing to GitHub
- Deploying with GitHub Pages
- Connecting a custom domain
- Best practices for web hosting

## Why This Matters
Building something is only half the journey - sharing it with the world is the other half! You'll learn:
- Version control (essential skill for all developers)
- GitHub (used by millions of developers worldwide)
- Web hosting concepts
- DNS and domain management
- How to build a portfolio

## Deployment Options

### **Option 1: GitHub Pages (Recommended - FREE!)**
Best for: Learning, portfolio projects, sharing with friends

**Pros:**
- Completely free
- Easy to set up
- Automatic updates
- Can use custom domain
- Industry-standard tool

**Cons:**
- Requires learning Git/GitHub
- Only for static sites (perfect for our game!)

### **Option 2: Netlify**
Best for: Quick deployment without Git knowledge

**Pros:**
- Very easy drag-and-drop
- Free tier available
- Great performance

### **Option 3: Vercel**
Best for: Similar to Netlify, developer-friendly

---

## Option 1: GitHub Pages (Detailed Instructions)

### Prerequisites:
1. Create a GitHub account at https://github.com
2. Install Git on your computer

### Step-by-Step Guide:

#### **Part A: Install Git**

**On macOS:**
1. Open Terminal
2. Type: `git --version`
3. If not installed, you'll be prompted to install (or use Homebrew: `brew install git`)

**On Windows:**
1. Download Git from https://git-scm.com/download/win
2. Run the installer (use default options)
3. Open "Git Bash" from Start menu

**On Linux:**
```bash
sudo apt-get update
sudo apt-get install git
```

#### **Part B: Set Up Git**

Open Terminal/Git Bash and run:
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

#### **Part C: Create a GitHub Repository**

1. Go to https://github.com and sign in
2. Click the "+" icon (top right) → "New repository"
3. Repository name: `four-player-tictactoe` (or your choice)
4. Description: "A retro 4-player tic-tac-toe game with AI"
5. Choose "Public"
6. **Do NOT** check "Add a README file"
7. Click "Create repository"

#### **Part D: Upload Your Code**

In Terminal/Git Bash, navigate to your `example` folder:
```bash
cd /path/to/your/example/folder
```

Then run these commands one at a time:

```bash
# Initialize Git in your folder
git init

# Add all your files
git add .

# Create your first commit
git commit -m "Initial commit: Four Player Tic-Tac-Toe game"

# Connect to your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/four-player-tictactoe.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username!

**If prompted for login:**
- Username: Your GitHub username
- Password: You need a Personal Access Token (not your password!)
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Give it "repo" permissions
  - Copy the token and use it as your password

#### **Part E: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click "Settings" (top menu)
3. Click "Pages" (left sidebar)
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait 1-2 minutes
7. Refresh the page - you'll see: "Your site is published at https://YOUR-USERNAME.github.io/four-player-tictactoe/"

🎉 **Your game is now live on the internet!**

#### **Part F: Update Your Game**

When you make changes to your code:

```bash
# Save your changes in Git
git add .
git commit -m "Description of what you changed"

# Push to GitHub (and auto-update the website)
git push
```

Your live site will update automatically in 1-2 minutes!

---

## Option 2: Netlify (Quick & Easy)

### Steps:

1. Go to https://www.netlify.com
2. Sign up for free (can use GitHub account)
3. Click "Add new site" → "Deploy manually"
4. Drag your entire `example` folder into the upload area
5. Wait 30 seconds
6. Done! You'll get a URL like `random-name-12345.netlify.app`

**To update:**
- Just drag and drop your folder again

**Custom domain:**
- Netlify → Site settings → Domain management → Add custom domain

---

## Adding a Custom Domain (Optional)

### Step 1: Buy a Domain Name

Popular registrars:
- **Namecheap** - Good prices, easy to use
- **Google Domains** - Simple interface
- **Cloudflare** - Cheapest, but more technical
- **GoDaddy** - Well-known, but pricier

Cost: Usually $10-15/year for .com domains

### Step 2: Connect Domain to GitHub Pages

1. In your GitHub repository, create a file named `CNAME` (no extension)
2. Inside, put just your domain: `yourdomain.com`
3. Commit and push this file
4. In your domain registrar's DNS settings, add these records:

**For root domain (yourdomain.com):**
```
Type: A
Name: @
Value: 185.199.108.153
```
```
Type: A
Name: @
Value: 185.199.109.153
```
```
Type: A  
Name: @
Value: 185.199.110.153
```
```
Type: A
Name: @
Value: 185.199.111.153
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: YOUR-USERNAME.github.io
```

5. Wait 24-48 hours for DNS to propagate
6. Visit your domain - it should show your game!

### Step 3: Enable HTTPS (Optional but Recommended)

1. Go to your GitHub repo → Settings → Pages
2. Check "Enforce HTTPS"
3. Your site will be secure! (https://)

---

## Understanding What You Did

### **Git Concepts:**

**Repository (Repo):** A folder that Git tracks
**Commit:** A saved snapshot of your code
**Push:** Upload your code to GitHub
**Pull:** Download code from GitHub
**Branch:** Different versions of your code (we used 'main')

### **GitHub Pages:**

- Free hosting for static websites
- Automatically builds from your repository
- Updates when you push new code
- Can use custom domains
- HTTPS included

### **DNS (Domain Name System):**

- Translates `yourdomain.com` to an IP address
- A records: Point to IP addresses
- CNAME records: Point to other domains
- Takes time to update worldwide (propagation)

---

## Testing Your Deployment

### Checklist:

✅ Site loads at the GitHub Pages URL
✅ All 4 player options work
✅ AI players work correctly
✅ Animations play smoothly
✅ Sounds work (may need to click first)
✅ Win/tie detection works
✅ "Play Again" button works
✅ Works on mobile devices
✅ Works in different browsers (Chrome, Firefox, Safari)

### Common Issues:

**Problem:** 404 error when visiting site
- **Fix:** Wait 2 minutes after enabling Pages, then refresh

**Problem:** Site shows old version
- **Fix:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Problem:** CSS/JS not loading
- **Fix:** Make sure file paths in HTML are correct (no `/` at the start)

**Problem:** Sounds don't work
- **Fix:** This is normal! Browsers require user interaction before playing audio

---

## Sharing Your Game

Now that it's online, share it!

**Create a good description:**
```
Four Player Tic-Tac-Toe 🎮

A retro-styled web game where up to 4 players compete
to get 3 in a row on a 5x5 grid!

✨ Features:
• 1-4 player support
• Smart AI opponents
• Retro 80s arcade aesthetic
• Cool animations and sound effects
• Mobile-friendly

🎯 Play now: [your-url-here]
💻 Built with: HTML, CSS, JavaScript
```

**Where to share:**
- Twitter/X
- LinkedIn (great for your portfolio!)
- Reddit (r/WebDev, r/gamedev)
- Discord servers
- Show friends and family!

---

## Building Your Portfolio

Add this project to your portfolio:

**On LinkedIn:**
1. Add under "Projects"
2. Include link to live site
3. Include link to GitHub repo
4. Mention technologies: HTML5, CSS3, JavaScript, Git

**On Your Resume:**
```
Personal Project: Four Player Tic-Tac-Toe Web Game
• Developed browser-based game using vanilla JavaScript
• Implemented AI with strategic decision-making algorithms
• Created responsive design supporting all device sizes
• Deployed using Git and GitHub Pages
• Technologies: HTML5, CSS3, JavaScript, Web Audio API
```

---

## Next Steps for Learning

You've completed an entire web game! Here's what to learn next:

### **Beginner Next Steps:**
1. **JavaScript fundamentals** - Variables, functions, loops, objects
2. **More CSS** - Flexbox, Grid, animations
3. **DOM manipulation** - How JavaScript controls HTML
4. **Debugging** - Using Chrome DevTools

### **Intermediate:**
1. **React** - Popular framework for building UIs
2. **APIs** - Connect to external services
3. **Local storage** - Save data in the browser
4. **More advanced Git** - Branches, pull requests

### **Advanced:**
1. **Backend development** - Node.js, databases
2. **Full-stack apps** - Connect frontend and backend
3. **TypeScript** - JavaScript with types
4. **Testing** - Writing tests for your code

---

## Resources for Continued Learning

**Free Courses:**
- freeCodeCamp.org - Comprehensive web dev curriculum
- The Odin Project - Full-stack developer path
- MDN Web Docs - Best reference for web technologies
- JavaScript.info - Deep dive into JavaScript

**Practice Projects:**
- Todo app with local storage
- Weather app using an API
- Calculator
- Pomodoro timer
- Your own game idea!

**Communities:**
- r/webdev on Reddit
- Dev.to community
- freeCodeCamp forum
- Discord coding servers

---

## Congratulations! 🎉

You've successfully:
✅ Built a complete web game from scratch
✅ Learned HTML, CSS, and JavaScript
✅ Implemented AI algorithms
✅ Created animations and sound effects
✅ Made it mobile-responsive
✅ Deployed it to the internet
✅ Learned version control with Git

**You are now a web developer!**

This project demonstrates real skills that companies hire for. Keep building, keep learning, and most importantly - have fun coding!

---

## Questions & Troubleshooting

If you run into issues:

1. **Check the console** (F12 in browser) for errors
2. **Read the error messages** - they usually tell you what's wrong
3. **Google the error** - Someone else has likely solved it
4. **Ask for help** - Stack Overflow, Reddit, Discord

Remember: Every developer spends time debugging. It's a normal part of the process!

---

**Made with ❤️ by you!**

Share your creation and be proud of what you've built. This is just the beginning of your coding journey! 🚀
