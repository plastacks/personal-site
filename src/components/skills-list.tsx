import React from "react";
import { Badge } from "@/components/ui/badge";

interface SkillGroup {
  description: string;
  skills: string[][];
}

export interface SkillsConfig {
  it: {
    main: SkillGroup;
    additional: SkillGroup;
  };
  en: {
    main: SkillGroup;
    additional: SkillGroup;
  };
}

interface SkillsDisplayProps {
  skills?: SkillsConfig;
  lang: "it" | "en";
}

const SkillsDisplay: React.FC<SkillsDisplayProps> = ({
  skills = skillsConfig,
  lang,
}) => {
  const titles = {
    it: { main: "Capacità principali", additional: "Capacità aggiuntive" },
    en: { main: "Main Skills", additional: "Additional Skills" },
  };

  const { main, additional } = skills[lang];

  return (
    <div className="space-y-8">
      <section>
        <h4 className="text-xl font-bold mb-2">{titles[lang].main}</h4>
        <p className="text-sm text-muted-foreground mb-4">{main.description}</p>
        <div className="space-y-4">
          {main.skills.map((nested) => (
            <div className="flex flex-wrap gap-2">
              {nested.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-xl font-bold mb-2">{titles[lang].additional}</h4>
        <p className="text-sm text-muted-foreground mb-4">
          {additional.description}
        </p>
        <div className="space-y-4">
          {additional.skills.map((nested) => (
            <div className="flex flex-wrap gap-2">
              {nested.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export { SkillsDisplay };

export const skillsConfig: SkillsConfig = {
  it: {
    main: {
      description:
        "Dispongo di una solida conoscenza dei pattern e delle best practice e ho maturato un’ampia esperienza nell’utilizzo di tali tecnologie.",
      skills: [
        ["HTML5", "CSS3", "JavaScript ES6"],
        ["TypeScript", "React 18+", "Redux Toolkit"],
        ["Material Ui", "React Hook Form", "TanStack Table"],
        ["Git"],
      ],
    },
    additional: {
      description:
        "Ho sviluppato una solida conoscenza di queste tecnologie e le ho utilizzate in vari progetti ed esercitazioni, ottenendo risultati concreti.",
      skills: [
        ["TailwindCSS", "shadcn/ui", "React query", "Astro 5+"],
        ["Zod", "drizzle-ORM", "tRPC"],
        ["Docker", "Jest"],
      ],
    },
  },
  en: {
    main: {
      description:
        "I have in-depth knowledge of best practices, and I have gained extensive experience in using these technologies.",
      skills: [
        ["HTML5", "CSS3", "JavaScript ES6"],
        ["TypeScript", "React 18+", "Redux Toolkit"],
        ["Material Ui", "React Hook Form", "TanStack Table"],
        ["Git"],
      ],
    },
    additional: {
      description:
        "I have developed a solid understanding of these technologies and applied them in various projects and exercises, achieving tangible results.",
      skills: [
        ["TailwindCSS", "shadcn/ui", "React query", "Astro 5+"],
        ["Zod", "drizzle-ORM", "tRPC"],
        ["Docker", "Jest"],
      ],
    },
  },
};
