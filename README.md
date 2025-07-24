# 🍎 macOS Portfolio - tyrae.dev

An interactive macOS-style portfolio website built with Next.js, featuring a fully functional desktop environment with dock, windows, and desktop icons.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🖥️ Desktop Environment

- **Interactive Dock** with dynamic icon scaling and spacing
- **Draggable Windows** with resize functionality
- **Desktop Icons** with drag-and-drop support
- **Window Management** (minimize, close, focus)
- **Menu Bar** with system information

### 📱 Mobile Responsive

- **Adaptive Layout** for mobile and tablet devices
- **Touch-Friendly** interactions
- **Optimized Performance** across all screen sizes

### 🎨 Interactive Features

- **Smooth Animations** powered by Framer Motion
- **Glassmorphism UI** with backdrop blur effects
- **Dynamic Scaling** dock icons with mouse proximity
- **Loading Screen** with macOS-style login
- **Initial Tooltip** to guide first-time visitors

### 📁 Portfolio Apps

- **About** - Personal introduction and background
- **Experience** - Professional work history
- **Projects** - Showcase of key projects
- **Skills** - Technical expertise and tools
- **Contact** - Get in touch information
- **Resume** - Professional resume with PDF download
- **AI Chat** - Interactive chatbot for questions
- **Desktop Icons** - Easter eggs and additional content

### 🔧 Technical Features

- **PDF Download** functionality for resume
- **External Link Handling** for GitHub and LinkedIn
- **Umami Analytics** integration for visitor tracking
- **SEO Optimized** with proper metadata
- **Performance Optimized** with Next.js features

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Geist, Permanent Marker)
- **Analytics**: Umami Cloud
- **Deployment**: Vercel (recommended)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/Midcrash/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Setup

Create a `.env.local` file (if needed for additional features):

```env
# Add any environment variables here
```

### PDF Resume Setup

1. Add your PDF resume to the `public` directory
2. Name it `Tyrae_Yao_Resume.pdf` (or update the filename in `ResumeApp.tsx`)

## 🎯 Usage

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Customization

#### Personal Information

Update the following files with your information:

- `src/components/apps/AboutApp.tsx` - Personal bio and introduction
- `src/components/apps/ExperienceApp.tsx` - Work experience
- `src/components/apps/ProjectsApp.tsx` - Project portfolio
- `src/components/apps/SkillsApp.tsx` - Technical skills
- `src/components/apps/ContactApp.tsx` - Contact information
- `src/components/apps/ResumeApp.tsx` - Resume content

#### Styling & Branding

- Update `src/app/layout.tsx` for site metadata
- Modify `public/favicon.svg` for site icon
- Customize colors in Tailwind classes throughout components

#### Analytics

The site includes Umami Analytics. Update the website ID in `src/app/layout.tsx`:

```tsx
data-website-id="your-website-id-here"
```

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── favicon.svg        # Site icon
│   ├── vscode.png         # App icons
│   └── Tyrae_Yao_Resume.pdf
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout with analytics
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   └── components/
│       ├── apps/          # Portfolio applications
│       │   ├── AboutApp.tsx
│       │   ├── ExperienceApp.tsx
│       │   ├── ProjectsApp.tsx
│       │   ├── SkillsApp.tsx
│       │   ├── ContactApp.tsx
│       │   ├── ResumeApp.tsx
│       │   └── ChatApp.tsx
│       ├── os/            # macOS UI components
│       │   ├── Desktop.tsx
│       │   ├── Dock.tsx
│       │   ├── Window.tsx
│       │   ├── WindowManager.tsx
│       │   ├── MenuBar.tsx
│       │   └── DesktopIcon.tsx
│       └── ui/            # Shared UI components
│           ├── LoadingScreen.tsx
│           └── InitialTooltip.tsx
└── README.md
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with each push

### Other Platforms

This Next.js app can be deployed on:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📊 Analytics

The site includes Umami Cloud Analytics for:

- Page views and navigation tracking
- User interaction monitoring
- Performance insights
- Privacy-focused analytics (GDPR compliant)

## 🎨 Design Philosophy

This portfolio mimics the macOS interface while maintaining:

- **Accessibility** - Keyboard navigation and screen reader support
- **Performance** - Optimized animations and lazy loading
- **Responsiveness** - Seamless experience across devices
- **Usability** - Intuitive interactions and clear navigation

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to:

1. Open an issue
2. Submit a pull request
3. Reach out directly via the contact form

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

**Tyrae Yao** - Software Engineer

- 🌐 Portfolio: [tyrae.dev](https://tyrae.dev)
- 💼 LinkedIn: [tyrae-yao](https://www.linkedin.com/in/tyrae-yao-08b684154/)
- 🐙 GitHub: [Midcrash](https://github.com/Midcrash)
- 📧 Email: Available through the contact form on the portfolio

---

<div align="center">
  <p><strong>Built with ❤️ using Next.js and modern web technologies</strong></p>
  <p><em>Experience the portfolio at <a href="https://tyrae.dev">tyrae.dev</a></em></p>
</div>
