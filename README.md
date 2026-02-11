# CloudTopia - Digital & Cloud Solutions Agency

A modern, fast, and responsive marketing website built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Inter & Poppins fonts

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** (comes with Node.js)

To verify installation, run:
```bash
node --version
npm --version
```

## 🛠️ Getting Started

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

*Or if you prefer yarn:*
```bash
yarn install
```

*Or if you prefer pnpm:*
```bash
pnpm install
```

This will install all the required packages listed in `package.json`.

### 2. Run Development Server

Start the development server:

```bash
npm run dev
```

*Or with yarn:*
```bash
yarn dev
```

*Or with pnpm:*
```bash
pnpm dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

Open your browser and navigate to `http://localhost:3000` to see your website!

### 3. Build for Production

When you're ready to deploy, create an optimized production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## 📁 Project Structure

```
CloudTopia/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout with Header & Footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Footer with links
├── public/                # Static assets (images, etc.)
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Project dependencies and scripts
```

## 🎨 Theme & Styling

### Color Palette

The project uses a custom color scheme defined in `tailwind.config.ts`:

- **Primary Colors**: Blue tones (Cloud theme)
  - `primary-600`: Main brand color (#0284c7)
  - `primary-700`: Darker shade

- **Secondary Colors**: Slate/Gray tones
  - `secondary-800`: Text color
  - `secondary-900`: Dark text

- **Accent Colors**: Purple tones
  - `accent-600`: Accent highlights

### Typography

- **Body Text**: Inter font family
- **Headings**: Poppins font family

### Utilities

The project includes custom CSS classes in `globals.css`:

- `.btn` - Base button styles
- `.btn-primary` - Primary button variant
- `.btn-outline` - Outline button variant
- `.section` - Standard section spacing
- `.gradient-text` - Gradient text effect

## 🧩 Components

### Header
- Responsive navigation bar
- Mobile menu toggle
- Sticky positioning
- Logo with brand colors

### Footer
- Multi-column layout
- Social media links
- Copyright information
- Responsive design

### Layout
- Root layout wrapping all pages
- Includes Header and Footer
- SEO metadata configured

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy your Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure build settings
4. Click "Deploy"

Your site will be live in minutes!

### Other Deployment Options

- **Netlify**: Connect your Git repository
- **AWS Amplify**: Deploy via Git or CLI
- **DigitalOcean App Platform**: Connect via GitHub
- **Docker**: Build and run in a container

## 🔧 Configuration

### Customize Theme

Edit `tailwind.config.ts` to modify:
- Colors
- Fonts
- Container widths
- Breakpoints
- Custom utilities

### Update Metadata

Edit `app/layout.tsx` to change:
- Site title
- Description
- Keywords
- Open Graph tags

## 📚 Next Steps

Now that your base structure is ready, you can:

1. **Add More Pages**: Create new files in the `app/` directory
2. **Build Sections**: Add services, about, contact sections
3. **Add Content**: Replace placeholder text with your actual content
4. **Optimize Images**: Add images to `public/` folder
5. **SEO Enhancement**: Add more metadata and structured data
6. **Analytics**: Integrate Google Analytics or similar
7. **Forms**: Add contact forms with validation
8. **Animations**: Add Framer Motion or other animation libraries

## 🆘 Troubleshooting

### Port Already in Use

If port 3000 is already in use, Next.js will automatically try port 3001. Or specify a custom port:

```bash
npm run dev -- -p 3001
```

### Module Not Found

If you get module errors, try:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Build Errors

Make sure all dependencies are installed and you're using Node.js 18+.

## 📄 License

This project is open source and available for your agency use.

## 🤝 Support

For questions or issues, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

**Built with ❤️ for CloudTopia**

