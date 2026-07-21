// ------------------------------------------------------------
// Panel reference
// ------------------------------------------------------------
const frameworkRoot = document.getElementById("framework-root");
const panel = frameworkRoot?.querySelector("#framework-panel");

if (!panel) {
    console.warn("Framework panel not found");
}

// ------------------------------------------------------------
// Panel content registry
// ------------------------------------------------------------
const panelContent = {
    framework: {
        titleColor: "#2c3e50",
        borderColor: "#e1e5ea",
        html: `
            <h2>Framework</h2>

            <p>
            This <b>framework</b> provides a step-by-step thinking structure for synthetic data projects, inspired by 
            <a href="https://standards.ieee.org/ieee/29148/6937/"
                target="_blank"
                rel="noopener noreferrer">
                CONOPS
            </a>. Instead of asking <b>“Which model should I use?”</b>, it encourages users to ask:
            </p>

            <p>
            <b> What is the operational purpose of the data, who will use it, under what constraints, and how will success be evaluated?</b>
            </p>
        `
    },
    

    objective: {
        titleColor: "#1e90ff",
        borderColor: "#bcdcff",
        html: `
            <h2>Objective (O)</h2>

            <p><b>Why are you generating synthetic data?</b></p>

            <p>
            This section defines the operational goal of the synthetic data.
            </p>

            <p><b>Guiding Questions:</b></p>

            <ul>
                <li>What limitation in real data are you trying to overcome?</li>
                <li>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</li>
                <li>Are you aiming to replace, augment, or stress-test real data?</li>
                <li>Who are the end users (researchers, practitioners, regulators, industry)?</li>
            </ul>
        `
    },

    structure: {
        titleColor: "#8e44ad",
        borderColor: "#dcc6e6",
        html: `
            <h2>Structure (S)</h2>

            <p><b>What does the data represent?</b></p>

            <p>
            This section focuses on the nature and organisation of the data itself, including its statistical and structural properties.
            </p>

            <p><b>Guiding Questions:</b></p>

            <ul>
                <li>What is the total population or system the data represent?</li>
                <li>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</li>
                <li>Which statistical properties (distributions, correlations, ranges) must be preserved?</li>
                <li>What hierarchies or temporal structures are intrinsic to the data?</li>
                <li>How should rare, extreme, or boundary cases appear in the structure?</li>
            </ul>
        `
    },

    strategy: {
        titleColor: "#16a085",
        borderColor: "#bfe7dd",
        html: `
            <h2>Generation Strategy (G)</h2>

            <p><b>How should the data be generated?</b></p>

            <p>
            This section defines how data are generated, based on what is already known from Objective and Structure.
            </p>

            <p><b>Guiding Questions:</b></p>

            <ul>
                <li>Are large, representative real datasets available?</li>
                <li>Are statistical assumptions acceptable for the task?</li>
                <li>How much control and interpretability are required?</li>
                <li>How sensitive is the task to generation errors or artefacts?</li>
                <li>Should generation be statistical, simulation-based, neural network-based, or hybrid?</li>
            </ul>
        `
    },

    constrains: {
        titleColor: "#e67e22",
        borderColor: "#f5d0a9",
        html: `
            <h2>Constraints (C)</h2>

            <p><b>What must be controlled to ensure validity, safety, and fairness?</b></p>

            <p>
            This section defines what the synthetic data must respect and what must be controlled.
            </p>

            <p><b>Guiding Questions</b></p>

            <ul>
                <li>What aspects of the data may cause privacy or disclosure risks?</li>
                <li>Where might domain shift occur between synthetic and real data?</li>
                <li>Which classes or outcomes are naturally imbalanced?</li>
                <li>Should imbalance be preserved, reduced, or explicitly controlled?</li>
                <li>Which constraints must be strictly enforced, and which can be relaxed?</li>
            </ul>
        `
    },

    utility: {
        titleColor: "#27ae60",
        borderColor: "#bfe6cf",
        html: `
            <h2>Utility and Fidelity (U)</h2>

            <p><b>Is the synthetic data useful and realistic enough?</b></p>

            <p>
            This section evaluates whether the synthetic data are useful and realistic.
            </p>

            <p><b>Guiding Questions:</b></p>

            <ul>
                <li>Do key variable distributions match those observed in real data?</li>
                <li>Are relationships and dependencies preserved?</li>
                <li>How do models trained on synthetic data perform on real or held-out data?</li>
                <li>Where does utility matter most, and where can it be relaxed?</li>
                <li>Where does fidelity matter most, and where can it be relaxed?</li>
            </ul>
        `
    },

    risk: {
        titleColor: "#c0392b",
        borderColor: "#f2b4ae",
        html: `
            <h2>Risk and Deployment (R)</h2>

            <p><b>How should the synthetic data be documented, communicated, and used?</b></p>

            <p>
            This section ensures responsible use and transparency.
            </p>

            <p><b>Guiding Questions:</b></p>

            <ul>
                <li>What assumptions and simplifications were made during generation?</li>
                <li>What are the known strengths and limitations of the synthetic data?</li>
                <li>How should results derived from synthetic data be reported?</li>
            </ul>
        `
    },


    // ###################################################################################
    // # Morra et al., 2020
    // ###################################################################################


    obj_Morra: {
        titleColor: "#1e90ff",
        borderColor: "#bcdcff",
        html: `
            <h2>Morra et al., 2020</h2>

            <p>
            <b>What limitation in real data are you trying to overcome?</b>
            <ul>
                <li>High cost and effort of manual annotation.</li>
                <li>Limited availability of large, fully labelled match datasets.</li>
            </ul>
            </p>

            <p>
            <b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
            
             <ul>
                <li>Training and validation of event detection models.</li>
                <li>Benchmarking and scenario exploration for rare events.</li>
            </ul>
            </p>

            <p>
            <b>Are you aiming to replace, augment, or stress-test real data?</b>
            
             <ul>
                <li>Augment real data where partial data exist.</li>
                <li>Replace real data when annotation is infeasible.</li>
            </ul>
            </p>

            <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
             <ul>
                <li>Researchers in sport analytics and computer vision.</li>
            </ul>
            </p>
        `
    },

    struc_Morra: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Morra et al., 2020</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>A full soccer match system under standard rules.</li>
            <li>A complete spatio-temporal and video representation of match play (players, ball and events).</li>
        </ul>
        </p>   
        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>Eight fully synthesised games are produced as a sample of the match “totality”.</li>
            <li>Event-type frequencies are compared against reported real-competition distributions, distribution preservation is targeted.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Event frequency and composition (passes, tackles, shots, goals) are treated as key distributional targets.</li>
            <li>Player dynamics (e.g., average speed) are considered, with expected differences relative to limited real reference data.</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Atomic vs complex event hierarchy is enforced (complex events built from sequences of atomic events).</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>Rare events (shots, goals) are explicitly represented as low-frequency classes in the generated distribution.</li>
            <li>Boundary/edge definitions are handled via formal event rules and timeframes or temporal windows.</li>
        </ul>
        </p>
    `
    },

    strat_Morra: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Morra et al., 2020</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>Public real data are described as insufficient for deep distribution checks.</li>
            <li>A small real dataset (Alfheim) is used for limited comparison.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>A simulation/game-engine approach is used, reducing reliance on statistical distribution assumptions.</li>
            <li>Rule and logic-based definitions are used for annotation/detection rather than parametric modelling.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>High control is implemented via engine logging, explicit event triggers, mathematical models (Finite-State Machine), and rule thresholds.</li>
            <li>Interpretability is prioritised through temporal logic representations that support reasoning about events.</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Sensitivity is acknowledged where visual cues mattered (e.g., tackles), limiting performance for logic-only detection.</li>
            <li>Sensitivity to realism is flagged for video-based systems due to lower photo-realism.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Simulation-based generation is implemented via a modified Gameplay Football engine.</li>
        </ul>
        </p>
    `
    },

    con_Morra: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Morra et al., 2020</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>Data is synthesised from a simulator rather than from identifiable participants.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>Domain shift between synthetic and real data was explicitly stated as a key limitation.</li>
            <li>Differences in event type/frequency and video realism were identified as drivers of this shift.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>Rare events are explicitly noted (shots < 1.5%, goals < 1%).</li>
            <li>Complex event detection in untrimmed sequences is described as challenged by rare events and imbalance.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>The generator is described as enabling control over distributions to reduce bias/imbalance and increase rare cases.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Strict enforcement is applied to rules/definitions (official rules; temporal/distance thresholds; field coordinate bounds).</li>
            <li>Photo-realism is effectively relaxed (explicitly lower than commercial solutions).</li>
        </ul>
        </p>
    `
    },

    uti_Morra: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Morra et al., 2020</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Event-type distribution is compared with real competitions, described as similar but not equivalent.</li>
            <li>Player speed differences are expected vs Alfheim dataset, with limitations noted due to small real reference size.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Dependencies are encoded via explicit definitions (e.g., Pass = KickingTheBall THEN BallPossession with team constraint).</li>
            <li>Complex events are built compositionally from atomic events.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility matters most for event detection benchmarking and comparative algorithm evaluation across a wide range of soccer events.</li>
            <li>Utility can be relaxed for absolute realism, as the dataset is intended as a common and challenging testbed rather than a perfect replica of real matches.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters most for rule consistency, event definitions, and spatio-temporal coherence of player and ball movements.</li>
            <li>Fidelity can be relaxed for photo-realism and exact matching of real-world event distributions.</li>
        </ul>
        </p>
    `
    },
    

    ris_Morra: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Morra et al., 2020</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Z-axis position is not exported, requiring manual labelling for some events (e.g., goal height).</li>
            <li>Event definitions are operationalised via engine triggers and rule thresholds, simplifying real match complexity.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strengths include complete annotations at scale, multiple modalities (video, coordinates and bounding boxes) and broad event coverage.</li>
            <li>Limitations include lower photo-realism, domain shift versus real competitions and weaker performance for visually dependent events.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>Results are intended to be reported with explicit evaluation scripts/metrics.</li>
            <li>Limitations (domain shift, realism, event distribution differences) are expected to be stated alongside outcomes.</li>
        </ul>
        </p>
    `},

    // ###################################################################################
    // # Hong et al., 2024
    // ###################################################################################

    obj_Hong: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Hong et al., 2024</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Manual video tagging of formations is time-consuming and labour-intensive.</li>
            <li>Lack of large, publicly available labelled datasets for American football formations.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Training and testing neural networks for offensive formation recognition.</li>
            <li>Automation of formation classification to support game planning.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Augment real data due to scarcity and cost of annotation.</li>
            <li>Stress-test model robustness using increased synthetic variation.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>Practitioners such as coaches and sports analysts.</li>
        </ul>
        </p>
    `
    },

    struc_Hong: {
        titleColor: "#8e44ad",
        borderColor: "#dcc6e6",
        html: `
            <h2>Hong et al., 2024</h2>

            <p><b>What is the total population or system the data represent?</b>
            <ul>
                <li>Offensive pre-snap formations in American football.</li>
                <li>Eleven offensive players arranged according to football rules.</li>
            </ul>
            </p>

            <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
            <ul>
                <li>Synthetic data are variations of 25 commonly used formations.</li>
                <li>Spatial structure of formations is preserved rather than real-world frequency.</li>
            </ul>
            </p>

            <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
            <ul>
                <li>Relative spatial relationships between players.</li>
                <li>Valid positional ranges to avoid overlap and illegal formations.</li>
            </ul>
            </p>

            <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
            <ul>
                <li>Positional hierarchy relative to the center player.</li>
                <li>Static pre-snap structure with no temporal sequencing.</li>
            </ul>
            </p>

            <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
            <ul>
                <li>High-variation cases are explicitly generated for robustness testing.</li>
            </ul>
            </p>
        `
    },

    strat_Hong: {
        titleColor: "#16a085",
        borderColor: "#bfe7dd",
        html: `
            <h2>Hong et al., 2024</h2>

            <p><b>Are large, representative real datasets available?</b>
            <ul>
                <li>No publicly available datasets of sufficient size are reported.</li>
            </ul>
            </p>

            <p><b>Are statistical assumptions acceptable for the task?</b>
            <ul>
                <li>Rule-based and geometric assumptions dominate generation.</li>
            </ul>
            </p>

            <p><b>How much control and interpretability are required?</b>
            <ul>
                <li>High control over individual player movement ranges.</li>
                <li>Full interpretability through explicit positional rules.</li>
            </ul>
            </p>

            <p><b>How sensitive is the task to generation errors or artefacts?</b>
            <ul>
                <li>Sensitive to overlaps and illegal player positioning.</li>
                <li>Visual inspection is used to detect and correct artefacts.</li>
            </ul>
            </p>

            <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
            <ul>
                <li>Simulation-based geometric data augmentation is used.</li>
            </ul>
            </p>
        `
    },

    con_Hong: {
        titleColor: "#e67e22",
        borderColor: "#f5d0a9",
        html: `
            <h2>Hong et al., 2024</h2>

            <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
            <ul>
                <li>No information.</li>
            </ul>
            </p>

            <p><b>Where might domain shift occur between synthetic and real data?</b>
            <ul>
                <li>Synthetic variations may not fully reflect real-game variability.</li>
                <li>Real-world evaluation is identified as future work.</li>
            </ul>
            </p>

            <p><b>Which classes or outcomes are naturally imbalanced?</b>
            <ul>
                <li>All formations are synthetically generated in equal numbers.</li>
            </ul>
            </p>

            <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
            <ul>
                <li>Imbalance is explicitly controlled via uniform sampling.</li>
                <li>Real-world imbalance is not preserved.</li>
            </ul>
            </p>

            <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
            <ul>
                <li>Football rules and player positioning constraints are strictly enforced.</li>
                <li>Degree of positional variation is adjustable and partially relaxed.</li>
            </ul>
            </p>
        `
    },

    uti_Hong: {
        titleColor: "#27ae60",
        borderColor: "#bfe6cf",
        html: `
            <h2>Hong et al., 2024</h2>

            <p><b>Do key variable distributions match those observed in real data?</b>
            <ul>
                <li>Realism is assessed qualitatively via expert inspection.</li>
                <li>No quantitative comparison with real distributions is reported.</li>
            </ul>
            </p>

            <p><b>Are relationships and dependencies preserved?</b>
            <ul>
                <li>Spatial dependencies between players are preserved.</li>
                <li>Formation-specific geometry is maintained.</li>
            </ul>
            </p>

            <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
            <ul>
                <li>No information.</li>
            </ul>
            </p>

            <p><b>Where does utility matter most, and where can it be relaxed?</b>
            <ul>
                <li>Utility matters most for accurate formation classification and robustness of neural networks trained under limited real data availability.</li>
                <li>Utility can be relaxed for realism of extreme positional variation, which is deliberately exaggerated to test generalisation.</li>
            </ul>
            </p>

            <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
            <ul>
                <li>Fidelity matters most for adherence to football formation rules and relative player positioning constraints.</li>
                <li>Fidelity can be relaxed for highly unrealistic player movements introduced during augmented stress-testing.</li>
            </ul>
            </p>
        `
    },

    ris_Hong: {
        titleColor: "#c0392b",
        borderColor: "#f2b4ae",
        html: `
            <h2>Hong et al., 2024</h2>

            <p><b>What assumptions and simplifications were made during generation?</b>
            <ul>
                <li>Only X–Y coordinates are used; no temporal or visual features.</li>
                <li>Center player is fixed at (0,0) as a reference.</li>
            </ul>
            </p>

            <p><b>What are the known strengths and limitations of the synthetic data?</b>
            <ul>
                <li>Strengths include scalability, interpretability, and robustness for supporting game planning.</li>
                <li>Limitations include lack of real-world validation.</li>
            </ul>
            </p>

            <p><b>How should results derived from synthetic data be reported?</b>
            <ul>
                <li>No information.</li>
            </ul>
            </p>
        `
    },

    // ###################################################################################
    // # Bhargavi  et al., 2022
    // ###################################################################################

    obj_Bhargavi: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Bhargavi et al. 2022</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Scarcity of labelled jersey number data from practice videos.</li>
            <li>Severe class imbalance and low-resolution, distorted visual inputs.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Training and fine-tuning CNN-based jersey number detection models.</li>
            <li>Improving recognition performance in low-frequency number classes.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Augment real data to mitigate imbalance and data scarcity.</li>
            <li>Support pre-training before fine-tuning on limited real data.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>Sports analytics and computer vision researchers.</li>
        </ul>
        </p>
    `
},

struc_Bhargavi: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Bhargavi et al. 2022</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Player torso images extracted from American football practice videos.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>Synthetic datasets are abstractions of jersey number appearances rather than full match footage.</li>
            <li>Distribution preservation of numbers rather than exact real-world frequencies.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Visual properties of jersey numbers (fonts, colours, scale, background complexity).</li>
            <li>Class coverage across all numbers (00–99), including rare classes (labelled as 100).</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Data is treated as independent cropped image samples.</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>Rare jersey numbers are explicitly over-represented via synthetic generation.</li>
            <li>Extremely small, low-resolution, or distorted number crops are included.</li>
        </ul>
        </p>
    `
},

