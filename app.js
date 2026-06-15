const app = document.querySelector("#app");

const roles = {
  student: {
    label: "Espace Etudiant",
    short: "ET",
    loginText: "Accedez a vos candidatures, contrats, suivis et documents.",
    welcome: "Bonjour Camille, votre alternance avance bien.",
    subtitle: "Retrouvez vos priorites, documents, taches et rendez-vous au meme endroit.",
    metrics: [
      ["Statut du contrat", "Valide", "Contrat actif chez Nova RH"],
      ["Progression", "62%", "Alternance en cours"],
      ["Documents attendus", "3", "Dont 1 urgent"]
    ],
    lists: {
      mainTitle: "Documents a fournir",
      main: [
        ["Contrat d'apprentissage", "Recu et valide", "green"],
        ["Attestation employeur", "A deposer avant vendredi", "amber"],
        ["Justificatif d'identite", "En attente de validation", "amber"]
      ],
      secondTitle: "Dernieres notifications",
      second: [
        ["Nouveau message de l'ecole", "Il y a 18 min", "blue"],
        ["Document valide", "Hier a 16:20", "green"],
        ["Evaluation a preparer", "Avant le 14 juin", "amber"]
      ],
      tasks: ["Lire le retour du tuteur ecole", "Deposer l'attestation employeur", "Completer le bilan de mission"]
    },
    assistant: {
      intro: "Je peux t'aider a comprendre tes documents, preparer un rendez-vous ou clarifier ton contrat.",
      prompts: ["Quels documents me manquent ?", "Prepare mon rendez-vous", "Explique mon contrat"],
      report: "Compte-rendu propose : Camille avance correctement dans son alternance. Le contrat est valide, mais l'attestation employeur reste a deposer. Prochaine action : transmettre le document avant vendredi et preparer le bilan de mission.",
      risk: "Risque faible : le contrat est valide, la progression est reguliere et les notifications recentes sont traitees. Point de vigilance : un document reste a fournir."
    }
  },
  school: {
    label: "Espace Ecole",
    short: "EC",
    loginText: "Pilotez vos etudiants, contrats, entreprises et suivis pedagogiques.",
    welcome: "Pilotage de l'alternance - Link School",
    subtitle: "Suivez les indicateurs cles de l'etablissement et les dossiers a traiter.",
    metrics: [
      ["Etudiants", "248", "+18 ce mois-ci"],
      ["Entreprises partenaires", "73", "12 nouvelles relations"],
      ["Contrats en attente", "19", "7 prioritaires"],
      ["Alertes administratives", "11", "Documents a corriger"]
    ],
    lists: {
      mainTitle: "Alertes administratives",
      main: [
        ["3 contrats a relancer", "Signature entreprise en attente", "amber"],
        ["5 dossiers incomplets", "Pieces justificatives manquantes", "blue"],
        ["2 validations recues", "A archiver cette semaine", "green"]
      ],
      secondTitle: "Calendrier pedagogique",
      second: [
        ["Comite de suivi alternance", "13 juin - 09:30", "blue"],
        ["Relance contrats incomplets", "18 juin", "amber"],
        ["Visites entreprises", "24 juin", "green"]
      ],
      tasks: ["Creer une promotion", "Importer des etudiants", "Valider un contrat"]
    },
    table: [
      ["Camille Martin", "Marketing digital", "Nova RH", "Contrat valide"],
      ["Sarah Benali", "Business development", "Blue Factory", "Piece manquante"],
      ["Hugo Bernard", "Gestion de projet", "En recherche", "Suivi requis"]
    ],
    assistant: {
      intro: "Je peux prioriser les dossiers, detecter les risques et generer des relances pour l'equipe ecole.",
      prompts: ["Liste les etudiants a risque", "Genere une relance", "Resume les priorites du jour"],
      report: "Priorites du jour : traiter 7 contrats prioritaires, relancer les entreprises en attente de signature et verifier les 5 dossiers incomplets. Hugo Bernard doit etre suivi rapidement car il est encore en recherche.",
      risk: "Risque detecte : Hugo Bernard est en recherche d'entreprise et necessite un point de suivi. Sarah Benali a une piece manquante qui peut retarder la validation du contrat."
    }
  },
  mentor: {
    label: "Espace Maitre d'apprentissage",
    short: "MA",
    loginText: "Suivez les alternants, missions, documents, evaluations et rendez-vous.",
    welcome: "Bonjour Sophie, vos alternants ont besoin de votre suivi.",
    subtitle: "Gardez une vue claire sur les missions, validations et prochains rendez-vous.",
    metrics: [
      ["Alternants suivis", "3", "Tous actifs"],
      ["Documents a signer", "2", "Signature demandee"],
      ["Evaluations", "3", "A completer"]
    ],
    lists: {
      mainTitle: "Suivi des missions",
      main: [
        ["Audit du parcours candidat", "Camille - restitution vendredi", "blue"],
        ["Tableau de suivi projet", "Hugo - retour attendu", "amber"],
        ["Campagne newsletter", "Lina - validee hier", "green"]
      ],
      secondTitle: "Rendez-vous a venir",
      second: [
        ["Point avec Camille", "12 juin - 10:30", "blue"],
        ["Visite pedagogique", "18 juin", "amber"],
        ["Bilan entreprise", "25 juin", "green"]
      ],
      tasks: ["Bilan mensuel Camille", "Grille competences Hugo", "Feedback Lina"]
    },
    assistant: {
      intro: "Je peux preparer les evaluations, structurer les feedbacks et resumer les missions des alternants.",
      prompts: ["Prepare une evaluation", "Resume les missions", "Genere un feedback"],
      report: "Evaluation proposee : Camille progresse bien sur l'audit du parcours candidat. Points forts : autonomie et curiosite. Axe d'amelioration : prioriser les livrables. Action conseillee : definir deux objectifs mesurables pour la prochaine quinzaine.",
      risk: "Risque modere : Hugo attend un retour sur son tableau de suivi projet. Une clarification rapide des attentes permettra d'eviter un ralentissement."
    }
  }
};

function createStudentData() {
  return {
    view: "overview",
    profile: {
      name: "Camille Martin",
      email: "camille.martin@email.fr",
      phone: "06 45 12 89 33",
      school: "Link School",
      program: "Bachelor Marketing digital",
      company: "Nova RH",
      tutor: "Amine Durand",
      mentor: "Sophie Lambert",
      status: "Contrat valide",
      skills: ["Marketing digital", "Relation client", "Reporting", "Gestion de projet"]
    },
    documents: [
      { id: 1, name: "Contrat d'apprentissage", category: "Contrat", status: "Valide", detail: "Recu et valide par l'ecole", due: "2026-06-10", urgency: "Normal", comment: "Document conforme." },
      { id: 2, name: "Attestation employeur", category: "Entreprise", status: "A deposer", detail: "Attendue avant vendredi", due: "2026-06-14", urgency: "Urgent", comment: "A transmettre rapidement." },
      { id: 3, name: "Justificatif d'identite", category: "Identite", status: "En verification", detail: "Verification administrative en cours", due: "2026-06-18", urgency: "Normal", comment: "Controle administratif en cours." }
    ],
    events: [
      { id: 1, title: "Point tuteur ecole", date: "2026-06-12", time: "10:30", type: "Visio" },
      { id: 2, title: "Journee ecole", date: "2026-06-17", time: "09:00", type: "Cours" },
      { id: 3, title: "Bilan mensuel", date: "2026-06-21", time: "14:00", type: "Suivi" }
    ],
    selectedConversation: "school",
    conversations: {
      school: {
        name: "Tuteur ecole",
        contact: "Amine Durand",
        messages: [
          { from: "them", text: "Bonjour Camille, pensez a deposer l'attestation employeur avant vendredi." },
          { from: "me", text: "Bonjour, je m'en occupe aujourd'hui." }
        ]
      },
      mentor: {
        name: "Maitre d'apprentissage",
        contact: "Sophie Lambert",
        messages: [
          { from: "them", text: "On fera un point sur l'audit du parcours candidat jeudi matin." },
          { from: "me", text: "Parfait, je prepare une synthese." }
        ]
      },
      admin: {
        name: "Administration",
        contact: "Service alternance",
        messages: [
          { from: "them", text: "Votre contrat est bien valide. Il reste une piece en verification." }
        ]
      },
      group: {
        name: "Groupe de suivi",
        contact: "Etudiant, ecole et entreprise",
        messages: [
          { from: "them", text: "Bienvenue dans le canal commun de suivi de l'alternance." }
        ]
      }
    },
    missions: [
      { id: 1, title: "Audit du parcours candidat", owner: "Nova RH", progress: 62, status: "En cours", skill: "Analyse marketing", feedback: "Bonne autonomie, synthese a renforcer." },
      { id: 2, title: "Campagne email recrutement", owner: "Nova RH", progress: 100, status: "Terminee", skill: "Communication", feedback: "Mission livree dans les delais." },
      { id: 3, title: "Reporting hebdomadaire", owner: "Nova RH", progress: 35, status: "A structurer", skill: "Reporting", feedback: "Definir des indicateurs plus lisibles." }
    ],
    evaluations: [
      { id: 1, title: "Bilan mensuel entreprise", date: "2026-06-21", status: "A preparer", score: "En attente", note: "Ajouter les missions realisees en juin." },
      { id: 2, title: "Evaluation tuteur ecole", date: "2026-06-28", status: "Planifiee", score: "En attente", note: "Preparer les points de progression." },
      { id: 3, title: "Auto-evaluation mai", date: "2026-05-31", status: "Completee", score: "Bon niveau", note: "Autonomie et communication en progression." }
    ],
    notifications: [
      { id: 1, type: "Document", title: "Attestation employeur manquante", detail: "A deposer avant vendredi.", level: "warning", read: false },
      { id: 2, type: "Message", title: "Nouveau message du tuteur ecole", detail: "Amine Durand vous a envoye une relance.", level: "info", read: false },
      { id: 3, type: "Evaluation", title: "Bilan mensuel a preparer", detail: "Compte-rendu attendu le 21 juin.", level: "warning", read: true }
    ]
  };
}

