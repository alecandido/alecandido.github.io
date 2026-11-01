/*
 * Hand-written content: who I am, where I have been, what I did. Collected
 * from the GitHub profile README, the `cv` repository and INSPIRE.
 * Dates are ISO strings; `end: null` means ongoing.
 */

export type Period = { start: string; end: string | null };

export type Position = Period & {
  role: string;
  org: string;
  orgUrl: string;
  place: string;
  collaboration?: { name: string; url: string };
  summary: string;
};

export type Education = Period & {
  degree: string;
  area: string;
  org: string;
  orgUrl: string;
  place: string;
  grade?: string;
  note?: string;
  thesis?: { title: string; advisor: string };
};

export type Teaching = Period & {
  role: string;
  course: string;
  org: string;
  summary: string;
};

export type Event = { year: number; name: string; org?: string; place: string; url?: string };

export const profile = {
  name: 'Alessandro Candido',
  tagline: 'physicist · quantum software engineer',
  intro:
    'I build the open-source software behind quantum computing experiments, after a PhD spent extracting the structure of the proton from collider data.',
  location: 'Abu Dhabi, United Arab Emirates',

  links: {
    github: 'https://github.com/alecandido',
    linkedin: 'https://www.linkedin.com/in/alessandro-candido/',
    email: 'candido.ale@gmail.com',
    orcid: 'https://orcid.org/0000-0002-1405-3205',
    inspire: 'https://inspirehep.net/authors/1802044',
    scholar: 'https://scholar.google.com/citations?user=ZX5fxxYAAAAJ',
    telegram: 'https://t.me/candidoale'
  },

  about: [
    'My main occupation is the development of Qibo, an open-source middleware for quantum computing: an algorithmic language, simulators, hardware drivers and calibration routines, developed by an international collaboration for the laboratories that host their own devices.',
    'Qibo is an integration project. It bridges as many ingredients as possible, to offer a consistent experience across diverse and complex tasks, and to deduplicate the operations every laboratory would otherwise rebuild on its own. I work mostly on the hardware side: Qibolab, the control layer, Qibocal, the calibration suite, and Qibocamp, the desktop application that organizes calibrations and reports.',
    'Before that I was a theoretical physicist in high-energy phenomenology, working on perturbative QCD and the determination of parton distribution functions within the NNPDF collaboration. My PhD produced the theory pipeline that NNPDF uses to compute its predictions: evolution kernels, deep-inelastic scattering, and the machinery to glue them to Monte Carlo generators.',
    'I am a software developer by profession and for leisure. I enjoy computer science and software engineering for their own sake, I follow the tooling and developer-experience landscape closely, and I like getting involved in the communities around the tools I use.'
  ],

  positions: [
    {
      role: 'Senior Quantum Software Engineer',
      org: 'Technology Innovation Institute, Quantum Research Centre',
      orgUrl: 'https://www.tii.ae/quantum',
      place: 'Abu Dhabi',
      start: '2025-10-01',
      end: null,
      collaboration: { name: 'Qibo', url: 'https://qibo.science/' },
      summary:
        'Software for the control, calibration and operation of superconducting quantum processors, within the Qibo collaboration.'
    },
    {
      role: 'Research Fellow',
      org: 'CERN, Theoretical Physics Department',
      orgUrl: 'https://theory.cern/',
      place: 'Geneva',
      start: '2023-10-02',
      end: '2025-09-30',
      collaboration: { name: 'Qibo', url: 'https://qibo.science/' },
      summary:
        'Core developer of the Qibo framework in the scope of the CERN Quantum Technology Initiative: hardware abstraction, calibration, RFSoC control and the first open-source quantum operating system papers.'
    },
    {
      role: 'Postdoctoral researcher (assegnista di ricerca)',
      org: 'INFN, Milan section',
      orgUrl: 'https://www.mi.infn.it/',
      place: 'Milan',
      start: '2023-04-03',
      end: '2023-10-01',
      collaboration: { name: 'NNPDF', url: 'https://nnpdf.mi.infn.it/' },
      summary:
        'Theory predictions for parton distribution functions: approximate N3LO evolution, missing higher-order uncertainties, QED corrections.'
    }
  ] satisfies Position[],

  education: [
    {
      degree: 'PhD',
      area: 'Physics',
      org: 'Università degli Studi di Milano',
      orgUrl: 'https://www.unimi.it/',
      place: 'Milan',
      start: '2019-11-01',
      end: '2023-01-26',
      note: 'Part of the N3PDF team, funded by the European Research Council (Advanced Grant 740006). Member of the NNPDF collaboration.',
      thesis: { title: 'Theory predictions for PDF fitting', advisor: 'Stefano Forte' }
    },
    {
      degree: 'Diploma di Licenza',
      area: 'Physics',
      org: 'Scuola Normale Superiore',
      orgUrl: 'https://www.sns.it/',
      place: 'Pisa',
      start: '2014-09-01',
      end: '2020-07-06',
      grade: '100/100 cum laude',
      note: 'The title awarded by the Scuola Normale to students completing its full course, in parallel with the university degrees.'
    },
    {
      degree: 'MSc',
      area: 'Theoretical Physics',
      org: 'University of Pisa',
      orgUrl: 'https://www.unipi.it/',
      place: 'Pisa',
      start: '2017-09-01',
      end: '2019-10-23',
      grade: '110/110 cum laude',
      thesis: {
        title: 'Simplicial quantum gravity with dynamical gauge fields',
        advisor: "Massimo D'Elia"
      }
    },
    {
      degree: 'BSc',
      area: 'Physics',
      org: 'University of Pisa',
      orgUrl: 'https://www.unipi.it/',
      place: 'Pisa',
      start: '2014-09-01',
      end: '2017-06-15',
      grade: '110/110 cum laude'
    }
  ] satisfies Education[],

  theses: [
    {
      level: 'PhD thesis',
      title: 'Theory predictions for PDF fitting',
      advisor: 'Stefano Forte',
      summary:
        'Improving the theory predictions used to fit parton distributions in several directions: N3LO evolution and deep-inelastic scattering, missing higher-order uncertainties from scale variations, QED evolution. The work also meant a leap in performance and code structure, all released as open source, and it enabled side results: evidence for intrinsic charm in the proton, neural-network interpolation of low-energy neutrino structure functions, the forward-backward asymmetry in Drell-Yan as a probe of new physics.'
    },
    {
      level: 'MSc thesis',
      title: 'Simplicial quantum gravity with dynamical gauge fields',
      advisor: "Massimo D'Elia",
      summary:
        'An algorithm for the numerical simulation of the quantum dynamics of gravity coupled to gauge fields, in the framework of Causal Dynamical Triangulations, implemented in two space-time dimensions and checked against analytical results.'
    }
  ],

  interests: [
    {
      area: 'Quantum computing',
      items: [
        'Quantum simulation',
        'Quantum control electronics',
        'Calibration of superconducting devices'
      ]
    },
    {
      area: 'Perturbative QCD',
      items: [
        'Parton distribution functions',
        'Deep-inelastic scattering',
        'DGLAP evolution',
        'Missing higher-order uncertainties'
      ]
    },
    {
      area: 'Computing',
      items: [
        'Numerical methods',
        'Bayesian inference',
        'Multivariate interpolation',
        'Developer tooling'
      ]
    }
  ],

  skills: [
    {
      name: 'Languages',
      items: ['Python', 'Rust', 'TypeScript', 'Go', 'Shell', 'Fortran', 'C', 'C++']
    },
    {
      name: 'Scientific',
      items: ['NumPy', 'SciPy', 'Numba', 'JAX', 'TensorFlow', 'xarray', 'Pandas']
    },
    {
      name: 'Quantum',
      items: ['Qibo', 'Pulse-level control', 'RFSoC / QICK', 'Calibration', 'Simulation']
    },
    {
      name: 'Web & tooling',
      items: ['Svelte', 'SvelteKit', 'Vue', 'Tauri', 'Nix', 'Git', 'GitHub Actions']
    },
    { name: 'Documents', items: ['LaTeX', 'Markdown', 'reStructuredText', 'Slidev', 'reveal.js'] }
  ],

  languages: [
    { name: 'Italian', level: 'native' },
    { name: 'English', level: 'fluent, C1 (IELTS, 2019)' }
  ],

  teaching: [
    {
      role: 'Tutor',
      course: 'OFA Mathematics 2',
      org: 'University of Milan',
      start: '2021-10-01',
      end: '2022-06-30',
      summary: 'Remote tutoring for first-year STEM students recovering a mathematics debt.'
    },
    {
      role: 'Lecturer',
      course: 'Precorso matricole',
      org: 'Department of Physics, University of Milan',
      start: '2021-09-20',
      end: '2021-09-24',
      summary:
        'One-week introductory course on analysis and linear algebra for first-year physics students, with lecture notes and a dedicated website.'
    },
    {
      role: 'Teaching assistant',
      course: 'Fisica Quantistica, second half',
      org: 'Department of Physics, University of Milan',
      start: '2020-10-01',
      end: '2021-03-01',
      summary:
        'Exercise sessions and community for the quantum mechanics class of third-year students, with Stefano Forte and Alessandro Vicini.'
    },
    {
      role: 'Teaching assistant',
      course: 'Fisica Quantistica, first half',
      org: 'Department of Physics, University of Milan',
      start: '2020-03-01',
      end: '2020-10-01',
      summary:
        'Among the first remote courses of the pandemic: lectures over Zoom and a Google Groups community.'
    }
  ] satisfies Teaching[],

  events: [
    {
      year: 2024,
      name: 'International Meeting on Fundamental Physics',
      org: 'Centro de Ciencias de Benasque Pedro Pascual',
      place: 'Benasque, Spain',
      url: 'https://benasque.org/2024imfp/'
    },
    {
      year: 2024,
      name: 'Quantum Architectures for Analogues and Theory Applications',
      org: 'Fondazione Bruno Kessler',
      place: 'Trento, Italy',
      url: 'https://agenda.infn.it/event/39248/'
    },
    {
      year: 2023,
      name: 'IFAE 2023, Incontri di Fisica delle Alte Energie',
      place: 'Catania, Italy'
    },
    {
      year: 2022,
      name: 'Machine Learning @ GGI',
      org: 'Galileo Galilei Institute for Theoretical Physics',
      place: 'Florence, Italy',
      url: 'https://www.ggi.infn.it/showevent.pl?id=411'
    },
    {
      year: 2022,
      name: 'ISMD 2022, International Symposium on Multiparticle Dynamics',
      place: 'Pitlochry, Scotland',
      url: 'https://indico.cern.ch/event/1015549/'
    },
    {
      year: 2022,
      name: 'ICHEP 2022, International Conference on High Energy Physics',
      place: 'Bologna, Italy',
      url: 'https://www.ichep2022.it/'
    },
    {
      year: 2022,
      name: 'DIS 2022, Deep-Inelastic Scattering and Related Subjects',
      place: 'Santiago de Compostela, Spain',
      url: 'https://indico.cern.ch/event/1072533/'
    },
    {
      year: 2020,
      name: '15th joint Fermilab-CERN Hadron Collider Physics Summer School',
      place: 'online',
      url: 'https://indico.fnal.gov/event/22840/'
    },
    {
      year: 2020,
      name: 'GGI Lectures on the Theory of Fundamental Interactions',
      org: 'Galileo Galilei Institute for Theoretical Physics',
      place: 'Florence, Italy',
      url: 'https://www.ggi.infn.it/showevent.pl?id=337'
    }
  ] satisfies Event[],

  /** Talks given before the slides were kept in the public repository. */
  earlierTalks: [
    { date: '2022-11', title: 'Data and interfaces', event: 'TII seminar', place: 'Abu Dhabi' },
    {
      date: '2022-08',
      title: 'Theory predictions for PDF fitting',
      event: 'ISMD 2022',
      place: 'Pitlochry'
    },
    {
      date: '2022-07',
      title: 'Theory predictions: EKO, yadism and intrinsic charm',
      event: 'ICHEP 2022',
      place: 'Bologna'
    },
    { date: '2022-07', title: 'PDF sampling', event: 'NNPDF summer meeting', place: 'Gargnano' },
    {
      date: '2022-04',
      title: 'Parton distribution functions',
      event: 'Machine Learning @ GGI',
      place: 'Florence'
    },
    { date: '2021-07', title: 'Towards N3LO', event: 'NNPDF summer meeting', place: 'Gargnano' },
    {
      date: '2020-09',
      title: 'Can MSbar PDFs be negative?',
      event: 'SIF national congress',
      place: 'online'
    },
    {
      date: '2020-06',
      title: 'Can MSbar PDFs be negative?',
      event: 'PhD workshop and SNS seminar',
      place: 'Milan, Pisa'
    }
  ]
};

export type Profile = typeof profile;

export function formatPeriod(p: Period, opts: { month?: boolean } = {}) {
  const fmt = (iso: string) => {
    const d = new Date(iso);
    return opts.month
      ? d.toLocaleDateString('en', { month: 'short', year: 'numeric' })
      : String(d.getFullYear());
  };
  const end = p.end ? fmt(p.end) : 'now';
  const start = fmt(p.start);
  return start === end ? start : `${start} – ${end}`;
}
