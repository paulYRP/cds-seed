(function () {
  "use strict";

  const root = document.getElementById("framework-root");
  const sportSelect = root?.querySelector("[data-framework-sport]");
  const studySelect = root?.querySelector("[data-framework-study]");
  const help = root?.querySelector("[data-framework-selection-help]");
  const results = root?.querySelector("[data-framework-results]");
  const overview = root?.querySelector("[data-framework-study-overview]");
  const dimensionGrid = root?.querySelector("[data-framework-dimensions]");

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
      phase: "Define",
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
      phase: "Define",
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
      label: "Generation strategy",
      phase: "Generate",
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
      phase: "Generate",
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
      label: "Utility and fidelity",
      phase: "Evaluate",
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
      label: "Risk and deployment",
      phase: "Deploy",
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
    button.dataset.phase = dimension.phase;
    button.dataset.dimensionId = dimension.id;
    button.setAttribute("aria-pressed", "false");

    const code = document.createElement("span");
    code.className = "framework-dimension-code";
    code.textContent = dimension.code;

    const copy = document.createElement("span");
    copy.className = "framework-dimension-copy";

    const name = document.createElement("span");
    name.className = "framework-dimension-name";
    name.textContent = dimension.label;
    const prompt = document.createElement("span");
    prompt.className = "framework-dimension-prompt";
    prompt.textContent = dimension.prompt;
    copy.append(name, prompt);

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

  const connectorPoints = {
    "top-left": [420, 310, 275, 180],
    "top-right": [580, 310, 725, 180],
    "middle-left": [375, 380, 275, 380],
    "middle-right": [625, 380, 725, 380],
    "bottom-left": [420, 450, 275, 580],
    "bottom-center": [500, 490, 500, 625],
    "bottom-right": [580, 450, 725, 580]
  };

  const makeResponseConnectors = slots => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("framework-response-connectors");
    svg.setAttribute("viewBox", "0 0 1000 760");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");

    slots.forEach(slot => {
      const points = connectorPoints[slot];
      if (!points) return;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", points[0]);
      line.setAttribute("y1", points[1]);
      line.setAttribute("x2", points[2]);
      line.setAttribute("y2", points[3]);
      line.setAttribute("vector-effect", "non-scaling-stroke");
      svg.appendChild(line);

      const endpoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      endpoint.setAttribute("cx", points[2]);
      endpoint.setAttribute("cy", points[3]);
      endpoint.setAttribute("r", "4");
      endpoint.setAttribute("vector-effect", "non-scaling-stroke");
      svg.appendChild(endpoint);
    });

    return svg;
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

    const answerLabel = document.createElement("p");
    answerLabel.className = "framework-response-answer-label";
    answerLabel.textContent = answers.length === 1 ? "Recorded answer" : "Recorded answers";
    const list = document.createElement("ul");
    answers.forEach(answer => {
      const item = document.createElement("li");
      item.textContent = answer;
      list.appendChild(item);
    });
    card.append(answerLabel, list);
    return card;
  };

  const renderDimensionDetail = (host, study, dimension) => {
    const coverage = coverageFor(study.id, dimension);
    const records = new Map(
      readEvidence(study.id, dimension).map(record => [record.label, record])
    );

    host.innerHTML = "";
    host.hidden = false;

    const map = document.createElement("section");
    map.className = "framework-response-map";
    map.setAttribute("aria-label", `${dimension.label} responses for ${study.label}`);
    const slots = responseSlots[dimension.questions.length] || responseSlots[5];
    map.appendChild(makeResponseConnectors(slots));

    const hub = document.createElement("header");
    hub.className = "framework-response-hub";

    const heading = document.createElement("h2");
    heading.textContent = dimension.label;
    const prompt = document.createElement("p");
    prompt.textContent = dimension.prompt;
    hub.append(heading, prompt, makeStatus(coverage));

    const responses = document.createElement("div");
    responses.className = "framework-response-list";
    dimension.questions.forEach((label, index) => {
      responses.appendChild(
        makeResponseCard(records.get(label), label, index, slots[index])
      );
    });

    map.append(hub, responses);
    host.appendChild(map);
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
