import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./Navbar.css";
import Dialog from "../Dialog/Dialog";

interface DialogState {
  about: boolean;
  experience: boolean;
  projects: boolean;
}

type DialogKey = keyof DialogState;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<DialogState>({
    about: false,
    experience: false,
    projects: false,
  });

  const hamburgerMenuRef = useRef<HTMLDivElement | null>(null);

  const aboutPoints = useMemo(
    () => [
      "Full Stack Developer with 5+ years of experience in building web applications",
      "Masters in Computer Science from University of North Texas",
      "Proficient in React, Node.js, TypeScript, and cloud technologies",
      "Strong problem-solving skills and experience in agile development",
    ],
    []
  );

  const experiencePoints = useMemo(
    () => [
      "Led development of multiple full-stack applications using React and Node.js",
      "Implemented CI/CD pipelines and automated testing frameworks",
      "Collaborated with cross-functional teams to deliver high-quality software",
      "Mentored junior developers and conducted code reviews",
    ],
    []
  );

  const projectPoints = useMemo(
    () => [
      "Amazon Clone: Built a full-featured e-commerce platform with React and Redux",
      "Dining Scheduler: Developed a smart restaurant management system",
      "Linear LTSF Model: Created an ML model for energy consumption prediction",
    ],
    []
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const openDialog = useCallback((section: DialogKey) => {
    setDialogOpen((prev) => ({ ...prev, [section]: true }));
  }, []);

  const closeDialog = useCallback((section: DialogKey) => {
    setDialogOpen((prev) => ({ ...prev, [section]: false }));
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSectionAction = useCallback(
    (section: DialogKey) => {
      // Scroll first
      scrollToSection(section);

      // Then open dialog (delay allows scroll to feel natural)
      window.setTimeout(() => openDialog(section), 700);
    },
    [openDialog, scrollToSection]
  );

  // Track active section + scrolled state
  useEffect(() => {
    const sectionIds = ["about", "experience", "projects", "contact"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top;
        // tweak this threshold if needed
        if (top <= 160) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close hamburger menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const menuEl = hamburgerMenuRef.current;

      if (menuEl && !menuEl.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeMenu, isMenuOpen]);

  const navLinks = useMemo(
    () => [
      { id: "about", text: "About", dialog: true },
      { id: "experience", text: "Experience", dialog: true },
      { id: "projects", text: "Projects", dialog: true },
      { id: "contact", text: "Contact", dialog: false },
    ],
    []
  );

  return (
    <>
      {/* Desktop Nav */}
      <nav id="desktop-nav" className={isScrolled ? "scrolled" : ""}>
        <div className="logo">SaiManvith Anandesi</div>
        <div>
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              // Use button for dialog-triggering items (fixes anchor-is-valid)
              if (link.dialog) {
                return (
                  <li key={link.id}>
                    <button
                      type="button"
                      className={`nav-button ${isActive ? "active" : ""}`}
                      onClick={() => handleSectionAction(link.id as DialogKey)}
                    >
                      {link.text}
                    </button>
                  </li>
                );
              }

              // Use real link for contact (valid href)
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={isActive ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                  >
                    {link.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav id="hamburger-nav" className={isScrolled ? "scrolled" : ""}>
        <div className="logo">SaiManvith Anandesi</div>

        <div className="hamburger-menu" ref={hamburgerMenuRef}>
          <div
            className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
            aria-label="Toggle menu"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleMenu();
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`menu-links ${isMenuOpen ? "open" : ""}`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              if (link.dialog) {
                return (
                  <button
                    key={link.id}
                    type="button"
                    className={`menu-button ${isActive ? "active" : ""}`}
                    onClick={() => {
                      closeMenu();
                      handleSectionAction(link.id as DialogKey);
                    }}
                  >
                    {link.text}
                  </button>
                );
              }

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={isActive ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    scrollToSection(link.id);
                  }}
                >
                  {link.text}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Dialogs */}
      <Dialog
        isOpen={dialogOpen.about}
        onClose={() => closeDialog("about")}
        title="About Me"
        points={aboutPoints}
      />
      <Dialog
        isOpen={dialogOpen.experience}
        onClose={() => closeDialog("experience")}
        title="My Experience"
        points={experiencePoints}
      />
      <Dialog
        isOpen={dialogOpen.projects}
        onClose={() => closeDialog("projects")}
        title="My Projects"
        points={projectPoints}
      />
    </>
  );
};

export default Navbar;