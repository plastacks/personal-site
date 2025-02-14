import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProjectCard } from "@/components/projectCard";
import type { languages } from "@/i18n/ui";

interface Feature {
  id: string;
  icon: string;
  title: string;
  content: string;
}

interface TechSection {
  title: string;
  items: string[];
}

interface ProjectConfig {
  name: string;
  overview: Record<keyof typeof languages, string>;
  features: Record<keyof typeof languages, Feature[]>;
  techStack: Record<keyof typeof languages, TechSection[]>;
  lang: keyof typeof languages;
}

interface ProjectDescriptionProps {
  config: ProjectConfig;
  className?: string;
}

export const defaultConfig: ProjectConfig = {
  name: "🌍 personal-site",
  overview: {
    en: "A modern, performant, and feature-rich personal website for web developers built with Astro, React, and shadcn/ui. Combines static site generation with dynamic interactivity for optimal performance and user experience.",
    it: "Un sito personale minimal e moderno per sviluppatori web sviluppato con Astro, React e shadcn/ui. Combina la generazione di siti statici con l'interattività dinamica per prestazioni e esperienza utente ottimali.",
  },
  features: {
    en: [
      {
        id: "performance",
        icon: "⚡",
        title: "Performance",
        content:
          "Island architecture with partial hydration, optimized assets, and lazy-loading components. Viewtransitions for smooth page transitions.",
      },
      {
        id: "i18n",
        icon: "🌐",
        title: "Internationalization",
        content:
          "Full i18n support with Astro files-based routing and content localization.",
      },
      {
        id: "theme-switcher",
        icon: "🌜",
        title: "Theme switcher",
        content:
          "Dark/light mode with system detection and smooth transitions.",
      },
      {
        id: "blog",
        icon: "📝",
        title: "Blog",
        content:
          "A minimal blog with automatic table of contents, and MDX support.",
      },
    ],
    it: [
      {
        id: "performance",
        icon: "⚡",
        title: "Prestazioni",
        content:
          "Architettura Island con idratazione parziale, risorse ottimizzate e componenti lazy-loading. Transizioni di visualizzazione per cambi di pagina fluidi.",
      },
      {
        id: "i18n",
        icon: "🌐",
        title: "Internazionalizzazione",
        content:
          "Supporto completo i18n con routing basato su file Astro e localizzazione dei contenuti.",
      },
      {
        id: "theme-switcher",
        icon: "🌜",
        title: "Cambio Tema",
        content:
          "Modalità chiara/scura con rilevamento del sistema e transizioni fluide.",
      },
      {
        id: "blog",
        icon: "📝",
        title: "Blog",
        content: "Un blog minimale con indice automatico e supporto MDX.",
      },
    ],
  },
  techStack: {
    en: [
      {
        title: "Core",
        items: ["Astro 5.0+", "React 19", "TypeScript", "Tailwind CSS"],
      },
      {
        title: "UI Components",
        items: ["shadcn/ui CLI", "shadcn/ui"],
      },
    ],
    it: [
      {
        title: "Core",
        items: ["Astro 5.0+", "React 19", "TypeScript", "Tailwind CSS"],
      },
      {
        title: "Componenti UI",
        items: ["shadcn/ui CLI", "shadcn/ui"],
      },
    ],
  },
  lang: "en",
};

const FeaturesList: React.FC<{ features: Feature[] }> = ({ features }) => (
  <Accordion type="single" collapsible className="w-full">
    {features.map((feature) => (
      <AccordionItem value={feature.id} key={feature.id}>
        <AccordionTrigger className="py-0 !no-underline">
          <Badge variant="secondary">
            {feature.icon} {feature.title}
          </Badge>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          {feature.content}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

const TechStack: React.FC<{ sections: TechSection[] }> = ({ sections }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {sections.map((section) => (
      <div key={section.title} className="space-y-2">
        <h4 className="font-medium text-sm">{section.title}</h4>
        <div className="flex flex-wrap gap-2">
          {section.items.map((item) => (
            <Badge variant="secondary" key={item}>
              {item}
            </Badge>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  config = defaultConfig,
}) => {
  const currentLang = config.lang;

  return (
    <Card className="w-full border-none shadow-none dark:bg-background">
      <CardHeader className="px-0">{config.overview[currentLang]}</CardHeader>
      <CardContent className="px-0">
        <Tabs defaultValue="tech" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tech">
              {currentLang === "en" ? "Tech Stack" : "Stack Tecnologico"}
            </TabsTrigger>
            <TabsTrigger value="features">
              {currentLang === "en" ? "Features" : "Funzionalità"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tech" className="mt-4">
            <TechStack sections={config.techStack[currentLang]} />
          </TabsContent>

          <TabsContent value="features" className="mt-4 space-y-4">
            <FeaturesList features={config.features[currentLang]} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const EnhancedProjectCard: React.FC<{ config?: ProjectConfig }> = ({
  config = defaultConfig,
}) => {
  return (
    <ProjectCard
      name={config.name}
      description={<ProjectDescription config={config} />}
      githubLink="https://github.com/plastacks/dev-personal-site-template"
    />
  );
};

export {
  ProjectDescription as ProjectDescription,
  EnhancedProjectCard as EnhancedProjectCard,
  type ProjectConfig as ProjectConfig,
};
