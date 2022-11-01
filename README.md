# Prosjekt 3

Dette er prosjekt 3 i faget IT2810 Webutvikling for gruppe 41.

## Hvordan kjøre appen

Følg stegene for backend og frontend ved å kjøre kommandoene under i rekkefølge. Man må være koblet til ntnu sitt nett. VPN kan brukes hvis man ikke er på ntnu sine områder.

### Backend

- cd backend
- npm i
- npm start

### Frontend

- cd frontend
- npm i
- npm start

## Innhold og funksjonalitet

Webapplikasjonen viser brukeren drivstoffprisene på mange ulike bensinstasjoner. Hensikten er at brukere skal kunne registrere drivstoffprisene de observerer på de ulike stasjonene, for å kunne gi andre brukere en god oversikt over prisene for de aktuelle stasjonene. På hjemskjermen vises en oversikt over et sett med stasjoner og når man scroller laster siden **dynamisk flere resultater**. Det er mulig å **filtrere** på ulike byer ved å huke av på den aktuelle radioknappen i sidemenyen til venstre. Man kan også filtrere på makspris ved å dra slideren i den samme filtreringsmenyen. Clear knappen i sidemenyen tilbakestiller alle valgene for filtreringen. Søkefeltet over listen med stasjoner gjør at man kan søke på bensinstasjoner ved navn, og søket oppdaterer seg mens man skriver med et gitt tidsintervall. Trykker man på en stasjon får man informasjon om de tidligere prisene ved å se på grafen. Man kan også legge til en ny pris til stasjonen i feltet nederst på siden.

## Teknologi

Brukergrensesnittet er skrevet i React implementert med Typescript. Backenden er også skrevet med Typescript, og databasen som er brukt er MongoDB, som er en no-SQL database. Vi valgte å bruke mongoDB, selv om dette førte til at vi måtte skrive egne resolvers, fordi MongoDB er godt dokumentert og vi hadde kjennskap til det fra før. Vi vurderte også Neo4J, men det virket som denne databasen var mindre dokumentert og opprettelsen av queries virket unødvendig kompleks. For å gjøre bruken av GraphQL enklere, brukte vi Apollo både på klient og serversiden. Apollo local state management er løsningen vi har benyttet for håndtering av state management som vi valgte fordi det passet godt inn med resten av Apollo biblioteket. Samtidig mener vi for eksempel Redux er unødvendig mye boilerplate kode for en såpass liten applikasjon. 

## Universell utforming

Universell utforming handler om at alle skal ha muligheten til å benytte løsningen på en god måte. Vi har tatt noen bevisste valg som bedrer applikasjonens universelle utforming. Alle deler av applikasjonen skal ha god kontrast mellom tekst og bakgrunn, og i de fleste tilfeller er det mørk farge på teksten og en hvit bakgrunn. Vi har også prøvd å gjøre knappene, bensinstasjonkortene og grafen store og tydelige nok til at de blir enkelt lagt merke til. Det er også her strevd etter å ha god kontrast til den hvite bakgrunnen. Vi har også prøvd å ha store nok klikkoverflater, som for eksempel ved at man kan trykke på hele kortet om bensinstasjonen for å få mer informasjon eller ved at knappene er store nok. Dette kan være til noe hjelp hvis man har nedsatt motorikk. Det er til en viss grad mulig å bruke tastaturet for navigasjon ved å bruke shift og piltastene for å bla gjennom de ulike elementene på siden og benytte enter tasten for å velge et element, men dette er ikke noe vi har hatt fokus på da vi utviklet applikasjonen. Det kunne vært en fin utvidelse å gjøre det enkelere å navigere med tastaturet for de med nedsatt motorikk og som kan ha problemer med å bruke styreflaten til navigering. Det er strevd etter å oppnå god interaksjonsdesign og knapper og elementer er plassert på områder vi synes virker intuitive.

## Bærekraftig utvikling

Vi har implementert noen funksjoner for å sørge for at applikasjonen er bærekraftig. Et stort fokus var å prøve å minimere nettverkstrafikk med overflødige API kall som inneholder mer data en det som trengs for å tilfredstille behovet til brukeren i den gitte situasjonen. Dette gjøres blant annet ved å bruke caching gjennom Apollo-klienten som gjør at data som allerede har blitt lastet inn før vil midlertidig bli lagret i cache-minnet og kan brukes i stedet for å gjøre et nytt kall over nettverket. Det gjør applikasjonen raskere fordi den ikke trenger å gjøre et nytt kall og vente på serveren sin respons. Det gjør også at applikasjonen bruker mindre energi, fordi det er mer effektivt enn å gjøre nye kall. Laste ny data kun ved scrolling og "debounce" søking er også funksjoner som gjør at data ikke må lastes inn i større mengder enn nødvendig. En søkefunksjon som kontinuerlig laster inn data basert på hva som skrives inn i søkefeltet vil hente unødvendig mye data. Det er heller ikke nødvendig å vise alle bensinstasjonene ved oppstart, fordi det er ikke sikkert at dette er i brukerens interesse og det krever større API kall.

Vi har noen bilder og grafikk i form av en graf som kjører en animasjon ved start. Dette bruker litt mer energi, men ved å ikke benytte oss av dette tror vi at det hadde gått på bekostning av brukeropplevelsen. Utenom dette er siden veldig statisk noe som koster mindre energi å kjøre. Vi er også klar over at unødvendige importer av store biblioteker kan skape overhead og bør unngås. Det er heller ikke implementert noe mørkmodus for applikasjonen, noe som kunne spart strøm for enheter med mikro LED eller OLED skjerm. På den andre siden er det svært få stasjonære og bærbare datamaskiner som bruker slik teknologi i dag, men det blir mer vanlig på toppmodellene til produsentene.

