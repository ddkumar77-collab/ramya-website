# Ramya's Personal Portfolio Website

This is a premium, minimalist, and high-performance personal website designed for **Ramya Deepak-Kumar**. The design is inspired by the clean, editorial aesthetic of [rebeccabirch.au](https://rebeccabirch.au).

---

## Features
* **Editorial Typography**: Pairing of serif headings (`EB Garamond`) and clean sans-serif UI typography (`Inter`).
* **Instant Load Times**: Built with standard HTML5, CSS3 variables, and vanilla JavaScript for maximum efficiency, loading in milliseconds.
* **100% Free Hosting**: Fully compatible with Vercel and GitHub Pages free-tier servers.
* **Mobile Responsive**: Optimizes automatically across phones, tablets, and wide desktop screens.

---

## File Structure
* `index.html`: Holds the markup, page structure, meta SEO tags, and content text.
* `style.css`: Contains color palettes, font pairings, visual alignment styles, and CSS grid setups.
* `script.js`: Features client-side enhancements (smooth page scroll, scroll-triggered fade animations).

---

## Local Development (Previewing the Site)

To view the website on your local machine:
1. Double-click the `index.html` file to open it in any web browser.
2. Alternatively, if you use **Visual Studio Code**, install the **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.

---

## Free Hosting & Deployment (Vercel)

Vercel is the recommended host because it provides free custom domain mapping, automatic SSL certificates, and auto-builds from GitHub.

### Option 1: Deploying via GitHub (Recommended)
1. Create a free account at [GitHub](https://github.com).
2. Create a new repository (public or private) named `ramya-website`.
3. Push these project files to the repository.
4. Log into [Vercel](https://vercel.com) using your GitHub account.
5. Click **Add New Project**, select the `ramya-website` repository, and click **Deploy**.
6. Every time you push updates to GitHub, Vercel will rebuild and update the site instantly!

### Option 2: Deploying via Vercel CLI (No GitHub required)
1. Install Node.js on your computer (if not already installed).
2. Open PowerShell or Command Prompt, and run:
   ```bash
   npm install -g vercel
   ```
3. Navigate to the website folder:
   ```bash
   cd C:\Users\Deepa\.gemini\antigravity\scratch\ramya-website
   ```
4. Run the deploy command:
   ```bash
   vercel
   ```
5. Follow the quick prompts to log in and deploy. For production releases, run:
   ```bash
   vercel --prod
   ```

---

## Mapping a Custom Domain (Zero Cost Setup)
To map a custom domain (e.g. `ramyadeepak.com`):
1. In your **Vercel Dashboard**, go to **Settings** > **Domains**.
2. Type in your registered domain name and click **Add**.
3. Vercel will provide standard **DNS records** (an `A Record` and/or a `CNAME Record`).
4. Log in to the website where you bought your domain (e.g., GoDaddy, Namecheap, Cloudflare) and paste Vercel's DNS records into your domain's DNS management console.
5. Vercel will automatically generate a free secure HTTPS certificate and publish the site under your domain name.
