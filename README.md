# Retro Arcade Portfolio

A fully interactive, retro arcade-themed portfolio website built with Next.js, Three.js, and Tailwind CSS.

## Features

### 🎮 Retro Arcade Theme
- Neon outlines and scan-line textures
- Pixel art panda mascot logo
- Classic arcade cabinet aesthetics
- CRT monitor effects

### ✨ Interactive Elements
- Three.js starfield background animation
- Parallax scrolling effects
- Smooth inertia-style animations
- Background music with arcade-style volume control
- Hidden Easter eggs and animations

### 🎯 Core Sections
- **Hero Section**: Full-screen starfield with animated panda logo
- **About Me**: Retro console text box with typing animation
- **Experience Timeline**: Interactive game cartridge timeline
- **Skills Section**: Neon-framed skill badges with filtering
- **Projects Display**: Arcade cabinet project showcase
- **Contact Form**: CRT terminal-style contact interface

### 🎪 Easter Eggs
- Konami Code activation (↑↑↓↓←→←→BA)
- "Insert Coin" secret area
- Hidden clickable pixel elements
- Color-shift mode toggle

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom arcade theme
- **3D Graphics**: Three.js for background animations
- **Animations**: Framer Motion, CSS animations
- **Audio**: HTML5 Audio API
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd retro-arcade-portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Information
Update the content in each component:
- `components/about-section.tsx` - Your bio and skills
- `components/experience-timeline.tsx` - Work experience
- `components/skills-section.tsx` - Technical skills
- `components/projects-section.tsx` - Portfolio projects
- `components/contact-section.tsx` - Contact information

### Styling
- Modify `tailwind.config.ts` for color schemes
- Update `app/globals.css` for custom animations
- Adjust neon colors in the theme configuration

### Audio
Replace the placeholder audio file:
- Add your background music file to the `public` folder
- Update the audio source in `components/audio-provider.tsx`

### Images
- Replace placeholder images with your actual project screenshots
- Update the panda logo in `components/panda-logo.tsx`
- Add your profile images to the `public` folder

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Other Platforms
1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Deploy the `out` folder to your hosting platform

## Performance Optimization

- Images are optimized with Next.js Image component
- Three.js animations are optimized for 60fps
- CSS animations use hardware acceleration
- Lazy loading for heavy components

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility Features

- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatible
- Reduced motion support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

- Three.js for 3D graphics
- Tailwind CSS for styling
- Lucide React for icons
- Next.js team for the framework

---

Built with ❤️ and lots of ☕ by [Your Name]
