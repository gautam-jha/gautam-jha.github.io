import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Gautam Jha | Software Architect | Software Engineer Portfolio",
  description:
    "Portfolio of Gautam Jha, a software engineer experienced in React, Next.js, Node.js, and scalable web applications.",
  keywords: [
    "Gautam Jha",
    "Software Engineer",
    "React",
    "Next.js",
    "Frontend Developer",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Gautam Jha" }],
  icons: {
    icon: "/favicon.ico",
  },
  creator: "Gautam Jha",
  metadataBase: new URL("https://gautam-jha.github.io"),
  openGraph: {
    title: "Gautam Jha | Software Architect | Software Engineer Portfolio",
    description:
      "Explore projects, experience, and skills of Gautam Jha - Software Architect and Software Engineer.",
    url: "https://gautam-jha.github.io",
    siteName: "Gautam Jha Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gautam Jha | Software Architect | Software Engineer Portfolio",
    description:
      "Explore projects, experience, and skills of Gautam Jha - Software Architect and Software Engineer.",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gautam Jha",
  url: "https://gautam-jha.github.io",
  jobTitle: "Software Engineer",
  image: "https://gautam-jha.github.io/profile.jpg",
  sameAs: [
    "https://github.com/gautam-jha",
    "https://linkedin.com/in/gautam-jha",
    "https://twitter.com/gautam_jha",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Micro Frontends",
    "Node.js",
    "System Design",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Delhi Technological University",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gautam Jha Portfolio",
  url: "https://gautam-jha.github.io",
  description:
    "Portfolio of Gautam Jha, Software Engineer specializing in React, Next.js and scalable web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}