## Fornuftige valg

### Komponenter

Vi har valgt å skrive de fleste komponentene selv, og ikke brukt eksterne biblioteker i stor grad. Det finnes derimot noen tilfeller hvor vi har brukt eksterne bibliotek for å hente komponenter. Vi har brukt react icon biblioteket for å hente noen symboler til applikasjonen, som for eksempel i sidemenyen. Recharts er brukt for å vise en graf over tidligere priser til en bensinstasjon. Eksterne biblioteker for å slippe å lage sine egene komponenter kan være et godt alternativ for å få en godt utformet nettside som er kjent for brukeren. På den andre siden kan store biblioteker føre til mye ubrukt kode.

### API

I API'et vårt bruker vi **graphql** fremfor REST. Et vanlig problem med REST er at man enten henter inn for mye eller for lite data. Det kan være vanskelig å designe api'et slik at man kun henter den nødvendige dataen. Med graphql lager man queries som definerer akkurat hvilke data du ønsker å hente fra backend. Gjør man endringer på frontend som gjør at man trenger mer/mindre data enn før må man ofte skrive om endepunktet i REST. Med graphql kan man endre queriet istedenfor uten å måtte gjøre endringer på backend. Dette gjør at graphql er mer fleksibelt.

### Dobbel lagring

Den siste prisen på en bensinstasjon er både lagret som et atttributt på GasStation og som et element i GasPrices. Dette er vanlig praksis i no-sql databaser og gjør queries kjappere. Det er også en fordel at det er enkelt å hente ut den siste prisen på en bensinstasjon.

### Design valg

Nettsiden har som hensikt å presentere bensinpriser fra bensinstasjoner over hele Norge. Dette er svært mye data, og kan i flere tilfeller føre til at bruker må scrolle lang ned på siden før en finner ønsket data. Det er derfor hensiktsmessig å ha en sidebar som er sticky (alltid befinner seg på venstre side av skjermen), slik at bruker enkelt kan filtrere uansett hvor langt ned en har scrollet. Dette gjør det enklere for bruker å finne informasjon av interesse.

Ettersom nettsiden som sagt skal fremsette mye data, er det viktig å ha et design som gjør at mye data oversiktlig kan presenteres på et lite område. Dette er grunnen til at vi har valgt å lage kortene på forsiden relativt små, men likevel store nok til å presentere den mest sentrale dataen om stasjonen. Dataen presentert er nok til at brukeren kan finne stasjoner av interesse. Dersom det ønskes ytterligere informasjon kan bruker enkelt klikke seg inn på hver stasjon. 

Vi har også implementert en endless scroll-funksjon som dynamisk laster inn data avhengig av brukerscroll. Ettersom datamengden er svært stor, vil det i de aller fleste tilfeller være overflødig å laste inn all dataen samtidig. Ved bruk av endless scroll unngår vi at databasen opplever unødvendig stor pågang. 

Dersom bruker klikker seg inn på en gitt bensinstasjon ønsker vi å presentere en oversikt over tidligere priser, slik at bruker enkelt kan orientere seg om prisendringene til bensinstasjonen. Her hadde vi primært to ulike valg til hvordan dataen kunne presenteres; enten ved hjelp av graf eller en liste med tidligere priser. Vi konkluderte med at en graf representasjon vil være mer hensiktsmessig. En graf er en visuell representasjon som kan presentere mye data på en oversiktlig måte, samt gjør den det enkelt for bruker å orientere seg om prisendringene. I motsetning vil en liste gi mindre oversiktlig fremstilling ved store datamengder. Da vil bruker måtte aktivt bla gjennom dataen og forsøke danne seg et bilde av prisendringene. 

## Testing

### Unit testing med jest

Enhetstesting er en type testing der man tester de minste delelige komponentene i et program. For eksempel en enkelt funksjon, eller i vårt tilfelle en komponent. Dette er svært nyttig da man kan sjekke om koden fungerer mens man skriver. I tillegg kan man finne ut nøyaktig hvor bugs i appen ligger. Enhetstesting oppdager ikke alle bugs, men hvis appen ikke fungerer samtidig som enhetstestene passerer, kan man trygt anta at problemer ligger i integrasjonen. Jest er et bibliotek for testing som tilbyr nyttige funksjoner for enhetstesting, også for komponenter. Blant annet kan man mocke tilstand i appen slik at man kan enkelt kan teste en komponent uten å måtte laste inn hele komponenthierarkiet.

### End-to-end testing med cypress

I frontend/cypress/e2e kan du finne våre automatiske end-to-end tester. Formålet med testene er å se om appen som en helhet oppfyller ønsket funksjonalitet. Dette gjøres ved å gå igjennom realistiske brukerscenarioer. Eksempler på dette er å filterere/sortere bensinstasjonene, samt legge til nye priser. Disse testene gjøres automatisk av cypress. Cypress lar oss laste inn nettsiden og interagere med den på samme måte som en bruker ved å trykke på knapper og skrive inn i input-felter. En grunn til av vi valgte cypress er at testen kan åpnes i en nettleser der man kan se nøyaktig hva testen gjør, noe som gjør det lett å debugge. Den tar også snapshots av hvert steg slik at man kan se hvor noe gikk galt. Vi gjør også end-to-end tester manuelt ved å utføre brukerscenarioer på egenhånd. Dette lar oss oppdage bugs som ikke nødvendigvis ødelegger hovedfunksjonaliteten, men minker brukeropplevelsen.
