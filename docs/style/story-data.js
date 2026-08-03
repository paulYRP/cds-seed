(function () {
  "use strict";

  const refs = Object.freeze({
    conops: {
      label: "IEEE 29148 (CONOPS)",
      href: "https://standards.ieee.org/ieee/29148/6937/"
    },
    morra: {
      label: "Morra et al., 2020",
      href: "https://www.sciencedirect.com/science/article/pii/S2352711020303253?via%3Dihub"
    },
    hong: {
      label: "Hong et al., 2024",
      href: "https://ieeexplore.ieee.org/document/10845236"
    },
    bhargavi: {
      label: "Bhargavi et al., 2022",
      href: "https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2022.988113/full"
    },
    naughton: {
      label: "Naughton et al., 2023",
      href: "https://journals.humankinetics.com/view/journals/ijspp/18/10/article-p1213.xml"
    },
    fister: {
      label: "Fister et al., 2022",
      href: "https://link.springer.com/chapter/10.1007/978-3-030-93247-3_7"
    },
    cordeiro: {
      label: "Cordeiro et al., 2025",
      href: "https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2025.1607600/full"
    },
    raymond: {
      label: "Raymond et al., 2022",
      href: "https://link.springer.com/article/10.1007/s10439-022-02911-6"
    },
    hohl: {
      label: "Hohl et al., 2024",
      href: "https://link.springer.com/chapter/10.1007/978-3-031-72353-7_12"
    },
    syntheticPage: { label: "Synthetic evidence", href: "./#synthetic" },
    realPage: { label: "Real dataset evidence", href: "real.html" },
    dataPage: { label: "Supporting records", href: "data.html" },
    frameworkPage: { label: "Interactive framework", href: "framework.html" }
  });

  const flow = (...titles) => ({
    kind: "flow",
    items: titles.map((title) => ({ title }))
  });

  const tokens = (...items) => ({ kind: "tokens", items });

  window.CDS_STORIES = Object.freeze({
    home: {
      pageTitle: "Project overview",
      accent: "#ffd400",
      steps: [
        {
          label: "Purpose",
          title: "From evidence to practical guidance",
          body: "This project first catalogued real sport datasets and studies that created synthetic data. Comparing both sources showed that choosing a generation method is not enough. Synthetic data also needs a defined purpose, appropriate structure, clear constraints, evidence of usefulness, and risk controls.",
          references: [refs.syntheticPage, refs.realPage, refs.conops],
          visual: flow("MAP", "COMPARE", "GUIDE")
        },
        {
          label: "Evidence",
          title: "Two sources shape the review",
          body: "Real datasets show what sport data is available and how it is used. Synthetic-data studies show how new data is generated, evaluated, and applied.",
          references: [refs.morra, refs.hong, refs.naughton, refs.dataPage],
          visual: tokens("REAL", "SYNTHETIC")
        },
        {
          label: "Comparison",
          title: "The evidence is evaluated for practical use",
          body: "The review considers whether data can be accessed, whether it represents the required people and conditions, and whether its quality is suitable for the intended task.",
          references: [refs.realPage, refs.dataPage],
          visual: tokens("ACCESS", "COVERAGE", "QUALITY")
        },
        {
          label: "Guidance",
          title: "The findings become a design process",
          body: "The framework connects three practical decisions: define what is needed, choose how to generate it, and evaluate whether the result is useful and responsible.",
          references: [refs.conops, refs.frameworkPage],
          visual: flow("DEFINE", "GENERATE", "EVALUATE")
        },
        {
          label: "Navigation",
          title: "Explore the evidence from several perspectives",
          body: "Use the tabs to move between datasets, findings, and the framework. The visual introduction remains active across tabs until you select Explore.",
          references: [refs.syntheticPage, refs.realPage, refs.frameworkPage],
          visual: tokens("DATASETS", "FINDINGS", "FRAMEWORK")
        }
      ]
    },

    synthetic: {
      pageTitle: "Synthetic sport datasets",
      accent: "#ffd400",
      steps: [
        {
          label: "Definition",
          title: "What synthetic sport data means",
          body: "Synthetic sport data is newly generated data that reproduces selected characteristics of real sport data. It can be created using simulations, statistical models, or generative methods when real observations are limited, sensitive, or difficult to collect.",
          references: [refs.morra, refs.naughton, refs.hohl],
          visual: tokens("SIMULATE", "MODEL", "GENERATE")
        },
        {
          label: "Review",
          title: "The review examines methods and uses",
          body: "One part of the review compares how synthetic data is generated. The other examines why it is created, including access, simulation, privacy, testing, and performance analysis.",
          references: [refs.morra, refs.naughton, refs.fister],
          visual: tokens("METHODS", "USES")
        },
        {
          label: "Methods",
          title: "Generation approaches are organised by method",
          body: "The methodological overview groups neural-network, simulation, and statistical approaches, then connects each group with a short explanation and examples from sport.",
          caption: "Synthetic data generation approaches reviewed in the manuscript.",
          references: [refs.morra, refs.raymond, refs.naughton, refs.fister],
          visual: {
            kind: "source-image",
            index: 0,
            alt: "Methodological overview of synthetic data generation approaches and sport examples"
          }
        },
        {
          label: "Applications",
          title: "The studies use synthetic data for different purposes",
          body: "This figure shows where synthetic data contributes, from training and testing to privacy, simulation, and the study of uncommon situations.",
          references: [refs.bhargavi, refs.cordeiro, refs.hohl],
          visual: { kind: "plot", index: 0 }
        },
        {
          label: "Evaluation",
          title: "A useful result must satisfy more than one test",
          body: "Synthetic data should preserve the characteristics that matter for the task, support the intended analysis, and manage privacy, validity, and other risks.",
          references: [refs.morra, refs.bhargavi, refs.naughton],
          visual: tokens("REALISTIC", "USEFUL", "SAFE")
        }
      ]
    },

    real: {
      pageTitle: "Real sport datasets",
      accent: "#ffd400",
      steps: [
        {
          label: "Scope",
          title: "Real sport data comes from many settings",
          body: "The catalogue covers different populations, sports, measurements, and recording environments. This variety affects which datasets can support analysis or synthetic-data generation.",
          references: [refs.realPage, refs.dataPage],
          visual: tokens("PEOPLE", "SPORTS", "SIGNALS")
        },
        {
          label: "Diversity",
          title: "Dataset characteristics vary widely",
          body: "This overview introduces the range of sports, participants, formats, and measurements represented in the catalogue.",
          references: [refs.realPage],
          visual: { kind: "plot", index: 0 }
        },
        {
          label: "Coverage",
          title: "Some areas are represented more strongly than others",
          body: "Coverage matters because an available dataset may still omit the population, sport, condition, or signal needed for a particular use.",
          references: [refs.realPage],
          visual: { kind: "plot", index: 1 }
        },
        {
          label: "Connections",
          title: "Dataset features need to be considered together",
          body: "This view connects dataset characteristics so users can see how access, population, measurement, and intended use interact.",
          references: [refs.realPage],
          visual: { kind: "plot", index: 2 }
        },
        {
          label: "Suitability",
          title: "Datasets are compared for practical suitability",
          body: "The comparative ranking summarises how well datasets align with criteria used to assess their potential for statistical or generative applications.",
          caption: "Comparative ranking of real sport datasets.",
          references: [refs.realPage, refs.dataPage],
          visual: { kind: "plot", index: 3 }
        },
        {
          label: "Applications",
          title: "Different data strengths support different tasks",
          body: "The final view links dataset characteristics with the applications they can reasonably support, while making gaps easier to recognise.",
          references: [refs.realPage, refs.dataPage],
          visual: { kind: "plot", index: 4 }
        }
      ]
    },

    summary: {
      pageTitle: "Integrated findings",
      accent: "#ffd400",
      steps: [
        {
          label: "Integration",
          title: "The summary brings both evidence sources together",
          body: "Real datasets reveal what is available. Synthetic-data studies reveal what can be generated and why. Reading them together exposes both opportunities and limitations.",
          references: [refs.syntheticPage, refs.realPage],
          visual: tokens("REAL", "SYNTHETIC")
        },
        {
          label: "Methods",
          title: "Generation approaches solve different problems",
          body: "The methodological overview groups the reviewed approaches and shows why the choice of method depends on the sport context, available evidence, and intended use.",
          caption: "Synthetic data generation approaches reviewed in the manuscript.",
          references: [refs.morra, refs.raymond, refs.naughton],
          visual: {
            kind: "source-image",
            index: 0,
            alt: "Methodological overview of synthetic data generation approaches and sport examples"
          }
        },
        {
          label: "Suitability",
          title: "Real datasets differ in their practical value",
          body: "The comparative ranking helps assess datasets against criteria needed for analysis and generation, rather than judging them only by availability.",
          caption: "Comparative ranking of real sport datasets.",
          references: [refs.realPage, refs.dataPage],
          visual: { kind: "plot", index: 0 }
        },
        {
          label: "Applications",
          title: "Purpose determines what evidence is useful",
          body: "The same dataset or generation approach will not suit every task. The intended application determines which characteristics, checks, and safeguards matter most.",
          references: [refs.syntheticPage, refs.realPage],
          visual: { kind: "plot", index: 1 }
        },
        {
          label: "Implications",
          title: "The combined evidence points to a practical framework",
          body: "The review translates recurring decisions into a sequence that starts with the need, guides generation, and evaluates utility and risk.",
          references: [refs.conops, refs.frameworkPage],
          visual: flow("DEFINE", "GENERATE", "EVALUATE")
        }
      ]
    },

    report: {
      pageTitle: "Research findings",
      accent: "#ffd400",
      steps: [
        {
          label: "Focus",
          title: "Four questions organise the findings",
          body: "The report examines distribution shift, fidelity and utility, data constraints, and class imbalance. Together, these questions show how synthetic data should be designed and evaluated.",
          references: [refs.morra, refs.bhargavi, refs.naughton],
          visual: tokens("SHIFT", "QUALITY", "RULES", "BALANCE")
        },
        {
          label: "Distribution shift",
          title: "Performance must hold beyond the training setting",
          body: "The first question considers what happens when training and evaluation data represent different people, conditions, or environments.",
          references: [refs.bhargavi, refs.hong],
          visual: flow("TRAIN", "SHIFT", "TEST")
        },
        {
          label: "Fidelity and utility",
          title: "Similarity and usefulness are related but distinct",
          body: "Data may look realistic without supporting the intended analysis. Evaluation therefore needs to check both how well patterns are reproduced and whether the data works for its purpose.",
          references: [refs.morra, refs.naughton, refs.cordeiro],
          visual: tokens("FIDELITY", "UTILITY")
        },
        {
          label: "Constraints",
          title: "Generation is shaped by evidence and rules",
          body: "The available observations set empirical limits, while domain knowledge and project requirements define which outputs are plausible and acceptable.",
          references: [refs.conops, refs.hohl],
          visual: tokens("DATA", "RULES")
        },
        {
          label: "Imbalance",
          title: "Synthetic data can support underrepresented cases",
          body: "The fourth question examines whether generation can improve learning when important outcomes are rare, while still requiring comparison with real evidence.",
          references: [refs.bhargavi, refs.naughton],
          visual: flow("GENERATE", "TRAIN", "COMPARE")
        },
        {
          label: "Framework",
          title: "The research questions connect to one process",
          body: "Their shared requirements are organised into a practical sequence for defining the project, generating appropriate data, and evaluating usefulness and risk.",
          references: [refs.conops, refs.frameworkPage],
          visual: flow("DEFINE", "GENERATE", "EVALUATE")
        }
      ]
    },

    framework: {
      pageTitle: "Synthetic data generation framework",
      accent: "#ffd400",
      steps: [
        {
          label: "Purpose",
          title: "The framework turns evidence into decisions",
          body: "It helps users move from a clearly defined need to an appropriate generation approach and then to evidence that the result is useful and responsible.",
          references: [refs.conops, refs.frameworkPage],
          visual: flow("DEFINE", "GENERATE", "EVALUATE")
        },
        {
          label: "Define",
          title: "Begin with the need",
          body: "State the project objective and identify the structure that the synthetic data must preserve. These decisions establish what success means.",
          references: [refs.conops],
          visual: tokens("OBJECTIVE", "STRUCTURE")
        },
        {
          label: "Generate",
          title: "Choose an approach that fits the context",
          body: "Select a generation strategy and make constraints explicit, including the available evidence, domain rules, resources, and uncertainty.",
          references: [refs.morra, refs.naughton, refs.conops],
          visual: tokens("STRATEGY", "CONSTRAINTS")
        },
        {
          label: "Evaluate",
          title: "Check usefulness and responsibility",
          body: "Assess whether the generated data supports the intended task and whether privacy, bias, validity, and other risks are managed.",
          references: [refs.bhargavi, refs.cordeiro, refs.conops],
          visual: tokens("UTILITY", "RISK")
        },
        {
          label: "Interaction",
          title: "Select a sport and follow one study",
          body: "Choose a sport, then a study. A short overview introduces the paper before six centred dimensions reveal the recorded questions and answers.",
          references: [refs.frameworkPage, refs.dataPage],
          visual: flow("SPORT", "STUDY", "EVIDENCE")
        }
      ]
    },

    data: {
      pageTitle: "Supporting data",
      accent: "#ffd400",
      steps: [
        {
          label: "Evidence",
          title: "The records behind the website remain traceable",
          body: "The data section brings together study details, real dataset characteristics, and source links used to produce the figures and findings.",
          references: [refs.syntheticPage, refs.realPage, refs.dataPage],
          visual: tokens("STUDIES", "DATASETS", "SOURCES")
        },
        {
          label: "Synthetic records",
          title: "Each study is recorded in a consistent structure",
          body: "The table captures the generation method, sport context, intended use, evaluation, benefits, limitations, and source details for the reviewed studies.",
          references: [refs.morra, refs.naughton, refs.dataPage],
          visual: { kind: "table", index: 0, columns: [0, 1, 2, 3] }
        },
        {
          label: "Real records",
          title: "Dataset characteristics can be compared directly",
          body: "The real-data table records access, population, sport, format, measurements, coverage, and methodological suitability.",
          references: [refs.realPage, refs.dataPage],
          visual: { kind: "table", index: 1, columns: [0, 1, 2, 3] }
        },
        {
          label: "Traceability",
          title: "Records connect evidence with each result",
          body: "Consistent fields make it possible to trace a figure or finding back to the dataset, study, and source that supports it.",
          references: [refs.dataPage],
          visual: flow("RECORD", "FIGURE", "FINDING")
        },
        {
          label: "Detail",
          title: "The full tables support closer exploration",
          body: "Select Explore to search the complete records, compare entries, and follow the source links used throughout the website.",
          references: [refs.dataPage],
          visual: tokens("SEARCH", "COMPARE", "TRACE")
        }
      ]
    }
  });
}());