function createSchoolData() {
  return {
    view: "overview",
    students: [
      { id: 1, name: "Camille Martin", program: "Marketing digital", company: "Nova RH", status: "Contrat valide", risk: "Faible" },
      { id: 2, name: "Sarah Benali", program: "Business development", company: "Blue Factory", status: "Piece manquante", risk: "Moyen" },
      { id: 3, name: "Hugo Bernard", program: "Gestion de projet", company: "En recherche", status: "Suivi requis", risk: "Eleve" }
    ],
    companies: [
      { id: 1, name: "Nova RH", contact: "Sophie Lambert", offers: 4, status: "Partenaire actif" },
      { id: 2, name: "Blue Factory", contact: "Marc Vidal", offers: 2, status: "Contrat a finaliser" },
      { id: 3, name: "Atelier Nord", contact: "Julie Caron", offers: 1, status: "Nouveau partenaire" }
    ],
    contracts: [
      { id: 1, student: "Camille Martin", company: "Nova RH", status: "Valide", due: "2026-06-10" },
      { id: 2, student: "Sarah Benali", company: "Blue Factory", status: "En attente", due: "2026-06-14" },
      { id: 3, student: "Hugo Bernard", company: "A definir", status: "Bloque", due: "2026-06-20" }
    ],
    documents: [
      { id: 1, student: "Camille Martin", name: "Contrat d'apprentissage", status: "Valide", comment: "Document conforme." },
      { id: 2, student: "Sarah Benali", name: "Piece d'identite", status: "A verifier", comment: "Lisibilite moyenne." },
      { id: 3, student: "Hugo Bernard", name: "Dossier entreprise", status: "Manquant", comment: "A relancer." }
    ],
    events: [
      { id: 1, title: "Comite de suivi alternance", date: "2026-06-13", time: "09:30", type: "Pedagogique" },
      { id: 2, title: "Relance contrats incomplets", date: "2026-06-18", time: "11:00", type: "Administratif" }
    ],
    messages: [
      { from: "team", text: "3 contrats doivent etre relances avant vendredi." },
      { from: "me", text: "Je prends les dossiers prioritaires cet apres-midi." }
    ],
    alertsResolved: 0
  };
}

function createMentorData() {
  return {
    view: "overview",
    alternants: [
      { id: 1, name: "Camille Martin", program: "Marketing digital", progress: 62, status: "En progression" },
      { id: 2, name: "Hugo Bernard", program: "Gestion de projet", progress: 41, status: "A clarifier" },
      { id: 3, name: "Lina Moreau", program: "Communication", progress: 78, status: "Tres bien" }
    ],
    missions: [
      { id: 1, title: "Audit du parcours candidat", student: "Camille Martin", progress: 62, status: "En cours" },
      { id: 2, title: "Tableau de suivi projet", student: "Hugo Bernard", progress: 41, status: "En revue" },
      { id: 3, title: "Campagne newsletter", student: "Lina Moreau", progress: 100, status: "Validee" }
    ],
    documents: [
      { id: 1, name: "Avenant mission Camille", status: "A signer", due: "2026-06-14" },
      { id: 2, name: "Compte rendu de visite", status: "A valider", due: "2026-06-18" }
    ],
    evaluations: [
      { id: 1, title: "Bilan mensuel Camille", student: "Camille Martin", status: "A completer", due: "2026-06-21" },
      { id: 2, title: "Grille competences Hugo", student: "Hugo Bernard", status: "A completer", due: "2026-06-24" }
    ],
    events: [
      { id: 1, title: "Point avec Camille", date: "2026-06-12", time: "10:30", type: "Visio" },
      { id: 2, title: "Visite pedagogique", date: "2026-06-18", time: "14:00", type: "Ecole" }
    ],
    messages: [
      { from: "school", text: "Bonjour Sophie, pouvez-vous completer le bilan mensuel de Camille ?" },
      { from: "me", text: "Oui, je le prepare pour vendredi." }
    ],
    feedbacks: [
      { id: 1, student: "Camille Martin", text: "Bonne autonomie, continuer a clarifier les priorites chaque lundi." },
      { id: 2, student: "Hugo Bernard", text: "Besoin d'un cadrage plus precis sur le tableau de suivi projet." }
    ]
  };
}

let state = initialState();

function initialState() {
  return {
    screen: "home",
    role: null,
    userEmail: "",
    completedTasks: loadCompletedTasks(),
    assistantOpen: false,
    assistantMessages: [],
    student: loadStudentData(),
    school: loadRoleData("linkaSchoolData", createSchoolData),
    mentor: loadRoleData("linkaMentorData", createMentorData)
  };
}

function loadRoleData(storageKey, factory) {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return factory();

  try {
    return { ...factory(), ...JSON.parse(saved) };
  } catch {
    return factory();
  }
}

function saveRoleData(roleKey) {
  if (roleKey === "school") localStorage.setItem("linkaSchoolData", JSON.stringify(state.school));
  if (roleKey === "mentor") localStorage.setItem("linkaMentorData", JSON.stringify(state.mentor));
}

function loadStudentData() {
  const saved = localStorage.getItem("linkaStudentData");
  if (!saved) return createStudentData();

  try {
    return mergeStudentData(createStudentData(), JSON.parse(saved));
  } catch {
    return createStudentData();
  }
}

function mergeStudentData(defaultData, savedData) {
  return {
    ...defaultData,
    ...savedData,
    profile: { ...defaultData.profile, ...(savedData.profile || {}) },
    conversations: { ...defaultData.conversations, ...(savedData.conversations || {}) },
    documents: savedData.documents || defaultData.documents,
    events: savedData.events || defaultData.events,
    missions: savedData.missions || defaultData.missions,
    evaluations: savedData.evaluations || defaultData.evaluations,
    notifications: savedData.notifications || defaultData.notifications
  };
}

function saveStudentData() {
  localStorage.setItem("linkaStudentData", JSON.stringify(state.student));
}

function loadCompletedTasks() {
  const saved = localStorage.getItem("linkaCompletedTasks");
  if (!saved) return new Set();

  try {
    return new Set(JSON.parse(saved));
  } catch {
    return new Set();
  }
}

function saveCompletedTasks() {
  localStorage.setItem("linkaCompletedTasks", JSON.stringify([...state.completedTasks]));
}

function render() {
  if (state.screen === "home") renderHome();
  if (state.screen === "login") renderLogin();
  if (state.screen === "dashboard") renderDashboard();
}

function topbar(actions = "") {
  return `
    <header class="topbar">
      <button class="brand reset-button" data-action="home" aria-label="Retour a l'accueil">Linka</button>
      <div class="topbar-actions">${actions}</div>
    </header>
  `;
}

function renderHome() {
  app.innerHTML = `
    ${topbar(`<button class="ghost-button" data-action="demo-login">Demo etudiant</button><button class="ghost-button" data-action="reset-demo">Reinitialiser demo</button>`)}
    <main class="shell">
      <section class="hero">
        <span class="eyebrow">Plateforme alternance</span>
        <h1>Bienvenue sur Linka</h1>
        <p>Selectionnez votre espace pour vous connecter a une experience plus dynamique.</p>
      </section>

      <section class="role-grid" aria-label="Choix de l'espace">
        ${Object.entries(roles).map(([key, role]) => `
          <button class="role-card" data-role="${key}">
            <span class="role-icon">${role.short}</span>
            <h2>${role.label}</h2>
            <p>${role.loginText}</p>
            <span class="link-button">Continuer</span>
          </button>
        `).join("")}
      </section>
    </main>
  `;
}

