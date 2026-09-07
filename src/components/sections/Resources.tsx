import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { resources, type Article } from "../../data/resourcesData";

function ArticleModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => closeRef.current?.focus(), 100);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <h3 key={i} className="text-lg font-bold text-foreground mt-4 mb-2">{line.replace(/\*\*/g, "")}</h3>;
      }
      if (line.startsWith("**")) {
        const parts = line.split("**").filter(Boolean);
        return (
          <p key={i} className="text-foreground mt-3 mb-1 font-semibold">
            {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
          </p>
        );
      }
      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <li key={i} className="ml-4 text-muted-foreground leading-relaxed list-disc">
            {line.replace(/^[•\-]\s*/, "")}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={i} className="ml-4 text-muted-foreground leading-relaxed list-decimal">
            {line.replace(/^\d+\.\s*/, "")}
          </li>
        );
      }
      if (line.startsWith("*") && line.endsWith("*")) {
        return <p key={i} className="text-sm italic text-muted-foreground mt-2">{line.replace(/\*/g, "")}</p>;
      }
      if (line.trim() === "") return <br key={i} />;
      // Handle inline bold
      const boldParts = line.split(/(\*\*[^*]+\*\*)/);
      return (
        <p key={i} className="text-muted-foreground leading-relaxed">
          {boldParts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j} className="text-foreground">{part.replace(/\*\*/g, "")}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 id="article-modal-title" className="text-xl font-bold text-foreground pr-4">{article.title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-1">
          {renderContent(article.content)}
        </div>
        <div className="px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Resources() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const filtered = resources.filter((r) =>
    !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      className="py-20 lg:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="resources-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Learn. Understand. Empower.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our education and resource centre to build your knowledge and
            confidence.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="resource-search" className="sr-only">Search resources</label>
            <input
              id="resource-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res, i) => {
            const Icon = res.icon;
            return (
              <motion.div
                key={res.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {res.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {res.description}
                </p>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="text-sm text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-expanded={expanded === i}
                >
                  {expanded === i ? "Show less" : `View ${res.articles.length} articles`}
                </button>
                {expanded === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 space-y-1"
                    role="list"
                  >
                    {res.articles.map((article) => (
                      <button
                        key={article.title}
                        onClick={() => setActiveArticle(article)}
                        className="w-full flex items-center gap-2 text-sm text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                        role="listitem"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        {article.title}
                        <span className="ml-auto text-primary text-xs font-medium shrink-0">Read More →</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {activeArticle && (
          <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
