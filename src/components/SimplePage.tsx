import type { ReactNode } from "react";
import {
  ContentPageLayout,
  type ContentAction,
  type ContentSection,
} from "@/components/ContentPageLayout";

type SimplePageProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  sections?: ContentSection[];
  actions?: ContentAction[];
  illustration?: ReactNode;
  heroBackground?: string;
  children: ReactNode;
};

/**
 * Backward-compatible wrapper around the shared ContentPageLayout.
 * Prefer importing ContentPageLayout directly for new pages.
 */
export function SimplePage(props: SimplePageProps) {
  return <ContentPageLayout {...props} />;
}
