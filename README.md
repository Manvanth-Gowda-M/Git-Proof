<div align="center">

<img src="https://raw.githubusercontent.com/Manvanth-Gowda-M/Git-Proof/master/public/cert-preview.png" alt="GitProof Banner" width="800" />

# 🏆 The GitProof Times

### *"All the Code That's Fit to Print"*

**Transform your GitHub repositories into stunning, printable certificates.**  
Showcase your open-source contributions with professional, newspaper-styled credentials.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](https://github.com/Manvanth-Gowda-M/Git-Proof/pulls)

[🚀 Live Demo](https://git-proof.vercel.app) · [🐛 Report Bug](https://github.com/Manvanth-Gowda-M/Git-Proof/issues) · [✨ Request Feature](https://github.com/Manvanth-Gowda-M/Git-Proof/issues)

</div>

---

## ✨ What is GitProof?

**GitProof** is a free, open-source tool that pulls your GitHub repository data and renders it as a beautiful, downloadable certificate — inspired by the timeless aesthetic of classic newspaper print.

No sign-up. No account. Just paste a GitHub URL and get your certificate.

---

## 🎨 Certificate Templates

<table>
<tr>
<td align="center" width="25%">

**📜 Repository Birth Certificate**
<br/>
The complete story of your repo — owner, stars, forks, language, and creation date in a formal, official document style.

</td>
<td align="center" width="25%">

**🏅 Achievement Badge**
<br/>
A GitHub-styled hexagonal badge with ribbon, year stamp, and lock icon — perfect for pinning to your portfolio.

</td>
<td align="center" width="25%">

**⭐ Star Milestone Certificate**
<br/>
Celebrate your stargazer count with a bold, minimal certificate that makes your milestone unforgettable.

</td>
<td align="center" width="25%">

**👨‍💻 Developer Skills Certificate**
<br/>
A verified skills card showing your tech stack, contributions, and repository metadata.

</td>
</tr>
</table>

---

## 🚀 Features

- 🔍 **Instant Analysis** — Just paste a GitHub URL (`github.com/owner/repo` or `owner/repo`)
- 📄 **4 Unique Templates** — From formal birth certificates to achievement badges
- 🖨️ **Export Ready** — Download as high-resolution **PNG** or print-quality **PDF**
- ⚡ **Zero Login Required** — Completely client-side rendering, no data stored
- 📰 **Newspaper Aesthetic** — Timeless serif typography meets modern web design
- 🔒 **Security First** — Input validation, security headers, and cached API responses
- 🌐 **100% Open Source** — Fork it, remix it, make it yours

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Language** | [TypeScript 5](https://typescriptlang.org) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **PDF Export** | [jsPDF](https://github.com/parallax/jsPDF) + [html-to-image](https://github.com/bubkoo/html-to-image) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Testing** | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| **Data Source** | [GitHub REST API v3](https://docs.github.com/en/rest) |

---

## 🏃 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Manvanth-Gowda-M/Git-Proof.git
cd Git-Proof

# 2. Install dependencies
npm install

# 3. (Optional) Add GitHub Token for higher API rate limits
cp .env.example .env.local
# Edit .env.local and add: GITHUB_TOKEN=your_token_here

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and paste any GitHub repo URL!

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Optional | GitHub Personal Access Token. Without it, you get 60 API requests/hour. With it: 5,000/hour. |

Create `.env.local`:
```env
# Optional: Add your GitHub PAT to avoid rate limits
GITHUB_TOKEN=ghp_your_token_here
```

> **How to create a token:** GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → New token (no special permissions needed for public repos)

---

## 📁 Project Structure

```
gitproof/
├── src/
│   ├── app/
│   │   ├── api/analyze/        # GitHub API proxy + caching
│   │   ├── verify/[certId]/    # Certificate verification page
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   └── page.tsx            # Home page (newspaper masthead)
│   ├── components/
│   │   ├── Generator.tsx           # Main app state & form logic
│   │   ├── Hero.tsx                # Search bar & headline
│   │   ├── CertificatePreview.tsx  # Preview + export controls
│   │   ├── TemplateSelector.tsx    # Template picker sidebar
│   │   ├── BirthCertificateTemplate.tsx      # Template 1
│   │   └── AchievementCertificateTemplate.tsx # Template 2
│   └── lib/
│       └── export.ts           # PNG/PDF export utilities
├── public/
│   └── robots.txt
├── next.config.ts              # Image domains + security headers
└── vitest.config.ts
```

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test -- --watch
```

Tests cover: API route validation, component rendering, template switching, and export flows.

---

## 🚢 Deploying to Vercel

The easiest way to deploy GitProof:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Manvanth-Gowda-M/Git-Proof)

1. Click **Deploy with Vercel** above
2. Connect your GitHub account
3. (Optional) Add `GITHUB_TOKEN` in Vercel → Project → Settings → Environment Variables
4. Deploy! 🎉

---

## 🔒 Security

GitProof is designed with security in mind:

- ✅ **Input Validation** — All GitHub owner/repo names are validated against a strict allowlist regex before API calls
- ✅ **No Data Storage** — No user data, no database, certificates are generated on-the-fly
- ✅ **Security Headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` on all routes
- ✅ **API Caching** — `Cache-Control: s-maxage=300` prevents rate limit exhaustion
- ✅ **Dependency Audits** — Regular `npm audit` monitoring

Found a vulnerability? Please [open an issue](https://github.com/Manvanth-Gowda-M/Git-Proof/issues) or reach out directly.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/my-new-template

# 3. Make your changes
# 4. Run tests
npm test

# 5. Commit with a meaningful message
git commit -m "feat: add new Contributor Certificate template"

# 6. Push and open a PR
git push origin feature/my-new-template
```

**Ideas for contributions:**
- 🎨 New certificate templates
- 🌍 Internationalization (i18n)
- 🔗 Social sharing integration
- 📊 More repo statistics

---

## 📝 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

---

## 👤 Author

**Manvanth Gowda M**

[![GitHub](https://img.shields.io/badge/GitHub-Manvanth--Gowda--M-181717?style=for-the-badge&logo=github)](https://github.com/Manvanth-Gowda-M)

---

<div align="center">

Made with ❤️ and ☕ · [GitProof](https://github.com/Manvanth-Gowda-M/Git-Proof)

*"Prove your work. Print your impact."*

</div>
