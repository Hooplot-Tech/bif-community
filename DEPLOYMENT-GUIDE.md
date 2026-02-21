# BIF Community Platform — Staging Deployment Guide

## Complete step-by-step instructions to get your platform live on a free staging URL.

You will need to create **two free accounts**: GitHub (to store your code) and Vercel (to host your website). Total setup time: approximately 15–20 minutes.

---

## STEP 1: Create a GitHub Account (Free)

GitHub is where your project code will be stored. Vercel reads from GitHub to deploy your site.

1. Open your browser and go to: **https://github.com/signup**
2. Enter your email address (use a BIF team email if possible)
3. Create a password
4. Choose a username (suggestion: `blackimpactfoundation`)
5. Complete the verification puzzle
6. Click **"Create account"**
7. Check your email for a verification code and enter it
8. You can skip the personalisation questions — click **"Skip this for now"**

✅ **Done!** You now have a GitHub account.

---

## STEP 2: Create a New Repository on GitHub

A "repository" (or "repo") is a folder for your project on GitHub.

1. Once logged in to GitHub, click the **green "New" button** (top left) or go to: **https://github.com/new**
2. Fill in:
   - **Repository name**: `bif-community`
   - **Description**: `Black Impact Foundation Community Platform`
   - **Visibility**: Select **Public** (required for free Vercel hosting)
3. **Do NOT** tick "Add a README file" (we already have our files)
4. Click **"Create repository"**
5. You will see a page with setup instructions — **keep this page open**, you'll need it in Step 4

✅ **Done!** Your repository is created.

---

## STEP 3: Upload Project Files to GitHub

There are two ways to do this. Choose whichever is easier for you:

### Option A: Upload via the GitHub Website (Easiest — No Software Needed)

1. On your repository page, click **"uploading an existing file"** link
2. Download the project ZIP file I've provided and **unzip it** on your computer
3. **Drag and drop ALL the files and folders** from the unzipped folder into the GitHub upload area:
   - `package.json`
   - `vite.config.js`
   - `vercel.json`
   - `index.html`
   - `.gitignore`
   - `public/` folder (contains `favicon.svg`)
   - `src/` folder (contains `main.jsx` and `App.jsx`)
4. In the "Commit changes" section at the bottom, type: `Initial commit — BIF Community Platform`
5. Click **"Commit changes"**

### Option B: Upload via Command Line (If You Have Git Installed)

If you have Git installed on your computer, open a terminal/command prompt and run:

```
cd path/to/your/unzipped/bif-project
git init
git add .
git commit -m "Initial commit — BIF Community Platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/bif-community.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

✅ **Done!** Your code is now on GitHub.

---

## STEP 4: Create a Vercel Account (Free)

Vercel is the hosting platform that will give you a live URL.

1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"** (this is the easiest option)
3. Authorise Vercel to access your GitHub account
4. Complete any remaining signup steps

✅ **Done!** You now have a Vercel account connected to GitHub.

---

## STEP 5: Deploy Your Project on Vercel

This is where your site goes live!

1. Once logged in to Vercel, click **"Add New..."** → **"Project"**
2. You should see your `bif-community` repository listed under "Import Git Repository"
3. Click **"Import"** next to it
4. On the configuration screen:
   - **Project Name**: `bif-community` (this determines your URL)
   - **Framework Preset**: Should auto-detect as **Vite** — if not, select it
   - **Build Command**: `npm run build` (should be pre-filled)
   - **Output Directory**: `dist` (should be pre-filled)
5. Click **"Deploy"**
6. Wait 1–2 minutes for the build to complete
7. 🎉 **Your site is now live!**

Your staging URL will be something like:
**https://bif-community.vercel.app**

✅ **Done!** Share this URL with your team for review.

---

## STEP 6: Test Your Staging Site

Visit your new URL and verify:

- [ ] Homepage loads with the hero section and BIF branding
- [ ] All navigation links work (Home, About, News, Insights, Community, Membership)
- [ ] Sign In / Register modal opens and functions
- [ ] After registering, the Member Dashboard appears
- [ ] News and Insights pages display all articles
- [ ] Membership tiers display correctly
- [ ] Footer links work (including links to BIF's real website, Instagram, LinkedIn)
- [ ] Site looks good on mobile (resize your browser or test on your phone)

---

## LATER: Connect Your Custom Domain

When you're ready to move from staging to production, you can connect a custom domain like `community.blackimpactfoundation.com`:

1. In Vercel, go to your project → **"Settings"** → **"Domains"**
2. Enter: `community.blackimpactfoundation.com`
3. Vercel will give you DNS records to add
4. Log in to your domain registrar (wherever blackimpactfoundation.com is registered)
5. Add the DNS records Vercel provided (typically a CNAME record)
6. Wait for DNS propagation (usually 5 minutes to 24 hours)
7. Vercel automatically provisions an SSL certificate (HTTPS)

---

## Making Updates

Whenever you want to update the site:

1. Edit files in your GitHub repository (you can edit directly on github.com)
2. Commit the changes
3. Vercel **automatically rebuilds and redeploys** within 1–2 minutes

No manual redeployment needed — it's fully automatic.

---

## Account Summary

| Service | URL | Cost | Purpose |
|---------|-----|------|---------|
| GitHub | github.com | Free | Code storage |
| Vercel | vercel.com | Free (Hobby plan) | Website hosting |

Both services are free for projects of this size and scale. Vercel's free tier includes:
- Unlimited deployments
- Free SSL (HTTPS)
- Automatic builds from GitHub
- Custom domain support
- Global CDN (fast loading worldwide)

---

## Need Help?

If you get stuck at any step, come back to this conversation and let me know exactly where you are. I can troubleshoot any issues.
