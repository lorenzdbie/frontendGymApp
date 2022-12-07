# Voornaam Familienaam (Studentennummer)

- [x] Front-end Web Development
  - [GitHub repository](https://github.com/Web-IV/2223-frontendweb-Lorenzdebie)
  - [Online versie](https://two223-frontendweb-lorenzdebie.onrender.com/)
- [x] Web Services: GITHUB URL
  - [GitHub repository](https://github.com/Web-IV/2223-webservices-Lorenzdebie)
  - [Online versie](https://two223-webservices-lorenzdebie.onrender.com)

**Logingegevens**

- Gebruikersnaam/e-mailadres: test@test.be
- Wachtwoord: Auth0Password

## Projectbeschrijving

Een applicatie om eem afspraak te maken bij een Personal trainer waar bepaalde gebruikersgegevens voor nodig zijn, waar de verschillende excercises/trainings kunnen geraadpleegd en gekozen worden. Ook is er een calender waar all gemaakte en niet verlopen afspraken in komen.

## Screenshots

<img width="1309" alt="Screenshot 2022-12-07 at 20 30 42" src="https://user-images.githubusercontent.com/83095711/206277663-05ba3ae1-b558-48e4-ba21-fb2847122231.png">

<img width="1320" alt="Screenshot 2022-12-07 at 20 30 06" src="https://user-images.githubusercontent.com/83095711/206277557-a77ca0ef-4573-442d-9c0e-6a593a33765e.png">

<img width="1311" alt="Screenshot 2022-12-07 at 20 32 03" src="https://user-images.githubusercontent.com/83095711/206277928-faef5047-08ed-4498-8bc5-269d0c245c6c.png">
<img width="1321" alt="Screenshot 2022-12-07 at 20 32 33" src="https://user-images.githubusercontent.com/83095711/206278029-b4a8a2c0-5204-40fa-9405-85ac78e3a1e6.png">
<img width="682" alt="Screenshot 2022-12-07 at 20 33 13" src="https://user-images.githubusercontent.com/83095711/206278144-47f45073-b39d-4b1c-91be-82a44fdcee19.png">


## Behaalde minimumvereisten

> Duid per vak aan welke minimumvereisten je denkt behaald te hebben

### Front-end Web Development

- **componenten**

  - [x] heeft meerdere componenten - dom & slim (naast login/register)
  - [x] definieert constanten (variabelen, functies en componenten) buiten de component
  - [x] minstens één form met validatie (naast login/register)
  - [x] login systeem (eigen of extern zoals bv. Auth0)
        <br />

- **routing**

  - [x] heeft minstens 2 pagina's (naast login/register)
  - [x] routes worden afgeschermd met authenticatie en autorisatie
        <br />

- **state-management**

  - [x] meerdere API calls (naast login/register)
  - [x] degelijke foutmeldingen indien API call faalt
  - [x] gebruikt useState enkel voor lokale state
  - [x] gebruikt Context, useReducer, Redux… voor globale state
        <br />

- **hooks**

  - [x] kent het verschil tussen de hooks (useCallback, useEffect…)
  - [x] gebruikt de hooks op de juiste manier
        <br />

- **varia**
  - [x] een aantal niet-triviale testen (unit en/of e2e en/of ui)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier

### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties
  - [x] heeft seeds
        <br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa
        <br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
        <br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] degelijke authorisatie/authenticatie op alle routes
        <br />

- **varia**
  - [ ] een aantal niet-triviale testen (min. 1 controller >=80% coverage)
  - [ ] minstens één extra technologie
  - [x] duidelijke en volledige `README.md`
  - [x] maakt gebruik van de laatste ES6-features (object destructuring, spread operator...)
  - [x] volledig en tijdig ingediend dossier

## Projectstructuur

### Front-end Web Development

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns, hiërarchie van componenten, state...)?

### Web Services

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns...)?

## Extra technologie

### Front-end Web Development

Big Calendar React: https://www.npmjs.com/package/react-big-calendar
Dit geeft alle gemaakte afspraken terug in calender vorm (Overview-tab)

### Web Services

> Wat is de extra technologie? Hoe werkt het? Voeg een link naar het npm package toe!

## Testresultaten

### Front-end Web Development

testen on connectie, appointment, exercise, addAppointment, addExercise

### Web Services

100% conerage op alle routes, tot aan implementatie Auth0, daarna niets meer.

> Schrijf hier een korte oplijsting en beschrijving van de geschreven testen + voeg een screenshot van de coverage en uitvoering toe

## Gekende bugs

### Front-end Web Development

een Bug in de package Big-Calendar-React. Dit is aan de zijde van npm

### Web Services

alle tests falen na implementatie Auth0

## Wat is er verbeterd/aangepast?

> Deze sectie is enkel voor 2e zittijd, verwijder deze in 1e zittijd.

### Front-end Web Development

- Dit en dat

### Web Services

- Oh en dit ook
