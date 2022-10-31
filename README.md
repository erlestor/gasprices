# Prosjekt 3
Dette er prosjekt 3 i faget IT2810 Webutvikling for gruppe 41.
## Innhold og funksjonalitet

Webapplikasjonen viser brukeren drivstoffprisene på mange ulike bensinstasjoner. Hensikten er at brukere skal kunne registrere drivstoffprisene de observerer på de ulike stasjonene, for å kunne gi andre brukere en god oversikt over prisene for de aktuelle stasjonene. På hjemskjermen vises en oversikt over et sett med stasjoner og når man scroller laster siden **dynamisk flere resultater**. Det er mulig å **filtrere** på ulike byer ved å huke av på den aktuelle radioknappen i sidemenyen til venstre. Man kan også filtrere på makspris ved å dra slideren i den samme filtreringsmenyen. Clear knappen i sidemenyen tilbakestiller alle valgene for filtreringen. Søkefeltet over listen med stasjoner gjør at man kan søke på bensinstasjoner ved navn, og søket oppdaterer seg mens man skriver med et gitt tidsintervall. Trykker man på en stasjon får man informasjon om de tidligere prisene ved å se på grafen. Man kan også legge til en ny pris til stasjonen i feltet nederst på siden.

## Teknologi
Brukergrensesnittet er skrevet i React implementert med Typescript. Backenden er også skrevet med Typescript, og databasen som er brukt er MongoDB, som er en no-SQL database Vi har brukt Apollo på klient og serversiden for å sette opp et GraphQL API. Apollo local state management er løsningen vi har benyttet for håndtering av state management.

## Universell utforming
Universell utforming handler om at alle skal ha muligheten til å benytte løsningen på en god måte. Vi har tatt noen valg som har til hensikt å gjøre applikasjonen mer universell. Alle deler av applikasjonen skal ha god kontrast mellom tekst og bakgrunn, og i de fleste tilfeller er det mørk farge på teksten og en hvit bakgrunn. Vi har også prøvd å gjøre knappene, bensinstasjonkortene og grafen store og tydelige nok til at de blir enkelt lagt merke til. Det er også her strevd etter å ha god kontrast til den hvite bakgrunnen. Vi har også prøvd å ha store nok klikkoverflater, som for eksempel ved at man kan trykke på hele kortet om bensinstasjonen for å få mer informasjon eller ved at knappene er store nok. Dette kan være til noe hjelp hvis man har nedsatt motorikk. Det er til en viss grad mulig å bruke tastaturet for navigasjon ved å bruke shift og piltastene for å bla gjennom de ulike elementene på siden og benytte enter tasten for å velge et element, men dette er ikke noe vi har hatt fokus på da vi utviklet applikasjonen. Det kunne vært en fin utvidelse å gjøre det enkelere å navigere med tastaturet for de med nedsatt motorikk og som kan ha problemer med å bruke styreflaten til navigering. Det er strevd etter å oppnå god interaksjonsdesign og knapper og elementer er plassert på områder vi synes virker intuitive.


## Bærekraftig utvikling
Vi har implementert noen funksjoner for å sørge for at applikasjonen er bærekraftig. Et stort fokus var å prøve å minimere nettverkstrafikk med overflødige API kall som inneholder mer data en det som trengs for å tilfredstille behovet til brukeren i den gitte situasjonen. Dette gjøres blant annet ved å bruke caching gjennom Apollo-klienten som gjør at data som allerede har blitt lastet inn før vil midlertidig bli lagret i cache-minnet og kan brukes i stedet for å gjøre et nytt kall over nettverket. Det gjør applikasjonen raskere fordi den ikke trenger å gjøre et nytt kall og vente på serveren sin respons. Det gjør også at applikasjonen bruker mindre energi, fordi det er mer effektivt enn å gjøre nye kall. Laste ny data kun ved scrolling og "debounce" søking er også funksjoner som gjør at data ikke må lastes inn i større mengder enn nødvendig. En søkefunksjon som kontinuerlig laster inn data basert på hva som skrives inn i søkefeltet vil hente unødvendig mye data. Det er heller ikke nødvendig å vise alle bensinstasjonene ved oppstart, fordi det er ikke sikkert at dette er i brukerens interesse og det krever større API kall.

Vi har noen bilder og grafikk i form av en graf som kjører en animasjon ved start. Dette bruker litt mer energi, men ved å ikke benytte oss av dette tror vi at det hadde gått på bekostning av brukeropplevelsen. Utenom dette er siden veldig statisk noe som koster mindre energi å kjøre. Vi er også klar over at unødvendige importer av store biblioteker kan skape overhead og bør unngås. Det er heller ikke implementert noe mørkmodus for applikasjonen, noe som kunne spart strøm for enheter med mikro LED eller OLED skjerm. På den andre siden er det svært få stasjonære og bærbare datamaskiner som bruker slik teknologi i dag, men det blir mer vanlig på toppmodellene til produsentene.

## Fornuftige valg
### Komponenter
-Biblioteker

### API

### Dobbel lagring
Den siste prisen på en bensinstasjon er både lagret som et atttributt på GasStation og som et element i GasPrices. Dette er vanlig praksis i no-sql databaser og gjør queries kjappere. Det er også en fordel at det er enkelt å hente ut den siste prisen på en bensinstasjon.


## Testing
- Unit
- e2e Cypress



