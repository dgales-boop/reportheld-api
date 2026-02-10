# Office Network Setup Guide - Docker API Access

## Your Current IP Address

**Wi-Fi:** `10.245.31.70`

This is the IP address other PCs on your network will use to access your API.

---

## Simple Office Setup (Same Network)

### Scenario: 8 PCs on Same Office Network

**Your PC (Running API):**

- IP: `10.245.31.70` (or whatever it is at office)
- Runs: Docker with API on port 3000

**Other PCs (n8n, testing, etc.):**

- Access: `http://10.245.31.70:3000/api/v1/templates`

**No special configuration needed!** ✅

---

## Step-by-Step Office Deployment

### Step 1: On Your PC (API Server)

```powershell
# 1. Navigate to project
cd C:\Projects\reportheld-rest-api

# 2. Start Docker
docker compose up --build

# 3. Find your office IP
ipconfig
# Look for "IPv4 Address" under Wi-Fi or Ethernet
# Example: 192.168.1.100 or 10.x.x.x
```

### Step 2: Test Locally First

```powershell
# On your PC, test it works
curl http://localhost:3000/health

# Should return:
# {"status":"ok","timestamp":"..."}
```

### Step 3: Allow Firewall Access

**Windows Firewall might block other PCs from accessing port 3000.**

**Option A: Allow Docker through firewall (Automatic)**

- Docker Desktop usually handles this
- Check: Windows Security → Firewall → Allow an app
- Look for "Docker Desktop" - should be allowed

**Option B: Manually allow port 3000**

```powershell
# Run PowerShell as Administrator
# Add firewall rule
netsh advfirewall firewall add rule name="Reportheld API" dir=in action=allow protocol=TCP localport=3000

# To remove later:
# netsh advfirewall firewall delete rule name="Reportheld API"
```

### Step 4: Test from Another PC

**On any other office PC:**

```powershell
# Replace with your actual IP
curl http://10.245.31.70:3000/health

# Or open browser:
http://10.245.31.70:3000
```

**If it works:** ✅ You're done!

**If it doesn't work:** See troubleshooting below

---

## Docker Network Configuration

### Current Setup (Default - Works for LAN)

Your `docker-compose.yml` already has:

```yaml
ports:
  - "3000:3000"
```

This means:

- **Host (your PC):** Port 3000
- **Container (Docker):** Port 3000
- **Other PCs can access:** `http://your-ip:3000`

### If You Need to Change Port

**Edit `docker-compose.yml`:**

```yaml
ports:
  - "8080:3000" # Use port 8080 instead
```

Then access at: `http://your-ip:8080`

---

## VirtualBox Consideration

**You mentioned VirtualBox - here's what you need to know:**

### If API Runs in VirtualBox VM

**Problem:** VirtualBox VMs have their own network

**Solution: Use Bridged Network**

1. **VirtualBox Settings:**
   - Select your VM
   - Settings → Network
   - Adapter 1: Attached to "Bridged Adapter"
   - Name: Select your Wi-Fi or Ethernet adapter

2. **Start VM and find IP:**

   ```bash
   ip addr show  # Linux
   ipconfig      # Windows
   ```

3. **VM gets its own IP on office network:**
   - Example: `192.168.1.150`
   - Other PCs access: `http://192.168.1.150:3000`

### If API Runs on Host (Not VM)

**Current setup - you're NOT using VirtualBox for the API**

- Docker Desktop runs on Windows (your host)
- No VirtualBox needed
- Simpler and faster ✅

---

## Office Network Scenarios

### Scenario 1: All PCs on Same Wi-Fi

```
Office Wi-Fi Router (192.168.1.1)
├── Your PC: 192.168.1.100 (API)
├── PC 2: 192.168.1.101 (n8n)
├── PC 3: 192.168.1.102
└── PC 4-8: ...
```

**Access:** `http://192.168.1.100:3000`

**Works automatically!** ✅

---

### Scenario 2: Mixed Wired/Wireless

```
Office Network
├── Your PC: 192.168.1.100 (Wi-Fi, API)
└── PC 2: 192.168.1.50 (Ethernet, n8n)
```

**Still works!** Same network = can communicate ✅

---

### Scenario 3: Different Subnets (Rare)

```
Network A: 192.168.1.x (Your PC)
Network B: 192.168.2.x (Other PCs)
```

**Won't work without router configuration** ❌