function renderLogin() {
  const role = roles[state.role];

  app.innerHTML = `
    ${topbar(`<button class="ghost-button" data-action="home">Retour</button>`)}
    <main class="shell login-layout">
      <section class="login-card">
        <span class="eyebrow">Connexion securisee</span>
        <h1>Connectez-vous a votre espace</h1>
        <p class="muted">${role.loginText}</p>
        <span class="role-badge">${role.label}</span>

        <form class="form" id="login-form">
          <div class="field">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="nom@exemple.com" required>
          </div>
          <div class="field">
            <label for="password">Mot de passe</label>
            <input id="password" type="password" placeholder="Votre mot de passe" minlength="8" required>
          </div>
          <button class="primary-button" type="submit">Se connecter</button>
        </form>

        <p class="empty-note">Prototype : aucun vrai compte n'est necessaire. Entrez un email et 8 caracteres minimum.</p>
      </section>

      <aside class="login-aside">
        <span class="role-badge">${role.label}</span>
        <h2>Une app unique pour gerer l'alternance.</h2>
        <p>Cette version simule une vraie application front-end : elle garde le role choisi, controle le formulaire et affiche le bon dashboard.</p>
      </aside>
    </main>
  `;
}

function renderDashboard() {
  if (state.role === "student") {
    renderStudentDashboard();
    return;
  }

  if (state.role === "school" || state.role === "mentor") {
    renderRoleWorkspace(state.role);
    return;
  }

  const role = roles[state.role];
  const metrics = role.metrics.map(([title, value, help]) => `
    <article class="card small">
      <div class="card-head"><h2>${title}</h2></div>
      <span class="metric">${value}</span>
      <p class="muted">${help}</p>
    </article>
  `).join("");

  app.innerHTML = `
    ${topbar(`
      <span class="pill">${role.label}</span>
      <button class="primary-button" data-action="assistant">Assistant IA</button>
      <button class="ghost-button" data-action="logout">Deconnexion</button>
    `)}
    <main class="shell">
      <section class="dashboard-header">
        <span class="eyebrow">Dashboard</span>
        <h1>${role.welcome}</h1>
        <p>${role.subtitle}</p>
      </section>

      <section class="dashboard-grid">
        ${metrics}

        <article class="card large">
          <div class="card-head">
            <h2>${role.lists.mainTitle}</h2>
            <span class="pill">Prioritaire</span>
          </div>
          ${renderList(role.lists.main)}
        </article>

        <article class="card small">
          <div class="card-head"><h2>Progression</h2><span>62%</span></div>
          <div class="progress"><span style="width: 62%;"></span></div>
          <p class="muted">Suivi global du parcours actuel.</p>
        </article>

        <article class="card medium">
          <div class="card-head"><h2>${role.lists.secondTitle}</h2></div>
          ${renderList(role.lists.second)}
        </article>

        <article class="card medium">
          <div class="card-head"><h2>Taches a effectuer</h2></div>
          ${renderTasks(role.lists.tasks)}
        </article>

        ${role.table ? renderTable(role.table) : ""}

        <article class="card full ai-summary-card">
          <div class="card-head">
            <h2>Assistant Linka</h2>
            <span class="pill">IA integree</span>
          </div>
          <p class="muted">${role.assistant.intro}</p>
          <div class="ai-actions">
            ${role.assistant.prompts.map(prompt => `<button class="ghost-button" data-ai-prompt="${prompt}">${prompt}</button>`).join("")}
          </div>
        </article>
      </section>
    </main>
    ${renderAssistant()}
  `;
}

function renderRoleWorkspace(roleKey) {
  const role = roles[roleKey];
  const data = state[roleKey];

  app.innerHTML = `
    ${topbar(`
      <span class="pill">${role.label}</span>
      <button class="primary-button" data-action="assistant">Assistant IA</button>
      <button class="ghost-button" data-action="logout">Deconnexion</button>
    `)}
    <main class="shell student-shell">
      <section class="dashboard-header">
        <span class="eyebrow">${role.label}</span>
        <h1>${role.welcome}</h1>
        <p>${role.subtitle}</p>
      </section>

      <section class="student-app-layout">
        <aside class="student-sidebar" aria-label="Navigation ${role.label}">
          ${renderRoleSidebar(roleKey)}
        </aside>
        <div class="student-content">
          ${roleKey === "school" ? renderSchoolView(data) : renderMentorView(data)}
        </div>
      </section>
    </main>
    ${renderAssistant()}
  `;
}

function renderRoleSidebar(roleKey) {
  const data = state[roleKey];
  const label = roleKey === "school" ? "Link School" : "Sophie Lambert";
  const sublabel = roleKey === "school" ? "Pilotage ecole" : "Nova RH";
  const initials = roleKey === "school" ? "EC" : "SL";
  const items = roleKey === "school"
    ? [["overview", "Vue d'ensemble"], ["students", "Etudiants"], ["companies", "Entreprises"], ["contracts", "Contrats"], ["documents", "Documents"], ["analytics", "Statistiques"], ["calendar", "Calendrier"], ["messages", "Messages"]]
    : [["overview", "Vue d'ensemble"], ["alternants", "Alternants"], ["missions", "Missions"], ["documents", "Documents"], ["evaluations", "Evaluations"], ["feedback", "Feedback"], ["calendar", "Rendez-vous"], ["messages", "Messages"]];

  return `
    <div class="student-sidebar-profile">
      <span>${initials}</span>
      <div>
        <strong>${label}</strong>
        <small>${sublabel}</small>
      </div>
    </div>
    <nav class="student-nav">
      ${items.map(([key, itemLabel]) => `
        <button class="${data.view === key ? "is-active" : ""}" data-role-view="${roleKey}:${key}">${itemLabel}</button>
      `).join("")}
    </nav>
  `;
}

function renderSchoolView(data) {
  if (data.view === "students") return renderSchoolStudents(data);
  if (data.view === "companies") return renderSchoolCompanies(data);
  if (data.view === "contracts") return renderSchoolContracts(data);
  if (data.view === "documents") return renderSchoolDocuments(data);
  if (data.view === "analytics") return renderSchoolAnalytics(data);
  if (data.view === "calendar") return renderRoleCalendar("school", data);
  if (data.view === "messages") return renderRoleMessages("school", data);
  return renderSchoolOverview(data);
}

function renderMentorView(data) {
  if (data.view === "alternants") return renderMentorAlternants(data);
  if (data.view === "missions") return renderMentorMissions(data);
  if (data.view === "documents") return renderMentorDocuments(data);
  if (data.view === "evaluations") return renderMentorEvaluations(data);
  if (data.view === "feedback") return renderMentorFeedback(data);
  if (data.view === "calendar") return renderRoleCalendar("mentor", data);
  if (data.view === "messages") return renderRoleMessages("mentor", data);
  return renderMentorOverview(data);
}

function renderSchoolOverview(data) {
  return `
    <section class="dashboard-grid">
      ${renderMetricCard("Etudiants", data.students.length, "Dossiers suivis")}
      ${renderMetricCard("Entreprises", data.companies.length, "Partenaires actifs")}
      ${renderMetricCard("Contrats", data.contracts.filter(contract => contract.status !== "Valide").length, "A traiter")}
      <article class="card large">
        <div class="card-head"><h2>Etudiants a suivre</h2><button class="link-button" data-role-view="school:students">Ouvrir</button></div>
        ${renderSchoolStudentRows(data.students)}
      </article>
      <article class="card small ai-summary-card">
        <div class="card-head"><h2>Priorites IA</h2></div>
        <p class="muted">Hugo Bernard presente un risque eleve. Sarah Benali doit fournir une piece manquante.</p>
        <button class="primary-button" data-ai-prompt="Liste les etudiants a risque">Analyser</button>
      </article>
      <article class="card medium"><div class="card-head"><h2>Calendrier</h2></div>${renderEventList(data.events)}</article>
      <article class="card medium"><div class="card-head"><h2>Messages equipe</h2></div>${renderSimpleMessages(data.messages)}</article>
    </section>
  `;
}

function renderSchoolStudents(data) {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head"><div><h2>Etudiants</h2><p class="muted">Ajoutez et suivez les etudiants de l'etablissement.</p></div></div>
        ${renderSchoolStudentRows(data.students)}
      </article>
      <article class="card workspace-side">
        <div class="card-head"><h2>Ajouter un etudiant</h2></div>
        <form class="workspace-form" id="school-student-form">
          <div class="field"><label for="school-student-name">Nom</label><input id="school-student-name" name="name" required></div>
          <div class="field"><label for="school-student-program">Formation</label><input id="school-student-program" name="program" required></div>
          <div class="field"><label for="school-student-company">Entreprise</label><input id="school-student-company" name="company" placeholder="En recherche" required></div>
          <button class="primary-button" type="submit">Ajouter</button>
        </form>
      </article>
    </section>
  `;
}

function renderSchoolCompanies(data) {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head"><div><h2>Entreprises partenaires</h2><p class="muted">Suivez les contacts et opportunites d'alternance.</p></div></div>
        <div class="mission-board">
          ${data.companies.map(company => `
            <article class="mission-card">
              <div class="card-head"><h3>${escapeHtml(company.name)}</h3><span class="status info">${escapeHtml(company.status)}</span></div>
              <p class="muted">Contact : ${escapeHtml(company.contact)}</p>
              <p>${company.offers} offres ouvertes</p>
            </article>
          `).join("")}
        </div>
      </article>
      <article class="card workspace-side">
        <div class="card-head"><h2>Ajouter une entreprise</h2></div>
        <form class="workspace-form" id="school-company-form">
          <div class="field"><label for="company-name">Entreprise</label><input id="company-name" name="name" required></div>
          <div class="field"><label for="company-contact">Contact</label><input id="company-contact" name="contact" required></div>
          <button class="primary-button" type="submit">Ajouter</button>
        </form>
      </article>
    </section>
  `;
}

