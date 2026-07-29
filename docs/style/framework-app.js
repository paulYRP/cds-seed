(function () {
  "use strict";

  const root = document.getElementById("framework-root");
  const sportSelect = root?.querySelector("[data-framework-sport]");
  const studySelect = root?.querySelector("[data-framework-study]");
  const help = root?.querySelector("[data-framework-selection-help]");
  const results = root?.querySelector("[data-framework-results]");
  const overview = root?.querySelector("[data-framework-study-overview]");
  const dimensionGrid = root?.querySelector("[data-framework-dimensions]");
  let responseResizeObserver = null;

  if (
    !root ||
    !sportSelect ||
    !studySelect ||
    !help ||
    !results ||
    !overview ||
    !dimensionGrid ||
    typeof panelContent === "undefined"
  ) {
    return;
  }

  const questionLabels = new Map([
    ["What limitation in real data are you trying to overcome?", "Why synthetic data was needed"],
    ["What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?", "What the data was designed to support"],
    ["Are you aiming to replace, augment, or stress-test real data?", "How it complements real data"],
    ["Who are the end users (researchers, practitioners, regulators, industry)?", "Who can use it"],

    ["What is the total population or system the data represent?", "What the dataset represents"],
    ["Is the synthetic dataset a sample of this totality, and should it preserve its distribution?", "How the sample relates to the wider system"],
    ["Which statistical properties (distributions, correlations, ranges) must be preserved?", "Properties that need to be preserved"],
    ["What hierarchies or temporal structures are intrinsic to the data?", "Important hierarchy or timing"],
    ["How should rare, extreme, or boundary cases appear in the structure?", "Rare and boundary cases"],

    ["Are large, representative real datasets available?", "Real data available"],
    ["Are statistical assumptions acceptable for the task?", "Assumptions used"],
    ["How much control and interpretability are required?", "Control and interpretability"],
    ["How sensitive is the task to generation errors or artefacts?", "Sensitivity to errors"],
    ["Should generation be statistical, simulation-based, neural network-based, or hybrid?", "Generation approach"],

    ["What aspects of the data may cause privacy or disclosure risks?", "Privacy and disclosure"],
    ["Where might domain shift occur between synthetic and real data?", "Possible differences from real data"],
    ["Which classes or outcomes are naturally imbalanced?", "Natural class imbalance"],
    ["Should imbalance be preserved, reduced, or explicitly controlled?", "How imbalance is handled"],
    ["Which constraints must be strictly enforced, and which can be relaxed?", "Rules that must hold"],

    ["Do key variable distributions match those observed in real data?", "Distribution similarity"],
    ["Are relationships and dependencies preserved?", "Relationships preserved"],
    ["How do models trained on synthetic data perform on real or held-out data?", "Performance on real or held-out data"],
    ["Where does utility matter most, and where can it be relaxed?", "Where usefulness matters"],
    ["Where does fidelity matter most, and where can it be relaxed?", "Where realism matters"],

    ["What assumptions and simplifications were made during generation?", "Simplifications made"],
    ["What are the known strengths and limitations of the synthetic data?", "Strengths and limitations"],
    ["How should results derived from synthetic data be reported?", "How results should be communicated"]
  ]);

  const dimensions = [
    {
      id: "objective",
      code: "O",
      label: "Objective",
      prefix: "obj_",
      prompt: "Why was synthetic data needed?",
      questions: [
        "Why synthetic data was needed",
        "What the data was designed to support",
        "How it complements real data",
        "Who can use it"
      ]
    },
    {
      id: "structure",
      code: "S",
      label: "Structure",
      prefix: "struc_",
      prompt: "What must the data represent?",
      questions: [
        "What the dataset represents",
        "How the sample relates to the wider system",
        "Properties that need to be preserved",
        "Important hierarchy or timing",
        "Rare and boundary cases"
      ]
    },
    {
      id: "strategy",
      code: "G",
      label: "Generation",
      prefix: "strat_",
      prompt: "How was the data generated?",
      questions: [
        "Real data available",
        "Assumptions used",
        "Control and interpretability",
        "Sensitivity to errors",
        "Generation approach"
      ]
    },
    {
      id: "constraints",
      code: "C",
      label: "Constraints",
      prefix: "con_",
      prompt: "What had to remain valid and safe?",
      questions: [
        "Privacy and disclosure",
        "Possible differences from real data",
        "Natural class imbalance",
        "How imbalance is handled",
        "Rules that must hold"
      ]
    },
    {
      id: "utility",
      code: "U",
      label: "Utility",
      prefix: "uti_",
      prompt: "Was the result useful and realistic?",
      questions: [
        "Distribution similarity",
        "Relationships preserved",
        "Performance on real or held-out data",
        "Where usefulness matters",
        "Where realism matters"
      ]
    },
    {
      id: "risk",
      code: "R",
      label: "Risk",
      prefix: "ris_",
      prompt: "How should the result be used?",
      questions: [
        "Simplifications made",
        "Strengths and limitations",
        "How results should be communicated"
      ]
    }
  ];

  const studies = [
    {
      id: "Morra",
      label: "Morra et al., 2020",
      sport: "Soccer",
      method: "Simulation · game engine",
      description: "This study generated complete annotated soccer matches to train and validate event-detection models and to explore rare events.",
      href: "https://www.sciencedirect.com/science/article/pii/S2352711020303253?via%3Dihub"
    },
    {
      id: "Hong",
      label: "Hong et al., 2024",
      sport: "American football",
      method: "Simulation · geometric augmentation",
      description: "This study generated geometric variations of player formations to train and test offensive-formation recognition models.",
      href: "https://ieeexplore.ieee.org/document/10845236"
    },
    {
      id: "Bhargavi",
      label: "Bhargavi et al., 2022",
      sport: "American football",
      method: "Hybrid · synthetic images + CNN",
      description: "This study combined synthetic images with CNN training to improve jersey-number recognition, particularly for infrequent numbers.",
      href: "https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2022.988113/full"
    },
    {
      id: "Naughton",
      label: "Naughton et al., 2023",
      sport: "Australian rugby league",
      method: "Statistical · CART (synthpop)",
      description: "This study generated privacy-preserving records for data sharing, exploratory analysis, and collaboration without exposing the original data.",
      href: "https://journals.humankinetics.com/view/journals/ijspp/18/10/article-p1213.xml"
    },
    {
      id: "Fister",
      label: "Fister et al., 2022",
      sport: "Cycling",
      method: "Simulation + rule-based statistics",
      description: "This study simulated cycling sessions and controlled workload changes to support training planning and explore uncommon intensive loads.",
      href: "https://link.springer.com/chapter/10.1007/978-3-030-93247-3_7"
    },
    {
      id: "Cordeiro",
      label: "Cordeiro et al., 2025",
      sport: "Gaelic football",
      method: "Neural network · TVAE",
      description: "This study used a tabular variational autoencoder to augment limited data for predicting performance attenuation and under-represented athlete profiles.",
      href: "https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2025.1607600/full"
    },
    {
      id: "Warmenhoven",
      label: "Warmenhoven et al., 2025",
      sport: "Soccer",
      method: "Statistical · CART (synthpop)",
      description: "This study generated shareable training-load and injury records while protecting athlete identity and supporting replication and reanalysis.",
      href: "https://link.springer.com/article/10.1007/s40279-025-02221-6#Sec32"
    },
    {
      id: "Cabado",
      label: "Cabado et al., 2024",
      sport: "Handball and basketball",
      method: "Hybrid · computer vision + geometry",
      description: "This study combined computer vision, machine learning, and geometric transformation to classify game situations without relying on raw video.",
      href: "https://www.sciencedirect.com/science/article/pii/S2352340924012277?via%3Dihub"
    },
    {
      id: "Raymond",
      label: "Raymond et al., 2022",
      sport: "American football",
      method: "Physics-informed machine learning",
      description: "This study combined finite-element simulation with deep learning to improve impact-detection models and reduce manual video review.",
      href: "https://link.springer.com/article/10.1007/s10439-022-02911-6"
    },
    {
      id: "Hohl",
      label: "Hohl et al., 2024",
      sport: "Endurance sports",
      method: "Statistical + neural network comparison",
      description: "This study compared statistical and neural-network generation approaches for predicting fatigue where biological data are scarce.",
      href: "https://link.springer.com/chapter/10.1007/978-3-031-72353-7_12"
    },
    {
      id: "BaumgartnerKlatt",
      label: "Baumgartner and Klatt, 2023",
      sport: "Running",
      method: "Simulation · Unreal Engine 5",
      description: "This study used a game engine and geometric reasoning to benchmark monocular 3D human-pose estimation under broadcast-camera conditions.",
      href: "https://arxiv.org/abs/2304.04437"
    },
    {
      id: "Shah",
      label: "Shah et al., 2020",
      sport: "Soccer",
      method: "Statistical · iterative linear regression",
      description: "This study used iterative linear regression to generate soccer data for machine-learning regression and prediction tasks.",
      href: "https://ieeexplore.ieee.org/document/9297491"
    }
  ];

  const evidenceCache = new Map();

  const normaliseText = value => value.replace(/\s+/g, " ").trim();
  const isNotReported = value => (
    normaliseText(value).replace(/\.$/, "").toLowerCase() === "no information"
  );

  const panelKey = (studyId, dimension) => `${dimension.prefix}${studyId}`;

  const entryFragment = key => {
    const template = document.createElement("template");
    template.innerHTML = panelContent[key]?.html || "";
    return template.content;
  };

  const answerListFor = question => {
    const nested = question.querySelector("ul");
    if (nested) return nested;

    let candidate = question.nextElementSibling;
    while (candidate && candidate.tagName === "P" && !candidate.textContent.trim()) {
      candidate = candidate.nextElementSibling;
    }
    return candidate?.tagName === "UL" ? candidate : null;
  };

  const readEvidence = (studyId, dimension) => {
    const key = panelKey(studyId, dimension);
    if (evidenceCache.has(key)) return evidenceCache.get(key);

    const fragment = entryFragment(key);
    const records = [];

    fragment.querySelectorAll("b").forEach(label => {
      const friendlyLabel = questionLabels.get(normaliseText(label.textContent));
      if (!friendlyLabel) return;

      const question = label.closest("p");
      if (!question) return;
      const list = answerListFor(question);
      const answers = list
        ? Array.from(list.querySelectorAll("li"))
            .map(item => normaliseText(item.textContent))
            .filter(Boolean)
        : [];

      records.push({
        label: friendlyLabel,
        answers,
        reported: answers.length > 0 && !answers.every(isNotReported)
      });
    });

    evidenceCache.set(key, records);
    return records;
  };

  const coverageFor = (studyId, dimension) => {
    const records = readEvidence(studyId, dimension);
    const reportedLabels = new Set(
      records.filter(record => record.reported).map(record => record.label)
    );
    const reportedCount = dimension.questions.filter(
      question => reportedLabels.has(question)
    ).length;
    if (reportedCount === 0) {
      return {
        id: "unreported",
        label: "Not reported"
      };
    }

    if (reportedCount < dimension.questions.length) {
      return {
        id: "partial",
        label: "Partly reported"
      };
    }

    return {
      id: "reported",
      label: "Reported"
    };
  };

  const makeStatus = coverage => {
    const status = document.createElement("span");
    status.className = `framework-status framework-status--${coverage.id}`;
    status.textContent = coverage.label;
    return status;
  };

  const makeDimensionButton = (study, dimension) => {
    const coverage = coverageFor(study.id, dimension);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "framework-dimension-node";
    button.dataset.dimensionId = dimension.id;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-expanded", "false");

    const code = document.createElement("span");
    code.className = "framework-dimension-code";
    code.textContent = dimension.code;

    const copy = document.createElement("span");
    copy.className = "framework-dimension-copy";

    const name = document.createElement("span");
    name.className = "framework-dimension-name";
    name.textContent = dimension.label;
    copy.appendChild(name);

    const action = document.createElement("span");
    action.className = "framework-dimension-action";
    action.appendChild(makeStatus(coverage));
    const chevron = document.createElement("span");
    chevron.className = "framework-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "\u2192";
    action.appendChild(chevron);

    button.append(code, copy, action);
    return button;
  };

  const responseSlots = {
    3: ["top-left", "top-right", "bottom-center"],
    4: ["top-left", "top-right", "bottom-left", "bottom-right"],
    5: ["top-left", "top-right", "middle-left", "middle-right", "bottom-center"]
  };

  const makeResponseConnectors = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("framework-response-connectors");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    return svg;
  };

  const makeTrackElement = (route, className) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.classList.add(className);
    path.setAttribute("d", route);
    path.setAttribute("vector-effect", "non-scaling-stroke");
    return path;
  };

  const roundedTrack = (source, target) => {
    if (Math.abs(source.y - target.y) < 2) {
      return `M ${source.x} ${source.y} H ${target.x}`;
    }

    const elbowX = (source.x + target.x) / 2;
    const horizontalDirection = Math.sign(target.x - source.x) || 1;
    const verticalDirection = Math.sign(target.y - source.y) || 1;
    const radius = Math.min(
      24,
      Math.abs(elbowX - source.x) / 2,
      Math.abs(target.y - source.y) / 2
    );

    return [
      `M ${source.x} ${source.y}`,
      `H ${elbowX - horizontalDirection * radius}`,
      `Q ${elbowX} ${source.y} ${elbowX} ${source.y + verticalDirection * radius}`,
      `V ${target.y - verticalDirection * radius}`,
      `Q ${elbowX} ${target.y} ${elbowX + horizontalDirection * radius} ${target.y}`,
      `H ${target.x}`
    ].join(" ");
  };

  const drawResponseConnectors = (map, svg, hub, cards) => {
    const mapRect = map.getBoundingClientRect();
    if (!mapRect.width || !mapRect.height) return;

    svg.replaceChildren();
    svg.setAttribute("viewBox", `0 0 ${mapRect.width} ${mapRect.height}`);

    if (window.matchMedia("(max-width: 850px)").matches) return;

    const hubRect = hub.getBoundingClientRect();
    const hubBox = {
      top: hubRect.top - mapRect.top,
      right: hubRect.right - mapRect.left,
      bottom: hubRect.bottom - mapRect.top,
      left: hubRect.left - mapRect.left,
      width: hubRect.width,
      height: hubRect.height
    };

    const routes = cards.map(card => {
      const slot = card.dataset.slot || "";
      const cardRect = card.getBoundingClientRect();
      const cardBox = {
        top: cardRect.top - mapRect.top,
        right: cardRect.right - mapRect.left,
        bottom: cardRect.bottom - mapRect.top,
        left: cardRect.left - mapRect.left,
        width: cardRect.width,
        height: cardRect.height
      };

      let source;
      let target;
      let route;

      if (slot === "bottom-center") {
        source = {
          x: hubBox.left + hubBox.width / 2,
          y: hubBox.bottom
        };
        target = {
          x: cardBox.left + cardBox.width / 2,
          y: cardBox.top
        };
        route = `M ${source.x} ${source.y} V ${target.y}`;
      } else {
        const isLeft = slot.endsWith("left");
        const sourceHeight =
          slot.startsWith("top") ? 0.32 : slot.startsWith("bottom") ? 0.68 : 0.5;
        source = {
          x: isLeft ? hubBox.left : hubBox.right,
          y: hubBox.top + hubBox.height * sourceHeight
        };
        target = {
          x: isLeft ? cardBox.right : cardBox.left,
          y: cardBox.top + cardBox.height / 2
        };
        route = roundedTrack(source, target);
      }

      return { route, source, target };
    });

    routes.forEach(({ route }) => {
      svg.appendChild(makeTrackElement(route, "framework-response-track-backdrop"));
    });
    routes.forEach(({ route }) => {
      svg.appendChild(makeTrackElement(route, "framework-response-track"));
    });

    const terminalCoordinates = new Set();
    routes.forEach(({ source, target }) => {
      [source, target].forEach(point => {
        const key = `${Math.round(point.x)}:${Math.round(point.y)}`;
        if (terminalCoordinates.has(key)) return;
        terminalCoordinates.add(key);

        const terminal = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        terminal.classList.add("framework-response-terminal");
        terminal.setAttribute("cx", point.x);
        terminal.setAttribute("cy", point.y);
        terminal.setAttribute("r", "6");
        terminal.setAttribute("vector-effect", "non-scaling-stroke");
        svg.appendChild(terminal);
      });
    });
  };

  const connectResponseMap = (map, svg, hub, cards) => {
    responseResizeObserver?.disconnect();

    let drawScheduled = false;
    const scheduleDraw = () => {
      if (drawScheduled) return;
      drawScheduled = true;
      window.requestAnimationFrame(() => {
        drawScheduled = false;
        drawResponseConnectors(map, svg, hub, cards);
      });
    };

    scheduleDraw();
    if ("ResizeObserver" in window) {
      responseResizeObserver = new ResizeObserver(scheduleDraw);
      [map, hub, ...cards].forEach(element => responseResizeObserver.observe(element));
    }
  };

  const makeResponseCard = (record, label, index, slot) => {
    const card = document.createElement("article");
    const answers = (record?.answers || []).filter(answer => !isNotReported(answer));
    card.className = "framework-response-card";
    card.dataset.slot = slot;

    if (answers.length === 0) {
      card.classList.add("framework-response-card--unreported");
    } else if (answers.length >= 3) {
      card.classList.add("framework-response-card--long");
    }

    const question = document.createElement("header");
    question.className = "framework-response-question";
    const number = document.createElement("span");
    number.className = "framework-response-number";
    number.textContent = `Q${index + 1}`;
    const heading = document.createElement("h3");
    heading.textContent = label;
    question.append(number, heading);
    card.appendChild(question);

    if (answers.length === 0) {
      const message = document.createElement("p");
      message.className = "framework-response-empty";
      message.textContent = "Not reported in the reviewed publication.";
      card.appendChild(message);
      return card;
    }

    const list = document.createElement("ul");
    answers.forEach(answer => {
      const item = document.createElement("li");
      item.textContent = answer;
      list.appendChild(item);
    });
    card.appendChild(list);
    return card;
  };

  const renderDimensionDetail = (host, study, dimension) => {
    const coverage = coverageFor(study.id, dimension);
    const records = new Map(
      readEvidence(study.id, dimension).map(record => [record.label, record])
    );

    responseResizeObserver?.disconnect();
    responseResizeObserver = null;
    host.innerHTML = "";
    host.hidden = false;

    const map = document.createElement("section");
    map.className = "framework-response-map";
    map.dataset.dimensionId = dimension.id;
    map.setAttribute("aria-label", `${dimension.label} responses for ${study.label}`);
    const slots = responseSlots[dimension.questions.length] || responseSlots[5];
    const connectors = makeResponseConnectors();
    map.appendChild(connectors);

    const hub = document.createElement("header");
    hub.className = "framework-response-hub";

    const mark = document.createElement("span");
    mark.className = "framework-response-hub__mark";
    mark.setAttribute("aria-hidden", "true");
    const markIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    markIcon.setAttribute("viewBox", "0 0 100 100");
    markIcon.setAttribute("focusable", "false");
    const markPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    markPath.setAttribute(
      "d",
      "M18 42H38V31A11 11 0 1 1 60 31V42H82V61H71A11 11 0 1 0 71 83H48V72A11 11 0 1 0 26 72V42H18Z"
    );
    markPath.setAttribute("fill", "none");
    markPath.setAttribute("stroke", "currentColor");
    markPath.setAttribute("stroke-width", "6");
    markPath.setAttribute("stroke-linecap", "round");
    markPath.setAttribute("stroke-linejoin", "round");
    markIcon.appendChild(markPath);
    const markCode = document.createElement("span");
    markCode.className = "framework-response-hub__code";
    markCode.textContent = dimension.code;
    mark.append(markIcon, markCode);

    const heading = document.createElement("h2");
    heading.textContent = dimension.label;
    const prompt = document.createElement("p");
    prompt.textContent = dimension.prompt;
    hub.append(mark, heading, prompt, makeStatus(coverage));

    const responses = document.createElement("div");
    responses.className = "framework-response-list";
    const responseCards = [];
    dimension.questions.forEach((label, index) => {
      const card = makeResponseCard(records.get(label), label, index, slots[index]);
      responseCards.push(card);
      responses.appendChild(card);
    });

    map.append(hub, responses);
    host.appendChild(map);
    connectResponseMap(map, connectors, hub, responseCards);
  };

  const renderOverview = study => {
    overview.innerHTML = "";

    const copy = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "framework-eyebrow";
    eyebrow.textContent = "Study overview";
    const heading = document.createElement("h2");
    heading.textContent = study.label;
    const description = document.createElement("p");
    description.className = "framework-study-description";
    description.textContent = study.description;

    const metadata = document.createElement("div");
    metadata.className = "framework-study-meta";
    [study.sport, study.method].forEach(value => {
      const chip = document.createElement("span");
      chip.className = "framework-chip";
      chip.textContent = value;
      metadata.appendChild(chip);
    });

    copy.append(eyebrow, heading, description, metadata);

    const source = document.createElement("div");
    source.className = "framework-study-source";
    const sourceLink = document.createElement("a");
    sourceLink.href = study.href;
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    sourceLink.textContent = "Open original paper ↗";
    source.appendChild(sourceLink);

    overview.append(copy, source);
  };

  const renderStudy = studyId => {
    const study = studies.find(item => item.id === studyId);
    if (!study) {
      results.hidden = true;
      return;
    }

    renderOverview(study);
    dimensionGrid.innerHTML = "";

    const selector = document.createElement("div");
    selector.className = "framework-dimension-selector";
    selector.setAttribute("aria-label", "Framework dimensions");

    const detailHost = document.createElement("div");
    detailHost.className = "framework-response-host";
    detailHost.id = `framework-response-${study.id}`;
    detailHost.setAttribute("aria-live", "polite");
    detailHost.hidden = true;

    dimensions.forEach(dimension => {
      const button = makeDimensionButton(study, dimension);
      button.setAttribute("aria-controls", `framework-response-${study.id}`);
      button.addEventListener("click", () => {
        selector.querySelectorAll(".framework-dimension-node").forEach(node => {
          const selected = node === button;
          node.classList.toggle("is-selected", selected);
          node.setAttribute("aria-pressed", String(selected));
          node.setAttribute("aria-expanded", String(selected));
        });

        renderDimensionDetail(detailHost, study, dimension);
        window.requestAnimationFrame(() => {
          detailHost.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      });
      selector.appendChild(button);
    });

    dimensionGrid.append(selector, detailHost);

    help.textContent = `${study.label} selected. Choose a framework dimension to continue.`;
    results.hidden = false;

    window.requestAnimationFrame(() => {
      overview.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const resetStudySelect = sport => {
    studySelect.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = sport ? "Select a study" : "Select a sport first";
    studySelect.appendChild(placeholder);

    if (!sport) {
      studySelect.disabled = true;
      results.hidden = true;
      help.textContent = "Choose a sport to begin.";
      return;
    }

    studies
      .filter(study => study.sport === sport)
      .sort((a, b) => a.label.localeCompare(b.label))
      .forEach(study => {
        const option = document.createElement("option");
        option.value = study.id;
        option.textContent = study.label;
        studySelect.appendChild(option);
      });

    studySelect.disabled = false;
    results.hidden = true;
    help.textContent = "Now choose a study.";
  };

  const populateSports = () => {
    Array.from(new Set(studies.map(study => study.sport)))
      .sort((a, b) => a.localeCompare(b))
      .forEach(sport => {
        const option = document.createElement("option");
        option.value = sport;
        option.textContent = sport;
        sportSelect.appendChild(option);
      });
  };

  sportSelect.addEventListener("change", event => {
    resetStudySelect(event.target.value);
  });

  studySelect.addEventListener("change", event => {
    if (!event.target.value) {
      results.hidden = true;
      help.textContent = "Choose a study to continue.";
      return;
    }
    renderStudy(event.target.value);
  });

  populateSports();
  resetStudySelect("");
}());
