import { SyllabusItem } from '../types';

export const sscCglSyllabus: SyllabusItem[] = [
  // ==========================================
  // SSC CGL TIER 1 & TIER 2 - QUANTITATIVE APTITUDE / MATHEMATICAL ABILITIES
  // ==========================================
  {
    id: 'ssc-cgl-qa-01',
    code: 'CGL-MATH-01',
    title: 'Number Systems & Elementary Number Theory',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Number System & Arithmetic',
    subtopics: [
      'Computation of Whole Numbers, Integers, Rational and Irrational Numbers',
      'Decimals and Fractions, Recurring Decimals, Converting Recurring to Vulgar Fractions',
      'Relationship between Numbers, Factors, Multiples and Prime Factorization',
      'Divisibility Rules (from 2 up to 99, composite divisibility like 72, 88)',
      'Unit Digit, Tens Digit, Number of Zeroes at the end of a product/factorial',
      'Remainders: Basic Remainder Theorem, Fermat Little Theorem, Wilson Theorem, Euler Totient Function',
      'LCM and HCF: Factor method, Division method, Word problems on bells, circular tracks, tiles',
      'Square Roots, Cube Roots, Surds and Indices (simplification and rationalization of surds)'
    ],
    priority: 'high',
    weightage: '3-4 Questions in Tier 1, 3-4 in Tier 2',
    officialRef: 'Computation of whole numbers, Decimals, Fractions, Relationships between numbers'
  },
  {
    id: 'ssc-cgl-qa-02',
    code: 'CGL-MATH-02',
    title: 'Percentages, Profit, Loss & Discount',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Arithmetic Essentials',
    subtopics: [
      'Percentage: Fraction-to-percentage conversion tables (1/1 to 1/20), Successive percentage changes (a + b + ab/100)',
      'Price, Consumption and Expenditure relationships, Population and machine depreciation problems',
      'Profit and Loss: Cost Price, Selling Price, Marked Price relationships, Profit/Loss percentage',
      'Dishonest Shopkeeper problems (cheating by weight and price manipulation)',
      'Discount: Single discount, Successive discounts, Buy X Get Y Free schemes, Free gift equivalencies',
      'Cross multiplication and Alligation methods applied to profit and loss'
    ],
    priority: 'high',
    weightage: '4-5 Questions in Tier 1, 4-5 in Tier 2',
    officialRef: 'Percentage, Profit and Loss, Discount'
  },
  {
    id: 'ssc-cgl-qa-03',
    code: 'CGL-MATH-03',
    title: 'Ratio & Proportion, Mixture & Alligation, Partnership & Averages',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Arithmetic Essentials',
    subtopics: [
      'Ratio and Proportion: Mean proportional, Third proportional, Fourth proportional, Duplicate & Triplicate ratios',
      'Coins and denominations based ratio problems, Income-Expenditure-Savings ratios',
      'Partnership: Simple and Compound partnership, Active vs Sleeping partner, Profit sharing based on capital and time',
      'Mixture and Alligation: Rule of Alligation, Repeated dilution/replacement formula [Remaining = Initial * (1 - x/C)^n]',
      'Averages: Weighted average, Inclusion, Exclusion and Replacement of members, Cricket bowling/batting average problems',
      'Age problems based on ratio and linear equations'
    ],
    priority: 'high',
    weightage: '3-4 Questions in Tier 1, 3-5 in Tier 2',
    officialRef: 'Ratio & Proportion, Partnership Business, Mixture and Alligation, Averages'
  },
  {
    id: 'ssc-cgl-qa-04',
    code: 'CGL-MATH-04',
    title: 'Simple & Compound Interest, Installments',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Commercial Mathematics',
    subtopics: [
      'Simple Interest: Formulas, Constant rate and variable time, Sum of money becoming N-times',
      'Compound Interest: Annual, Half-yearly, Quarterly compounding, Effective annual rate',
      'Difference between CI and SI for 2 years [P(r/100)^2] and 3 years [P(r/100)^2 * (300+r)/100]',
      'Installments: Simple Interest installments (debt payment) and Compound Interest EMI loan calculations'
    ],
    priority: 'high',
    weightage: '2-3 Questions in Tier 1, 2-3 in Tier 2',
    officialRef: 'Interest (Simple and Compound)'
  },
  {
    id: 'ssc-cgl-qa-05',
    code: 'CGL-MATH-05',
    title: 'Time & Work, Pipes & Cisterns',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Work & Energy Math',
    subtopics: [
      'Time and Work: Total work LCM method, Individual efficiencies, Alternate day work',
      'Persons leaving before or after joining, Efficiency changes due to illness/replacements',
      'Man-Days formula (M1*D1*H1*E1 / W1 = M2*D2*H2*E2 / W2), Men, Women and Children equivalence',
      'Wages distribution proportional to work done or efficiency',
      'Pipes and Cisterns: Inlets and Outlets, Leakage problems, Alternating pipe filling schedules'
    ],
    priority: 'high',
    weightage: '2-3 Questions in Tier 1, 3 Questions in Tier 2',
    officialRef: 'Time & Work'
  },
  {
    id: 'ssc-cgl-qa-06',
    code: 'CGL-MATH-06',
    title: 'Time, Speed & Distance, Trains, Boats & Streams, Races',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Motion & Mechanics',
    subtopics: [
      'Speed, Distance, Time conversions (km/h to m/s by 5/18), Average Speed formulas [2xy/(x+y)]',
      'Early and Late arrival scenarios, Changing speed and time adjustments',
      'Relative Speed: Objects moving in same direction (u - v) and opposite direction (u + v)',
      'Problems on Trains: Crossing a stationary point/pole, platform/bridge, and moving train',
      'Boats and Streams: Downstream speed (u + v), Upstream speed (u - v), Still water speed & Stream speed',
      'Linear and Circular Races: Head starts in distance and time, Dead heat, Meeting points on track'
    ],
    priority: 'high',
    weightage: '2-3 Questions in Tier 1, 3 Questions in Tier 2',
    officialRef: 'Time and distance'
  },
  {
    id: 'ssc-cgl-qa-07',
    code: 'CGL-MATH-07',
    title: 'Algebra: Polynomials, Identities, Surds & Linear Graphs',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Advanced Mathematics',
    subtopics: [
      'Basic Algebraic Identities: (a+b)^2, (a-b)^2, a^2-b^2, (a+b+c)^2, a^3+b^3+c^3 - 3abc identities',
      'Condition if a + b + c = 0 then a^3 + b^3 + c^3 = 3abc and its advanced variations',
      'Symmetric expressions and value-putting methods',
      'Equations involving x + 1/x = k, solving for x^2 + 1/x^2, x^3 + 1/x^3, x^5 + 1/x^5, x^7 + 1/x^7',
      'Quadratic equations: Roots, Discriminant, Nature of roots, Sum and Product of roots',
      'Graphs of Linear Equations: Finding slope, intercepts, intersection points, lines parallel/perpendicular to axes'
    ],
    priority: 'high',
    weightage: '3-4 Questions in Tier 1, 3-4 in Tier 2',
    officialRef: 'Basic algebraic identities of School Algebra and Elementary surds, Graphs of Linear Equations'
  },
  {
    id: 'ssc-cgl-qa-08',
    code: 'CGL-MATH-08',
    title: 'Geometry: Lines, Angles, Triangles, Quadrilaterals & Circles',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Advanced Mathematics',
    subtopics: [
      'Lines and Angles: Parallel lines, Transversal, Corresponding, Alternate interior, Co-interior angles',
      'Triangles: Angle sum, Exterior angle theorem, Congruence criteria (SSS, SAS, ASA, RHS), Similarity criteria (AA, SAS, SSS)',
      'Centres of Triangles: Centroid (2:1 division), Incentre (Angle bisectors), Circumcentre (Perpendicular bisectors), Orthocentre (Altitudes)',
      'Important Theorems: Apollonius theorem, Stewart theorem, Angle bisector theorem, Mid-point theorem, Thales theorem',
      'Right Angled Triangle properties, Equilateral & Isosceles triangle special formulas',
      'Circles & Chords: Perpendicular from centre bisects chord, Equal chords subtend equal angles, Alternate segment theorem',
      'Tangents to Circles: Tangent from external point (PA * PB = PT^2), Direct common tangent [sqrt(d^2 - (r1-r2)^2)], Transverse common tangent [sqrt(d^2 - (r1+r2)^2)]',
      'Cyclic Quadrilaterals: Opposite angles sum 180°, Ptolemy theorem'
    ],
    priority: 'high',
    weightage: '4-5 Questions in Tier 1, 4-6 in Tier 2',
    officialRef: 'Triangle and its centres, Congruence and similarity, Circle chords, tangents, angles'
  },
  {
    id: 'ssc-cgl-qa-09',
    code: 'CGL-MATH-09',
    title: 'Mensuration: 2D Plane Figures & 3D Solid Geometry',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Advanced Mathematics',
    subtopics: [
      '2D Mensuration: Triangle (Heron formula), Rectangle, Square, Parallelogram, Rhombus, Trapezium, Regular Polygons (Hexagon, Octagon)',
      'Circle, Semicircle, Sector and Segment area, Annulus/Ring pathways',
      '3D Mensuration: Cuboid, Cube (Surface area, Lateral area, Longest diagonal = sqrt(l^2+b^2+h^2))',
      'Right Circular Cylinder, Hollow Cylinder, Right Circular Cone, Frustum of a cone',
      'Sphere, Hemisphere, Spherical Shell (Surface areas and Volume calculations)',
      'Right Prism and Regular Right Pyramid with triangular, square or hexagonal base, Tetrahedron',
      'Melting and Recasting problems: Volume conservation, Cutting solids, Ratio of surface area and volume'
    ],
    priority: 'high',
    weightage: '3-4 Questions in Tier 1, 4-5 in Tier 2',
    officialRef: 'Triangle, Quadrilaterals, Regular Polygons, Circle, Right Prism, Cone, Cylinder, Sphere, Pyramid'
  },
  {
    id: 'ssc-cgl-qa-10',
    code: 'CGL-MATH-10',
    title: 'Trigonometry: Ratios, Identities, Max/Min & Heights & Distances',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Advanced Mathematics',
    subtopics: [
      'Trigonometric Ratios: Sin, Cos, Tan, Cot, Sec, Cosec in right triangle, Values at 0°, 30°, 45°, 60°, 90°',
      'Circular measure of angles: Degree and Radian conversion (180° = π rad)',
      'Fundamental Trigonometric Identities: sin^2 + cos^2 = 1, 1 + tan^2 = sec^2, 1 + cot^2 = cosec^2',
      'Complementary angles: sin(90-θ) = cos θ, tan(90-θ) = cot θ, sec(90-θ) = cosec θ; Product relations like tan A * tan B = 1 if A+B=90°',
      'Maximum and Minimum values of trigonometric expressions (a sin θ + b cos θ, a sin^2 θ + b cosec^2 θ)',
      'Heights and Distances: Angles of elevation and depression, Two-observer cases, Shadow variation with sun angle'
    ],
    priority: 'high',
    weightage: '3-4 Questions in Tier 1, 3-4 in Tier 2',
    officialRef: 'Trigonometric ratios, Degree and Radian, Standard Identities, Heights and Distances'
  },
  {
    id: 'ssc-cgl-qa-11',
    code: 'CGL-MATH-11',
    title: 'Statistics, Probability & Data Interpretation',
    examId: 'ssc_cgl',
    stageId: 'tier2',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-math',
    subjectTitle: 'Mathematical Abilities / Quantitative Aptitude',
    moduleTitle: 'Statistics & Probability (Tier 2 Mandatory)',
    subtopics: [
      'Measures of Central Tendency: Mean (Arithmetic, Weighted), Median, Mode for ungrouped and grouped data',
      'Empirical relationship: Mode = 3 Median - 2 Mean',
      'Measures of Dispersion: Range, Mean Deviation, Variance (σ^2), Standard Deviation (σ), Coefficient of Variation',
      'Calculation of Simple Probabilities: Sample space, Complementary events, Mutually exclusive and Independent events',
      'Probability of cards, dice, coins, colored balls and conditional probability basics',
      'Statistical Charts & DI: Histogram, Frequency Polygon, Bar Diagram, Pie Chart, Line Graph'
    ],
    priority: 'high',
    weightage: '2-4 Questions in Tier 2',
    officialRef: 'Statistics and Probability: Mean, median, mode, standard deviation, calculation of simple probabilities'
  },

  // ==========================================
  // REASONING AND GENERAL INTELLIGENCE (TIER 1 & TIER 2)
  // ==========================================
  {
    id: 'ssc-cgl-reas-01',
    code: 'CGL-REAS-01',
    title: 'Verbal Reasoning: Analogies, Classification, Coding-Decoding',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-reas',
    subjectTitle: 'General Intelligence & Reasoning',
    moduleTitle: 'Verbal Reasoning',
    subtopics: [
      'Semantic Analogy, Symbolic/Number Analogy, Word Analogy',
      'Classification (Odd One Out): Semantic, Symbolic, Alphabetical, Numerical',
      'Coding and Decoding: Letter shifting (+/- n), Reverse alphabet positions (A=26, Z=1), Matrix coding, Substitution coding, Word-sentence coding',
      'Alphabet and Word Formation: Meaningful word arrangement, Dictionary order, Letter pair distance',
      'Number Series, Alphabet Series, Mixed Series, Missing term identification'
    ],
    priority: 'high',
    weightage: '8-10 Questions in Tier 1, 7-9 in Tier 2',
    officialRef: 'Analogies, Similarities, Classification, Coding & decoding'
  },
  {
    id: 'ssc-cgl-reas-02',
    code: 'CGL-REAS-02',
    title: 'Analytical & Logical Reasoning: Syllogism, Blood Relations, Direction',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-reas',
    subjectTitle: 'General Intelligence & Reasoning',
    moduleTitle: 'Analytical Reasoning',
    subtopics: [
      'Syllogistic Reasoning: All, Some, No, Some-not propositions, Possibility cases, Either-Or cases',
      'Blood Relations: Family tree diagrams, Coded relations (A + B means A is father of B), Pointing to a photograph',
      'Direction and Distance Sense: Cardinal directions, Pythagorean distance, Shadow at sunrise/sunset, Turns and angle rotations',
      'Order and Ranking: Total persons from left and right ranks, Overlapping cases, Interchanging positions',
      'Seating Arrangements: Linear facing North/South, Circular facing centre/outside, Square tables',
      'Puzzles: Scheduling, Floor puzzles, Box puzzles, Day/Date matching'
    ],
    priority: 'high',
    weightage: '7-9 Questions in Tier 1, 8-10 in Tier 2',
    officialRef: 'Syllogistic reasoning, Relationship concepts, Problem solving'
  },
  {
    id: 'ssc-cgl-reas-03',
    code: 'CGL-REAS-03',
    title: 'Non-Verbal & Visual Reasoning: Paper Folding, Mirrors, Embedded Figures',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-reas',
    subjectTitle: 'General Intelligence & Reasoning',
    moduleTitle: 'Non-Verbal Reasoning',
    subtopics: [
      'Punched hole / pattern-folding & unfolding (Paper cutting & folding)',
      'Figural Pattern-folding and completion of incomplete figures',
      'Mirror Images (lateral inversion) and Water Images (vertical inversion) of letters, numbers, and figures',
      'Embedded Figures: Identifying hidden figures inside complex designs',
      'Figural Series, Figural Classification, and Figural Analogy (rotation, addition/deletion of elements)',
      'Cube and Dice: Open dice folding, Opposite faces on standard and ordinary dice'
    ],
    priority: 'high',
    weightage: '6-8 Questions in Tier 1, 5-7 in Tier 2',
    officialRef: 'Figural classification, Punched hole, Embedded figures, Space orientation'
  },
  {
    id: 'ssc-cgl-reas-04',
    code: 'CGL-REAS-04',
    title: 'Critical Thinking, Emotional & Social Intelligence (Tier 2 Focus)',
    examId: 'ssc_cgl',
    stageId: 'tier2',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-reas',
    subjectTitle: 'General Intelligence & Reasoning',
    moduleTitle: 'Critical & Cognitive Reasoning',
    subtopics: [
      'Statement and Assumptions (Valid implicit assumptions vs invalid claims)',
      'Statement and Conclusions / Inferences drawn from premises',
      'Statement and Course of Action (Feasible, balanced, non-extreme administrative steps)',
      'Cause and Effect relationships (Principal cause, immediate cause, independent cause)',
      'Assertion and Reason verification',
      'Emotional and Social Intelligence: Empathy, self-regulation, situational judgment'
    ],
    priority: 'high',
    weightage: '5-7 Questions in Tier 2',
    officialRef: 'Critical thinking, Emotional Intelligence, Social Intelligence, Drawing inferences'
  },

  // ==========================================
  // ENGLISH LANGUAGE AND COMPREHENSION (TIER 1 & TIER 2)
  // ==========================================
  {
    id: 'ssc-cgl-eng-01',
    code: 'CGL-ENG-01',
    title: 'English Grammar Rules & Error Spotting / Improvement',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-eng',
    subjectTitle: 'English Language & Comprehension',
    moduleTitle: 'Grammar & Syntax',
    subtopics: [
      'Subject-Verb Agreement (Rules with either/or, neither/nor, along with, collective nouns, each/every)',
      'Tenses: Present/Past/Future perfect, Conditionals (Zero, 1st, 2nd, 3rd conditional if-clauses)',
      'Prepositions & Phrasal Verbs: Prepositions of time, place, direction; Fixed prepositions (abstain from, comply with, prone to)',
      'Conjunctions & Parallelism: Correlative conjunctions (not only... but also, scarcely... when, no sooner... than)',
      'Articles: Definite vs Indefinite, Omission of articles',
      'Modifiers, Inversion rules (Hardly had I..., Never before...), Question tags, Redundancy errors',
      'Spotting the Error questions and Sentence Improvement exercises'
    ],
    priority: 'high',
    weightage: '6-8 Questions in Tier 1, 10-14 in Tier 2',
    officialRef: 'Spot the Error, Improvement of Sentences, Grammar rules'
  },
  {
    id: 'ssc-cgl-eng-02',
    code: 'CGL-ENG-02',
    title: 'Vocabulary: Synonyms, Antonyms, Idioms, One-Word Substitution & Spelling',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-eng',
    subjectTitle: 'English Language & Comprehension',
    moduleTitle: 'Vocabulary & Lexicon',
    subtopics: [
      'Synonyms and Antonyms (High-frequency words, contextual connotations, root words, prefixes/suffixes)',
      'One-word Substitution: Scientific studies (-logy), Phobias, Manias, Government types (-cracy), Killing (-cide)',
      'Idioms and Phrases: Origin, meaning, sentence application, animal idioms, color idioms',
      'Spellings / Detecting Misspelled Words: Common pitfalls (accommodate, occurrence, separate, rhythm, bureaucracy)',
      'Homonyms, Homophones, Commonly confused words (affect vs effect, principle vs principal, eligible vs illegible)'
    ],
    priority: 'high',
    weightage: '8-10 Questions in Tier 1, 12-16 in Tier 2',
    officialRef: 'Synonyms, Antonyms, Spellings, Idioms & Phrases, One word substitution'
  },
  {
    id: 'ssc-cgl-eng-03',
    code: 'CGL-ENG-03',
    title: 'Active / Passive Voice & Direct / Indirect Narration',
    examId: 'ssc_cgl',
    stageId: 'tier2',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-eng',
    subjectTitle: 'English Language & Comprehension',
    moduleTitle: 'Transformation of Sentences',
    subtopics: [
      'Active to Passive Voice transformation across all tenses (Simple, Continuous, Perfect)',
      'Imperative sentences in passive voice (Let + Object + be + V3 or You are ordered/requested to...)',
      'Interrogative sentences, Prepositional verbs, Sentences with two objects',
      'Direct to Indirect Narration: Reporting verb change (said to -> told/asked/exclaimed/ordered)',
      'Tense changes, Pronoun changes, Time and Place adverbs shift (now -> then, yesterday -> the previous day)',
      'Exclamatory, Optative, and Interrogative reporting rules'
    ],
    priority: 'high',
    weightage: '2-3 Questions in Tier 1, 6-8 in Tier 2',
    officialRef: 'Active/Passive Voice of Verbs, Conversion into Direct/Indirect Narration'
  },
  {
    id: 'ssc-cgl-eng-04',
    code: 'CGL-ENG-04',
    title: 'Comprehension, Cloze Test & Para Jumbles (Sentence Rearrangement)',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-eng',
    subjectTitle: 'English Language & Comprehension',
    moduleTitle: 'Reading & Coherence',
    subtopics: [
      'Reading Comprehension: Narrative, Expository, Scientific and Editorial passages',
      'Direct factual questions, Vocabulary-in-context questions, Author tone, Inference questions',
      'Cloze Passage: Contextual vocabulary selection, Prepositional fit, Logical connector choice',
      'Sentence Rearrangement / Para Jumbles (PQRS): Finding the opening sentence, Chronological links, Pronoun-noun links, Conjunction transitions'
    ],
    priority: 'high',
    weightage: '8-10 Questions in Tier 1, 12-16 in Tier 2',
    officialRef: 'Shuffling of Sentence parts, Cloze Passage, Comprehension Passage'
  },

  // ==========================================
  // GENERAL AWARENESS (TIER 1 & TIER 2)
  // ==========================================
  {
    id: 'ssc-cgl-ga-01',
    code: 'CGL-GA-01',
    title: 'General Science: Physics, Chemistry & Biology',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-ga',
    subjectTitle: 'General Awareness',
    moduleTitle: 'General Science',
    subtopics: [
      'Physics: SI units, Motion, Newton laws, Gravitation, Work-Energy-Power, Sound & Waves, Light (Reflection, Refraction, Lenses, Total Internal Reflection), Electricity & Magnetism',
      'Chemistry: Matter, Atomic structure, Periodic Table trends, Chemical reactions, Acids-Bases-Salts, Metals and Non-metals, Carbon and its compounds, Everyday chemical compounds',
      'Biology: Cell biology, Plant and Animal tissues, Human anatomy (Digestive, Circulatory, Respiratory, Nervous, Endocrine systems)',
      'Vitamins and deficiency diseases, Human diseases (Pathogens, Symptoms, Prevention), Genetics basics, Plant physiology (Photosynthesis, Transpiration)'
    ],
    priority: 'high',
    weightage: '6-8 Questions in Tier 1, 4-6 in Tier 2',
    officialRef: 'Scientific Research, General Science'
  },
  {
    id: 'ssc-cgl-ga-02',
    code: 'CGL-GA-02',
    title: 'History, Culture, Geography, Polity & Indian Economy',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-ga',
    subjectTitle: 'General Awareness',
    moduleTitle: 'Social Studies & Humanities',
    subtopics: [
      'Ancient & Medieval History: IVC, Buddhism/Jainism, Mauryas, Guptas, Delhi Sultanate, Mughals, Marathas',
      'Modern History: 1857 Revolt, Freedom struggle, Viceroys/Governor Generals, Acts and Treaties, INC sessions',
      'Indian Culture: Classical & Folk dances, Music gharanas, Festivals, Fairs, Temple architecture, Musical instruments and maestros',
      'Geography: Physical features, River systems, Mountain peaks, Passes, National Parks, Climate, Soils, Solar system',
      'Polity: Constitution articles, Schedules, Preamble, Fundamental Rights/Duties, President, PM, Parliament, Supreme Court, Amendments',
      'Economy: GDP, Inflation, Five Year Plans, RBI and Banking, Fiscal Deficit, Budget terms, Poverty & Unemployment schemes'
    ],
    priority: 'high',
    weightage: '12-14 Questions in Tier 1, 10-12 in Tier 2',
    officialRef: 'History, Culture, Geography, Economic Scene, General Policy'
  },
  {
    id: 'ssc-cgl-ga-03',
    code: 'CGL-GA-03',
    title: 'Current Affairs & Static GK',
    examId: 'ssc_cgl',
    stageId: 'tier1',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-ga',
    subjectTitle: 'General Awareness',
    moduleTitle: 'Current Affairs & Static Knowledge',
    subtopics: [
      'National & International Summits, Government Schemes and Portals, Military Exercises, Defense acquisitions',
      'Sports: Olympics, Asian Games, Commonwealth, Cricket World Cups, Grand Slams, Chess tournaments, Trophies',
      'Awards & Honors: Bharat Ratna, Padma Awards, Nobel Prizes, Oscar, Sahitya Akademi, Gallantry awards',
      'Books and Authors (Historical, Autobiographies, Recent releases), Important Days and Themes',
      'First in India / World, Headquarters of International Organizations, Census of India key demographic figures'
    ],
    priority: 'high',
    weightage: '6-8 Questions in Tier 1, 6-8 in Tier 2',
    officialRef: 'Current events, Sports, Books, Awards'
  },

  // ==========================================
  // COMPUTER KNOWLEDGE MODULE (TIER 2 QUALIFYING)
  // ==========================================
  {
    id: 'ssc-cgl-comp-01',
    code: 'CGL-COMP-01',
    title: 'Computer Basics, Hardware, Memory & Software',
    examId: 'ssc_cgl',
    stageId: 'tier2',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-comp',
    subjectTitle: 'Computer Knowledge Module (Qualifying)',
    moduleTitle: 'Computer Fundamentals',
    subtopics: [
      'Computer Architecture: Input/Output devices, CPU (ALU, CU, Registers), Motherboard, System buses',
      'Memory Organization: Primary Memory (RAM - SRAM/DRAM, ROM - PROM/EPROM/EEPROM, Cache Memory L1/L2/L3)',
      'Secondary Storage: HDD, SSD, Magnetic tape, Optical discs (CD, DVD, Blu-ray), Flash drives',
      'Ports and Connectors: USB, HDMI, VGA, Ethernet RJ45, DisplayPort, Audio jacks',
      'Software: System Software (Operating Systems - Windows, Linux, macOS; Device Drivers) vs Application Software'
    ],
    priority: 'high',
    weightage: '6-8 Questions in Tier 2',
    officialRef: 'Organization of a Computer, CPU, input/output devices, Computer Memory, Software'
  },
  {
    id: 'ssc-cgl-comp-02',
    code: 'CGL-COMP-02',
    title: 'MS Office Suite, Internet, Networking & Cyber Security',
    examId: 'ssc_cgl',
    stageId: 'tier2',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-comp',
    subjectTitle: 'Computer Knowledge Module (Qualifying)',
    moduleTitle: 'Office & Networking',
    subtopics: [
      'MS Word: Shortcuts (Ctrl+A to Z, function keys), Document formatting, Paragraph alignment, Mail Merge, Header/Footer',
      'MS Excel: Cells, Rows, Columns, Formulas (SUM, AVERAGE, VLOOKUP, XLOOKUP, IF, CONCATENATE), Charts, Pivot tables',
      'MS PowerPoint: Slide layouts, Animations, Transitions, Slide master, Presentation views',
      'Internet & Web: Browsers, Search engines, URLs, HTTP vs HTTPS, FTP, DNS, IP addressing (IPv4 vs IPv6)',
      'E-mail: Protocols (SMTP, POP3, IMAP), CC vs BCC, Attachments, Spam, Phishing',
      'Networking: LAN, MAN, WAN, PAN, Network topologies (Star, Bus, Ring, Mesh, Tree), Routers, Switches, Modems',
      'Cyber Security: Malware (Virus, Worm, Trojan, Ransomware, Spyware, Adware), Firewalls, Antivirus, Two-factor authentication (2FA), Encryption'
    ],
    priority: 'high',
    weightage: '12-14 Questions in Tier 2',
    officialRef: 'MS Word, Excel, PowerPoint, Internet, Networking and Cyber Security'
  },

  // ==========================================
  // DATA ENTRY SPEED TEST (DEST)
  // ==========================================
  {
    id: 'ssc-cgl-dest-01',
    code: 'CGL-DEST-01',
    title: 'Data Entry Speed Test (DEST) - 2000 Key Depressions / 15 Mins',
    examId: 'ssc_cgl',
    stageId: 'tier2',
    stageTitle: 'Tier 1 & Tier 2',
    subjectId: 'cgl-dest',
    subjectTitle: 'DEST (Data Entry Skill Test - Qualifying)',
    moduleTitle: 'Typing Skill Evaluation',
    subtopics: [
      'Passage transcription: 2000 key depressions in 15 minutes (~27 words per minute speed)',
      'Permissible error limits (5% for UR, 7% for OBC/EWS, 10% for SC/ST/PwD)',
      'Punctuation marks, Capital letters, Numbers handling without backspace overuse',
      'Daily 20-minute touch typing rhythm and accuracy drills'
    ],
    priority: 'high',
    weightage: 'Qualifying Criterion for all CGL posts',
    officialRef: 'Data Entry Speed Test on Computer (15 minutes duration)'
  }
];
