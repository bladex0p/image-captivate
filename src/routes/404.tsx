import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/site/pages";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "Page Not Found | LES Transport" },
      { name: "description", content: "The page you are looking for could not be found." },
      { property: "og:title", content: "Page Not Found | LES Transport" },
      { property: "og:description", content: "The page you are looking for could not be found." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});