function renderSchoolContracts(data) {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head"><div><h2>Contrats</h2><p class="muted">Validez, relancez et suivez les contrats en attente.</p></div></div>
        <ul class="document-list">
          ${data.contracts.map(contract => `
            <li>
              <div><strong>${escapeHtml(contract.student)}</strong><small>${escapeHtml(contract.company)} - echeance ${formatDate(contract.due)}</small></div>
              <span class="status ${getStatusClass(contract.status)}">${escapeHtml(contract.status)}</span>
              <button class="ghost-button" data-contract-validate="${contract.id}">Valider</button>
            </li>
          `).join("")}
        </ul>
      </article>
      <article class="card workspace-side ai-summary-card">
        <div class="card-head"><h2>Relance IA</h2></div>
        <p class="muted">Generez une relance pour les contrats bloques ou en attente.</p>
        <button class="primary-button" data-ai-prompt="Genere une relance">Generer</button>
      </article>
    </section>
  `;
}

function renderSchoolDocuments(data) {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head">
          <div>
            <h2>Documents et validations</h2>
            <p class="muted">Validez ou refusez les pieces transmises par les etudiants.</p>
          </div>
        </div>
        <ul class="document-list">
          ${data.documents.map(document => `
            <li>
              <div>
                <strong>${escapeHtml(document.name)}</strong>
                <small>${escapeHtml(document.student)} - ${escapeHtml(document.comment)}</small>
              </div>
              <span class="status ${getStatusClass(document.status)}">${escapeHtml(document.status)}</span>
              <div class="inline-actions">
                <button class="ghost-button" data-school-document-validate="${document.id}">Valider</button>
                <button class="ghost-button" data-school-document-refuse="${document.id}">Refuser</button>
              </div>
            </li>
          `).join("")}
        </ul>
      </article>

      <article class="card workspace-side ai-summary-card">
        <div class="card-head"><h2>Aide IA</h2></div>
        <p class="muted">L'assistant peut expliquer pourquoi un document est incomplet et proposer une relance.</p>
        <button class="primary-button" data-ai-prompt="Genere une relance document">Generer une relance</button>
      </article>
    </section>
  `;
}

function renderSchoolAnalytics(data) {
  const activeContracts = data.contracts.filter(contract => contract.status === "Valide").length;
  const risks = data.students.filter(student => student.risk === "Moyen" || student.risk === "Eleve").length;
  const pendingDocs = data.documents.filter(document => document.status !== "Valide").length;

  return `
    <section class="dashboard-grid">
      ${renderMetricCard("Contrats valides", activeContracts, "Sur ${data.contracts.length} contrats")}
      ${renderMetricCard("Etudiants a risque", risks, "Suivi prioritaire")}
      ${renderMetricCard("Documents a verifier", pendingDocs, "Pieces non validees")}
      <article class="card large">
        <div class="card-head"><h2>Lecture produit</h2><span class="pill">Beta</span></div>
        <p class="muted">Ces statistiques donnent une vue simple du pilotage ecole pour la demo. Elles seront branchees plus tard a une vraie base de donnees.</p>
        <div class="analytics-bars">
          <div><span>Placement</span><strong>78%</strong><div class="progress"><span style="width: 78%;"></span></div></div>
          <div><span>Contrats complets</span><strong>64%</strong><div class="progress"><span style="width: 64%;"></span></div></div>
          <div><span>Documents conformes</span><strong>71%</strong><div class="progress"><span style="width: 71%;"></span></div></div>
        </div>
      </article>
      <article class="card small ai-summary-card">
        <div class="card-head"><h2>Suggestion IA</h2></div>
        <p class="muted">Prioriser Hugo Bernard et relancer les dossiers documentaires non conformes.</p>
        <button class="primary-button" data-ai-prompt="Resume les priorites du jour">Analyser</button>
      </article>
    </section>
  `;
}

function renderMentorOverview(data) {
  return `
    <section class="dashboard-grid">
      ${renderMetricCard("Alternants", data.alternants.length, "Rattaches a vous")}
      ${renderMetricCard("Documents", data.documents.filter(document => document.status !== "Signe").length, "A traiter")}
      ${renderMetricCard("Evaluations", data.evaluations.filter(evaluation => evaluation.status !== "Completee").length, "A completer")}
      <article class="card large"><div class="card-head"><h2>Alternants suivis</h2><button class="link-button" data-role-view="mentor:alternants">Ouvrir</button></div>${renderAlternantRows(data.alternants)}</article>
      <article class="card small ai-summary-card"><div class="card-head"><h2>Assistant</h2></div><p class="muted">Preparez une evaluation ou un feedback en un clic.</p><button class="primary-button" data-ai-prompt="Prepare une evaluation">Preparer</button></article>
      <article class="card medium"><div class="card-head"><h2>Rendez-vous</h2></div>${renderEventList(data.events)}</article>
      <article class="card medium"><div class="card-head"><h2>Messages</h2></div>${renderSimpleMessages(data.messages)}</article>
    </section>
  `;
}

function renderMentorAlternants(data) {
  return `<section class="student-workspace"><article class="card workspace-main"><div class="card-head"><h2>Alternants</h2></div>${renderAlternantRows(data.alternants)}</article><article class="card workspace-side"><div class="card-head"><h2>Ajouter un alternant</h2></div><form class="workspace-form" id="mentor-alternant-form"><div class="field"><label for="alternant-name">Nom</label><input id="alternant-name" name="name" required></div><div class="field"><label for="alternant-program">Formation</label><input id="alternant-program" name="program" required></div><button class="primary-button" type="submit">Ajouter</button></form></article></section>`;
}

function renderMentorMissions(data) {
  return `<section class="student-workspace"><article class="card workspace-main"><div class="card-head"><h2>Missions</h2></div><div class="mission-board">${data.missions.map(mission => `<article class="mission-card"><div class="card-head"><h3>${escapeHtml(mission.title)}</h3><span class="status ${getStatusClass(mission.status)}">${escapeHtml(mission.status)}</span></div><p class="muted">${escapeHtml(mission.student)}</p><div class="progress"><span style="width:${mission.progress}%;"></span></div><small>${mission.progress}% complete</small></article>`).join("")}</div></article><article class="card workspace-side"><div class="card-head"><h2>Ajouter une mission</h2></div><form class="workspace-form" id="mentor-mission-form"><div class="field"><label for="mentor-mission-title">Mission</label><input id="mentor-mission-title" name="title" required></div><div class="field"><label for="mentor-mission-student">Alternant</label><input id="mentor-mission-student" name="student" required></div><button class="primary-button" type="submit">Ajouter</button></form></article></section>`;
}

function renderMentorDocuments(data) {
  return `<section class="student-workspace"><article class="card workspace-main"><div class="card-head"><h2>Documents a signer</h2></div><ul class="document-list">${data.documents.map(document => `<li><div><strong>${escapeHtml(document.name)}</strong><small>Echeance ${formatDate(document.due)}</small></div><span class="status ${getStatusClass(document.status)}">${escapeHtml(document.status)}</span><button class="ghost-button" data-mentor-document-sign="${document.id}">Signer</button></li>`).join("")}</ul></article><article class="card workspace-side"><div class="card-head"><h2>Ajouter un document</h2></div><form class="workspace-form" id="mentor-document-form"><div class="field"><label for="mentor-doc-name">Document</label><input id="mentor-doc-name" name="name" required></div><div class="field"><label for="mentor-doc-due">Echeance</label><input id="mentor-doc-due" name="due" type="date" required></div><button class="primary-button" type="submit">Ajouter</button></form></article></section>`;
}

function renderMentorEvaluations(data) {
  return `<section class="student-workspace"><article class="card workspace-main"><div class="card-head"><h2>Evaluations</h2></div><div class="evaluation-list">${data.evaluations.map(evaluation => `<article class="evaluation-card"><div><strong>${escapeHtml(evaluation.title)}</strong><small>${escapeHtml(evaluation.student)} - ${formatDate(evaluation.due)}</small></div><span class="status ${getStatusClass(evaluation.status)}">${escapeHtml(evaluation.status)}</span><button class="ghost-button" data-mentor-evaluation-complete="${evaluation.id}">Completer</button></article>`).join("")}</div></article><article class="card workspace-side ai-summary-card"><div class="card-head"><h2>Aide IA</h2></div><p class="muted">Preparez une evaluation structuree.</p><button class="primary-button" data-ai-prompt="Prepare une evaluation">Generer</button></article></section>`;
}

