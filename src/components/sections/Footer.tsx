import { Accessibility, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Find Accessible Places", href: "#places" },
    { label: "AccessAI Assistant", href: "#accessai" },
    { label: "Opportunities", href: "#opportunities" },
    { label: "Resources", href: "#resources" },
    { label: "Technology Hub", href: "#techhub" },
  ],
  support: [
    { label: "Blind & Visual Support", href: "#explore" },
    { label: "Hearing Support", href: "#explore" },
    { label: "Mobility Support", href: "#explore" },
    { label: "Communication Support", href: "#explore" },
    { label: "Cognitive Support", href: "#explore" },
  ],
  about: [
    { label: "Our Mission", href: "#about" },
    { label: "Our Values", href: "#about" },
    { label: "Our Team", href: "#about" },
    { label: "Community Stories", href: "#community" },
    { label: "Report a Barrier", href: "#barrier-report" },
  ],
};

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("#")) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-2.5 font-bold text-xl text-background mb-4"
              aria-label="AccessBridge - Home"
            >
              <Accessibility className="w-7 h-7" aria-hidden="true" />
              <span>AccessBridge</span>
            </a>
            <p className="text-sm text-background/70 leading-relaxed mb-6">
              Bridging the gap between people and possibilities. A digital
              accessibility platform designed to help everyone navigate the world
              more independently.
            </p>
            <div className="space-y-2 text-sm text-background/70">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  <a
                    href="mailto:info@accessbridge.com"
                    className="hover:text-background transition-colors underline"
                  >
                    info@accessbridge.com
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  <a
                    href="tel:+18001234567"
                    className="hover:text-background transition-colors underline"
                  >
                    1-800-ACCESS
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>San Francisco, CA</span>
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-background text-sm uppercase tracking-wider mb-4">
              Platform
            </h3>
            <nav aria-label="Platform links">
              <ul className="space-y-2" role="list">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-background text-sm uppercase tracking-wider mb-4">
              Support Areas
            </h3>
            <nav aria-label="Support area links">
              <ul className="space-y-2" role="list">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold text-background text-sm uppercase tracking-wider mb-4">
              About
            </h3>
            <nav aria-label="About links">
              <ul className="space-y-2" role="list">
                {footerLinks.about.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Accessibility Commitment Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-background/70">
              <Accessibility className="w-4 h-4" aria-hidden="true" />
              <span>
                This website follows{" "}
                <a
                  href="https://www.w3.org/WAI/WCAG21/quickref/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-background transition-colors"
                >
                  WCAG 2.1 Level AA
                </a>{" "}
                accessibility guidelines.
              </span>
            </div>
            <p className="text-sm text-background/50">
              © {currentYear} AccessBridge. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-background/40 text-center leading-relaxed max-w-3xl mx-auto">
            AccessBridge is a demonstration platform. It does not replace
            professional accessibility services, emergency services, or medical
            advice. The information provided is for educational and demonstration
            purposes. Always verify accessibility information before visiting a
            location. In case of emergency, contact your local emergency
            services.
          </p>
        </div>
      </div>
    </footer>
  );
}
