const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration
const SERVER_CONFIG = {
    serverPath: 'J:\\Lygo-s-Minecraft-Servers\\Lygo Network Control Panel',
    startBatch: 'start-all-servers.bat'
};

// Track if server is running
let serverRunning = false;

// Helper to execute commands safely
function safeExec(command, callback) {
    exec(command, { 
        encoding: 'utf8',
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    }, callback);
}

// Start Minecraft Server
app.post('/api/server/start', (req, res) => {
    console.log('📡 Start request received');
    
    const batchPath = path.join(SERVER_CONFIG.serverPath, SERVER_CONFIG.startBatch);
    
    // Check if batch file exists
    if (!fs.existsSync(batchPath)) {
        console.error('❌ Batch file not found:', batchPath);
        return res.status(400).json({
            success: false,
            message: `Batch file not found: ${batchPath}`
        });
    }

    try {
        console.log('🚀 Launching batch file:', batchPath);
        
        // Escape paths properly for PowerShell - use single quotes and proper escaping
        const escapedBatchPath = batchPath.replace(/'/g, "''");
        const escapedWorkingDir = SERVER_CONFIG.serverPath.replace(/'/g, "''");
        
        // Build PowerShell command with proper escaping
        const psCommand = `Start-Process -FilePath '${escapedBatchPath}' -WorkingDirectory '${escapedWorkingDir}'`;
        
        console.log('💻 PowerShell command:', psCommand);
        
        // Execute via PowerShell
        safeExec(`powershell -Command "${psCommand}"`, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ PowerShell error:', error.message);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to start: ' + error.message
                });
            }
            
            serverRunning = true;
            console.log('✅ Batch file launched successfully via PowerShell');
            
            if (stdout) console.log('📄 Output:', stdout);
            if (stderr) console.log('📄 Stderr:', stderr);
            
            res.json({
                success: true,
                message: 'Server started! Check for new console windows.',
                path: batchPath
            });
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to start server: ' + error.message
        });
    }
});

// Stop Minecraft Server
app.post('/api/server/stop', (req, res) => {
    console.log('📡 Stop request received');
    
    // Use PowerShell to stop java processes
    const psCommand = 'Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force';
    
    safeExec(`powershell -Command "${psCommand}"`, (error, stdout, stderr) => {
        if (error) {
            console.log('⚠️ Note:', error.message);
            return res.json({
                success: false,
                message: 'No Java processes found (server might not be running)'
            });
        }
        
        serverRunning = false;
        console.log('✅ Stop command executed');
        
        res.json({
            success: true,
            message: 'All Java/Minecraft processes stopped',
            output: stdout || 'Processes terminated'
        });
    });
});

