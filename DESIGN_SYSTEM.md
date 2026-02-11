# CloudTopia Design System

A comprehensive design system for CloudTopia's digital presence. Modern, clean, and professional.

## 🎨 Design Philosophy

**Look & Feel**: Modern, clean, techy, and trustworthy
**Target Audience**: Businesses seeking digital transformation and cloud solutions
**Tone**: Professional startup vibe with technological sophistication

## Color Palette

### Primary Colors (Blue/Teal)
Cloud and tech-focused palette for trust and reliability.

```css
primary-50:  #f0f9ff
primary-100: #e0f2fe
primary-500: #0ea5e9  /* Main brand color */
primary-600: #0284c7
primary-700: #0369a1
primary-900: #0c4a6e
```

**Usage**: Primary CTAs, links, brand elements, icons

### Secondary Colors (Purple/Indigo)
Soft accent color for innovation and creativity.

```css
secondary-50:  #eef2ff
secondary-100: #e0e7ff
secondary-500: #6366f1  /* Main accent */
secondary-600: #4f46e5
secondary-700: #4338ca
secondary-900: #312e81
```

**Usage**: Secondary CTAs, accents, hover states, secondary icons

### Neutral Colors (Grayscale)
Professional neutrals for backgrounds, text, and UI elements.

```css
neutral-50:  #fafafa  /* Light backgrounds */
neutral-100: #f5f5f5  /* Subtle backgrounds */
neutral-400: #a3a3a3
neutral-600: #525252
neutral-700: #404040  /* Body text */
neutral-800: #262626
neutral-900: #171717  /* Headings */
```

**Usage**: Text, backgrounds, borders, cards

## Typography

### Font Families

**Headings**: Poppins (600-800 weight)
- Bold, modern, attention-grabbing
- Used for: H1-H6, section titles

**Body**: Inter (300-700 weight)
- Clean, readable, professional
- Used for: Paragraphs, UI text, labels

### Type Scale

```css
display:    4.5rem (72px) - line-height: 1.1
h1:         3.5rem (56px) - line-height: 1.2
h2:         2.5rem (40px) - line-height: 1.3
h3:         2rem (32px)   - line-height: 1.4
h4:         1.5rem (24px) - line-height: 1.5
h5:         1.25rem (20px)- line-height: 1.5
body-lg:    1.125rem (18px)
body:       1rem (16px)
body-sm:    0.875rem (14px)
```

### Usage Classes

```tsx
<h1 className="text-display">Display Heading</h1>
<h2 className="text-title">Page Title</h2>
<p className="text-subtitle">Subtitle Text</p>
<h3 className="text-section-heading">Section Heading</h3>
<p className="text-body-large">Large body text</p>
<p className="text-body">Regular body text</p>
```

## Components

### 1. Buttons

Professional, accessible buttons with multiple variants.

```tsx
import { PrimaryButton, SecondaryButton, OutlineButton } from '@/components/ui/Button'

// Primary button (main CTAs)
<PrimaryButton size="large">Get Started</PrimaryButton>

// Secondary button (secondary actions)
<SecondaryButton>Learn More</SecondaryButton>

// Outline button (tertiary actions)
<OutlineButton>View Details</OutlineButton>
```

**Variants**:
- `primary`: Blue background, white text (main CTAs)
- `secondary`: Purple background, white text (secondary CTAs)
- `outline`: Transparent with blue border (tertiary CTAs)
- `ghost`: Transparent hover background (low priority)

**Sizes**:
- `small`: Compact (px-4 py-2)
- `default`: Standard (px-6 py-3)
- `large`: Prominent (px-8 py-4)

### 2. Section

Consistent section wrapper with proper spacing and container.

```tsx
import Section from '@/components/ui/Section'

// Default section
<Section>
  {/* Your content */}
</Section>

// Gray background
<Section background="gray">
  {/* Your content */}
</Section>

// Gradient background
<Section background="gradient">
  {/* White text content */}
</Section>

// Small section
<Section size="small">
  {/* Your content */}
</Section>
```

**Props**:
- `size`: 'default' | 'small'
- `background`: 'white' | 'gray' | 'gradient'
- `id`: For anchor links
- `className`: Additional classes

### 3. Card