strat_Bhargavi: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Bhargavi et al. 2022</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>Real dataset is small, proprietary, and highly imbalanced.</li>
            <li>No publicly available benchmark datasets are reported.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>Visual realism is prioritised over statistical modelling of match dynamics.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>High control over fonts, colours, background complexity, and augmentation strength.</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Highly sensitive to resolution, occlusion, rotation, and background noise.</li>
            <li>Poor visual fidelity leads to misclassification or unrecognisable outputs.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Hybrid pipeline combining synthetic data with CNN training (Simple2D, Complex2D synthetic datasets).</li>
        </ul>
        </p>
    `
},

con_Bhargavi: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Bhargavi et al. 2022</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>Differences in background complexity and lighting conditions.</li>
            <li>Variations between synthetic numbers and real jersey distortions.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>Jersey numbers with very few real samples.</li>
            <li>Unrecognisable or low-quality number crops.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>Synthetic datasets are designed to flatten class distributions.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Number legibility, font realism, torso-focused cropping are strictly enforced.</li>
        </ul>
        </p>
    `
},

uti_Bhargavi: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Bhargavi et al. 2022</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Visual diversity is increased beyond real data.</li>
            <li>Exact real-world frequency matching is not enforced.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Digit-level composition (left/right digit structure) is preserved.</li>
            <li>Spatial context is limited to cropped torso regions.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>Accuracy improves by approx. 9% overall and 18% on rare numbers.</li>
            <li>Models generalise better after synthetic pre-training.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility matters most for improving CNN performance, particularly on low-frequency jersey numbers in a low-data regime.</li>
            <li>Utility can be relaxed for perfect visual realism, as synthetic data are primarily used for pre-training rather than final inference.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters most for digit shape, contrast, scale, and localisation within the torso region.</li>
            <li>Fidelity can be relaxed for background realism and exact replication of real video noise patterns.</li>
        </ul>
        </p>
    `
},

ris_Bhargavi: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Bhargavi et al. 2022</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Jersey numbers are treated as independent visual patterns.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strengths include improved performance, reduced annotation cost and class balancing.</li>
            <li>Limitations include residual domain shift and dependence on image quality.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

// ###################################################################################
// # Naughton  et al., 2023
// ###################################################################################

obj_Naughton: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Naughton et al., 2023</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Privacy and confidentiality risks associated with identifiable athlete performance data.</li>
            <li>Restricted data sharing due to sensitivity, ownership, and governance concerns.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Privacy-preserving data sharing for exploratory analysis and hypothesis generation.</li>
            <li>Enabling collaboration, education, and secondary analysis without exposing original data.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Replace real data for exploratory and collaborative analyses where sharing is inappropriate.</li>
            <li>Provide an alternative dataset that preserves inferential properties of the original data.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>Sport scientists, researchers and educators requiring access to realistic sport datasets.</li>
        </ul>
        </p>
    `
},

