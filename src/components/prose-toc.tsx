"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getHeadingsFromElement, type Heading } from "@/lib/prose-toc";
import { Skeleton } from "@/components/ui/skeleton";

export interface TocProps {
  className?: string;
  anchorId?: string;
  tocTitle?: string;
}

export function ProseTableOfContents({
  className,
  anchorId,
  tocTitle,
}: TocProps) {
  const [activeLi, setActiveLi] = useState<number | null>(null);
  const [liPositions, setLiPositions] = useState<number[]>([]);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [scrollAreaElement, setScrollAreaElement] =
    useState<HTMLDivElement | null>(null);
  const instanceId = useRef(anchorId || "toc");
  const proseRef = useRef<HTMLElement | null>(null);
  const [markdownHeadings, setMarkdownHeadings] = useState<Heading[]>([]);

  const initializeHeadings = useCallback(() => {
    const proseElement = document.getElementById(
      `prose-toc-anchor-${instanceId.current}`
    )?.parentElement;
    if (!proseElement) {
      if (process.env.NODE_ENV === "development") {
        if (!anchorId) {
          console.warn(
            "[ProseTableOfContents] No anchorId provided - this may cause issues if multiple TOCs are used"
          );
        }
        console.warn(
          `[ProseTableOfContents] Could not find anchor element with id "prose-toc-anchor-${instanceId.current}"`
        );
      }
      return;
    }
    proseRef.current = proseElement;
    setMarkdownHeadings(getHeadingsFromElement(proseElement));
  }, [anchorId]);

  useEffect(() => {
    initializeHeadings();
  }, [initializeHeadings]);

  const handleMutations = useCallback(() => {
    if (!proseRef.current) {
      console.warn(
        "[ProseTableOfContents] No prose element to observe mutations"
      );
      return;
    }

    const observer = new MutationObserver(() => {
      setMarkdownHeadings(getHeadingsFromElement(proseRef.current!));
    });

    observer.observe(proseRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);
  useEffect(() => handleMutations(), [handleMutations]);

  const setupIntersectionObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute("data-prose-toc-index")
            );
            setActiveLi(index);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    markdownHeadings.forEach((item, index) => {
      item.element.setAttribute("data-prose-toc-index", String(index));
      observer.observe(item.element);
    });

    return () => {
      markdownHeadings.forEach((item) => {
        item.element.removeAttribute("data-prose-toc-index");
      });
      observer.disconnect();
    };
  }, [markdownHeadings]);
  useEffect(() => setupIntersectionObserver(), [setupIntersectionObserver]);

  const updateLiPositions = useCallback(() => {
    if (!scrollAreaElement) {
      return;
    }

    const liElements = scrollAreaElement.querySelectorAll("li");
    const positions: number[] = [];

    liElements.forEach((li, index) => {
      positions[index] = li.offsetTop;
    });
    setLiPositions(positions);
  }, [scrollAreaElement]);
  useEffect(() => updateLiPositions(), [updateLiPositions]);

  const scrollToActiveHeading = useCallback(() => {
    if (activeLi === null || !scrollAreaElement) {
      return;
    }

    if (liPositions[activeLi] === undefined) {
      console.error(
        "[ProseTableOfContents] No position found for active heading"
      );
    }

    const viewport = scrollAreaElement.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (viewport) {
      viewport.scrollTo({
        top: liPositions[activeLi],
        behavior: "smooth",
      });
    }
  }, [activeLi, liPositions, scrollAreaElement]);
  useEffect(() => scrollToActiveHeading(), [scrollToActiveHeading]);

  const setupResizeObserver = useCallback(() => {
    if (!scrollAreaElement) {
      return;
    }

    const child = scrollAreaElement.querySelector("nav");

    if (!child) {
      console.error(
        "[ProseTableOfContents] Missing required elements for resize observer"
      );
      return;
    }

    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      const childHeight = child.clientHeight;
      const newHeight = windowHeight > childHeight ? childHeight : windowHeight;

      if (`${newHeight}px` !== scrollAreaElement.style.height)
        scrollAreaElement.style.height = `${newHeight}px`;

      if (process.env.NODE_ENV === "development") {
        console.debug("[ProseTableOfContents] Updated scroll area height:", {
          childHeight,
          windowHeight,
          appliedHeight: newHeight,
        });
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, [scrollAreaElement]);
  useEffect(() => setupResizeObserver(), [setupResizeObserver]);

  if (!markdownHeadings.length) {
    return (
      <div
        className={cn(
          "max-h-full overflow-hidden pr-4 text-muted-foreground",
          className
        )}
      >
        <h4 className="font-semibold mb-4">
          {tocTitle || "Table of contents"}
        </h4>
        <ol className="space-y-2 text-sm">
          <li>
            <Skeleton className="h-4 w-full rounded-full" />
          </li>
          <li className="pl-2">
            <Skeleton className="h-4 w-[90%] rounded-full" />
          </li>
          <li className="pl-4">
            <Skeleton className="h-4 w-[85%] rounded-full" />
          </li>
          <li className="pl-2">
            <Skeleton className="h-4 w-[90%] rounded-full" />
          </li>
          <li>
            <Skeleton className="h-4 w-full rounded-full" />
          </li>
          <li className="pl-2">
            <Skeleton className="h-4 w-[90%] rounded-full" />
          </li>
        </ol>
      </div>
    );
  }

  const handlelinkClick =
    (heading: Heading) =>
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      heading.element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

  return (
    <div className={cn("h-full", className)}>
      <ScrollArea ref={setScrollAreaElement}>
        <nav
          className="pr-4 text-muted-foreground py-2"
          aria-label="Table of contents"
        >
          <h4 className="font-semibold mb-4">
            {tocTitle || "Table of contents"}
          </h4>
          <ol className="space-y-2 text-sm">
            {markdownHeadings.map((heading, index) => (
              <li
                key={index}
                className={cn({
                  "pl-2": heading.depth > 1,
                  "pl-4": heading.depth > 2,
                  "pl-6": heading.depth > 3,
                  "pl-8": heading.depth > 4,
                  "pl-10": heading.depth > 5,
                })}
              >
                <a
                  href={`#${heading.element.id}`}
                  className={cn("hover:text-foreground transition-colors", {
                    "text-foreground": index === activeLi,
                  })}
                  onClick={handlelinkClick(heading)}
                >
                  <span className="font-extralight text-xs">{`${heading.hierarchicalNumber}`}</span>{" "}
                  {heading.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </ScrollArea>
    </div>
  );
}

export interface AnchorProps {
  id?: string;
}

export function ProseTableOfContentsAnchor({ id }: AnchorProps) {
  return <div id={`prose-toc-anchor-${id || "toc"}`} className="hidden" />;
}