// Restart Minecraft Server
app.post('/api/server/restart', (req, res) => {
    console.log('📡 Restart request received');
    
    const batchPath = path.join(SERVER_CONFIG.serverPath, SERVER_CONFIG.startBatch);
    
    // First stop
    const stopCommand = 'Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force';
    
    safeExec(`powershell -Command "${stopCommand}"`, (error) => {
        if (error) console.log('⚠️ Stop during restart:', error.message);
        
        serverRunning = false;
        console.log('⏸️ Servers stopped, waiting 5 seconds...');
        
        // Wait 5 seconds then start
        setTimeout(() => {
            const escapedBatchPath = batchPath.replace(/'/g, "''");
            const escapedWorkingDir = SERVER_CONFIG.serverPath.replace(/'/g, "''");
            const startCommand = `Start-Process -FilePath '${escapedBatchPath}' -WorkingDirectory '${escapedWorkingDir}'`;
            
            safeExec(`powershell -Command "${startCommand}"`, (error) => {
                if (error) {
                    console.error('❌ Start during restart failed:', error.message);
                } else {
                    serverRunning = true;
                    console.log('✅ Restart sequence completed');
                }
            });
        }, 5000);
    });

    res.json({
        success: true,
        message: 'Server restarting... Servers will stop, wait 5 seconds, then start.'
    });
});

// Execute Command (requires RCON)
app.post('/api/server/command', (req, res) => {
    const { command } = req.body;
    
    console.log('📡 Command received:', command);
    
    res.json({
        success: true,
        message: 'Command logged (direct execution requires RCON setup)',
        command: command,
        note: 'To send real-time commands, enable RCON in server.properties and configure RCON library'
    });
});

// Get Server Status
app.get('/api/server/status', (req, res) => {
    // Use PowerShell to check for Java processes
    const psCommand = 'Get-Process -Name java -ErrorAction SilentlyContinue | Select-Object -First 1';
    
    safeExec(`powershell -Command "${psCommand}"`, (error, stdout) => {
        const isRunning = stdout && stdout.trim().length > 0;
        
        res.json({
            success: true,
            running: isRunning,
            tracked: serverRunning,
            details: isRunning ? 'Java processes detected' : 'No Java processes found'
        });
    });
});

// Create Backup
app.post('/api/server/backup', (req, res) => {
    console.log('📡 Backup request received');
    
    try {
        const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
        const backupFolder = path.join(SERVER_CONFIG.serverPath, 'backups');
        const backupPath = path.join(backupFolder, `backup-${timestamp}`);
        
        // Create backups folder if needed
        if (!fs.existsSync(backupFolder)) {
            fs.mkdirSync(backupFolder, { recursive: true });
        }
        
        console.log('💾 Creating backup:', backupPath);
        
        // Use PowerShell Copy-Item for reliability
        const psCommand = `Copy-Item -Path "${SERVER_CONFIG.serverPath}\\*" -Destination "${backupPath}" -Recurse -Exclude backups,*.tmp,*.log -Force`;
        
        safeExec(`powershell -Command "${psCommand}"`, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Backup failed:', error.message);
                return res.status(500).json({
                    success: false,
                    message: 'Backup failed: ' + error.message
                });
            }
            
            console.log('✅ Backup created successfully');
            res.json({
                success: true,
                message: 'Backup created successfully',
                backupName: `backup-${timestamp}`,
                location: backupPath
            });
        });

    } catch (error) {
        console.error('❌ Error creating backup:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create backup: ' + error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'online',
        timestamp: new Date().toISOString(),
        config: {
            serverPath: SERVER_CONFIG.serverPath,
            batchFile: SERVER_CONFIG.startBatch
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('\n╔═══════════════════════════════════════════╗');
    console.log('║   🎮 Minecraft Server Controller API    ║');
    console.log(`║   🌐 http://localhost:${PORT}              ║`);
    console.log('╚═══════════════════════════════════════════╝\n');
    
    console.log('📋 Available Endpoints:');
    console.log('   POST /api/server/start    - Start server');
    console.log('   POST /api/server/stop     - Stop server');
    console.log('   POST /api/server/restart  - Restart server');
    console.log('   POST /api/server/command  - Execute command');
    console.log('   POST /api/server/backup   - Create backup');
    console.log('   GET  /api/server/status   - Get status');
    console.log('   GET  /api/health          - Health check\n');
    
    console.log('📁 Configuration:');
    console.log(`   Path: ${SERVER_CONFIG.serverPath}`);
    console.log(`   Batch: ${SERVER_CONFIG.startBatch}\n`);
    
    // Verify batch file exists
    const batchPath = path.join(SERVER_CONFIG.serverPath, SERVER_CONFIG.startBatch);
    if (fs.existsSync(batchPath)) {
        console.log('✅ Batch file found!');
    } else {
        console.log('⚠️  WARNING: Batch file not found!');
        console.log(`   Expected: ${batchPath}`);
    }
    
    console.log('💡 Using PowerShell for maximum compatibility');
    console.log('\n🚀 Server ready! Waiting for requests...\n');
});

// Error handling
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error.message);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled Rejection:', error.message);
});