function renderMentorFeedback(data) {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head">
          <div>
            <h2>Feedback alternants</h2>
            <p class="muted">Gardez une trace des retours transmis a l'ecole et aux alternants.</p>
          </div>
        </div>
        <ul class="list">
          ${data.feedbacks.map(feedback => `
            <li>
              <span class="dot blue"></span>
              <div><strong>${escapeHtml(feedback.student)}</strong><small>${escapeHtml(feedback.text)}</small></div>
            </li>
          `).join("")}
        </ul>
      </article>

      <article class="card workspace-side">
        <div class="card-head"><h2>Nouveau feedback</h2></div>
        <form class="workspace-form" id="mentor-feedback-form">
          <div class="field"><label for="feedback-student">Alternant</label><input id="feedback-student" name="student" required></div>
          <div class="field"><label for="feedback-text">Feedback</label><input id="feedback-text" name="text" placeholder="Point fort, axe d'amelioration..." required></div>
          <button class="primary-button" type="submit">Enregistrer</button>
        </form>
      </article>
    </section>
  `;
}

function renderRoleCalendar(roleKey, data) {
  return `<section class="student-workspace"><article class="card workspace-main"><div class="card-head"><h2>Calendrier</h2></div>${renderEventList(data.events)}</article><article class="card workspace-side"><div class="card-head"><h2>Ajouter un evenement</h2></div><form class="workspace-form" id="${roleKey}-event-form"><div class="field"><label for="${roleKey}-event-title">Titre</label><input id="${roleKey}-event-title" name="title" required></div><div class="form-grid"><div class="field"><label for="${roleKey}-event-date">Date</label><input id="${roleKey}-event-date" name="date" type="date" required></div><div class="field"><label for="${roleKey}-event-time">Heure</label><input id="${roleKey}-event-time" name="time" type="time" required></div></div><div class="field"><label for="${roleKey}-event-type">Type</label><input id="${roleKey}-event-type" name="type" required></div><button class="primary-button" type="submit">Ajouter</button></form></article></section>`;
}

function renderRoleMessages(roleKey, data) {
  const title = roleKey === "school" ? "Messagerie equipe" : "Messagerie suivi";
  return `<section class="student-workspace"><article class="card workspace-main"><div class="card-head"><h2>${title}</h2></div><div class="chat-messages role-chat">${data.messages.map(message => `<div class="chat-message ${message.from === "me" ? "from-me" : "from-them"}"><p>${escapeHtml(message.text)}</p></div>`).join("")}</div><form class="chat-form" id="${roleKey}-message-form"><input id="${roleKey}-message-input" name="message" placeholder="Ecrire un message..." required><button class="primary-button" type="submit">Envoyer</button></form></article><article class="card workspace-side"><div class="card-head"><h2>Reponses rapides</h2></div><div class="quick-replies"><button data-role-message-template="${roleKey}:Je reviens vers vous rapidement avec les informations.">Repondre vite</button><button data-role-message-template="${roleKey}:Pouvez-vous me confirmer ce point ?">Demander confirmation</button><button data-role-message-template="${roleKey}:Je propose un point cette semaine.">Proposer un point</button></div></article></section>`;
}

function renderMetricCard(title, value, help) {
  return `<article class="card small"><div class="card-head"><h2>${title}</h2></div><span class="metric">${value}</span><p class="muted">${help}</p></article>`;
}

function renderStudentDashboard() {
  const role = roles.student;

  app.innerHTML = `
    ${topbar(`
      <span class="pill">${role.label}</span>
      <button class="primary-button" data-action="assistant">Assistant IA</button>
      <button class="ghost-button" data-action="logout">Deconnexion</button>
    `)}
    <main class="shell student-shell">
      <section class="dashboard-header">
        <span class="eyebrow">Espace etudiant</span>
        <h1>${role.welcome}</h1>
        <p>${role.subtitle}</p>
      </section>

      <section class="student-app-layout">
        <aside class="student-sidebar" aria-label="Navigation etudiant">
          ${renderStudentSidebar()}
        </aside>
        <div class="student-content">
          ${renderStudentView()}
        </div>
      </section>
    </main>
    ${renderAssistant()}
  `;
}

function renderStudentSidebar() {
  const items = [
    ["overview", "Vue d'ensemble"],
    ["documents", "Documents"],
    ["planning", "Planning"],
    ["messages", "Messagerie"],
    ["missions", "Missions"],
    ["evaluations", "Evaluations"],
    ["notifications", "Notifications"],
    ["profile", "Mon profil"]
  ];

  return `
    <div class="student-sidebar-profile">
      <span>CM</span>
      <div>
        <strong>${escapeHtml(state.student.profile.name)}</strong>
        <small>${escapeHtml(state.student.profile.status)}</small>
      </div>
    </div>
    <nav class="student-nav">
      ${items.map(([key, label]) => `
        <button class="${state.student.view === key ? "is-active" : ""}" data-student-view="${key}">${label}</button>
      `).join("")}
    </nav>
  `;
}

function renderStudentView() {
  if (state.student.view === "documents") return renderStudentDocuments();
  if (state.student.view === "planning") return renderStudentPlanning();
  if (state.student.view === "messages") return renderStudentMessages();
  if (state.student.view === "missions") return renderStudentMissions();
  if (state.student.view === "evaluations") return renderStudentEvaluations();
  if (state.student.view === "notifications") return renderStudentNotifications();
  if (state.student.view === "profile") return renderStudentProfile();
  return renderStudentOverview();
}

function renderStudentOverview() {
  const role = roles.student;
  const metrics = role.metrics.map(([title, value, help]) => `
    <article class="card small">
      <div class="card-head"><h2>${title}</h2></div>
      <span class="metric">${value}</span>
      <p class="muted">${help}</p>
    </article>
  `).join("");

  return `
    <section class="dashboard-grid">
      ${metrics}

      <article class="card large">
        <div class="card-head">
          <h2>Documents a traiter</h2>
          <button class="link-button" data-student-view="documents">Gerer</button>
        </div>
        ${renderDocumentList(state.student.documents.slice(0, 3))}
      </article>

      <article class="card small">
        <div class="card-head"><h2>Progression</h2><span>62%</span></div>
        <div class="progress"><span style="width: 62%;"></span></div>
        <p class="muted">Suivi global du parcours actuel.</p>
      </article>

      <article class="card medium">
        <div class="card-head">
          <h2>Planning proche</h2>
          <button class="link-button" data-student-view="planning">Ajouter</button>
        </div>
        ${renderEventList(state.student.events.slice(0, 3))}
      </article>

      <article class="card medium">
        <div class="card-head">
          <h2>Derniers messages</h2>
          <button class="link-button" data-student-view="messages">Ouvrir</button>
        </div>
        ${renderConversationPreview()}
      </article>

      <article class="card medium">
        <div class="card-head"><h2>Taches a effectuer</h2></div>
        ${renderTasks(role.lists.tasks)}
      </article>

      <article class="card medium ai-summary-card">
        <div class="card-head"><h2>Assistant Linka</h2><span class="pill">IA</span></div>
        <p class="muted">${role.assistant.intro}</p>
        <div class="ai-actions">
          ${role.assistant.prompts.map(prompt => `<button class="ghost-button" data-ai-prompt="${prompt}">${prompt}</button>`).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderStudentDocuments() {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head">
          <div>
            <h2>Documents</h2>
            <p class="muted">Deposez vos pieces, suivez leur statut et gardez votre dossier a jour.</p>
          </div>
          <span class="pill">${state.student.documents.length} documents</span>
        </div>

        <form class="workspace-form upload-form" id="document-form">
          <div class="form-grid">
            <div class="field">
              <label for="document-category">Type de document</label>
              <select id="document-category" name="category" required>
                <option value="">Choisir une categorie</option>
                <option>Contrat</option>
                <option>Entreprise</option>
                <option>Identite</option>
                <option>Ecole</option>
                <option>Autre</option>
              </select>
            </div>
            <div class="field">
              <label for="document-due">Date limite</label>
              <input id="document-due" name="due" type="date" required>
            </div>
          </div>
          <div class="field">
            <label for="document-file">Fichier</label>
            <input id="document-file" name="file" type="file" required>
          </div>
          <div class="field">
            <label for="document-comment">Commentaire</label>
            <input id="document-comment" name="comment" type="text" placeholder="Ex : document transmis par l'entreprise">
          </div>
          <button class="primary-button" type="submit">Deposer le document</button>
        </form>
      </article>

      <article class="card workspace-side">
        <div class="card-head"><h2>Statuts</h2></div>
        ${renderDocumentList(state.student.documents)}
      </article>
    </section>
  `;
}

function renderStudentPlanning() {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head">
          <div>
            <h2>Planning</h2>
            <p class="muted">Ajoutez vos rendez-vous, journees ecole, points de suivi et echeances.</p>
          </div>
          <span class="pill">${state.student.events.length} evenements</span>
        </div>

        <form class="workspace-form planning-form" id="event-form">
          <div class="field">
            <label for="event-title">Titre</label>
            <input id="event-title" name="title" type="text" placeholder="Ex : point avec mon tuteur" required>
          </div>
          <div class="form-grid">
            <div class="field">
              <label for="event-date">Date</label>
              <input id="event-date" name="date" type="date" required>
            </div>
            <div class="field">
              <label for="event-time">Heure</label>
              <input id="event-time" name="time" type="time" required>
            </div>
          </div>
          <div class="field">
            <label for="event-type">Type</label>
            <input id="event-type" name="type" type="text" placeholder="Ex : visio, cours, entreprise" required>
          </div>
          <button class="primary-button" type="submit">Ajouter au planning</button>
        </form>
      </article>

      <article class="card workspace-side">
        <div class="card-head"><h2>Evenements</h2></div>
        ${renderEventList(state.student.events)}
      </article>
    </section>
  `;
}

function renderStudentMessages() {
  const selected = state.student.conversations[state.student.selectedConversation];
  const conversations = Object.entries(state.student.conversations);

  return `
    <section class="student-messages">
      <aside class="card conversation-list">
        <div class="card-head"><h2>Discussions</h2></div>
        <div class="field compact-field">
          <label for="conversation-search">Rechercher</label>
          <input id="conversation-search" type="text" placeholder="Nom, canal, contact..." data-conversation-search>
        </div>
        ${conversations.map(([key, conversation]) => `
          <button class="conversation-button ${state.student.selectedConversation === key ? "is-active" : ""}" data-conversation="${key}">
            <strong>${conversation.name}</strong>
            <span>${conversation.contact}</span>
          </button>
        `).join("")}
      </aside>

      <article class="card chat-panel">
        <div class="chat-head">
          <div>
            <h2>${selected.name}</h2>
            <p class="muted">${selected.contact}</p>
          </div>
          <span class="pill">Canal actif</span>
        </div>

        <div class="chat-messages">
          ${selected.messages.map(message => `
            <div class="chat-message ${message.from === "me" ? "from-me" : "from-them"}">
              <p>${escapeHtml(message.text)}</p>
            </div>
          `).join("")}
        </div>

        <div class="quick-replies">
          <button data-message-template="Bonjour, pouvez-vous m'aider sur ce point ?">Demander de l'aide</button>
          <button data-message-template="Je vous confirme que c'est bien pris en compte.">Confirmer</button>
          <button data-message-template="Pouvez-vous me proposer un creneau cette semaine ?">Demander un rendez-vous</button>
        </div>

        <form class="chat-form" id="message-form">
          <input id="message-input" type="text" placeholder="Ecrire un message..." required>
          <button class="primary-button" type="submit">Envoyer</button>
        </form>
      </article>
    </section>
  `;
}

function renderStudentMissions() {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head">
          <div>
            <h2>Missions</h2>
            <p class="muted">Suivez vos missions, les competences travaillees et les retours entreprise.</p>
          </div>
        </div>
        <div class="mission-board">
          ${state.student.missions.map(mission => `
            <article class="mission-card">
              <div class="card-head">
                <h3>${escapeHtml(mission.title)}</h3>
                <span class="status ${getStatusClass(mission.status)}">${escapeHtml(mission.status)}</span>
              </div>
              <p class="muted">${escapeHtml(mission.owner)} - ${escapeHtml(mission.skill)}</p>
              <div class="progress"><span style="width: ${mission.progress}%;"></span></div>
              <small>${mission.progress}% complete</small>
              <p>${escapeHtml(mission.feedback)}</p>
            </article>
          `).join("")}
        </div>
      </article>

      <article class="card workspace-side">
        <div class="card-head"><h2>Ajouter une mission</h2></div>
        <form class="workspace-form" id="mission-form">
          <div class="field">
            <label for="mission-title">Mission</label>
            <input id="mission-title" name="title" type="text" placeholder="Ex : preparer une campagne" required>
          </div>
          <div class="field">
            <label for="mission-skill">Competence</label>
            <input id="mission-skill" name="skill" type="text" placeholder="Ex : communication" required>
          </div>
          <button class="primary-button" type="submit">Ajouter</button>
        </form>
      </article>
    </section>
  `;
}

function renderStudentEvaluations() {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head">
          <div>
            <h2>Evaluations</h2>
            <p class="muted">Preparez vos bilans, consultez les appreciations et gardez une trace claire.</p>
          </div>
        </div>
        <div class="evaluation-list">
          ${state.student.evaluations.map(evaluation => `
            <article class="evaluation-card">
              <div>
                <strong>${escapeHtml(evaluation.title)}</strong>
                <small>${formatDate(evaluation.date)} - ${escapeHtml(evaluation.note)}</small>
              </div>
              <span class="status ${getStatusClass(evaluation.status)}">${escapeHtml(evaluation.status)}</span>
              <p>${escapeHtml(evaluation.score)}</p>
            </article>
          `).join("")}
        </div>
      </article>

      <article class="card workspace-side ai-summary-card">
        <div class="card-head"><h2>Preparation IA</h2></div>
        <p class="muted">L'assistant peut generer une trame de bilan a partir de vos missions.</p>
        <button class="primary-button" data-ai-prompt="Genere un compte-rendu">Generer une trame</button>
      </article>
    </section>
  `;
}

function renderStudentNotifications() {
  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head">
          <div>
            <h2>Notifications</h2>
            <p class="muted">Centralisez les alertes administratives, pedagogiques et messages importants.</p>
          </div>
          <button class="ghost-button" data-action="mark-notifications-read">Tout marquer comme lu</button>
        </div>
        <ul class="notification-list">
          ${state.student.notifications.map(notification => `
            <li class="${notification.read ? "" : "is-unread"}">
              <span class="dot ${notification.level === "warning" ? "amber" : "blue"}"></span>
              <div>
                <strong>${escapeHtml(notification.title)}</strong>
                <small>${escapeHtml(notification.type)} - ${escapeHtml(notification.detail)}</small>
              </div>
              <span class="status ${notification.read ? "success" : "info"}">${notification.read ? "Lu" : "Nouveau"}</span>
            </li>
          `).join("")}
        </ul>
      </article>

      <article class="card workspace-side">
        <div class="card-head"><h2>Actions recommandees</h2></div>
        <ul class="list">
          <li><span class="dot amber"></span><div><strong>Deposer l'attestation employeur</strong><small>Priorite administrative</small></div></li>
          <li><span class="dot blue"></span><div><strong>Repondre au tuteur ecole</strong><small>Message non lu</small></div></li>
          <li><span class="dot green"></span><div><strong>Preparer le bilan mensuel</strong><small>Avec l'aide de l'IA</small></div></li>
        </ul>
      </article>
    </section>
  `;
}

function renderStudentProfile() {
  const profile = state.student.profile;

  return `
    <section class="student-workspace">
      <article class="card workspace-main">
        <div class="card-head">
          <div>
            <h2>Mon profil</h2>
            <p class="muted">Vos informations personnelles, votre formation et vos contacts de suivi.</p>
          </div>
          <span class="status success">${escapeHtml(profile.status)}</span>
        </div>

        <form class="workspace-form" id="profile-form">
          <div class="form-grid">
            <div class="field">
              <label for="profile-name">Nom</label>
              <input id="profile-name" name="name" type="text" value="${escapeHtml(profile.name)}" required>
            </div>
            <div class="field">
              <label for="profile-email">Email</label>
              <input id="profile-email" name="email" type="email" value="${escapeHtml(profile.email)}" required>
            </div>
          </div>
          <div class="form-grid">
            <div class="field">
              <label for="profile-phone">Telephone</label>
              <input id="profile-phone" name="phone" type="text" value="${escapeHtml(profile.phone)}" required>
            </div>
            <div class="field">
              <label for="profile-program">Formation</label>
              <input id="profile-program" name="program" type="text" value="${escapeHtml(profile.program)}" required>
            </div>
          </div>
          <button class="primary-button" type="submit">Enregistrer le profil</button>
        </form>
      </article>

      <article class="card workspace-side">
        <div class="card-head"><h2>Contacts</h2></div>
        <ul class="profile-list">
          <li><strong>Ecole</strong><span>${escapeHtml(profile.school)}</span></li>
          <li><strong>Entreprise</strong><span>${escapeHtml(profile.company)}</span></li>
          <li><strong>Tuteur ecole</strong><span>${escapeHtml(profile.tutor)}</span></li>
          <li><strong>Maitre d'apprentissage</strong><span>${escapeHtml(profile.mentor)}</span></li>
        </ul>
        <div class="skill-cloud">
          ${profile.skills.map(skill => `<span>${escapeHtml(skill)}</span>`).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderAssistant() {
  if (!state.role) return "";

  const role = roles[state.role];
  const messages = state.assistantMessages.length
    ? state.assistantMessages
    : [{ from: "ai", text: role.assistant.intro }];

  return `
    <aside class="ai-panel ${state.assistantOpen ? "is-open" : ""}" aria-label="Assistant IA Linka">
      <div class="ai-panel-head">
        <div>
          <span class="eyebrow">Assistant Linka</span>
          <h2>Copilote IA</h2>
        </div>
        <button class="ghost-button" data-action="assistant-close">Fermer</button>
      </div>

      <div class="ai-quick-prompts">
        ${role.assistant.prompts.map(prompt => `<button data-ai-prompt="${prompt}">${prompt}</button>`).join("")}
        <button data-ai-prompt="Detecte les risques">Detecte les risques</button>
        <button data-ai-prompt="Genere un compte-rendu">Genere un compte-rendu</button>
      </div>

      <div class="ai-messages" aria-live="polite">
        ${messages.map(message => `
          <div class="ai-message ${message.from === "user" ? "from-user" : "from-ai"}">
            <span>${message.from === "user" ? "Vous" : "Linka IA"}</span>
            <p>${escapeHtml(message.text)}</p>
          </div>
        `).join("")}
      </div>

      <form class="ai-form" id="ai-form">
        <input id="ai-input" type="text" placeholder="Posez une question a l'assistant..." autocomplete="off">
        <button class="primary-button" type="submit">Envoyer</button>
      </form>
    </aside>
    <button class="ai-floating-button" data-action="assistant" aria-label="Ouvrir l'assistant IA">IA</button>
    <div class="ai-overlay ${state.assistantOpen ? "is-visible" : ""}" data-action="assistant-close"></div>
  `;
}

function renderList(items) {
  return `
    <ul class="list">
      ${items.map(([title, help, color]) => `
        <li>
          <span class="dot ${color}"></span>
          <div><strong>${title}</strong><small>${help}</small></div>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderTasks(tasks) {
  return `
    <ul class="task-list">
      ${tasks.map((task, index) => `
        <li>
          <input type="checkbox" data-task="${index}" ${state.completedTasks.has(index) ? "checked" : ""}>
          <span>${task}</span>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderTable(rows) {
  return `
    <article class="card full">
      <div class="card-head"><h2>Etudiants recents</h2><span class="pill">Tableau dynamique</span></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Etudiant</th><th>Formation</th><th>Entreprise</th><th>Statut</th></tr>
          </thead>
          <tbody>
            ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
    </article>
  `;
}

function renderSchoolStudentRows(students) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Etudiant</th><th>Formation</th><th>Entreprise</th><th>Statut</th><th>Risque</th></tr></thead>
        <tbody>
          ${students.map(student => `
            <tr>
              <td>${escapeHtml(student.name)}</td>
              <td>${escapeHtml(student.program)}</td>
              <td>${escapeHtml(student.company)}</td>
              <td><span class="status ${getStatusClass(student.status)}">${escapeHtml(student.status)}</span></td>
              <td>${escapeHtml(student.risk)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderAlternantRows(alternants) {
  return `
    <div class="mission-board">
      ${alternants.map(alternant => `
        <article class="mission-card">
          <div class="card-head"><h3>${escapeHtml(alternant.name)}</h3><span class="status ${getStatusClass(alternant.status)}">${escapeHtml(alternant.status)}</span></div>
          <p class="muted">${escapeHtml(alternant.program)}</p>
          <div class="progress"><span style="width: ${alternant.progress}%;"></span></div>
          <small>${alternant.progress}% de progression</small>
        </article>
      `).join("")}
    </div>
  `;
}

function renderSimpleMessages(messages) {
  return `
    <ul class="list">
      ${messages.slice(-3).map(message => `
        <li>
          <span class="dot ${message.from === "me" ? "green" : "blue"}"></span>
          <div><strong>${message.from === "me" ? "Vous" : "Message"}</strong><small>${escapeHtml(message.text)}</small></div>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderDocumentList(documents) {
  return `
    <ul class="document-list">
      ${documents.map(document => `
        <li>
          <div>
            <strong>${escapeHtml(document.name)}</strong>
            <small>${escapeHtml(document.category)} - ${escapeHtml(document.detail)}</small>
          </div>
          <span class="status ${getStatusClass(document.status)}">${escapeHtml(document.status)}</span>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderEventList(events) {
  return `
    <ul class="event-list">
      ${events.map(event => `
        <li>
          <time datetime="${event.date}">${formatDate(event.date)}</time>
          <div>
            <strong>${escapeHtml(event.title)}</strong>
            <small>${escapeHtml(event.time)} - ${escapeHtml(event.type)}</small>
          </div>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderConversationPreview() {
  return `
    <ul class="list">
      ${Object.values(state.student.conversations).map(conversation => {
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        return `
          <li>
            <span class="dot blue"></span>
            <div>
              <strong>${escapeHtml(conversation.name)}</strong>
              <small>${escapeHtml(lastMessage.text)}</small>
            </div>
          </li>
        `;
      }).join("")}
    </ul>
  `;
}

function getStatusClass(status) {
  const normalizedStatus = status.toLowerCase();
  if (normalizedStatus.includes("valide")) return "success";
  if (normalizedStatus.includes("deposer") || normalizedStatus.includes("depose") || normalizedStatus.includes("preparer")) return "warning";
  if (normalizedStatus.includes("verification") || normalizedStatus.includes("attente") || normalizedStatus.includes("nouveau") || normalizedStatus.includes("revue")) return "info";
  if (normalizedStatus.includes("complete") || normalizedStatus.includes("signe") || normalizedStatus.includes("terminee")) return "success";
  if (normalizedStatus.includes("planifie")) return "info";
  if (normalizedStatus.includes("bloque") || normalizedStatus.includes("eleve")) return "warning";
  return "";
}

function formatDate(dateValue) {
  if (!dateValue) return "";
  const date = new Date(`${dateValue}T12:00:00`);
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

app.addEventListener("click", (event) => {
  const roleButton = event.target.closest("[data-role]");
  const actionButton = event.target.closest("[data-action]");
  const aiPromptButton = event.target.closest("[data-ai-prompt]");
  const studentViewButton = event.target.closest("[data-student-view]");
  const conversationButton = event.target.closest("[data-conversation]");
  const messageTemplateButton = event.target.closest("[data-message-template]");
  const roleViewButton = event.target.closest("[data-role-view]");
  const roleMessageTemplateButton = event.target.closest("[data-role-message-template]");
  const contractValidateButton = event.target.closest("[data-contract-validate]");
  const mentorDocumentSignButton = event.target.closest("[data-mentor-document-sign]");
  const mentorEvaluationCompleteButton = event.target.closest("[data-mentor-evaluation-complete]");
  const schoolDocumentValidateButton = event.target.closest("[data-school-document-validate]");
  const schoolDocumentRefuseButton = event.target.closest("[data-school-document-refuse]");

  if (roleButton) {
    state.role = roleButton.dataset.role;
    state.screen = "login";
    state.completedTasks = new Set();
    state.assistantMessages = [];
    state.assistantOpen = false;
    render();
  }

  if (aiPromptButton) {
    handleAssistantPrompt(aiPromptButton.dataset.aiPrompt);
    return;
  }

  if (studentViewButton) {
    state.student.view = studentViewButton.dataset.studentView;
    render();
    return;
  }

  if (conversationButton) {
    state.student.selectedConversation = conversationButton.dataset.conversation;
    render();
    return;
  }

  if (messageTemplateButton) {
    state.student.conversations[state.student.selectedConversation].messages.push({
      from: "me",
      text: messageTemplateButton.dataset.messageTemplate
    });
    saveStudentData();
    render();
    return;
  }

  if (roleViewButton) {
    const [roleKey, view] = roleViewButton.dataset.roleView.split(":");
    state[roleKey].view = view;
    render();
    return;
  }

  if (roleMessageTemplateButton) {
    const [roleKey, text] = roleMessageTemplateButton.dataset.roleMessageTemplate.split(":");
    state[roleKey].messages.push({ from: "me", text });
    saveRoleData(roleKey);
    render();
    return;
  }

  if (contractValidateButton) {
    const contractId = Number(contractValidateButton.dataset.contractValidate);
    state.school.contracts = state.school.contracts.map(contract => contract.id === contractId ? { ...contract, status: "Valide" } : contract);
    saveRoleData("school");
    render();
    return;
  }

  if (schoolDocumentValidateButton) {
    const documentId = Number(schoolDocumentValidateButton.dataset.schoolDocumentValidate);
    state.school.documents = state.school.documents.map(document => document.id === documentId ? { ...document, status: "Valide", comment: "Document valide par l'ecole." } : document);
    saveRoleData("school");
    render();
    return;
  }

  if (schoolDocumentRefuseButton) {
    const documentId = Number(schoolDocumentRefuseButton.dataset.schoolDocumentRefuse);
    state.school.documents = state.school.documents.map(document => document.id === documentId ? { ...document, status: "Refuse", comment: "Document a remplacer." } : document);
    saveRoleData("school");
    render();
    return;
  }

  if (mentorDocumentSignButton) {
    const documentId = Number(mentorDocumentSignButton.dataset.mentorDocumentSign);
    state.mentor.documents = state.mentor.documents.map(document => document.id === documentId ? { ...document, status: "Signe" } : document);
    saveRoleData("mentor");
    render();
    return;
  }

  if (mentorEvaluationCompleteButton) {
    const evaluationId = Number(mentorEvaluationCompleteButton.dataset.mentorEvaluationComplete);
    state.mentor.evaluations = state.mentor.evaluations.map(evaluation => evaluation.id === evaluationId ? { ...evaluation, status: "Completee" } : evaluation);
    saveRoleData("mentor");
    render();
    return;
  }

  if (actionButton) {
    const action = actionButton.dataset.action;
    if (action === "home") state = initialState();
    if (action === "logout") state = initialState();
    if (action === "demo-login") {
      state = initialState();
      state.screen = "dashboard";
      state.role = "student";
      state.userEmail = "demo@linka.fr";
    }
    if (action === "reset-demo") {
      localStorage.removeItem("linkaStudentData");
      localStorage.removeItem("linkaSchoolData");
      localStorage.removeItem("linkaMentorData");
      localStorage.removeItem("linkaCompletedTasks");
      state = initialState();
    }
    if (action === "assistant") state.assistantOpen = true;
    if (action === "assistant-close") state.assistantOpen = false;
    if (action === "mark-notifications-read") {
      state.student.notifications = state.student.notifications.map(notification => ({ ...notification, read: true }));
      saveStudentData();
    }
    render();
  }
});

app.addEventListener("submit", (event) => {
  if (event.target.id !== "login-form") return;
  event.preventDefault();
  state.userEmail = event.target.querySelector("#email").value;
  state.screen = "dashboard";
  state.assistantOpen = false;
  state.assistantMessages = [];
  render();
});

app.addEventListener("submit", (event) => {
  if (event.target.id !== "ai-form") return;
  event.preventDefault();
  const input = event.target.querySelector("#ai-input");
  const prompt = input.value.trim();
  if (!prompt) return;
  handleAssistantPrompt(prompt);
});

app.addEventListener("submit", (event) => {
  if (event.target.id === "document-form") {
    event.preventDefault();
    const form = event.target;
    const file = form.elements.file.files[0];
    const category = form.elements.category.value.trim();
    if (!file || !category) return;

    state.student.documents = [
      {
        id: Date.now(),
        name: file.name,
        category,
        status: "Depose",
        detail: "En attente de verification",
        due: form.elements.due.value,
        urgency: "Normal",
        comment: form.elements.comment.value.trim() || "Document depose par l'etudiant."
      },
      ...state.student.documents
    ];
    saveStudentData();
    render();
  }

  if (event.target.id === "event-form") {
    event.preventDefault();
    const form = event.target;
    state.student.events = [
      {
        id: Date.now(),
        title: form.title.value.trim(),
        date: form.date.value,
        time: form.time.value,
        type: form.type.value.trim()
      },
      ...state.student.events
    ];
    saveStudentData();
    render();
  }

  if (event.target.id === "mission-form") {
    event.preventDefault();
    const form = event.target;
    state.student.missions = [
      {
        id: Date.now(),
        title: form.title.value.trim(),
        owner: state.student.profile.company,
        progress: 0,
        status: "A demarrer",
        skill: form.skill.value.trim(),
        feedback: "Nouvelle mission ajoutee par l'etudiant."
      },
      ...state.student.missions
    ];
    saveStudentData();
    render();
  }

  if (event.target.id === "profile-form") {
    event.preventDefault();
    const form = event.target;
    state.student.profile = {
      ...state.student.profile,
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      program: form.program.value.trim()
    };
    saveStudentData();
    render();
  }

  if (event.target.id === "message-form") {
    event.preventDefault();
    const input = event.target.querySelector("#message-input");
    const text = input.value.trim();
    if (!text) return;

    state.student.conversations[state.student.selectedConversation].messages.push({ from: "me", text });
    saveStudentData();
    render();
  }

  if (event.target.id === "school-student-form") {
    event.preventDefault();
    const form = event.target;
    state.school.students = [
      { id: Date.now(), name: form.name.value.trim(), program: form.program.value.trim(), company: form.company.value.trim(), status: "Nouveau dossier", risk: "A evaluer" },
      ...state.school.students
    ];
    saveRoleData("school");
    render();
  }

  if (event.target.id === "school-company-form") {
    event.preventDefault();
    const form = event.target;
    state.school.companies = [
      { id: Date.now(), name: form.name.value.trim(), contact: form.contact.value.trim(), offers: 0, status: "Nouveau partenaire" },
      ...state.school.companies
    ];
    saveRoleData("school");
    render();
  }

  if (event.target.id === "school-event-form" || event.target.id === "mentor-event-form") {
    event.preventDefault();
    const roleKey = event.target.id.startsWith("school") ? "school" : "mentor";
    const form = event.target;
    state[roleKey].events = [
      { id: Date.now(), title: form.title.value.trim(), date: form.date.value, time: form.time.value, type: form.type.value.trim() },
      ...state[roleKey].events
    ];
    saveRoleData(roleKey);
    render();
  }

  if (event.target.id === "school-message-form" || event.target.id === "mentor-message-form") {
    event.preventDefault();
    const roleKey = event.target.id.startsWith("school") ? "school" : "mentor";
    const text = event.target.message.value.trim();
    if (!text) return;
    state[roleKey].messages.push({ from: "me", text });
    saveRoleData(roleKey);
    render();
  }

  if (event.target.id === "mentor-alternant-form") {
    event.preventDefault();
    const form = event.target;
    state.mentor.alternants = [
      { id: Date.now(), name: form.name.value.trim(), program: form.program.value.trim(), progress: 0, status: "Nouveau" },
      ...state.mentor.alternants
    ];
    saveRoleData("mentor");
    render();
  }

  if (event.target.id === "mentor-mission-form") {
    event.preventDefault();
    const form = event.target;
    state.mentor.missions = [
      { id: Date.now(), title: form.title.value.trim(), student: form.student.value.trim(), progress: 0, status: "A demarrer" },
      ...state.mentor.missions
    ];
    saveRoleData("mentor");
    render();
  }

  if (event.target.id === "mentor-document-form") {
    event.preventDefault();
    const form = event.target;
    state.mentor.documents = [
      { id: Date.now(), name: form.name.value.trim(), status: "A signer", due: form.elements.due.value },
      ...state.mentor.documents
    ];
    saveRoleData("mentor");
    render();
  }

  if (event.target.id === "mentor-feedback-form") {
    event.preventDefault();
    const form = event.target;
    state.mentor.feedbacks = [
      { id: Date.now(), student: form.student.value.trim(), text: form.text.value.trim() },
      ...state.mentor.feedbacks
    ];
    saveRoleData("mentor");
    render();
  }
});

app.addEventListener("change", (event) => {
  if (!event.target.matches("[data-task]")) return;
  const taskId = Number(event.target.dataset.task);
  if (event.target.checked) state.completedTasks.add(taskId);
  else state.completedTasks.delete(taskId);
  saveCompletedTasks();
});

async function handleAssistantPrompt(prompt) {
  state.assistantOpen = true;
  state.assistantMessages = [
    ...state.assistantMessages,
    { from: "user", text: prompt },
    { from: "ai", text: "Je prepare une reponse contextualisee..." }
  ];
  render();

  const answer = await getAssistantAnswer(prompt);
  state.assistantMessages = [
    ...state.assistantMessages.slice(0, -1),
    { from: "ai", text: answer }
  ];
  render();
}

async function getAssistantAnswer(prompt) {
  const realAnswer = await getRealAssistantAnswer(prompt);
  if (realAnswer) return realAnswer;

  const role = roles[state.role];
  const normalizedPrompt = prompt.toLowerCase();

  if (normalizedPrompt.includes("risque")) return role.assistant.risk;
  if (normalizedPrompt.includes("compte") || normalizedPrompt.includes("rendu") || normalizedPrompt.includes("evaluation") || normalizedPrompt.includes("feedback")) {
    return role.assistant.report;
  }
  if (normalizedPrompt.includes("document")) {
    return "Documents a traiter : verifiez les pieces en attente, corrigez les champs manquants et validez uniquement les fichiers complets. Je recommande de commencer par les elements marques comme prioritaires.";
  }
  if (normalizedPrompt.includes("relance")) {
    return "Relance proposee : Bonjour, nous vous contactons concernant le dossier d'alternance en attente. Pouvez-vous confirmer les informations manquantes afin de finaliser le suivi Linka ?";
  }
  if (normalizedPrompt.includes("priorite") || normalizedPrompt.includes("priorites")) {
    return role.assistant.report;
  }

  return "Je peux vous aider sur l'administratif, les documents, les evaluations, les comptes-rendus et les risques de suivi. Essayez une suggestion rapide pour voir une reponse contextualisee.";
}

async function getRealAssistantAnswer(prompt) {
  if (window.location.protocol === "file:") return null;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: state.role,
        message: prompt,
        context: buildAssistantContext()
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.answer || null;
  } catch {
    return null;
  }
}

function buildAssistantContext() {
  if (state.role === "student") {
    return {
      profile: state.student.profile,
      documents: state.student.documents,
      events: state.student.events,
      missions: state.student.missions,
      evaluations: state.student.evaluations,
      notifications: state.student.notifications
    };
  }

  if (state.role === "school") {
    return {
      students: state.school.students,
      companies: state.school.companies,
      contracts: state.school.contracts,
      documents: state.school.documents,
      events: state.school.events
    };
  }

  if (state.role === "mentor") {
    return {
      alternants: state.mentor.alternants,
      missions: state.mentor.missions,
      documents: state.mentor.documents,
      evaluations: state.mentor.evaluations,
      events: state.mentor.events,
      feedbacks: state.mentor.feedbacks
    };
  }

  return {};
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
