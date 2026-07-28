(function () {
  "use strict";

  const TRANSITION_MS = 180;
  const PLOT_RETRY_MS = 150;
  const PLOT_RETRY_LIMIT = 24;
  const INTRO_MODE_KEY = "cdsSeedIntroMode";
  const INTRO_TARGET_KEY = "cdsSeedIntroTarget";
  const STORY_SECTIONS = Object.freeze([
    { key: "home", href: "./" },
    { key: "synthetic", href: "synthetic.html" },
    { key: "real", href: "real.html" },
    { key: "summary", href: "summary.html" },
    { key: "report", href: "report.html" },
    { key: "framework", href: "framework.html" },
    { key: "data", href: "data.html" }
  ]);

  function element(tagName, className, text) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function track(eventName, details) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, details);
    }
  }

  function finishStoryBoot() {
    if (window.__cdsStoryBootTimer) {
      window.clearTimeout(window.__cdsStoryBootTimer);
      window.__cdsStoryBootTimer = null;
    }
    document.documentElement.classList.remove("cds-story-booting");
  }

  function initialiseStory() {
    const pageKey = document.body.dataset.storyPage;
    const story = window.CDS_STORIES && window.CDS_STORIES[pageKey];
    const sectionIndex = STORY_SECTIONS.findIndex((section) => section.key === pageKey);
    const root = document.querySelector("[data-story-root]");
    const launcher = document.querySelector("[data-story-launcher]");

    if (
      !story ||
      sectionIndex < 0 ||
      !root ||
      !launcher ||
      !Array.isArray(story.steps) ||
      !story.steps.length
    ) {
      finishStoryBoot();
      return;
    }

    const stepLabel = root.querySelector("[data-story-step-label]");
    const title = root.querySelector("[data-story-title]");
    const copy = root.querySelector("[data-story-copy]");
    const caption = root.querySelector("[data-story-caption]");
    const references = root.querySelector("[data-story-references]");
    const visual = root.querySelector("[data-story-visual]");
    const progress = root.querySelector("[data-story-progress]");
    const count = root.querySelector("[data-story-count]");
    const previous = root.querySelector("[data-story-previous]");
    const next = root.querySelector("[data-story-next]");
    const close = root.querySelector("[data-story-close]");
    const navigationTargets = Array.from(
      document.querySelectorAll("[data-story-target]")
    );
    const backgroundNodes = Array.from(document.body.children).filter((node) => {
      return !node.matches(".site-navbar, .cds-story, .cds-story-launcher, script");
    });
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let currentStep = 0;
    let previousFocus = null;
    let transitionTimer = null;
    let plotRenderToken = 0;
    let storyIsOpen = false;

    root.style.setProperty("--story-accent", story.accent || "#ffd400");
    story.steps.forEach((unusedStep, index) => {
      const dot = element("button", "cds-story__dot");
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to introduction step ${index + 1}`);
      dot.addEventListener("click", () => moveTo(index));
      progress.appendChild(dot);
    });

    function cleanupVisual() {
      plotRenderToken += 1;
      const plot = visual.querySelector(".cds-story-plot");
      if (plot && window.Plotly && typeof window.Plotly.purge === "function") {
        try {
          window.Plotly.purge(plot);
        } catch (error) {
          // A partially rendered plot does not require further cleanup.
        }
      }
      visual.replaceChildren();
    }

    let labelFitFrame = 0;

    function fitReplayBoxLabels() {
      const labels = visual.querySelectorAll(
        ".cds-story-flow h3, .cds-story-token h3"
      );

      labels.forEach((label) => {
        label.style.removeProperty("font-size");
        const maximumSize = Number.parseFloat(window.getComputedStyle(label).fontSize);
        if (!Number.isFinite(maximumSize) || label.clientWidth <= 0) return;

        label.style.setProperty("font-size", `${maximumSize}px`, "important");
        if (label.scrollWidth <= label.clientWidth) return;

        const fittedSize = Math.max(
          15,
          Math.floor(
            maximumSize * (label.clientWidth / label.scrollWidth) * 0.96 * 10
          ) / 10
        );
        label.style.setProperty("font-size", `${fittedSize}px`, "important");
      });
    }

    function scheduleReplayLabelFit() {
      window.cancelAnimationFrame(labelFitFrame);
      labelFitFrame = window.requestAnimationFrame(fitReplayBoxLabels);
    }

    function renderOrbit(spec) {
      const scene = element("div", "cds-story-visual cds-story-orbit");
      scene.appendChild(element("div", "cds-story-orbit__ring"));
      scene.appendChild(element("div", "cds-story-orbit__center", spec.center));
      (spec.nodes || []).forEach((label, index) => {
        scene.appendChild(element(
          "div",
          `cds-story-orbit__node cds-story-orbit__node--${index + 1}`,
          label
        ));
      });
      visual.appendChild(scene);
    }

    function renderFlow(spec) {
      const scene = element("div", "cds-story-visual cds-story-flow");
      const items = spec.items || [];
      items.forEach((item, index) => {
        const card = element("section", "cds-story-flow__item");
        card.appendChild(element("h3", "", item.title));
        if (item.text) card.appendChild(element("p", "", item.text));
        if (item.reference) {
          card.appendChild(element("span", "cds-story-item-reference", item.reference));
        }
        scene.appendChild(card);
        if (index < items.length - 1) {
          const connector = element("span", "cds-story-flow__connector", "→");
          connector.setAttribute("aria-hidden", "true");
          scene.appendChild(connector);
        }
      });
      visual.appendChild(scene);
    }

    function renderCards(spec) {
      const scene = element("div", "cds-story-visual cds-story-cards");
      (spec.items || []).forEach((item) => {
        const card = element("section", "cds-story-card");
        card.appendChild(element("h3", "", item.title));
        if (item.text) card.appendChild(element("p", "", item.text));
        if (item.reference) {
          card.appendChild(element("span", "cds-story-item-reference", item.reference));
        }
        scene.appendChild(card);
      });
      visual.appendChild(scene);
    }

    function renderDimensions(spec) {
      const scene = element("div", "cds-story-visual cds-story-dimensions");
      (spec.items || []).forEach((item) => {
        const card = element("section", "cds-story-dimension");
        card.appendChild(element("h3", "", item.title));
        if (item.text) card.appendChild(element("p", "", item.text));
        if (item.reference) {
          card.appendChild(element("span", "cds-story-item-reference", item.reference));
        }
        scene.appendChild(card);
      });
      visual.appendChild(scene);
    }

    function renderTokens(spec) {
      const items = spec.items || [];
      const scene = element(
        "div",
        `cds-story-visual cds-story-tokens cds-story-tokens--${Math.min(items.length, 6)}`
      );
      items.forEach((item) => {
        const label = typeof item === "string" ? item : item.title;
        const card = element("section", "cds-story-token");
        card.appendChild(element("h3", "", label));
        scene.appendChild(card);
      });
      visual.appendChild(scene);
    }

    function renderQuestions(spec) {
      const colours = ["#2d9cdb", "#8e44ad", "#1f8f5f", "#c0392b"];
      const scene = element("div", "cds-story-visual cds-story-questions");
      (spec.items || []).forEach((item, index) => {
        const card = element("section", "cds-story-question");
        card.style.setProperty("--question-color", colours[index % colours.length]);
        card.appendChild(element("span", "cds-story-question__code", item.code));
        card.appendChild(element("h3", "", item.title));
        card.appendChild(element("p", "", item.text));
        if (item.reference) {
          card.appendChild(element("span", "cds-story-item-reference", item.reference));
        }
        scene.appendChild(card);
      });
      visual.appendChild(scene);
    }

    function renderImage(spec) {
      const scene = element("div", "cds-story-visual cds-story-media");
      const image = document.createElement("img");
      image.src = spec.src;
      image.alt = spec.alt || "";
      image.decoding = "async";
      scene.appendChild(image);
      visual.appendChild(scene);
    }

    function renderSourceImage(spec) {
      const sourceImages = Array.from(
        document.querySelectorAll('img[role="img"][src^="data:image"]')
      ).filter((image) => !image.closest("[data-story-root]"));
      const source = sourceImages[spec.index || 0];

      if (!source) {
        const scene = element("div", "cds-story-plot-status");
        scene.appendChild(element(
          "p",
          "",
          "Select Explore to inspect this figure."
        ));
        visual.appendChild(scene);
        return;
      }

      const scene = element("div", "cds-story-visual cds-story-media");
      const image = document.createElement("img");
      image.src = source.currentSrc || source.src;
      image.alt = spec.alt || source.alt || "";
      image.decoding = "async";
      scene.appendChild(image);
      visual.appendChild(scene);
    }

    function renderMethodMap(spec) {
      const scene = element("div", "cds-story-visual cds-story-methods");
      (spec.items || []).forEach((item) => {
        const card = element("section", "cds-story-method");
        card.appendChild(element("h3", "", item.title));
        if (item.text) card.appendChild(element("p", "", item.text));
        if (item.reference) {
          card.appendChild(element("span", "cds-story-item-reference", item.reference));
        }
        scene.appendChild(card);
      });
      visual.appendChild(scene);
    }

    function renderTable(spec) {
      const sourceTables = Array.from(document.querySelectorAll("table")).filter((table) => {
        return !table.closest("[data-story-root]");
      });
      const source = sourceTables[spec.index];
      const scene = element("div", "cds-story-table-wrap");

      if (!source) {
        scene.appendChild(element("p", "cds-story-plot-status", "Select Explore to inspect this table."));
        visual.appendChild(scene);
        return;
      }

      const rows = Array.from(source.querySelectorAll("tr")).slice(0, 5);
      const selectedColumns = Array.isArray(spec.columns) ? spec.columns : [0, 1, 2, 3];
      const table = element("table", "cds-story-table");
      const body = document.createElement("tbody");

      rows.forEach((sourceRow, rowIndex) => {
        const row = document.createElement("tr");
        const cells = Array.from(sourceRow.querySelectorAll("th, td"));
        selectedColumns.forEach((columnIndex) => {
          const sourceCell = cells[columnIndex];
          const cell = document.createElement(rowIndex === 0 ? "th" : "td");
          cell.textContent = sourceCell ? sourceCell.textContent.trim() : "—";
          cell.title = cell.textContent;
          row.appendChild(cell);
        });
        body.appendChild(row);
      });

      table.appendChild(body);
      scene.appendChild(table);
      visual.appendChild(scene);
    }

    function renderPlot(spec) {
      const scene = element("div", "cds-story-plot");
      scene.appendChild(element("div", "cds-story-plot-status", "Preparing the interactive figure…"));
      visual.appendChild(scene);
      const token = plotRenderToken;

      function attempt(retryCount) {
        if (token !== plotRenderToken || !storyIsOpen) return;

        const widgets = document.querySelectorAll(".plotly.html-widget");
        const widget = widgets[spec.index];
        const payloadNode = widget && document.querySelector(`script[data-for="${widget.id}"]`);

        if (!widget || !payloadNode || !window.Plotly || typeof window.Plotly.newPlot !== "function") {
          if (retryCount < PLOT_RETRY_LIMIT) {
            window.setTimeout(() => attempt(retryCount + 1), PLOT_RETRY_MS);
          } else {
            scene.replaceChildren(element(
              "p",
              "cds-story-plot-status",
              "Select Explore to use this interactive figure."
            ));
          }
          return;
        }

        try {
          const payload = JSON.parse(payloadNode.textContent);
          const plot = payload.x || payload;
          const layout = Object.assign({}, plot.layout || {});
          const config = Object.assign({}, plot.config || {}, {
            responsive: true,
            displaylogo: false,
            displayModeBar: false
          });

          delete layout.width;
          delete layout.height;
          layout.autosize = true;
          layout.paper_bgcolor = "rgba(255,255,255,0)";
          layout.plot_bgcolor = "rgba(255,255,255,0)";
          layout.font = Object.assign({}, layout.font || {}, {
            family: "Roboto, Arial, sans-serif",
            color: "#243b53",
            size: window.innerWidth < 700 ? 12 : 16
          });

          scene.replaceChildren();
          window.Plotly.newPlot(scene, plot.data || [], layout, config).catch(() => {
            scene.replaceChildren(element(
              "p",
              "cds-story-plot-status",
              "Select Explore to use this interactive figure."
            ));
          });
        } catch (error) {
          scene.replaceChildren(element(
            "p",
            "cds-story-plot-status",
            "Select Explore to use this interactive figure."
          ));
        }
      }

      window.requestAnimationFrame(() => attempt(0));
    }

    function renderVisual(spec) {
      cleanupVisual();
      const safeSpec = spec || { kind: "cards", items: [] };

      switch (safeSpec.kind) {
        case "orbit":
          renderOrbit(safeSpec);
          break;
        case "flow":
          renderFlow(safeSpec);
          break;
        case "tokens":
          renderTokens(safeSpec);
          break;
        case "dimensions":
          renderDimensions(safeSpec);
          break;
        case "questions":
          renderQuestions(safeSpec);
          break;
        case "image":
          renderImage(safeSpec);
          break;
        case "source-image":
          renderSourceImage(safeSpec);
          break;
        case "method-map":
          renderMethodMap(safeSpec);
          break;
        case "plot":
          renderPlot(safeSpec);
          break;
        case "table":
          renderTable(safeSpec);
          break;
        default:
          renderCards(safeSpec);
      }

      scheduleReplayLabelFit();
    }

    function updateProgress() {
      Array.from(progress.children).forEach((dot, index) => {
        if (index === currentStep) {
          dot.setAttribute("aria-current", "step");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    }

    function renderReferences(items) {
      references.replaceChildren();
      (items || []).forEach((item) => {
        const link = element("a", "cds-story__reference", item.label);
        link.href = item.href;
        if (/^https?:\/\//i.test(item.href)) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        references.appendChild(link);
      });
    }

    function renderStep() {
      const step = story.steps[currentStep];
      stepLabel.textContent = step.label || `Step ${currentStep + 1}`;
      title.textContent = step.title;
      copy.textContent = step.body;
      caption.textContent = step.caption || "";
      renderReferences(step.references);
      count.textContent = `${currentStep + 1} of ${story.steps.length}`;
      previous.disabled = sectionIndex === 0 && currentStep === 0;
      next.textContent =
        sectionIndex === STORY_SECTIONS.length - 1 &&
        currentStep === story.steps.length - 1
          ? "Explore"
          : "Next";
      updateProgress();
      renderVisual(step.visual);
      track("story_step", {
        story_page: pageKey,
        story_step: currentStep + 1,
        story_step_title: step.title
      });
    }

    function moveTo(nextStep) {
      const boundedStep = Math.max(0, Math.min(story.steps.length - 1, nextStep));
      if (boundedStep === currentStep) return;

      window.clearTimeout(transitionTimer);
      if (prefersReducedMotion) {
        currentStep = boundedStep;
        renderStep();
        return;
      }

      root.classList.add("is-changing");
      transitionTimer = window.setTimeout(() => {
        currentStep = boundedStep;
        renderStep();
        window.requestAnimationFrame(() => root.classList.remove("is-changing"));
      }, TRANSITION_MS);
    }

    function openStory(startStep) {
      const requestedStep = Number.isInteger(startStep) ? startStep : 0;
      const boundedStep = Math.max(0, Math.min(story.steps.length - 1, requestedStep));
      if (storyIsOpen) {
        moveTo(boundedStep);
        return;
      }
      previousFocus = document.activeElement;
      storyIsOpen = true;
      currentStep = boundedStep;
      root.hidden = false;
      launcher.hidden = true;
      document.body.classList.add("cds-story-open");
      navigationTargets.forEach((link) => {
        const isCurrentSection = link.dataset.storyTarget === pageKey;
        link.classList.toggle("cds-story-section-active", isCurrentSection);
        if (isCurrentSection) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
      backgroundNodes.forEach((node) => {
        node.inert = true;
      });
      renderStep();
      next.focus({ preventScroll: true });
      track("story_open", { story_page: pageKey });
    }

    function closeStory(reason) {
      storyIsOpen = false;
      window.clearTimeout(transitionTimer);
      cleanupVisual();
      root.hidden = true;
      launcher.hidden = false;
      document.body.classList.remove("cds-story-open");
      navigationTargets.forEach((link) => {
        link.classList.remove("cds-story-section-active");
        if (link.classList.contains("site-active")) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
      backgroundNodes.forEach((node) => {
        node.inert = false;
      });
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus({ preventScroll: true });
      }
      track(reason === "complete" ? "story_complete" : "story_exit", {
        story_page: pageKey,
        story_step: currentStep + 1
      });
    }

    function setIntroductionMode(isActive) {
      try {
        window.sessionStorage.setItem(INTRO_MODE_KEY, isActive ? "intro" : "full");
      } catch (error) {
        // The current page still works when session storage is unavailable.
      }
    }

    function introductionModeIsActive() {
      try {
        return window.sessionStorage.getItem(INTRO_MODE_KEY) !== "full";
      } catch (error) {
        return true;
      }
    }

    function rememberIntroTarget(targetPage, targetStep) {
      try {
        window.sessionStorage.setItem(
          INTRO_TARGET_KEY,
          JSON.stringify({ page: targetPage, step: targetStep })
        );
      } catch (error) {
        // The destination still opens at its first step without session storage.
      }
    }

    function consumeIntroTarget() {
      try {
        const stored = window.sessionStorage.getItem(INTRO_TARGET_KEY);
        window.sessionStorage.removeItem(INTRO_TARGET_KEY);
        if (!stored) return 0;
        const target = JSON.parse(stored);
        if (target.page !== pageKey || !Number.isInteger(target.step)) return 0;
        return target.step;
      } catch (error) {
        return 0;
      }
    }

    function navigateToSection(targetIndex, targetStep) {
      const target = STORY_SECTIONS[targetIndex];
      if (!target) return;

      setIntroductionMode(true);
      if (targetIndex === sectionIndex) {
        openStory(targetStep);
        return;
      }

      rememberIntroTarget(target.key, targetStep);
      window.location.assign(target.href);
    }

    function explorePage(reason) {
      setIntroductionMode(false);
      closeStory(reason);
    }

    function goPrevious() {
      if (currentStep > 0) {
        moveTo(currentStep - 1);
      } else if (sectionIndex > 0) {
        const previousSection = STORY_SECTIONS[sectionIndex - 1];
        const previousStory = window.CDS_STORIES[previousSection.key];
        navigateToSection(sectionIndex - 1, previousStory.steps.length - 1);
      }
    }

    function goNext() {
      if (currentStep < story.steps.length - 1) {
        moveTo(currentStep + 1);
      } else if (sectionIndex < STORY_SECTIONS.length - 1) {
        navigateToSection(sectionIndex + 1, 0);
      } else {
        explorePage("complete");
      }
    }

    previous.addEventListener("click", goPrevious);
    next.addEventListener("click", goNext);
    close.addEventListener("click", () => explorePage("skip"));
    launcher.addEventListener("click", () => {
      navigateToSection(0, 0);
    });
    navigationTargets.forEach((link) => {
      link.addEventListener("click", (event) => {
        if (!introductionModeIsActive()) return;
        const targetIndex = STORY_SECTIONS.findIndex((section) => {
          return section.key === link.dataset.storyTarget;
        });
        if (targetIndex < 0) return;
        event.preventDefault();
        navigateToSection(targetIndex, 0);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (!storyIsOpen) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      } else if (event.key === "Escape") {
        event.preventDefault();
        explorePage("skip");
      }
    });

    window.addEventListener("resize", () => {
      scheduleReplayLabelFit();
      const plot = visual.querySelector(".cds-story-plot");
      if (plot && window.Plotly && window.Plotly.Plots) {
        window.Plotly.Plots.resize(plot);
      }
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleReplayLabelFit);
    }

    const storyPreference = new URLSearchParams(window.location.search).get("story");
    const requestedStep = consumeIntroTarget();
    if (storyPreference === "off" || storyPreference === "0") {
      setIntroductionMode(false);
      launcher.hidden = false;
    } else if (storyPreference === "on" || storyPreference === "1") {
      setIntroductionMode(true);
      openStory(requestedStep);
    } else if (introductionModeIsActive()) {
      openStory(requestedStep);
    } else {
      launcher.hidden = false;
    }
    finishStoryBoot();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseStory, { once: true });
  } else {
    initialiseStory();
  }
}());