**Solution:** Talk to IT to bridge networks or move to same subnet

---

## n8n Access from Office Network

### If n8n Runs on Another PC

**n8n PC IP:** `192.168.1.101`
**Your API PC IP:** `192.168.1.100`

**In n8n workflow:**

```
HTTP Request Node
Method: GET
URL: http://192.168.1.100:3000/api/v1/templates
```

### If n8n Runs on Same PC as API

**Use localhost:**

```
URL: http://localhost:3000/api/v1/templates
```

---

## Static IP vs Dynamic IP

### Problem: IP Changes

**Your current IP:** `10.245.31.70`

**Problem:** This might change when you restart PC or reconnect to Wi-Fi

**Solutions:**

### Option 1: Set Static IP (Recommended for office)

**Windows Settings:**

1. Settings → Network & Internet
2. Wi-Fi → Your network → Properties
3. IP assignment → Edit
4. Manual
5. IPv4: On
6. Set:
   - IP address: `192.168.1.100` (check with IT first)
   - Subnet mask: `255.255.255.0`
   - Gateway: `192.168.1.1` (your router)
   - DNS: `8.8.8.8`

### Option 2: Router DHCP Reservation

**Ask IT to reserve your IP:**

- Bind your PC's MAC address to a specific IP
- IP stays the same even with DHCP

### Option 3: Use Hostname

**Instead of IP, use PC name:**

```
http://YOUR-PC-NAME:3000/api/v1/templates
```

**Find your PC name:**

```powershell
hostname
```

**This works if:**

- All PCs are on same Windows domain
- DNS resolution is working

---

## Troubleshooting

### Problem: Can't access from other PCs

**Check 1: Firewall**

```powershell
# Temporarily disable to test
# Windows Security → Firewall → Turn off (Domain/Private network)
# If it works, add firewall rule instead
```

**Check 2: Docker is running**

```powershell
docker ps
# Should show reportheld container
```

**Check 3: Ping test**

```powershell
# From other PC
ping 10.245.31.70

# If ping fails, network issue
# If ping works but API doesn't, firewall issue
```

**Check 4: Port is listening**

```powershell
# On your PC
netstat -ano | findstr :3000

# Should show:
# TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING
```

---

### Problem: Port 3000 already in use

**Find what's using it:**

```powershell
netstat -ano | findstr :3000
# Note the PID (last column)

tasklist | findstr <PID>
# See what program it is

# Kill it:
taskkill /PID <PID> /F
```

**Or use different port:**

```yaml
# docker-compose.yml
ports:
  - "3001:3000"
```

---

### Problem: Slow or unstable

**Possible causes:**

- Wi-Fi interference
- Network congestion
- Docker resource limits

**Solutions:**

- Use Ethernet instead of Wi-Fi
- Increase Docker memory (Docker Desktop → Settings → Resources)
- Check network speed: `ping -t 192.168.1.1`

---

## Production Recommendations

### For Permanent Office Deployment

1. **Dedicated Server PC**
   - Don't use your development laptop
   - Use a PC that stays on 24/7
   - Static IP address

2. **Reverse Proxy (nginx)**
   - Add HTTPS
   - Better performance
   - Load balancing

3. **Monitoring**
   - Health check endpoint
   - Uptime monitoring
   - Log aggregation

4. **Backup**
   - Regular backups
   - Version control (Git)
   - Disaster recovery plan

---

## Quick Reference

### Your Current Setup

```
PC IP: 10.245.31.70 (at home)
Port: 3000
Docker: Running
Access: http://10.245.31.70:3000
```

### At Office

```
1. Find office IP: ipconfig
2. Start Docker: docker compose up
3. Allow firewall: port 3000
4. Share IP with team
5. They access: http://your-office-ip:3000
```

### For n8n Team

```
HTTP Request Node
URL: http://your-office-ip:3000/api/v1/templates
Method: GET
Authentication: None (for now)
```

---

## Summary

**Simple Answer:**

✅ **Yes, same network = works automatically**

- No special Docker network config needed
- Just allow firewall (port 3000)
- Share your IP with team
- They access: `http://your-ip:3000`

**VirtualBox:**

- Not needed for this setup
- Docker Desktop on Windows is simpler
- Only use VirtualBox if you need Linux VM

**Next Steps:**

1. Test at office with one other PC
2. If works, share IP with n8n team
3. Consider static IP for stability
4. Add authentication before production use
