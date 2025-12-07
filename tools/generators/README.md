# Nx Generator für Advent of Code

## Übersicht

Dieser Nx Generator erstellt automatisch die erforderlichen Dateien für einen Advent of Code Tag.

## Verwendung

### Kommandozeile

```bash
npm run generate -- --year=<JAHR> --day=<TAG>
```

Beispiel:
```bash
npm run generate -- --year=2025 --day=8
```

### Interaktiv

Wenn du die Parameter nicht angibst, wirst du interaktiv nach Jahr und Tag gefragt:

```bash
npm run generate
```

## Was wird erstellt?

Der Generator erstellt folgende Dateien im Verzeichnis `<Jahr>/day<Tag>/`:

- `day-<Tag>-1.js` - JavaScript-Datei für Teil 1 der Aufgabe
- `day-<Tag>-2.js` - JavaScript-Datei für Teil 2 der Aufgabe
- `input.txt` - Datei für deine Puzzle-Eingabe
- `example.txt` - Datei für das Beispiel aus der Aufgabenbeschreibung

## Beispiele

```bash
# Erstellt Dateien für 2025, Tag 1
npm run generate -- --year=2025 --day=1

# Erstellt Dateien für 2024, Tag 25
npm run generate -- --year=2024 --day=25

# Mit Dry-Run (zeigt an, was erstellt würde, ohne Dateien zu erstellen)
npm run generate -- --year=2025 --day=8 --dry-run
```

## Template

Die JavaScript-Dateien werden mit einem Basis-Template erstellt, das:
- Das `readInput` Helper-Modul importiert
- Die `input.txt` Datei einliest
- Die Eingabe in Zeilen aufteilt
- Leere Zeilen filtert

Du kannst das Template in `tools/generators/aoc-day/files/day-template.js` anpassen.

