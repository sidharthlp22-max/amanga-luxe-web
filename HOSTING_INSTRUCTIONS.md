# Hosting Instructions for Hostinger

## Pre-deployment Checklist

### 1. Update Contact Information
Before deploying, update your actual contact details in these files:
- `src/components/ProductCard.tsx` (lines 18-19)
- `src/pages/ProductDetail.tsx` (lines 42-43)
- `src/pages/Contact.tsx`

Replace:
- `WHATSAPP_NUMBER`: "919999999999" → Your actual WhatsApp number (country code + number, no spaces)
- `INSTAGRAM_HANDLE`: "amanga_jewelry" → Your actual Instagram username

### 2. Update Website URL
In `index.html`, replace the canonical URL and Open Graph URL:
- Change "https://amanga-jewelry.com" to your actual domain

## Deployment Steps for Hostinger

### Option 1: File Manager Upload (Recommended for Beginners)

1. **Build your project:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with all production files.

2. **Login to Hostinger:**
   - Go to Hostinger control panel (hPanel)
   - Navigate to "File Manager"

3. **Upload files:**
   - Open the `public_html` folder (or your domain's root folder)
   - Delete any existing files (if starting fresh)
   - Upload ALL files from your `dist` folder
   - Make sure `.htaccess` file is also uploaded (enable "Show hidden files" if needed)

4. **Set permissions:**
   - Right-click on `.htaccess` → Permissions → Set to 644

### Option 2: Git Deployment (Recommended for Updates)

1. **Connect GitHub:**
   - In Hostinger hPanel, go to "Git" section
   - Click "Create repository"
   - Connect your GitHub account
   - Select your repository
   - Branch: main (or your production branch)
   - Target directory: public_html

2. **Auto-deploy:**
   - Enable auto-deploy for automatic updates on git push

### Option 3: FTP Upload

1. **Get FTP credentials:**
   - In Hostinger hPanel, go to "FTP Accounts"
   - Create or use existing FTP account

2. **Upload via FTP client:**
   - Use FileZilla or similar FTP client
   - Connect using your credentials
   - Upload contents of `dist` folder to `public_html`

## Post-Deployment Configuration

### 1. SSL Certificate
- In Hostinger hPanel → SSL
- Enable "Force HTTPS" to redirect HTTP to HTTPS

### 2. Domain Configuration
If using a custom domain:
- Point your domain to Hostinger nameservers
- Wait for DNS propagation (up to 24-48 hours)

### 3. Test Your Website
Check these URLs work correctly:
- https://yourdomain.com
- https://yourdomain.com/shop
- https://yourdomain.com/about
- https://yourdomain.com/contact
- https://yourdomain.com/product/1

### 4. Performance Optimization
The `.htaccess` file includes:
- Gzip compression
- Browser caching
- SPA routing support

## Troubleshooting

### Issue: 404 errors on page refresh
**Solution:** Ensure `.htaccess` file is in the root directory with correct content.

### Issue: Images not loading
**Solution:** Check file paths and ensure all assets from `dist/assets` are uploaded.

### Issue: White screen / blank page
**Solution:** 
1. Check browser console for errors (F12)
2. Ensure all files were uploaded correctly
3. Clear browser cache

### Issue: Old version showing
**Solution:**
1. Clear Hostinger cache (if using caching plugin)
2. Clear browser cache (Ctrl+F5)
3. Check if correct files were uploaded

## Contact Information Setup

Don't forget to update these before going live:
1. WhatsApp number in ProductCard.tsx and ProductDetail.tsx
2. Instagram handle in ProductCard.tsx and ProductDetail.tsx
3. Contact page information in Contact.tsx
4. Email address for contact form
5. Physical address (if applicable)

## SEO Checklist
- ✅ Meta descriptions added
- ✅ Keywords configured
- ✅ Open Graph tags set
- ✅ robots.txt configured
- ✅ Sitemap (consider adding sitemap.xml)
- ✅ Canonical URLs set
- ⚠️ Update URLs to your actual domain

## Support
For Hostinger-specific issues:
- Hostinger Support: https://www.hostinger.com/contact
- Knowledge Base: https://support.hostinger.com

For code issues:
- Check console logs (F12 in browser)
- Review this documentation
