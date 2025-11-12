# Unc Inc Fullstack assignment

## Over Dit Project

Dit project werd ontwikkeld als assessment voor Unc Inc.

Het project bestaat uit een React TypeScript frontend en een Django REST API backend voor het beheren van artikelen met authenticatie.

<br>

## Gedachteproces & Aanpak

<br>

### Fase 1: Planning & Analyse

Bij het analyseren van de opdracht heb ik bewust een opdeling gemaakt op basis van mijn bestaande kennis en leercurve:

**Sterke Punten**

- Frontend development (React, TypeScript, routing)
- Basis Django setup en database modeling

**Onderzoekgebieden**

- JWT authenticatie in Django zonder template engine
- React Query voor state management en API calls
- Token-gebaseerde autorisatie flow

Deze analyse heeft de implementatievolgorde bepaald: eerst de basis infrastructuur, dan authenticatie en routing (de meest kritische en onbekende elementen), en uiteindelijk de CRUD functionaliteit voor artikelen.

<br>

---

<br>

### Fase 2: Technische Keuzes

**Backend**

- Django REST Framework met JWT authenticatie
- Bewuste keuze voor token-based auth aangezien Django's ingebouwde authenticatie primair voor server-side rendering is
- API-first benadering met Postman voor testing

**Frontend**

- Tanstack Router met geïntegreerde React Query vanwege eerdere positieve ervaring met React Query.
- TypeScript voor type safety
- Vite als build tool voor snelle development

Deze keuzes waren ambitieus maar weloverwogen - voornamelijk Tanstack en een goede JWT flow creëren brachten een leercurve met zich mee die de ontwikkeltijd beïnvloedde, maar resulteerden in een naar mijn gevoel moderne, schaalbare architectuur.

<br>

---

<br>

### Fase 3: Uitvoering & Leerpunten

**Uitdagingen**

- De authenticatie flow kostte meer tijd dan verwacht door het verschil tussen Django's traditionele auth en moderne JWT implementatie
- Tanstack Router + React Query integratie vereiste meer documentatie-onderzoek dan gepland
- Balans tussen functionaliteit, code kwaliteit en tijdsinvestering

**AI Inzet**

- v0.dev voor grote structurele componenten en boilerplate code
- ChatGPT/Perplexity voor specifieke implementatievragen en best practices
- Kritische validatie van AI-gegenereerde code door eigen research en testing

<br>

## Reflectie

Dit project was leuk en uitdagend, en heeft mijn data-side development vaardigheden aangescherpt na een periode van primair visueel werk.

### Basisvereisten

De meeste basisvereisten zijn vervuld, maar nog niet helemaal bug-free.

### Extra features

#### Toegevoegde features:

- Search op titel in frontend en backend
- Caching in frontend met Tanstack
- Automatische code-splitting in React met Tanstack
- Unit tests frontend en backend

#### Onderzoek gedaan, niet geimplementeerd:

- File/afbeelding opslag in backend
- Docker en GitHub Actions
- Backend caching

<br>

## Quick Start

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Zie [Frontend README](./frontend/README.md) en [Backend README](./backend/README.md) voor gedetailleerde instructies.

<br>

---

<br>

_Ontwikkeld voor sollicitatie assessment - Demonstratie van full-stack development vaardigheden en professionele werkwijze_