struc_Naughton: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Naughton et al., 2023</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Athlete monitoring datasets from team-sport environments.</li>
            <li>Performance, training load, fatigue, and recovery measures collected longitudinally.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>Synthetic datasets are designed to mimic the full observed dataset structure.</li>
            <li>Distributional similarity to the original data is explicitly targeted and evaluated.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Distributional shape, skewness, and missing-data patterns.</li>
            <li>Relationships between predictor and response variables.</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Repeated-measures structures across timepoints (e.g., Pre, Post, Post-72 h).</li>
            <li>Athlete-level observations nested within training or intervention periods.</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>Rare observations and extreme values are preserved via distribution-based synthesis.</li>
            <li>Explicit caution is noted where extreme or unique cases may increase disclosure risk.</li>
        </ul>
        </p>
    `
},

strat_Naughton: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Naughton et al., 2023</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>Two small and openly available datasets were used (n = 28; n = 22).</li>
            <li>Real data are treated as sensitive and not broadly shareable.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>Classification and Regression Tree (CART) synthesis is used to handle skewness and missingness.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>High interpretability is prioritised through transparent statistical synthesis.</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Errors are evaluated by comparing inference consistency between datasets.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Statistical, model-based generation using the synthpop package (CART).</li>
        </ul>
        </p>
    `
},

