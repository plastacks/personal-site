import { v4 as uuidv4 } from "uuid";

export interface Heading {
  depth: number;
  element: HTMLElement;
  text: string;
  hierarchicalNumber: string;
}

export function getHeadingsFromElement(target: HTMLElement): Heading[] {
  const headingElements = target.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6");

  const counters: number[] = new Array(6).fill(0);

  const headings: Heading[] = Array.from(headingElements).map(
    (heading, i, headings): Heading => {
      const depth = parseInt(heading.tagName[1]);
      const depthIndex = depth - 1;

      if (i > 0) {
        const prevDepth = parseInt(headings[i - 1].tagName[1]) - 1;
        if (depthIndex <= prevDepth) {
          for (let j = depthIndex + 1; j < counters.length; j++) {
            counters[j] = 0;
          }
        }
      }

      counters[depthIndex]++;

      const hierarchicalNumber = counters
        .slice(0, depthIndex + 1)
        .filter((n) => n > 0)
        .join(".");

      if (!heading.id) {
        heading.id = uuidv4();
      }

      return {
        depth,
        element: heading,
        text: heading.textContent || "",
        hierarchicalNumber,
      };
    }
  );

  return headings;
}
