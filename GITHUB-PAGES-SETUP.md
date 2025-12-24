# 🚀 Deploy Lygoland Portal to GitHub Pages

Complete guide to hosting your Minecraft server portal as a live website for FREE!

---

## 📋 What You'll Get

✅ **Live Website** - Your portal accessible at `https://yourusername.github.io/lygoland-portal`  
✅ **Free Hosting** - 100% free with GitHub Pages  
✅ **SSL Certificate** - Automatic HTTPS  
✅ **Easy Updates** - Push changes instantly  

⚠️ **Important Note:** GitHub Pages only hosts static files (HTML/CSS/JS). The backend API (server controls) must run on your local machine or a server.

---

## 🎯 Setup Steps

### Step 1: Create GitHub Account
1. Go to https://github.com
2. Click "Sign up"
3. Create your account (free)

---

### Step 2: Create New Repository

1. Click the **"+"** icon (top right) → **"New repository"**

2. **Repository settings:**
   ```
   Repository name: lygoland-portal
   Description: Lygoland Minecraft Server Portal
   Public ✓ (must be public for free GitHub Pages)
   Add README: ✓
   ```

3. Click **"Create repository"**

---

### Step 3: Upload Files

**Option A: Upload via Web (Easiest)**

1. In your new repository, click **"Add file"** → **"Upload files"**

2. Drag and drop these files:
   ```
   lygoland-final.html
   lygoland-portal.html
   ```

3. **Important:** Rename `lygoland-final.html` to `index.html`
   - Right-click the file after upload → Rename → `index.html`
   - This makes it your homepage

4. Write commit message: "Add portal files"

5. Click **"Commit changes"**

**Option B: Using Git (Advanced)**

```bash
# Clone your repository
git clone https://github.com/yourusername/lygoland-portal.git
cd lygoland-portal

# Copy your files
cp /path/to/lygoland-final.html index.html
cp /path/to/lygoland-portal.html lygoland-portal.html

# Commit and push
git add .
git commit -m "Add portal files"
git push origin main
```

---

### Step 4: Enable GitHub Pages

1. In your repository, click **"Settings"** (top menu)

2. Scroll down to **"Pages"** (left sidebar)

3. Under **"Source"**:
   - Branch: `main`
   - Folder: `/ (root)`
   - Click **"Save"**

4. Wait 1-2 minutes, then refresh the page

5. You'll see: **"Your site is published at https://yourusername.github.io/lygoland-portal"**

---

## 🎨 Customize Your Site

### Update Server IP in Files

**Edit `index.html` (line ~630):**
```javascript
const CONFIG = {
    SERVER_IP: 'lygoland.online', // ← Change to your IP
    CHECK_INTERVAL: 30000
};
```

**Edit `lygoland-portal.html` (line ~1150):**
```javascript
const CONFIG = {
    API_URL: 'http://localhost:3000/api',
    SERVER_ADDRESS: 'lygoland.online', // ← Change to your IP
    STATUS_CHECK_INTERVAL: 30000,
    CREDENTIALS: { username: 'admin', password: 'admin123' }
};
```

### After editing, commit changes:
```bash
git add .
git commit -m "Update server IP"
git push origin main
```

Changes appear in 1-2 minutes!

---

## 🔗 Custom Domain (Optional)

Want `lygoland.online` instead of `username.github.io/lygoland-portal`?

### Step 1: Buy Domain
- Namecheap, GoDaddy, Cloudflare, etc.

### Step 2: Configure DNS
Add these records to your domain:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

### Step 3: Configure GitHub
1. Repository → Settings → Pages
2. Under "Custom domain", enter: `lygoland.online`
3. Click Save
4. Wait 10-30 minutes for DNS propagation
5. Check "Enforce HTTPS"

---

## ⚡ Backend API Setup (Server Controls)

GitHub Pages **CANNOT** run the Node.js backend. You have 3 options:

### Option 1: Local Backend (Recommended for Testing)
```bash
# Run on your PC
npm start

# Keep terminal open while using controls
```

**Pros:** Free, easy  
**Cons:** Only works when your PC is on

---

### Option 2: Cloud Hosting (Recommended for Production)

**Free Options:**

**A) Render.com (Easiest)**
1. Go to https://render.com
2. Sign up (free)
3. New → Web Service
4. Connect GitHub repository
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Deploy!

**B) Railway.app**
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repository
5. Auto-deploys!

