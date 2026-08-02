# QA Portfolio - TypeScript & Playwright

Portfolio complet de test logiciel réalisé dans le cadre de la formation **Testeur Logiciel Niveau 5** au sein de l'ENI École Informatique. Il couvre les phases de tests manuels, automatisés, CI/CD et accessibilité sur une application e-commerce de démonstration.

**Application testée :** [Tool Shop Demo](https://with-bugs.practicesoftwaretesting.com) - une boutique en ligne volontairement truffée de bugs, utilisée à des fins pédagogiques.

---

## 🧰 Stack technique

| Élément | Choix |
|---|---|
| Langage | TypeScript |
| Framework de test | Playwright (`@playwright/test`) |
| CI/CD | GitHub Actions |
| Suivi de projet | Jira (Epics, User Stories, Cas de test, Bugs) |
| Lint | ESLint |

---

## 📁 Structure du repo

```
.
├── .github/workflows/                  → Pipeline CI/CD (lint → smoke → regression → rapport)
|── Tests_Exploration                   → Session de tests d'exploration en début de projet
│   ├──> Charte de test exploratoire                
│   └──> Rapport d'exécution
├── Sprint_1_Access_Management/
│   ├── manuel/                         → Charte, User Stories, Plan de test, Cas de test, Rapport d'exécution
│   └── automatisation/                 → Page Objects, fixtures, tests Playwright
├── Sprint_2_Catalogue/
│   ├── manuel/
│   └── automatisation/
├── Sprint_3_Panier/
│   ├── manuel/
│   └── automatisation/
├── Sprint_4_Checkout/
│   ├── manuel/
│   └── automatisation/
├── docs/
│   └── screenshots/             → Captures d'écran Jira
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

Chaque dossier `manuel/` suit le même ordre de lecture, du prévisionnel à l'exécution :

1. Charte exploratoire
2. User Stories
3. Plan de test
4. Cas de test (fonctionnel + accessibilité RGAA)
5. Rapport d'exécution

---

## 🔍 Méthodologie

Chaque sprint suit la même démarche :

1. **Session exploratoire** ciblée → charte rédigée avant la session, rapport rédigé après
2. **Conception des cas de test** → fonctionnels **et** accessibilité, avec détermination systématique Auto/Manuel avant exécution
3. **Exécution manuelle** → documentée avec résultat obtenu, statut, et bugs associés
4. **Automatisation** → scénarios Playwright pour les parcours critiques
5. **Intégration CI/CD** → exécution automatique à chaque push, publication du rapport

Une session de **reconnaissance globale** a été menée en amont du découpage en sprints, afin d'identifier le périmètre général de l'application avant les 4 sessions exploratoires ciblées.

---

## ♿ Accessibilité (RGAA)

L'accessibilité est intégrée **dans chaque sprint**, pas traitée comme une phase séparée - conformément au référentiel de certification, qui demande d'exécuter des tests manuels d'accessibilité avec de vrais outils d'assistance.

**Outils utilisés :**

| Outil | Usage |
|---|---|
| WAVE (extension Chrome) | Détection automatisée : labels manquants, contraste, structure HTML |
| Navigation clavier | Focus visible, ordre de tabulation, absence de piège clavier |
| Orca (lecteur d'écran Linux) | Restitution vocale des messages de statut et changements de contexte |
| Inspection visuelle | Information non donnée uniquement par la couleur |

Tous les critères RGAA cités dans les cas de test sont vérifiés individuellement sur le [référentiel officiel](https://accessibilite.numerique.gouv.fr/) avant intégration - niveau (A/AA/AAA) et numéro de critère précisés pour chaque test.

---

## 📊 Bilan global — phase manuelle

| Sprint | Cas de test | Pass | Fail | Taux | Bugs identifiés |
|---|---|---|---|---|---|
| Sprint 1 → Access Management | 39 | 26 | 13 | 67% | 12 |
| Sprint 2 → Catalogue | 47 | 26 | 21 | 55% | 14 |
| Sprint 3 → Panier | 27 | 13 | 14 | 48% | 10 |
| Sprint 4 → Checkout | 25 | 17 | 8 | 68% | 8 |
| **Total** | **138** | **82** | **56** | **59%** | **44** |

Dont **38 cas de test dédiés à l'accessibilité**, répartis sur les 4 sprints.

---

## 🚀 Lancer les tests automatisés

```bash
# Installer les dépendances
npm install

# Lancer tous les tests
npx playwright test

# Lancer uniquement les tests "smoke"
npx playwright test --grep @smoke

# Lancer un sprint en particulier
npx playwright test Sprint_1_Access_Management

# Voir le rapport HTML après exécution
npx playwright show-report
```

---

## ⚙️ CI/CD

Le pipeline GitHub Actions s'exécute automatiquement à chaque push :

```
lint → tests smoke → tests de régression → publication du rapport (GitHub Pages)
```

---

## 👤 Auteur

**Yassine Boulakhrif** → Testeur QA/Automaticien de test
Projet réalisé dans le cadre de la certification Testeur Logiciel Niveau 5 (ENI École)