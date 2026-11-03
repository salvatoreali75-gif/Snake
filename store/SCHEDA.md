# Snake Gems: scheda per il Google Play Store

Materiale pronto da copiare nella Play Console. Le immagini sono in questa cartella.

| File | Uso nella Play Console |
|---|---|
| `icona-512.png` | Icona dell'app (512×512) |
| `it/feature-1024x500.png`, `en/feature-1024x500.png` | Immagine in evidenza (1024×500) |
| `it/1-gioco.png` … `it/5-classifica.png` | Screenshot telefono, italiano (1080×1920) |
| `en/1-gioco.png` … `en/5-classifica.png` | Screenshot telefono, inglese (1080×1920) |

---

## Italiano (it-IT)

**Nome dell'app** (max 30): `Snake Gems`

**Descrizione breve** (max 80):
`Snake moderno: gemme, 30 skin, missioni ogni giorno e sfide in classifica.`

**Descrizione completa:**

```
Snake Gems è lo snake che conosci, rifatto da zero per il telefono: comandi precisi, effetti curati e tanti motivi per tornare a giocare.

🐍 QUATTRO MODALITÀ
• Classica: livelli sempre più veloci, ostacoli e mostri che ti danno la caccia
• A tempo: 90 secondi, ogni mela ti regala 2 secondi in più
• Turbo: niente ostacoli, la velocità cresce a ogni mela
• Senza muri: esci da un lato e rientri dall'altro

⭐ BONUS E MOSTRI
Prendi la stella viola per avere il Potere: per qualche secondo sono i mostri a scappare da te. Rallenta il tempo o accorcia la coda quando serve.

💎 GEMME E 30 SKIN
Guadagni gemme giocando, completando le missioni e tornando ogni giorno. Spendile nel negozio per sbloccare skin animate come Galassia, Drago e Diamante.

🎯 MISSIONI OGNI GIORNO
Tre missioni giornaliere e tre settimanali, sempre diverse. Gioca più giorni di fila per allungare la serie e sbloccare skin speciali.

🏆 CLASSIFICA ONLINE
Scegli un nickname e sfida gli altri giocatori in ogni modalità. Se preferisci, giochi anche senza classifica.

✨ FATTO CON CURA
• Tocca dove vuoi andare o scorri il dito: decidi tu
• Effetti visivi e musica, regolabili
• Funziona anche offline
• Esporta il salvataggio per portarlo su un altro telefono
• In italiano e in inglese

Gratis, con pubblicità. Puoi guardare un video facoltativo per ottenere gemme extra.
```

---

## English (en-US)

**App name** (max 30): `Snake Gems`

**Short description** (max 80):
`Classic snake reimagined: gems, 30 skins, daily missions and leaderboards.`

**Full description:**

```
Snake Gems is the snake you know, rebuilt from scratch for your phone: precise controls, polished effects and plenty of reasons to come back.

🐍 FOUR MODES
• Classic: faster and faster levels, obstacles and monsters that hunt you
• Timed: 90 seconds, every apple gives you 2 more
• Turbo: no obstacles, speed goes up with every apple
• No walls: leave on one side, come back on the other

⭐ BONUSES AND MONSTERS
Grab the purple star to get Power: for a few seconds the monsters run from you. Slow time down or shorten your tail when you need to.

💎 GEMS AND 30 SKINS
Earn gems by playing, completing missions and coming back every day. Spend them in the shop to unlock animated skins like Galaxy, Dragon and Diamond.

🎯 DAILY MISSIONS
Three daily and three weekly missions, always different. Play several days in a row to grow your streak and unlock special skins.

🏆 ONLINE LEADERBOARD
Pick a nickname and challenge other players in every mode. You can also play without the leaderboard.

✨ MADE WITH CARE
• Tap where you want to go or swipe: your choice
• Visual effects and music you can adjust
• Works offline
• Export your save to move it to another phone
• In English and Italian

Free, with ads. You can watch an optional video to earn extra gems.
```

---

## Risposte per i moduli della Play Console

**Categoria:** Giochi → Arcade. **Tag:** Arcade, Casual, Snake, Offline.

**Contiene annunci:** Sì (AdMob).

**Pubblico di destinazione:** 13 anni e oltre. Non selezionare fasce sotto i 13 anni: con la pubblicità servirebbero le regole speciali per le famiglie.

**Questionario di classificazione dei contenuti (IARC):**
- Violenza: no. Ci sono "mostri" in stile cartone, che si mangiano senza sangue né violenza realistica.
- Gli utenti interagiscono o condividono informazioni: **sì**, il nickname è visibile in classifica.
- Contenuti generati dagli utenti: solo il nickname, con filtro e pulsante di segnalazione.
- Acquisti digitali: no.

**Sicurezza dei dati (Data safety):**
- **Dati raccolti:**
  - Identificatori utente (ID anonimo di Firebase): funzionalità dell'app.
  - Altri contenuti generati dagli utenti (nickname e punteggi): funzionalità dell'app.
  - ID dispositivo/pubblicità (AdMob): pubblicità e analisi.
- **Dati condivisi con terze parti:** ID pubblicità con Google AdMob.
- **Dati crittografati in transito:** sì.
- **Cancellazione dei dati:** sì. Nell'app con *Salvataggio → Elimina i miei dati*; sul web con l'indirizzo della pagina privacy (sezione «Cancellare i tuoi dati»).

**Email di contatto:** `soterkosmos@gmail.com`

**Informativa privacy (URL):** la pagina `privacy.html` pubblicata con il gioco, per esempio `https://salvatoreali75-gif.github.io/Snake/privacy.html` se GitHub Pages è attivo su Snake. Va controllato.

---

## Da fare prima di pubblicare

1. **Email di contatto:** `soterkosmos@gmail.com`, già inserita in `privacy.html`. Usala anche come email dello sviluppatore nella Play Console.
2. **AdMob:** crea l'app nel tuo account AdMob e due unità pubblicitarie (Interstitial e Rewarded). Poi sostituisci gli ID di prova:
   - in `android/app/src/main/res/values/strings.xml` → `admob_app_id`;
   - in `index.html` → `ADS.inter` e `ADS.reward`.
3. **Account sviluppatore Google Play:** 25 € una volta, con verifica dell'identità.
4. **Test chiuso:** con un account personale nuovo servono almeno 12 tester per 14 giorni prima della pubblicazione aperta.
5. **Firma dell'app:** usa la firma gestita da Google Play (Play App Signing) e una chiave di caricamento tua, da conservare con cura.
6. **Regole Firebase:** incolla `firestore.rules` nella console di Firebase (progetto della classifica di Snake) e pubblicale.