Clean card component for content grouping.

```tsx
import Card from '@/components/ui/Card'

<Card>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

**Features**:
- White background with subtle shadow
- Rounded corners (rounded-2xl)
- Border for definition
- Hover effect (optional)

### 4. Tag/Badge

Small labels for categories, status, or highlights.

```tsx
import Tag from '@/components/ui/Tag'

<Tag variant="primary">Featured</Tag>
<Tag variant="secondary">New</Tag>
<Tag variant="neutral">AWS</Tag>
```

**Variants**:
- `primary`: Blue background
- `secondary`: Purple background
- `neutral`: Gray background

## Spacing System

### Section Spacing

```css
section (default): py-16 md:py-24 lg:py-32
section-sm:        py-12 md:py-16
```

### Container

```css
max-width: 1280px (7xl)
padding: 1rem (mobile) → 6rem (2xl desktop)
```

## Layout Patterns

### Hero Section

```tsx
<Section className="text-center">
  <div className="max-w-4xl mx-auto">
    <Tag variant="primary" className="mb-6">
      Badge Text
    </Tag>
    <h1 className="mb-6">
      Your Main <span className="gradient-text">Headline</span>
    </h1>
    <p className="text-body-large text-neutral-600 mb-8">
      Supporting text goes here
    </p>
    <div className="flex gap-4 justify-center">
      <PrimaryButton size="large">Primary CTA</PrimaryButton>
      <OutlineButton size="large">Secondary CTA</OutlineButton>
    </div>
  </div>
</Section>
```

### Service Cards Grid

```tsx
<Section background="gray">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <Card>
      <div className="w-12 h-12 bg-primary-100 rounded-lg mb-4">
        {/* Icon */}
      </div>
      <h3 className="text-h4 mb-3">Service Title</h3>
      <p className="text-body text-neutral-600 mb-4">
        Service description
      </p>
      <Tag variant="primary">Category</Tag>
    </Card>
  </div>
</Section>
```

### CTA Section

```tsx
<Section background="gradient" className="text-center">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-title text-white mb-4">
      Call to Action Heading
    </h2>
    <p className="text-body-large text-white/90 mb-8">
      Supporting message
    </p>
    <PrimaryButton size="large" className="bg-white text-primary-600">
      Take Action
    </PrimaryButton>
  </div>
</Section>
```

## Utility Classes

### Gradients

```css
.gradient-text    /* Blue to purple text gradient */
.gradient-bg      /* Blue to purple background */
.bg-gradient-hero /* Hero gradient background */
```

### Text Utilities

```css
.text-balance     /* Better text wrapping */
```

## Best Practices

### 1. White Space
- Use generous padding and margins
- Let content breathe
- Avoid cramming elements together

### 2. Hierarchy
- Use proper heading levels (h1 → h6)
- Maintain consistent type scale
- Primary actions should be visually prominent

### 3. Accessibility
- Maintain WCAG AA contrast ratios (minimum 4.5:1)
- Use semantic HTML
- Include focus states on interactive elements
- Add aria-labels where needed

### 4. Responsiveness
- Mobile-first approach
- Test on all breakpoints (sm, md, lg, xl, 2xl)
- Stack elements vertically on mobile

### 5. Consistency
- Use design system components
- Don't create one-off styles
- Maintain color palette
- Follow spacing system

## File Structure

```
components/
├── ui/                    # Design system components
│   ├── Button.tsx        # Button variants
│   ├── Section.tsx       # Section wrapper
│   ├── Card.tsx          # Card component
│   ├── Tag.tsx           # Badge/Tag component
│   └── index.ts          # Exports
├── Header.tsx            # Site header
└── Footer.tsx            # Site footer

app/
├── globals.css           # Global styles & utilities
└── layout.tsx            # Root layout

tailwind.config.ts        # Theme configuration
```

## Examples

Check `app/page.tsx` for live examples of all components and patterns in action.

## Resources

- **Fonts**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter) & [Poppins](https://fonts.google.com/specimen/Poppins)
- **Icons**: Using Heroicons (built-in SVG icons)
- **Colors**: Tailwind CSS color system

---

**Version**: 1.0  
**Last Updated**: December 2025  
**Maintained by**: CloudTopia Design Team

