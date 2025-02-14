import type React from "react";

export const languages = {
  en: "English",
  it: "Italiano",
};

export const languagesIcon: Record<keyof typeof languages, React.ReactNode> = {
  en: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width="24"
      height="24"
      viewBox="0 0 256 256"
    >
      <g fill="none" strokeMiterlimit="10" strokeWidth="0">
        <path
          fill="#F3F4F5"
          d="M249.67 161.723c.096-.346.214-.683.306-1.032l-.01-.005a126.2 126.2 0 0 0 4.34-32.83 126.2 126.2 0 0 0-4.321-32.756l.011-.005c-.11-.41-.247-.812-.36-1.22-.385-1.382-.786-2.76-1.22-4.125-.227-.722-.468-1.439-.71-2.158-.205-.61-.39-1.228-.604-1.835h-.042a126.2 126.2 0 0 0-19.698-35.878l-57.364 28.685V8.628c-12.274-4.338-25.42-6.82-39.101-7.143h-6.08c-13.68.323-26.822 2.805-39.096 7.14v69.939L28.35 49.876A126.2 126.2 0 0 0 8.655 85.757H8.61c-.213.607-.401 1.225-.607 1.835-.241.717-.483 1.43-.71 2.15a120 120 0 0 0-1.22 4.13c-.112.408-.25.807-.36 1.214l.012.006a126.4 126.4 0 0 0 .022 65.597l-.011.005c.093.346.208.68.303 1.026.41 1.472.838 2.94 1.299 4.39.21.662.432 1.32.654 1.98.217.65.416 1.304.644 1.948h.047A126.2 126.2 0 0 0 28.4 205.896l57.324-28.662v69.857a126.3 126.3 0 0 0 42.134 7.216c14.78 0 28.957-2.56 42.141-7.222v-69.851l57.319 28.66a126.2 126.2 0 0 0 19.712-35.856h.042c.227-.644.427-1.302.646-1.95.222-.658.444-1.316.655-1.979.46-1.453.89-2.917 1.298-4.386"
        ></path>
        <path
          fill="#C00"
          d="M153.144 3.941c-7.208-1.464-14.649-2.276-22.247-2.456h-6.08c-7.596.18-15.034.995-22.24 2.456v98.676H3.934a127 127 0 0 0-2.526 25.24c0 8.674.876 17.14 2.54 25.323h98.63v98.595a127 127 0 0 0 25.28 2.532c8.66 0 17.115-.874 25.287-2.535V153.18h98.622a127 127 0 0 0 2.54-25.323c0-8.644-.873-17.085-2.526-25.243h-98.636z"
        ></path>
        <path
          fill="#C00"
          d="M240.937 184.436a126 126 0 0 0 6.137-14.401h-34.937zM232.434 56.766 174.449 85.76h37.688l28.833-14.418a127 127 0 0 0-8.536-14.576M14.746 71.34c-2.33 4.65-4.381 9.463-6.132 14.42h34.97zM23.325 199.009l57.947-28.974H43.585l-28.808 14.404a127 127 0 0 0 8.548 14.57"
        ></path>
        <path
          fill="#006"
          d="M28.352 49.876 85.72 78.561V8.668c-22.848 8.076-42.69 22.505-57.37 41.208M169.998 8.67v69.89l57.364-28.68c-14.677-18.704-34.516-33.134-57.364-41.21M85.723 205.89v-28.656L28.4 205.896c14.674 18.675 34.496 33.085 57.324 41.155zM169.998 177.234v69.812c22.826-8.07 42.645-22.48 57.319-41.156z"
        ></path>
      </g>
    </svg>
  ),
  it: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width="24"
      height="24"
      viewBox="0 0 256 256"
    >
      <g fill="none" strokeMiterlimit="10" strokeWidth="0">
        <path
          fill="#CE2B37"
          d="M170.007 8.631v238.454c49.08-17.352 84.257-64.119 84.3-119.133v-.19c-.043-55.012-35.224-101.782-84.3-119.13"
        ></path>
        <path
          fill="#009246"
          d="M85.707 247.082V8.632c-49.108 17.362-84.3 64.171-84.3 119.225s35.192 101.862 84.3 119.225"
        ></path>
        <path
          fill="#F3F4F5"
          d="M85.707 247.082a126.2 126.2 0 0 0 42.15 7.225c14.783 0 28.962-2.56 42.15-7.225V8.632a126.1 126.1 0 0 0-42.15-7.225 126.2 126.2 0 0 0-42.15 7.224z"
        ></path>
      </g>
    </svg>
  ),
};

export const defaultLang = "en";

export const ui = {
  en: {
    "header.title": "Hello 🌍 I'm Davide Plastini!",
    "header.subtitle.0": "Web developer",
    "header.subtitle.1": " currently based in",
    "header.subtitle.2": " 📌Pavia (PV)",
    "header.subtitle.3": "Italy",
    "article.by": "by",
    "article.toc": "Table of Contents",
    "nav.about": "About",
    "contact.contact.me": "Contact me",
    "contact.copied": "Copied to clipboard",
    "contact.send.me.an.email": "Send me an email!",
    "language.selector.language": "Language",
    "language.selector.change.the.language": "Change the language",
    "mode.selector.light": "Light",
    "mode.selector.dark": "Dark",
    "mode.selector.system": "System",
    "mode.selector.theme": "Theme",
    "blog.posts": "Posts",
    "blog.no.description": "No description available.",
    "blog.read.more": "Read more",
    "blog.lastest": "Lastest Post",
  },
  it: {
    "header.title": "Ciao 🌍 sono Davide Plastini!",
    "header.subtitle.0": "Sviluppatore web",
    "header.subtitle.1": " attualmente con base a",
    "header.subtitle.2": " 📌Pavia (PV)",
    "header.subtitle.3": "Italia",
    "article.by": "di",
    "article.toc": "Indice",
    "nav.about": "Chi sono",
    "contact.contact.me": "Contattami",
    "contact.copied": "Copiato negli appunti",
    "contact.send.me.an.email": "Mandami una email!",
    "language.selector.language": "Lingue",
    "language.selector.change.the.language": "Cambia la lingua",
    "mode.selector.light": "Chiaro",
    "mode.selector.dark": "Scuro",
    "mode.selector.system": "Sistema",
    "mode.selector.theme": "Tema",
    "blog.posts": "Post",
    "blog.no.description": "Nessuna descrizione disponibile.",
    "blog.read.more": "Leggi di più",
    "blog.lastest": "Post più recente",
  },
} as const;
