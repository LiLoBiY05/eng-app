# Deployment Guide

This folder contains deployment configurations for the English Learning Portal.

## Contents

- `nginx/` - Nginx reverse proxy configuration
- `pm2/` - PM2 process manager configuration
- `docker/` - Docker containerization files
- `.env.example` - Environment variables template

## Deployment Options

### Option 1: Direct Deployment with PM2 (Recommended for VPS)

#### Prerequisites
- Node.js 20+
- PM2 installed globally: `npm install -g pm2`
- Nginx installed

#### Steps

1. **Build the application**
   ```bash
   yarn install
   yarn build
   ```

2. **Update PM2 configuration**
   - Edit `deployment/pm2/ecosystem.config.js`
   - Update the `cwd` path to your app directory
   - Configure environment variables as needed

3. **Start with PM2**
   ```bash
   pm2 start deployment/pm2/ecosystem.config.js
   pm2 save
   pm2 startup  # Follow the instructions to enable auto-start on boot
   ```

4. **Configure Nginx**
   - Copy nginx config: `sudo cp deployment/nginx/english-portal.conf /etc/nginx/sites-available/`
   - Update domain name and SSL certificate paths in the config
   - Enable the site: `sudo ln -s /etc/nginx/sites-available/english-portal.conf /etc/nginx/sites-enabled/`
   - Test config: `sudo nginx -t`
   - Reload nginx: `sudo systemctl reload nginx`

5. **Setup SSL with Let's Encrypt** (if not done)
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

### Option 2: Docker Deployment

#### Prerequisites
- Docker installed
- Docker Compose installed

#### Steps

1. **Using Docker Compose** (Recommended)
   ```bash
   cd deployment/docker
   docker-compose up -d
   ```

2. **Using Docker directly**
   ```bash
   # Build image
   docker build -f deployment/docker/Dockerfile -t english-portal .

   # Run container
   docker run -d \
     --name english-portal \
     -p 3010:3010 \
     --restart unless-stopped \
     english-portal
   ```

3. **Configure Nginx** (same as Option 1, step 4)

## PM2 Commands

```bash
# View logs
pm2 logs english-portal

# Monitor
pm2 monit

# Restart
pm2 restart english-portal

# Stop
pm2 stop english-portal

# View status
pm2 list

# Delete from PM2
pm2 delete english-portal
```

## Docker Commands

```bash
# View logs
docker logs -f english-portal

# Restart container
docker restart english-portal

# Stop container
docker stop english-portal

# Remove container
docker rm english-portal

# View running containers
docker ps

# Docker Compose
docker-compose logs -f
docker-compose restart
docker-compose down
```

## Environment Variables

1. Copy the example file:
   ```bash
   cp deployment/.env.example .env
   ```

2. Update `.env` with your actual values

3. For PM2: Variables are in `ecosystem.config.js`
4. For Docker: Variables can be in `.env` file (referenced in `docker-compose.yml`) or passed directly

## Nginx Configuration Notes

- The configuration assumes HTTPS with SSL certificates
- Static files from `/_nuxt/` are cached for 1 year
- Gzip compression is enabled
- Security headers are added
- Logs are written to `/var/log/nginx/`

## Troubleshooting

### PM2 not starting
```bash
# Check logs
pm2 logs english-portal --lines 100

# Check if port is already in use
sudo lsof -i :3010
```

### Docker issues
```bash
# Check container logs
docker logs english-portal

# Inspect container
docker inspect english-portal

# Rebuild image
docker-compose build --no-cache
```

### Nginx issues
```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Restart nginx
sudo systemctl restart nginx
```

## Production Checklist

- [ ] Update domain name in nginx config
- [ ] Configure SSL certificates
- [ ] Set proper environment variables
- [ ] Enable PM2 startup script (for auto-restart on reboot)
- [ ] Configure firewall (allow ports 80, 443)
- [ ] Set up monitoring (PM2 or Docker health checks)
- [ ] Configure backup strategy
- [ ] Test application after deployment
- [ ] Set up log rotation

## Security Recommendations

1. Keep Node.js and dependencies updated
2. Use environment variables for sensitive data (never commit to git)
3. Enable HTTPS only (HTTP redirects to HTTPS)
4. Configure firewall rules
5. Regular security audits: `yarn audit`
6. Limit PM2 process memory: `max_memory_restart: '1G'`
7. Use strong SSL ciphers (already configured)
8. Set up fail2ban for nginx
9. Regular backups

## Performance Optimization

1. Enable Nginx caching for static assets (already configured)
2. Use CDN for static files if needed
3. Enable gzip compression (already configured)
4. Monitor memory usage: `pm2 monit`
5. Scale with PM2 cluster mode if needed (increase `instances` in ecosystem.config.js)

## Updates and Maintenance

To update the application:

**PM2 deployment:**
```bash
git pull
yarn install
yarn build
pm2 restart english-portal
```

**Docker deployment:**
```bash
git pull
docker-compose build
docker-compose up -d
```
