# 🎮 Lygoland Minecraft Server Portal

A beautiful, modern web portal for your Minecraft server with real-time statistics, player management, and full admin control panel.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0-green.svg)

---

## ✨ Features

### 🌐 Client Portal
- **Live Server Status** - Real-time online/offline detection
- **Player Count** - See who's currently playing
- **Server Info** - Version, uptime, and statistics
- **One-Click IP Copy** - Easy server address copying
- **Responsive Design** - Perfect on desktop and mobile
- **Dark/Light Theme** - User preference support

### 🎛️ Admin Control Panel
- **Server Controls** - Start, stop, restart your server
- **Player Management** - Kick/ban players with one click
- **Live Console** - Real-time server console output
- **Command Execution** - Send RCON commands
- **System Monitoring** - CPU, RAM, and resource tracking
- **Backup System** - Create automatic server backups
- **Data Management** - Export/import portal data
- **Tab Navigation** - Organized control sections

### 🔧 Backend API
- **Server Process Control** - Launches your batch files
- **PowerShell Integration** - Reliable Windows execution
- **Backup Management** - Automated backup creation
- **Health Monitoring** - Server status tracking
- **Error Handling** - Graceful failure recovery

---

## 📦 What's Included

```
lygoland-portal/
├── lygoland-final.html          # Client landing page
├── lygoland-portal.html         # Admin control panel
├── server-controller-fixed.js   # Backend API
├── package.json                 # Node.js dependencies
├── GITHUB-PAGES-SETUP.md        # Deployment guide
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- Windows OS (for batch file execution)
- Minecraft server with batch file

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/lygoland-portal.git
   cd lygoland-portal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Server Path**
   
   Edit `server-controller-fixed.js` (lines 18-20):
   ```javascript
   const SERVER_CONFIG = {
       serverPath: 'C:\\YourServer\\Path',  // ← Change this
       startBatch: 'start-server.bat'       // ← Your batch file
   };
   ```

4. **Start Backend**
   ```bash
   npm start
   ```

5. **Open Portal**
   - Open `lygoland-final.html` in your browser
   - Or deploy to GitHub Pages (see deployment guide)

---

## 🔑 Default Login

**Username:** `admin`  
**Password:** `admin123`

⚠️ **Change this in production!**

Edit `lygoland-portal.html` (line ~1150):
```javascript
CREDENTIALS: { username: 'admin', password: 'YOUR_PASSWORD' }
```

---

## 🌍 Deployment

### GitHub Pages (Free Hosting)

Full guide: [GITHUB-PAGES-SETUP.md](GITHUB-PAGES-SETUP.md)

**Quick Steps:**
1. Create GitHub repository
2. Upload `lygoland-final.html` (rename to `index.html`)
3. Upload `lygoland-portal.html`
4. Enable GitHub Pages in Settings
5. Visit `https://yourusername.github.io/repository-name`

### Backend Hosting

Choose one:
- **Local:** Run `npm start` on your PC
- **Render.com:** Free cloud hosting
- **Railway.app:** Auto-deploy from GitHub
- **VPS:** DigitalOcean, Linode ($5/month)

---

## 📖 Usage

### Client Portal
1. Open the portal in browser
2. View live server stats
3. See online players
4. Copy server IP with one click

### Admin Panel
1. Click "🔐 Admin" button
2. Login with credentials
3. Access full control panel
4. Manage server from browser

---

## 🎨 Customization

### Change Server IP

**Client Page** (`lygoland-final.html` line ~630):
```javascript
const CONFIG = {
    SERVER_IP: 'your-server-ip.com',
    CHECK_INTERVAL: 30000
};
```

**Admin Panel** (`lygoland-portal.html` line ~1150):
```javascript
const CONFIG = {
    SERVER_ADDRESS: 'your-server-ip.com',
    ...
};
```

### Change Colors

Edit CSS variables in `<style>` section:
```css
:root {
    --accent: #00d9ff;      /* Primary color */
    --accent-2: #7c3aed;    /* Secondary color */
    --bg: #0a0f1e;          /* Background */
}
```

### Add Custom Features

The code is well-organized and commented. Feel free to modify!

---

## 🛠️ API Endpoints

When backend is running on `http://localhost:3000`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/server/start` | Start Minecraft server |
| POST | `/api/server/stop` | Stop Minecraft server |
| POST | `/api/server/restart` | Restart server |
| POST | `/api/server/command` | Execute console command |
| POST | `/api/server/backup` | Create backup |
| GET | `/api/server/status` | Get server status |
| GET | `/api/health` | Health check |

---

## 🔧 Configuration

### Backend Config

`server-controller-fixed.js`:
```javascript
const SERVER_CONFIG = {
    serverPath: 'J:\\Minecraft\\Server',  // Server directory
    startBatch: 'start.bat'               // Batch file name
};

const PORT = 3000;  // API port
```

### CORS Settings

Already configured for `localhost`. For production:
```javascript
app.use(cors({
    origin: 'https://yourdomain.com'
}));
```

---

## 🐛 Troubleshooting

### Backend Won't Start
- Check Node.js is installed: `node --version`
- Verify port 3000 is available
- Check server path is correct

### Server Won't Start
- Verify batch file path
- Check batch file permissions
- Ensure Java is installed

### Players Not Showing
- Check server is online
- Verify server IP in config
- Wait 30 seconds for API update

### Admin Panel Won't Login
- Check credentials in code
- Clear browser cache
- Check console for errors (F12)

---

## 📊 Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
✅ Mobile browsers

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📜 License

MIT License - feel free to use for your server!

---

## 🙏 Credits

- **Design:** Modern web design principles
- **Fonts:** Inter, JetBrains Mono (Google Fonts)
- **API:** mcsrvstat.us (server status)
- **Icons:** Unicode emoji

---

## 📞 Support

- **Issues:** Open a GitHub issue
- **Questions:** Check documentation
- **Updates:** Watch repository for updates

---

## 🗺️ Roadmap

Future features planned:
- [ ] Discord webhook integration
- [ ] Multiple server support
- [ ] Player statistics graphs
- [ ] Vote tracking system
- [ ] Donation integration
- [ ] Custom themes
- [ ] Multi-language support

---

## 📸 Screenshots

### Client Portal
Beautiful landing page with live stats and player list.

### Admin Panel
Full control panel with tabs for all server functions.

---

## 🎯 Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express
- **API:** REST API with CORS
- **Fonts:** Google Fonts
- **Hosting:** GitHub Pages compatible

---

## ⚡ Performance

- ⚡ Lightweight - No frameworks needed
- 🚀 Fast loading - Optimized assets
- 📱 Mobile-first - Responsive design
- 🔄 Real-time - 30-second updates
- 💾 Efficient - Minimal resource usage

---

## 🔐 Security

- ✅ Input validation
- ✅ Error handling
- ✅ No hardcoded secrets (use .env)
- ✅ CORS protection
- ✅ Rate limiting ready
- ⚠️ Change default credentials!

---

**Made with ❤️ for the Minecraft community**

**Star ⭐ this repo if you find it useful!**

---

## 📝 Changelog

### v2.0 (Current)
- ✨ Complete redesign
- ✨ Client landing page
- ✨ Admin control panel
- ✨ Backend API
- ✨ Real-time status
- ✨ Mobile responsive

### v1.0
- Initial release

---

**Questions? Found a bug? Open an issue!** 🐛
