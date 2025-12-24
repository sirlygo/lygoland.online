# Minecraft Server Controller - Setup Instructions

## 📋 Prerequisites
- Node.js installed (download from https://nodejs.org/)
- Your Minecraft server with "launch all.bat" file

## 🚀 Setup Steps

### 1. Install Node.js Dependencies
Open Command Prompt in the folder containing these files and run:
```bash
npm install
```

### 2. Configure Server Paths
Edit `server-controller.js` and update these lines (around line 15):

```javascript
const SERVER_CONFIG = {
    serverPath: 'C:/MinecraftServer',  // ← Change to your server folder
    startBatch: 'launch all.bat',      // ← Your batch file name
    stopCommand: 'stop',
};
```

**Example:**
If your server is at `D:\Games\MinecraftServer`, change to:
```javascript
serverPath: 'D:/Games/MinecraftServer',
```

### 3. Start the Controller API
```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════════╗
║   Minecraft Server Controller API        ║
║   Running on http://localhost:3000       ║
╚═══════════════════════════════════════════╝
```

### 4. Keep the API Running
Leave this Command Prompt window open! The API must be running for the control panel to work.

## 🌐 Update the Web Portal

The HTML portal is already configured to connect to `http://localhost:3000`. 

If you need to change the port, edit the portal HTML file and update the `API_URL` constant.

## ✅ Testing

1. Start the API: `npm start`
2. Open the portal in your browser
3. Log in to admin panel (admin/admin123)
4. Click "Start Server" button
5. Your "launch all.bat" should execute!

## 🔧 Troubleshooting

**"Server is already running" error:**
- Your batch file is already running
- Close any existing Minecraft server windows first

**"Failed to start server" error:**
- Check the `serverPath` is correct
- Check the `startBatch` filename is correct (including .bat extension)
- Make sure you have permission to run batch files

**API won't start:**
- Make sure port 3000 isn't already in use
- Try `netstat -ano | findstr :3000` to check
- You can change the port in server-controller.js (line 6)

## 🎮 Features

✅ Start/Stop/Restart server
✅ Execute console commands via RCON
✅ Create automatic backups
✅ Real-time server status
✅ Console output monitoring

## 📝 API Endpoints

- `POST /api/server/start` - Start Minecraft server
- `POST /api/server/stop` - Stop Minecraft server  
- `POST /api/server/restart` - Restart Minecraft server
- `POST /api/server/command` - Send console command
- `POST /api/server/backup` - Create backup
- `GET /api/server/status` - Get running status

## 🔒 Security Note

This API has NO authentication! Only run it on your local network. 
Never expose it to the internet without adding proper security.

## 💡 Advanced: Run as Windows Service

To keep the API running automatically:

1. Install `node-windows`:
```bash
npm install -g node-windows
```

2. Create a service installer script (save as `install-service.js`):
```javascript
var Service = require('node-windows').Service;

var svc = new Service({
  name: 'Minecraft Server Controller',
  description: 'API for controlling Minecraft server',
  script: require('path').join(__dirname,'server-controller.js')
});

svc.on('install', function(){
  svc.start();
});

svc.install();
```

3. Run: `node install-service.js`

The API will now start automatically with Windows!
