# Case Study Solarimo – Hosting-Notizen

Statische Seite, kein Build nötig. Den ganzen Ordner `Case_Study_Solarimo/` auf den Server laden
(z. B. als `/solarimo/`). Einstiegspunkt: `index.html`.

- `assets/img/` – web-optimierte JPG/PNG (Quelle: Originaldateien in SOL_files)
- `assets/video/` – zwei MP4-Loops
- `assets/css/style.css`, `assets/js/main.js` – nach Änderungen die `?v=`-Nummer in `index.html` erhöhen

Offene Punkte vor dem Livegang
- Link „Zurück zum Portfolio“ im Footer zeigt auf `../` – an die eigene Struktur anpassen.
- Schrift IBM Plex Sans ist selbst gehostet (`assets/fonts/`, SIL Open Font License, Lizenz liegt bei). Keine Anfragen an Google.
- Englische Version: `index.html` nach `en/index.html` kopieren, Texte übersetzen, Pfade auf `../assets/` ändern, `lang="en"`.