con_Naughton: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Naughton et al., 2023</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>Identifiable performance patterns, rare observations, and extreme values.</li>
            <li>Potential linkage to original datasets or unique individuals.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>Variables with few observations or extreme outliers.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>Imbalance is preserved to maintain distributional realism.</li>
            <li>No explicit re-balancing strategy is reported.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Preservation of statistical properties and variable relationships are strictly enforced.</li>
            <li>Individual-level traceability and exact replication of original values are relaxed.</li>
        </ul>
        </p>
    `
},

uti_Naughton: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Naughton et al., 2023</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Distributional similarity is demonstrated using S_pMSE metrics.</li>
            <li>No significant differences are found via Welch t-tests.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Inferential relationships between variables are expected to remain constant.</li>
            <li>Predictor–response structures are maintained.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility matters most for exploratory analysis, hypothesis generation, and preservation of inferential conclusions.</li>
            <li>Utility can be relaxed for individual-level tracking or athlete-specific inference.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters most for distributional properties, statistical relationships, and missing-data patterns.</li>
            <li>Fidelity can be relaxed for exact replication of individual observations to protect privacy.</li>
        </ul>
        </p>
    `
},

ris_Naughton: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Naughton et al., 2023</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Synthetic data replace original values while preserving distributions.</li>
            <li>Analyses are primarily limited to linear or standard statistical models.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strengths include privacy protection, distributional fidelity, ease of sharing and accessibility.</li>
            <li>Limitations include restricted use in complex models and residual disclosure risk for rare cases.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>With explicit identification of data as synthetic (e.g., SYNTH_ prefixes).</li>
            <li>With disclosure of limitations, privacy considerations, and intended use cases.</li>
        </ul>
        </p>
    `
},

// ###################################################################################
// # Fister  et al., 2022
// ###################################################################################

obj_Fister: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Fister et al., 2022</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Limited diversity of training sessions in existing archives.</li>
            <li>Inability of ML models to predict training sessions with intensities beyond observed data.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Training and planning future cycling training sessions.</li>
            <li>Scenario exploration of uncommon and more intensive training loads.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Extend data coverage to unseen but plausible training intensities.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>Sport scientists and researchers.</li>
        </ul>
        </p>
    `
},

struc_Fister: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Fister et al., 2022</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Cycling sport training sessions for an amateur athlete.</li>
            <li>Structured summaries of endurance training activities.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>Distribution is intentionally expanded to include higher-intensity sessions.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Relationships between Duration, Distance, and Heart Rate.</li>
            <li>Derived load measures such as TRaining IMPulse (TRIMP) and its extension Training Stress Measure (TSM).</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Session-level structure derived from time-series training data.</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>High-intensity and uncommon sessions are explicitly generated.</li>
            <li>Boundary cases represent progressively harder but physiologically plausible sessions.</li>
        </ul>
        </p>
    `
},

strat_Fister: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Fister et al., 2022</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>Real training archives are limited in size and diversity.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>Linear relationships and explicit formulas are assumed.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>High control over feature manipulation (HR, Duration, Distance).</li>
            <li>Interpretability is prioritised via explicit training stress measures (TSM).</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Sensitive to unrealistic intensity increases.</li>
            <li>Errors may violate sport training principles such as progressive overload.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Simulation-based generation of baseline sessions using SportyDataGen.</li>
            <li>Statistical, rule-based synthetic augmentation via controlled HR increases and regression.</li>
        </ul>
        </p>
    `
},

con_Fister: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Fister et al., 2022</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>Synthetic generation reduces reliance on identifiable athlete data.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>High-intensity training sessions are underrepresented in real data.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>Explicitly controlled to increase representation of high-intensity sessions.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Physiological plausibility and training principles are strictly enforced.</li>
            <li>Exact replication of real-world session variability is relaxed.</li>
        </ul>
        </p>
    `
},

uti_Fister: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Fister et al., 2022</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Core feature relationships are preserved.</li>
            <li>Overall distributions are intentionally extended.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Dependencies among Duration, Distance, HR, and load measures are preserved.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility is critical for generating plausible future training plans.</li>
            <li>Exact replication of historical session frequencies can be relaxed.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters for physiological realism and load relationships.</li>
            <li>Fidelity can be relaxed in exact numerical matching of past sessions.</li>
        </ul>
        </p>
    `
},

ris_Fister: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Fister et al., 2022</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Linear regression is used to predict speed changes.</li>
            <li>Heart rate is used as the primary intensity indicator.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strengths include enables progressive overload and improves training planning.</li>
            <li>Limitations include simplified physiological modelling and athlete-specific generalisation not guaranteed.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

// ###################################################################################
// # Cordeiro  et al., 2025
// ###################################################################################

obj_Cordeiro: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Cordeiro et al., 2025</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Severe data scarcity due to small sample size (n = 41) in elite Gaelic football athlete monitoring.</li>
            <li>High cost, privacy constraints, and logistical barriers associated with collecting longitudinal physiological and perceptual performance data.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Training and evaluation of machine-learning models for predicting athlete performance attenuation.</li>
            <li>Augmenting limited datasets to improve predictive modelling and explore under-represented performance attenuation profiles.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Augment real data through hybrid real–synthetic datasets.</li>
            <li>Evaluate synthetic data as a potential standalone replacement for model training when real data are inaccessible.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