**C) Fly.io**
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```

After deploying backend, update `lygoland-portal.html`:
```javascript
const CONFIG = {
    API_URL: 'https://your-backend-url.render.com/api', // ← New URL
    SERVER_ADDRESS: 'lygoland.online',
    ...
};
```

---

### Option 3: VPS Server (Advanced)

**Providers:**
- DigitalOcean ($5/month)
- Linode ($5/month)  
- Vultr ($2.50/month)

**Setup:**
```bash
# SSH into server
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Clone repository
git clone https://github.com/yourusername/lygoland-backend.git
cd lygoland-backend

# Install dependencies
npm install

# Install PM2 (keeps it running)
npm install -g pm2

# Start backend
pm2 start server-controller-fixed.js
pm2 save
pm2 startup
```

---

## 📂 Recommended File Structure

```
lygoland-portal/ (GitHub repo)
├── index.html              # Client page (renamed from lygoland-final.html)
├── lygoland-portal.html    # Admin panel
├── README.md               # Info about your project
└── CNAME                   # (Optional) Custom domain file
```

**Separate Backend Repository:**
```
lygoland-backend/ (GitHub repo)
├── server-controller-fixed.js
├── package.json
└── README.md
```

---

## 🔒 Security Tips

### 1. Change Default Password
In `lygoland-portal.html`:
```javascript
CREDENTIALS: { username: 'admin', password: 'YOUR_SECURE_PASSWORD_HERE' }
```

### 2. Environment Variables (for backend)
Never commit passwords to GitHub!

**Create `.env` file:**
```
SERVER_PATH=J:\Your\Server\Path
BATCH_FILE=start-all-servers.bat
```

**Update `server-controller-fixed.js`:**
```javascript
require('dotenv').config();

const SERVER_CONFIG = {
    serverPath: process.env.SERVER_PATH,
    startBatch: process.env.BATCH_FILE
};
```

**Add to `.gitignore`:**
```
.env
node_modules/
```

### 3. Add .gitignore
Create `.gitignore` file:
```
# Dependencies
node_modules/

# Environment variables
.env

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
```

---

## 🎯 Quick Commands Reference

### Deploy Changes
```bash
git add .
git commit -m "Update description"
git push origin main
```

### View Your Site
```
https://yourusername.github.io/lygoland-portal
```

### Check Build Status
Repository → Actions tab

---

## 🐛 Troubleshooting

### "404 Page Not Found"
- Make sure `index.html` exists in root
- Check GitHub Pages is enabled
- Wait 1-2 minutes after pushing

### "API Connection Failed"
- Backend not running
- Check API_URL in code
- Check CORS settings

### "Players not showing"
- Server offline
- Wrong server IP in CONFIG
- API rate limited (wait 30 seconds)

### Changes Not Appearing
- Clear browser cache (Ctrl + Shift + R)
- Check commit history on GitHub
- Wait 1-2 minutes for GitHub Pages rebuild

---

## 📱 Mobile Optimization

Your site is already mobile-responsive! Test on:
- Chrome DevTools (F12 → Device toolbar)
- https://responsivedesignchecker.com
- Real phone/tablet

---

## 📊 Analytics (Optional)

Add Google Analytics to track visitors:

1. Get tracking code from https://analytics.google.com
2. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ Launch Checklist

Before going live:

- [ ] Files uploaded to GitHub
- [ ] Renamed `lygoland-final.html` to `index.html`
- [ ] GitHub Pages enabled
- [ ] Server IP updated in code
- [ ] Admin password changed
- [ ] Tested on mobile
- [ ] Backend deployed (if using server controls)
- [ ] Custom domain configured (optional)
- [ ] SSL enabled (HTTPS)
- [ ] Shared link with community!

---

## 🎉 You're Live!

Your portal is now accessible at:
```
https://yourusername.github.io/lygoland-portal
```

Share this link with your players! 🚀

---

## 📞 Need Help?

- GitHub Pages Docs: https://pages.github.com
- GitHub Support: https://support.github.com
- Markdown Guide: https://guides.github.com/features/mastering-markdown

---

## 🔄 Update Workflow

1. Edit files locally
2. Test changes
3. Commit: `git add . && git commit -m "Update"`
4. Push: `git push origin main`
5. Wait 1-2 minutes
6. Refresh your site!

---

**That's it! Your Minecraft server portal is now live! 🎮✨**
