# Vereinskasse

Eine Kasse für Vereinsfeste. Läuft offline auf iPad/iPhone.

**App:** https://fbumann.github.io/vereinskasse/

## Einrichten

Einmal mit Internetverbindung:

1. In Safari `fbumann.github.io/vereinskasse` öffnen.
2. Teilen-Symbol → **Zum Home-Bildschirm** → **Hinzufügen**.
3. Ab jetzt nur noch über das Symbol auf dem Home-Bildschirm starten.
<table>
  <tr>
    <td align="center" width="25%">Teile die Website</td>
    <td align="center" width="25%">Wähle "Zum Homescreen hinzufügen"</td>
    <td align="center" width="25%">Wähle einen Namen für deine App und drücke "Hinzufügen"</td>
    <td align="center" width="25%">Die App ist offline gespeichert und bereit</td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0ffc18ae-0107-4e14-9c0e-4749b6afb971" width="200" /></td>
    <td><img src="https://github.com/user-attachments/assets/7246fb5a-7ef5-4d52-be2e-2b6c74198196" width="200" /></td>
    <td><img src="https://github.com/user-attachments/assets/140d5fe0-ac44-4a77-8162-407d3edb7d2b" width="200" /></td>
    <td><img src="https://github.com/user-attachments/assets/8f2b8254-92cf-4642-8716-955d237bcb22" width="200" /></td>
  </tr>
  <tr>
    <td align="center">1</td>
    <td align="center">2</td>
    <td align="center">3</td>
    <td align="center">4</td>
  </tr>
</table>


## Bedienen

- **Kasse** – Artikel antippen → Warenkorb → **Kassieren** → Bargeld eingeben → **Bestätigen**. **+ Sonstiges** für freie Beträge, optional mit Bezeichnung (z. B. „Tombola").
- **Menü** – In der Bibliothek Artikel anlegen, mit `+` ins heutige Menü übernehmen.
- **Bestand** – Eingekaufte Mengen pro Artikel eintragen, sieht direkt wie viel verkauft wurde und wie viel übrig ist.
- **Abrechnung** – Umsatz und Bestellungen, **Umsatz exportieren**, **Absatz exportieren**, am Ende **Zurücksetzen**.

## Sicherung

Die **angelegten Artikel werden in der Bibliothek gespeichert**. Die Bibliothek kann **auf ein anderes Gerät übertragen** werden.
Dafür im Tab **Menü → Vorlagen** auf **Vorlage exportieren** drücken und auf einem anderen Gerät importieren.

*Mach das ab und zu — die Datei ist auch dein Backup.*

## Wichtig

- ✅ Vor jedem Fest kurz in den Tab **Abrechnung** schauen — sollte leer sein. Falls nicht: erst Umsatz exportieren, dann **Zurücksetzen**.
- ✅ Nach jedem Fest **Umsatz exportieren**, dann **Zurücksetzen**.
- ❌ Nicht das App-Symbol löschen — sonst sind alle Daten weg.
- ❌ Nicht in Safari „Verlauf und Websitedaten löschen" — gleiches Problem.
- ❌ Keine Synchronisation zwischen Geräten. Jedes Gerät hat seine eigene Kasse.

## Updates

Die App wechselt **nie von selbst** auf eine neue Version. Wenn du sie mit Internet öffnest, lädt sie eine neue Version still im Hintergrund herunter — benutzt wird sie aber erst, wenn du es willst:

1. Im Tab **Menü** erscheint oben der Hinweis **Neue Version verfügbar**.
2. Auf **Aktualisieren** tippen und bestätigen.

Artikel, Menü, Bestand und Bestellungen bleiben dabei erhalten. Solange du nicht tippst, läuft die App weiter auf der bisherigen Version — auch offline.

> **Tipp:** Updates nie während oder kurz vor einer Veranstaltung.

*Ausnahme: Wer noch v27 oder älter installiert hat, wird einmalig automatisch auf die neue Version gebracht, weil die alte Version den Knopf noch nicht kennt.*

### Zurück auf eine ältere Version

Falls eine neue Version Probleme macht, kannst du eine bestimmte alte Version installieren. Jede veröffentlichte Version liegt unter einer eigenen URL:

```
fbumann.github.io/vereinskasse/versions/v25/
fbumann.github.io/vereinskasse/versions/v26/
fbumann.github.io/vereinskasse/versions/v27/
```

Vorgehen: App-Symbol löschen → gewünschte Versions-URL in Safari öffnen → **Zum Home-Bildschirm**.

> **Warnung:** Die Kasse speichert ihre Daten (Bibliothek, aktives Menü, Bestand, Tag) in einem Bereich, den sich **alle Versionen teilen**. Eine ältere Version kennt neuere Felder (z. B. Artikel-Farben) nicht und entfernt sie beim Speichern. Beim Rollback also unbedingt **vorher die Vorlage exportieren** — im Ernstfall kannst du die Farben und anderes später manuell wiederherstellen.

## Kontakt

Gemacht für Vereinsfeste. Wenn du sie nutzt, freu ich mich über ein Lebenszeichen.

- ✉ [Schreib mir](mailto:vereinskasse@fxbumann.de?subject=Vereinskasse)
- ☕ [Kaffee spendieren](https://paypal.me/fxbumann) — am besten als „Freunde & Familie" senden, dann ohne Gebühren.

## Für Entwickler

Eine einzige `index.html` plus `sw.js` (Service Worker für Offline und kontrollierte Updates: neue Versionen werden vorab geladen, ausgeliefert wird aber die in der Cache Storage „gepinnte" Version, bis der Nutzer im Menü-Tab aktualisiert). Reines HTML/CSS/JavaScript. Kein Build, keine Abhängigkeiten. `// @ts-check` + JSDoc für Typprüfung im Editor. Daten in `localStorage`. CSV-Export per `Blob`-Download. Sprache: Deutsch, EUR mit `,` als Dezimaltrenner.

Lokale Vorschau: `npx serve -l 3000 . & open http://localhost:3000`

### Version bumpen

Vor dem Merge auf `main` bei nutzersichtbaren Änderungen die Versionsnummer hochzählen. Zwei Stellen müssen synchron sein:

- `index.html`: `const APP_VERSION = 'N'` — wird im Settings-Tab angezeigt und treibt den Release-Workflow.
- `sw.js`: `const VERSION = 'N'` — muss zu `APP_VERSION` passen. Nur wenn sich `sw.js` ändert, erkennt der Browser eine neue Version und bietet sie im Menü-Tab zum Aktualisieren an.

Commit-Message-Konvention: `Bump to vN` (eigener Commit oder Teil eines Feature-Commits — egal, solange beide Werte zusammen geändert werden).

### Release-Workflow

Push auf `main` mit einer neuen `APP_VERSION` triggert `.github/workflows/release.yml`:

1. Tag `vN` wird angelegt, GitHub Release mit Notes aus den Commit-Messages seit dem letzten Tag.
2. `index.html` + `sw.js` werden auf den `gh-pages`-Branch deployed — einmal im Root (latest) und einmal nach `versions/vN/` (Rollback-Ziel).
3. GitHub Pages serviert aus `gh-pages`, nicht aus `main`. `main` bleibt reiner Source-Code, alle veröffentlichten Artefakte leben in `gh-pages`.

Der Workflow läuft bei jedem Push, der `index.html` ändert, überspringt aber Tag/Release/Deploy, wenn `vN` bereits existiert — ein Push ohne Versionsbump ist also harmlos, deployt aber auch nichts Neues.