struc_Cordeiro: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Cordeiro et al., 2025</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Male senior-level Gaelic football athletes monitored across neuromuscular, physiological, perceptual, and match-load domains.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>Synthetic datasets represent statistically faithful replicas of the original athlete monitoring dataset.</li>
            <li>Preservation of original marginal and joint distributions is explicitly targeted and evaluated.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Marginal distributions of individual variables (e.g., Countermovement Jump, Creatine Kinase, VO2max, accelerations).</li>
            <li>Intervariable relationships between neuromuscular, physiological, and perceptual metrics.</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Pre-match, in-match, and post-match measurement structure.</li>
            <li>Ranking-based aggregation of temporal performance declines across match phases (pre-post-match differences).</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>Extreme physiological values are present but acknowledged as challenging for faithful synthesis (VO2max).</li>
        </ul>
        </p>
    `
},

strat_Cordeiro: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Cordeiro et al., 2025</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>No datasets available. The original dataset is small and constrained (n = 41), motivating synthetic data generation.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>Statistical fidelity is required but classical parametric assumptions are insufficient for complex, multimodal tabular data.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>Interpretability is prioritised through transparent evaluation metrics rather than latent-space inspection.</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Sensitivity varies by variable; neuromuscular and categorical ranking variables show higher robustness.</li>
            <li>Certain physiological variables (e.g., VO2max) demonstrate lower synthesis fidelity.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Neural network-based generation using a Tabular Variational Autoencoder (TVAE) from the Synthetic Data Vault (SDV) library.</li>
        </ul>
        </p>
    `
},

con_Cordeiro: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Cordeiro et al., 2025</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>Domain shift may arise for variables with lower synthesis fidelity (e.g., VO2max, body fat percentage).</li>
            <li>Transferability to sports with different physiological demands is limited.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>Performance attenuation categories were originally imbalanced but corrected via median-split ranking methodology.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>Class balance is explicitly controlled and preserved in synthetic data generation.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Strict enforcement of value ranges and class balance.</li>
            <li>VO2max biological plausibility constraints are acknowledged but not fully enforced in the current implementation.</li>
        </ul>
        </p>
    `
},

uti_Cordeiro: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Cordeiro et al., 2025</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Overall distributional similarity of approx. 85%.</li>
            <li>Variable-specific fidelity varies, with lower alignment for VO2max and baseline Countermovement Jump (CMJ).</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Moderate preservation of intervariable relationships is demonstrated via column-pair trend analysis.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>Models trained on hybrid or fully synthetic data often outperform real-data baselines.</li>
            <li>Synthetic-only models achieve comparable or superior performance for several neuromuscular outcomes.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility is most critical for predictive performance attenuation classification tasks.</li>
            <li>Utility can be relaxed for exploratory analysis and methodological benchmarking.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity is most critical for neuromuscular and ranking-based outcome variables used directly in ML training.</li>
            <li>Fidelity may be relaxed for variables with secondary predictive importance or exploratory use.</li>
        </ul>
        </p>
    `
},

ris_Cordeiro: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Cordeiro et al., 2025</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Binary classification of performance attenuation via median splits (Group 0 and 1, minimal and significant performance decline respectively).</li>
            <li>Absence of enforced physiological constraint modelling during synthesis.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strengths include strong statistical similarity, improved ML performance, mitigation of data scarcity.</li>
            <li>Limitations include limited generalisability beyond Gaelic football, reduced fidelity for select physiological variables.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

// ###################################################################################
// # Warmenhoven et al., 2025
// ###################################################################################

obj_Warmenhoven: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Warmenhoven et al., 2025</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Inability to openly share athlete monitoring data due to privacy, re-identification risk, and competitive sensitivity.</li>
            <li>Limited reproducibility and secondary analysis of previously collected elite sport datasets.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Supporting open science through data sharing while protecting athlete identity.</li>
            <li>Replication, reanalysis, and exploratory methodological evaluation of training load–injury models.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Augment real data by enabling secondary analyses without releasing original observations.</li>
            <li>Stress-test analytical models and assumptions used in prior injury–load research.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>Sport scientists and researchers.</li>
        </ul>
        </p>
    `
},

struc_Warmenhoven: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Warmenhoven et al., 2025</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Professional male football players monitored longitudinally across competitive seasons.</li>
            <li>Weekly player-level training load and injury observations within a single elite team.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>It represents the same system but with all observations synthetically generated.</li>
            <li>Preservation of marginal distributions and selected relationships is explicitly evaluated.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Marginal distributions of acute load, chronic load, and injury incidence.</li>
            <li>Relationships relevant to the original generalized estimating equations (GEEs) injury models.</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Repeated weekly measures nested within individual players.</li>
            <li>Temporal autocorrelation in training load across weeks.</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>Excessive fidelity to rare injury timings is avoided to reduce re-identification risk.</li>
        </ul>
        </p>
    `
},

strat_Warmenhoven: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Warmenhoven et al., 2025</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>The original dataset consists of 34 professional players from one team.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>Misalignment leads to reduced specific utility despite high global utility.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>High interpretability is prioritised through sequential tree-based methods (CART).</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Highly sensitive for specific utility tied to reproducing GEE injury results.</li>
            <li>Less sensitive for global similarity of variable distributions.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Statistical, data-driven generation using sequential tree-based models (CART) from synthpop library.</li>
        </ul>
        </p>
    `
},

con_Warmenhoven: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Warmenhoven et al., 2025</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>Injury timing and player-specific longitudinal patterns.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>When synthetic data are used for analyses beyond those aligned with the original model.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>No information</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Mathematical relationships between derived variables should be enforced.</li>
        </ul>
        </p>
    `
},

uti_Warmenhoven: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Warmenhoven et al., 2025</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>High global utility was observed across all simulation conditions.</li>
            <li>Predicted probability metrics indicate strong distributional similarity.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Preserved when generation models align with the original GEE specification.</li>
            <li>Degraded when additional temporal predictors alter dependency structures.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility matters most for reproducing original injury–load model outcomes.</li>
            <li>Can be relaxed for exploratory or pedagogical use.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters most for preserving model-relevant relationships.</li>
            <li>Can be relaxed at the individual observation level to protect privacy.</li>
        </ul>
        </p>
    `
},

ris_Warmenhoven: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Warmenhoven et al., 2025</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Sequential dependence is approximated using tree-based predictors.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strength include strong global similarity and controlled privacy risk.</li>
            <li>Limitation include results are not valid beyond documented analytical contexts.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>Synthetic data are reported with documentation of their generation process, including the predictors used and the model framework used for generation.</li>
            <li>Potential limitations associated as part of future research.</li>
        </ul>
        </p>
    `
},


// ###################################################################################
// # Cabado et al., 2024
// ###################################################################################

obj_Cabado: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Cabado et al., 2024</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Raw video data are affected by camera configuration differences, perspective distortion, and arena variability.</li>
            <li>Direct sharing of video frames is limited due to storage, processing complexity, and privacy considerations.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Training and evaluation of machine learning models for game situation classification.</li>
            <li>Scenario exploration and sports analytics without reliance on raw video footage.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Replace raw video frames with synthetic, normalized representations.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>Researchers and coaches in sports analytics.</li>
        </ul>
        </p>
    `
},

struc_Cabado: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Cabado et al., 2024</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Game situations occurring during federated handball and basketball matches.</li>
            <li>On-court spatial–temporal dynamics of players, referees, and the ball.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>It is derived from real match recordings and represents observed game situations.</li>
            <li>Class frequencies are preserved as observed in the original matches.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Spatial distributions of player, referee, and ball positions in unified space.</li>
            <li>Velocity vectors and relative positioning between agents and key court regions.</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Frames are temporally ordered within 5-second video clips.</li>
            <li>Clips are hierarchically organized by sport, match, and game situation class.</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>Rare game situations (e.g., free throws, penalties) appear less frequently, reflecting real match imbalance.</li>
        </ul>
        </p>
    `
},

