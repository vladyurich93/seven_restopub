# Seven Restopub Website

Premium hospitality website for Seven Restopub built with Next.js 15, TypeScript, Tailwind CSS, App Router, and Framer Motion.

The owner updates business content in one place:

```text
data/siteConfig.ts
```

Photos are stored in:

```text
public/images
```

Guest actions are routed through location cards, phone buttons, Instagram, and Google Maps links.

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Build For Production

```bash
pnpm build
pnpm start
```

## Deploy On Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Select the `Next.js` framework preset.
4. Deploy.

## Replace The Logo

Replace this file:

```text
public/images/logo/seven-logo.svg
```

Or update the path in `data/siteConfig.ts`:

```ts
logo: "/images/logo/seven-logo.svg"
favicon: "/images/logo/seven-logo.svg"
```

The logo is used in the Header, Footer, favicon, and OpenGraph metadata.

## Upload Photos

Use these folders:

```text
public/images/hero
public/images/locations
public/images/gallery
public/images/events
public/images/menu
```

Then update the matching image path in `data/siteConfig.ts`.

Examples:

```ts
heroImages: ["/images/hero/new-hero.jpg"]

galleryImages: [
  { src: "/images/gallery/new-photo.jpg", alt: "Seven Restopub atmosphere" }
]
```

## Add A New Location

Add a new object to `locations` in `data/siteConfig.ts`.

```ts
{
  id: "new-location",
  name: "Seven Restopub New Location",
  city: "Львів",
  phone: "+38 (000) 000 00 00",
  address: "Full address",
  googleMaps: "https://maps.google.com/?q=...",
  instagram: "https://instagram.com/...",
  menuLink: "https://choiceqr.com/...",
  workingHours: "Пн-Чт: 12:00-23:00, Пт-Нд: 12:00-01:00",
  image: "/images/locations/new-location.jpg",
  features: ["Тераса", "Кальян", "Жива музика"]
}
```

New locations automatically appear on the home page, locations page, menu page, contacts page, and footer.

## Change Phone Numbers

Update each location's `phone` field in `data/siteConfig.ts`.

The phone reservation buttons use the phone number from each location.

## Change Instagram Or TikTok

Global links:

```ts
instagram: "https://..."
tiktok: "https://..."
```

Location-specific Instagram:

```ts
instagram: "https://..."
```

## Change Google Maps Links

Update each location's `googleMaps` field.

## Change Menu Links

Update each location's `menuLink`:

```ts
menuLink: "https://choiceqr.com/..."
```

The menu page and location cards use the matching location menu.

## Update Events

Edit the `events` array:

```ts
{
  id: "sports",
  title: "Спортивні трансляції",
  category: "Футбол",
  description: "Event description",
  date: "Щотижня",
  image: "/images/events/event-football-01.jpg"
}
```

## Update Working Hours

For a location:

```ts
workingHours: "Пн-Чт: 12:00-23:00, Пт-Нд: 12:00-01:00"
```

## Important

The owner should only need to:

1. Upload or replace photos in `public/images`.
2. Edit business information in `data/siteConfig.ts`.

No component code is required for routine content updates.
