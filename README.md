# Prosjekt 3
Dette er prosjekt 3 i faget IT2810 Webutvikling for gruppe 41.
## Innhold og funksjonalitet
### Funksjonalitet
Webapplikasjonen viser brukeren drivstoffprisene på mange ulike bensinstasjoner. Hensikten er at brukere skal kunne registrere drivstoffprisene de observerer på de ulike stasjonene, for å kunne gi andre brukere en god oversikt over prisene for de aktuelle stasjonene. På hjemskjermen vises en oversikt over et sett med stasjoner og når man scroller laster siden **dynamisk flere resultater**. Det er mulig å **filtrere** på ulike byer ved å huke av på den aktuelle radioknappen i sidemenyen til venstre. Man kan også filtrere på makspris ved å dra slideren i den samme filtreringsmenyen. Clear knappen i sidemenyen tilbakestiller alle valgene for filtreringen. Søkefeltet over listen med stasjoner gjør at man kan søke på bensinstasjoner ved navn, og søket oppdaterer seg mens man skriver med et gitt tidsintervall. Trykker man på en stasjon får man informasjon om de tidligere prisene ved å se på grafen. Man kan også legge til en ny pris til stasjonen i feltet nederst på siden.

## Universell utforming

## Bærekraftig utvikling

## Fornuftige valg

### Komponenter

### API

### Dobbel lagring
Den siste prisen på en bensinstasjon er både lagret som et atttributt på GasStation og som et element i GasPrices. Dette er vanlig praksis i no-sql databaser og gjør queries kjappere. Det er også en fordel at det er enkelt å hente ut den siste prisen på en bensinstasjon.


## Testing