strat_Cabado: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Cabado et al., 2024</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>No large public datasets labeled for these exact game situation classes are reported.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>Generation relies on computer vision inference and geometric normalization.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>High control is required over spatial normalization and coordinate consistency.</li>
            <li>Interpretability is supported through explicit JSON schemas and unified space definitions.</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Sensitive to errors in object detection and tracking affecting positions and velocities.</li>
            <li>Sensitive to incorrect homography transformation impacting spatial consistency.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Hybrid, combining computer vision, machine learning, and geometric transformation.</li>
        </ul>
        </p>
    `
},

con_Cabado: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Cabado et al., 2024</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>Original video footage could reveal identifiable individuals.</li>
            <li>Temporal alignment with real matches could enable indirect re-identification.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>Regular attack situations are far more frequent than penalties or counterattacks.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>Preserved, as class frequencies reflect real match dynamics.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Strict enforcement of unified spatial normalization and coordinate bounds.</li>
            <li>Relaxation of agent identity differentiation (players and referees).</li>
        </ul>
        </p>
    `
},

uti_Cabado: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Cabado et al., 2024</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Positions and velocities are derived directly from real video recordings.</li>
            <li>Spatial distributions reflect actual match play after normalization.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Spatial and temporal relationships between players, ball, and court regions are preserved.</li>
            <li>Team affiliation and player identity relationships are not preserved.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility matters most for correct classification of game situations.</li>
            <li>Utility can be relaxed for individual agent identity or visual realism.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters most for spatial accuracy and velocity consistency.</li>
            <li>Fidelity can be relaxed for contextual match information (score, time, team labels).</li>
        </ul>
        </p>
    `
},

ris_Cabado: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Cabado et al., 2024</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Players, referees, and opposing teams are not distinguished.</li>
            <li>Contextual game information such as score or elapsed time is omitted.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strengths include standardised, camera-independent spatial representation enabling reuse.</li>
            <li>Limitations include lack of player identity, team distinction, and contextual metadata.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

// ###################################################################################
// # Raymond  et al., 2022
// ###################################################################################

obj_Raymond: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Raymond et al., 2022</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Severe class imbalance where false positive mouthguard signals vastly outnumber true head impacts.</li>
            <li>Limited availability of verified true impacts due to time-consuming manual video analysis.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Training and improving machine-learning impact detection models.</li>
            <li>Reducing reliance on manual video verification workflows.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Augment real, video-verified mouthguard data with synthetic impact simulations.</li>
            <li>Enable partial replacement of manual video analysis in operational workflows.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>Manual video analyst.</li>
        </ul>
        </p>
    `
},

struc_Raymond: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Raymond et al., 2022</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Head kinematic responses of American football players during impacts.</li>
            <li>Linear and angular head accelerations recorded by instrumented mouthguards.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>Synthetic impacts simulate realistic head impact scenarios observed in football.</li>
            <li>Distribution is intentionally expanded to increase true impact representation.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Temporal patterns and magnitudes of linear and angular acceleration signals.</li>
            <li>Correlations between kinematic components during true head impacts.</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Time series signals of 200 ms in length per event.</li>
            <li>Trigger-centred temporal alignment of impact signals (50 ms into the signal and 150 ms before the end).</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>Rare true impacts are deliberately over-represented using synthetic simulations.</li>
            <li>High-energy impacts are included via varied simulation velocities and orientations.</li>
        </ul>
        </p>
    `
},

strat_Raymond: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Raymond et al., 2022</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>Real verified impact datasets are limited due to manual verification constraints.</li>
            <li>True impacts are scarce relative to false positives.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>Purely statistical learning is insufficient due to imbalance and complexity.</li>
            <li>Physics-based assumptions are explicitly incorporated.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>High control is required over impact parameters (velocity, orientation, location).</li>
            <li>Interpretability is supported through physics-based simulation inputs.</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Highly sensitive, as unrealistic kinematics would degrade detector performance.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Physics-informed machine learning (PIML), which includes finite-element (FE) physics-based simulation combined with deep learning.</li>
        </ul>
        </p>
    `
},

con_Raymond: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Raymond et al., 2022</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>Real mouthguard data are linked to identifiable athlete participation.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>Differences between simulated and real-world impact biomechanics.</li>
            <li>Limited simulation coverage of all possible real gameplay impact scenarios.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>True head impacts are rare compared to false positive sensor triggers.</li>
            <li>Imbalance ratio reported at approximately 1:10 (true:false).</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>Explicitly controlled by augmenting true impacts with synthetic data.</li>
            <li>Class weighting and balanced training strategies are applied.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Strict enforcement of biomechanical plausibility and kinematic realism.</li>
            <li>Relaxation of exact replication of individual real-world impact events.</li>
        </ul>
        </p>
    `
},

uti_Raymond: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Raymond et al., 2022</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Synthetic data are generated to match mouthguard kinematic signal formats.</li>
            <li>Impact magnitudes and temporal patterns reflect real measurements.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Physical relationships between linear and angular kinematics are preserved.</li>
            <li>Dependencies are governed by finite-element head-neck physics.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>Improved performance compared to models trained only on real data.</li>
            <li>Achieved F1 score of 0.95 and reduced false negatives on real test data.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility matters most for accurate detection of true head impacts.</li>
            <li>Utility can be relaxed for exact replication of rare individual impact trajectories.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters most for kinematic realism of impact signals.</li>
            <li>Fidelity can be relaxed for exact contextual gameplay conditions.</li>
        </ul>
        </p>
    `
},

ris_Raymond: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Raymond et al., 2022</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Finite-element simulations simplify real gameplay to controlled impact scenarios.</li>
            <li>Not all real-world impact types and player behaviours are modelled.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strength include scalable generation of realistic true impact data.</li>
            <li>Limitation include incomplete coverage of all possible real football impact conditions.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

// ###################################################################################
// # Hohl  et al., 2024
// ###################################################################################

obj_Hohl: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Hohl et al., 2024</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Limited availability of biological data due to invasive data collection (blood samples).</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Training and evaluating predictive models for athlete fatigue.</li>
            <li>Scenario exploration where real biological data are scarce or impractical to collect.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Augment real data by generating additional synthetic time-series sequences.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

struc_Hohl: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Hohl et al., 2024</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Daily biological, psychological, and training metrics of endurance athletes.</li>
            <li>Metrics include sleep quality, mood, training load (Foster load), and O2score.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>Synthetic sequences represent short (8 days) segments of athlete monitoring data.</li>
            <li>Preservation of feature distributions and inter feature relationships is targeted.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Feature distributions for sleep, mood, training load, and O2score.</li>
            <li>Correlations between features and temporal dependencies across days.</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Multivariate time-series structure with daily resolution.</li>
            <li>Fixed-length sequences of eight consecutive days.</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

strat_Hohl: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Hohl et al., 2024</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>Data scarcity is a central motivation of the study.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>Baseline methods (Random, Noise, k-medoids).</li>
            <li>Deep learning methods are also explored to relax strict parametric assumptions.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>Interpretability is important for comparing statistical and deep learning generators.</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Sensitive, as errors may distort biological relationships and fatigue prediction.</li>
            <li>Poor fidelity reduces downstream predictive performance.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Statistical and neural network-based approaches are explored and compared.</li>
        </ul>
        </p>
    `
},

con_Hohl: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Hohl et al., 2024</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>Methods did not address privacy concerns.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>Between synthetic sequences and real athlete-specific biological patterns.</li>
            <li>Across athletes due to strong inter individual variability.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Temporal coherence and feature relationships must be enforced.</li>
            <li>Exact replication of individual athlete sequences can be relaxed.</li>
        </ul>
        </p>
    `
},

uti_Hohl: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Hohl et al., 2024</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Explicitly evaluated using distributional distances.</li>
            <li>Noise, k-medoids, and TimeGAN show closest alignment.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Dependencies preserved in k-medoids, Noise, and TimeGAN methods.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>TimeGAN yields higher median predictive performance than other methods.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility matters most for predicting future O2score trends.</li>
            <li>Utility can be relaxed for exploratory analysis and method comparison.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters most for preserving feature relationships.</li>
            <li>Fidelity can be relaxed to increase diversity and reduce privacy risks.</li>
        </ul>
        </p>
    `
},

ris_Hohl: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Hohl et al., 2024</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Sequences are limited to fixed 8 day windows.</li>
            <li>Missing data were minimally imputed using k-NN.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strength include enabling modelling with very small real datasets.</li>
            <li>Limitation includes strong inter individual variability limiting generalisation.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

// ###################################################################################
// # Baumgartner and Klatt, 2023
// ###################################################################################

obj_BaumgartnerKlatt: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Baumgartner and Klatt, 2023</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Lack of ground-truth 3D kinematic data from sports broadcast footage.</li>
            <li>Difficulty and cost of collecting large-scale, valid 3D pose data in real-world stadium settings.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Benchmarking and evaluation of monocular 3D human pose estimation (HPE) methods.</li>
            <li>Demonstrating limitations of existing methods under sports broadcast camera conditions.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Stress-test and benchmark existing monocular 3D HPE methods.</li>
            <li>Augment evaluation resources where real ground truth is unavailable.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

struc_BaumgartnerKlatt: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Baumgartner and Klatt, 2023</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Middle-distance running athletes recorded in sports broadcast scenarios.</li>
            <li>Kinematic joint movements on a 400m athletics track.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>It represents realistic broadcast running scenarios.</li>
            <li>The dataset is designed to preserve realistic geometry, motion, and camera perspectives.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Spatial relationships between joints in 2D and 3D.</li>
            <li>Consistency between camera calibration, scene geometry, and joint locations.</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>Temporal sequences of running motion across video frames.</li>
            <li>Hierarchical joint structures forming a kinematic skeleton.</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

strat_BaumgartnerKlatt: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Baumgartner and Klatt, 2023</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>Large-scale ground-truth 3D pose data from broadcasts do not exist.</li>
            <li>This absence motivates synthetic data generation.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>The approach relies on geometric and physical scene constraints instead.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>High control over camera calibration, joint positions, and scene geometry.</li>
            <li>Interpretability is critical to analyse kinematic validity and errors.</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Highly sensitive, as small 3D errors can overshadow meaningful biomechanical effects.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Simulation-based generation using Unreal Engine 5 combined with geometric reasoning.</li>
        </ul>
        </p>
    `
},

con_BaumgartnerKlatt: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Baumgartner and Klatt, 2023</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>Between synthetic renderings and real broadcast footage.</li>
            <li>No ground truth for this data.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Scene geometry, camera calibration, and kinematic consistency must be strictly enforced.</li>
            <li>Visual realism beyond geometric accuracy can be relaxed.</li>
        </ul>
        </p>
    `
},

uti_BaumgartnerKlatt: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Baumgartner and Klatt, 2023</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Spatial and geometric properties are designed to mirror broadcast scenarios.</li>
            <li>Motion realism is ensured through motion-capture–based animations.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Dependencies between camera geometry, joint positions, and projections are preserved.</li>
            <li>Temporal consistency across frames is enforced.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>Models trained on standard benchmarks perform poorly on the synthetic dataset.</li>
            <li>The synthetic data reveals generalisation failures in state-of-the-art methods.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility matters most for benchmarking 3D pose accuracy and kinematic validity.</li>
            <li>Utility can be relaxed for photorealism beyond geometric correctness.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters most for camera calibration and 3D joint accuracy.</li>
            <li>Fidelity can be relaxed for background details and non-essential visual features.</li>
        </ul>
        </p>
    `
},

ris_BaumgartnerKlatt: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Baumgartner and Klatt, 2023</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Assumption of known and rigid sports field geometry.</li>
            <li>Simplified lens distortion and controlled running scenarios.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strength include providing precise ground truth unavailable in real broadcasts.</li>
            <li>Limitation include tailoring to a narrow domain (middle-distance running).</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

// ###################################################################################
// # Shah et al., 2020
// ###################################################################################

obj_Shah: {
    titleColor: "#1e90ff",
    borderColor: "#bcdcff",
    html: `
        <h2>Shah et al., 2020</h2>

        <p><b>What limitation in real data are you trying to overcome?</b>
        <ul>
            <li>Scarcity and unavailability of real-world data in the sport domain.</li>
        </ul>
        </p>

        <p><b>What task or application should the synthetic data support (training, testing, benchmarking, privacy protection, or scenario exploration)?</b>
        <ul>
            <li>Training machine learning models for regression and prediction tasks.</li>
        </ul>
        </p>

        <p><b>Are you aiming to replace, augment, or stress-test real data?</b>
        <ul>
            <li>Augment real data by adding fully synthetic data to existing datasets.</li>
            <li>Improve model accuracy when real data are insufficient.</li>
        </ul>
        </p>

        <p><b>Who are the end users (researchers, practitioners, regulators, industry)?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

struc_Shah: {
    titleColor: "#8e44ad",
    borderColor: "#dcc6e6",
    html: `
        <h2>Shah et al., 2020</h2>

        <p><b>What is the total population or system the data represent?</b>
        <ul>
            <li>Football player attribute data derived from FIFA video game datasets.</li>
            <li>Player skill-related numerical attributes.</li>
        </ul>
        </p>

        <p><b>Is the synthetic dataset a sample of this totality, and should it preserve its distribution?</b>
        <ul>
            <li>The synthetic data are generated to statistically mimic the real dataset.</li>
            <li>Attribute distributions and correlations are intended to be preserved.</li>
        </ul>
        </p>

        <p><b>Which statistical properties (distributions, correlations, ranges) must be preserved?</b>
        <ul>
            <li>Linear correlations between highly correlated attributes (e.g., Ball Control and Dribbling).</li>
            <li>Value ranges of player attributes (between 20 and 100).</li>
        </ul>
        </p>

        <p><b>What hierarchies or temporal structures are intrinsic to the data?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>How should rare, extreme, or boundary cases appear in the structure?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
},

strat_Shah: {
    titleColor: "#16a085",
    borderColor: "#bfe7dd",
    html: `
        <h2>Shah et al., 2020</h2>

        <p><b>Are large, representative real datasets available?</b>
        <ul>
            <li>Only limited real datasets are available for training.</li>
        </ul>
        </p>

        <p><b>Are statistical assumptions acceptable for the task?</b>
        <ul>
            <li>Linear relationships and correlations are assumed and explicitly modelled.</li>
            <li>Higher-order non-linear terms were tested but discarded due to low significance.</li>
        </ul>
        </p>

        <p><b>How much control and interpretability are required?</b>
        <ul>
            <li>High interpretability is required, motivating the use of linear regression.</li>
        </ul>
        </p>

        <p><b>How sensitive is the task to generation errors or artefacts?</b>
        <ul>
            <li>Sensitive to incorrect estimation of correlations between attributes.</li>
        </ul>
        </p>

        <p><b>Should generation be statistical, simulation-based, neural network-based, or hybrid?</b>
        <ul>
            <li>Statistical, based on iterative linear regression analysis.</li>
        </ul>
        </p>
    `
},

con_Shah: {
    titleColor: "#e67e22",
    borderColor: "#f5d0a9",
    html: `
        <h2>Shah et al., 2020</h2>

        <p><b>What aspects of the data may cause privacy or disclosure risks?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Where might domain shift occur between synthetic and real data?</b>
        <ul>
            <li>If correlations learned from limited real data do not generalize.</li>
        </ul>
        </p>

        <p><b>Which classes or outcomes are naturally imbalanced?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Should imbalance be preserved, reduced, or explicitly controlled?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>

        <p><b>Which constraints must be strictly enforced, and which can be relaxed?</b>
        <ul>
            <li>Correlation structure between attributes must be enforced.</li>
            <li>Exact replication of real data values can be relaxed.</li>
        </ul>
        </p>
    `
},

uti_Shah: {
    titleColor: "#27ae60",
    borderColor: "#bfe6cf",
    html: `
        <h2>Shah et al., 2020</h2>

        <p><b>Do key variable distributions match those observed in real data?</b>
        <ul>
            <li>Distributions are shown to be statistically similar after generation.</li>
            <li>Uniformity and randomness tests (Chi-square, Runs test) are applied.</li>
        </ul>
        </p>

        <p><b>Are relationships and dependencies preserved?</b>
        <ul>
            <li>Strong linear correlations between selected attributes are preserved.</li>
        </ul>
        </p>

        <p><b>How do models trained on synthetic data perform on real or held-out data?</b>
        <ul>
            <li>Models trained with synthetic data show improved performance on real test data.</li>
            <li>An increase of approximately 7% in R2 score is reported.</li>
        </ul>
        </p>

        <p><b>Where does utility matter most, and where can it be relaxed?</b>
        <ul>
            <li>Utility matters most for improving model accuracy and training effectiveness.</li>
            <li>Utility can be relaxed for generating perfectly realistic pseudo-real data.</li>
        </ul>
        </p>

        <p><b>Where does fidelity matter most, and where can it be relaxed?</b>
        <ul>
            <li>Fidelity matters most for maintaining statistical similarity and correlations.</li>
            <li>Fidelity can be relaxed in terms of exact real-world realism.</li>
        </ul>
        </p>
    `
},

ris_Shah: {
    titleColor: "#c0392b",
    borderColor: "#f2b4ae",
    html: `
        <h2>Shah et al., 2020</h2>

        <p><b>What assumptions and simplifications were made during generation?</b>
        <ul>
            <li>Assumption of linear relationships between correlated attributes.</li>
        </ul>
        </p>

        <p><b>What are the known strengths and limitations of the synthetic data?</b>
        <ul>
            <li>Strength includes improving model accuracy with limited real data.</li>
            <li>Limitation includes generating data may become repetitive and not fully pseudo-real.</li>
        </ul>
        </p>

        <p><b>How should results derived from synthetic data be reported?</b>
        <ul>
            <li>No information.</li>
        </ul>
        </p>
    `
}


};

// ------------------------------------------------------------
// Helper: update panel content + theme
// ------------------------------------------------------------
const updatePanel = (key) => {
    if (!panelContent[key] || !panel) return;

    const entry = panelContent[key];

    panel.innerHTML = entry.html;
    panel.style.setProperty("--panelTitleColor", entry.titleColor);
    panel.style.setProperty("--panelTitleBorder", entry.borderColor);
};

// ------------------------------------------------------------
// Default state (Framework)
// ------------------------------------------------------------
updatePanel("framework");

// ------------------------------------------------------------
// Click interaction
// First activation shows the content. A second activation of the
// same linked box follows its link.
// ------------------------------------------------------------
let selectedNode = null;

frameworkRoot.querySelectorAll("[data-panel]").forEach(node => {
    const key = node.dataset.panel;

    // Ignore nodes that do not map to panelContent
    if (!panelContent[key]) return;

    node.setAttribute("aria-controls", "framework-panel");

    if (node.hasAttribute("href")) {
        node.setAttribute("rel", "noopener noreferrer");
        node.title = "Click once for details; click again to open the source";
    } else {
        node.setAttribute("role", "button");
        node.setAttribute("tabindex", "0");
        node.title = "Click to view details";
    }

    const selectNode = () => {
        if (selectedNode && selectedNode !== node) {
            selectedNode.classList.remove("is-selected");
            selectedNode.removeAttribute("aria-current");
        }

        updatePanel(key);
        node.classList.add("is-selected");
        node.setAttribute("aria-current", "true");
        selectedNode = node;
    };

    node.addEventListener("click", event => {
        const isSecondActivation = selectedNode === node;
        const hasLink = node.hasAttribute("href");

        if (!hasLink || !isSecondActivation) {
            event.preventDefault();
            selectNode();
        }
    });

    node.addEventListener("keydown", event => {
        if (event.key === " " && !node.hasAttribute("href")) {
            event.preventDefault();
            node.click();
        }
    });
});
