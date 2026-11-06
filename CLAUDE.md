# CLAUDE.md — Snake Gems (gioco web + app Android)

Questo file racconta il progetto e a che punto siamo, così si può riprendere il lavoro senza rileggere le chat. Rispondi sempre in italiano, in modo diretto e concreto.

Stato verificato sul repository il 6/11/2026 (ultimo commit del 3/11/2026: "Privacy e scheda dello Store").

---

## 1. Chi e come lavora

- **Salvatore** (account GitHub `salvatoreali75-gif`) crea app e siti "utili e divertenti". Lavora quasi solo da **telefono Android**, quindi:
  - istruzioni brevi, passo-passo, senza dare per scontato che abbia un computer;
  - ogni modifica deve funzionare bene su schermo piccolo e touch.
- Ti vuole come sviluppatore esperto con "team" (grafica, front end, back end): decidi tu i dettagli tecnici e spiegali in italiano semplice. Niente lavoro inutile, ma con cura e creatività.
- **Regola d'oro:** le prove nuove si fanno **prima in locale, su un branch o in anteprima privata**; Salvatore le valuta; **solo dopo il suo ok** si fa il merge su `main`, perché ogni push su `main` aggiorna subito il gioco online.
- Dopo ogni pubblicazione ricordagli che l'app installata si aggiorna alla riapertura (compare l'avviso "Nuova versione disponibile").

## 2. Vincoli da rispettare sempre

- **Niente proprietà intellettuale altrui:** niente Spider-Man, Pac-Man o altri marchi/personaggi esistenti (nomi, loghi, costumi, sagome riconoscibili). Ogni tema va fatto con **personaggi, nomi e grafica originali**.
- **Nessun dato personale** in classifica o nel repository: solo nickname e punteggio. Non chiedere né salvare password o chiavi di servizio. Mai committare keystore (`*.keystore`, `*.jks`), `google-services.json` o chiavi di firma: sono già in `.gitignore`, mantienile fuori.
- Snake e l'app aziendale **Appalti** (repo e Firebase separati, dati sensibili) non vanno mai mescolati. Non toccare Appalti da qui.
- Il repository è **pubblico**: tutto ciò che è nei file lo vede chiunque. La `apiKey` Firebase del client è pubblica per natura; la sicurezza sta nelle regole Firestore (`firestore.rules`).
- Il gioco ha pubblico **13+**: non attivare modalità per bambini/famiglie (con la pubblicità servirebbero regole speciali).

## 3. Repository e pubblicazione

- Repo: `salvatoreali75-gif/Snake`, branch `main`, cartella root.
- **Web (PWA):** GitHub Pages, `https://salvatoreali75-gif.github.io/Snake` (ogni push su `main` va online in 1–2 minuti; limiti indicativi: ~10 pubblicazioni/ora, 1 GB di sito).
- **Android:** stesso `index.html` impacchettato con **Capacitor** (app id `io.github.salvatoreali75.snakegems`, nome "Snake Gems"). Lo build è su GitHub Actions: Actions → "App Android" → Run workflow → scarica l'APK di prova da *Artifacts*. Il workflow è solo manuale (`workflow_dispatch`).
- Android e iPhone da browser: Chrome → Installa app; iPhone solo Safari → Condividi → Aggiungi alla schermata Home.

| File / cartella | Ruolo |
|---|---|
| `index.html` | **Tutto il gioco in un file** (~2500 righe): HTML + CSS + JavaScript classico (`var`, nessun bundler). Lingua scelta dal telefono (`LANG`, funzione `T(it, en)`) |
| `privacy.html` | Informativa privacy IT/EN (serve alla scheda dello Store) |
| `sw.js` | Service worker. **Una sola costante da cambiare a ogni rilascio: `VERSION`** (ora `"10"`, cache `snake-v10`). Fa comparire l'avviso "Nuova versione" |
| `manifest.webmanifest` | App installabile (nome "Snake Gems", fullscreen, portrait, tema `#0E151C`) |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | Icone |
| `firestore.rules` | Regole della classifica, **da incollare a mano nella console Firebase** (Firestore → Regole → Pubblica) |
| `package.json`, `capacitor.config.json`, `android/` | Progetto Android (Capacitor 8 + plugin AdMob e App) |
| `tools/build-web.mjs` | Copia i file web in `www/` per Capacitor (`npm run sync`) |
| `.github/workflows/android.yml` | Build APK di prova |
| `store/` | Scheda per Google Play (`SCHEDA.md`) + icona 512, immagine 1024×500 e 5 screenshot per lingua (`it/`, `en/`) |
| `Snake-app-semplice.zip` | Vecchia versione iniziale, **obsoleta, da rimuovere** (chiedere prima a Salvatore) |

- Se aggiungi file al gioco, aggiungili anche all'elenco `FILES` di `tools/build-web.mjs` e a `CORE` in `sw.js`, altrimenti mancano nell'APK o offline.
- Ad ogni rilascio: aumenta `VERSION` in `sw.js`; per l'Android aumenta anche `versionCode` e `versionName` in `android/app/build.gradle` (ora 1 / "1.0").

## 4. Funzioni del gioco (stato attuale)

- **Griglia a tutto schermo:** 20 colonne, righe in base all'altezza (16–40), canvas 2D, movimento fluido con svolte morbide, suoni WebAudio (nessun file audio), musica generata a codice (volume basso/medio/alto).
- **Comandi:** tocco sulla zona dello schermo verso cui andare, oppure swipe; pad a 4 zone facoltativo; pausa fuori dalla griglia. Sull'app Android il tasto Indietro è gestito (`window.__snakeBack()`, altrimenti minimizza).
- **4 modalità** (ognuna col suo record): Classica (livelli ogni 5 cibi, ostacoli, mostri dal livello 5), A tempo (90 s, ogni mela +2 s), Turbo (velocità crescente), Senza muri.
- **Cibi speciali:** stella viola (+50 e "Potere" 5 s, i mostri si mangiano, +100), ghiaccio (rallenta 5 s), taglio rosa (accorcia di 3).
- **30 skin:** 13 da sbloccare con obiettivi + 17 da comprare con le gemme (80 → 1500; alcune animate: Galassia, Drago, Diamante).
- **Gemme 💎:** benvenuto 50, missione giornaliera 25, settimanale 80, accesso giornaliero `10 + 5×min(serie, 6)`. Le gemme extra arrivano anche dal video con ricompensa (vedi pubblicità).
- **Missioni:** 3 giornaliere + 3 settimanali con generatore con seed della data (uguali su tutti i telefoni); **serie di giorni** (3 e 7 giorni sbloccano skin).
- **Notifiche interattive** in-app (non push vere), **nickname** al primo accesso (anche per chi aveva già giocato).
- **Effetti visivi** (aggiunti il 3/11): onde, lampi, scia della testa, esplosione a fine partita; qualità adattiva (`fxLevel` scende se il frame è lento).
- **Salvataggio esportabile:** scheda "Salvataggio" → esporta in file o codice da copiare, importa da file o incolla (per cambiare telefono).
- **Privacy / Store:** pulsante "Elimina i miei dati" (cancella punteggi online, account anonimo e dati del telefono), **filtro e segnalazione dei nickname** (collezione `reports`, leggibile solo dal titolare nella console).

### Dati salvati sul telefono (localStorage, prefisso `snake.`)

`mute`, `pad`, `music`, `mvol`, `skin`, `name`, `nickok`, `stats`, `bests`, `mode`, `wallet`, `daily`, `weekly`, `local.<modalità>`, `deleted`, `delpending`. I formati devono restare **retrocompatibili** (c'è già la migrazione di `snake.best`/`snake.wrap`). Gli accessi a localStorage sono sempre in try/catch (`lsGet/lsSet/lsJson`).

### Classifica online (Firebase, progetto `snake-classifica-24dd5`)

- Auth **anonima** + Firestore, caricati da gstatic (v10.12.2) solo quando servono (`fbReady()`).
- Documenti: `modes/<classic|timed|turbo|open>/scores/<uid>` con soli campi `name, score, level, at`; nome 3–14 caratteri, punteggio 1–20000, livello 1–99, `at == request.time`. Lettura per tutti, scrittura solo del proprio documento, cancellazione solo del proprio. `reports/{id}`: solo creazione.
- **Claude non ha accesso alla console Firebase.** Se cambi `firestore.rules`, dì a Salvatore di incollarle e pubblicarle, altrimenti il gioco online non le userà.
- Un gioco web non si può proteggere del tutto dai punteggi truccati: non promettere il contrario.

### Pubblicità (solo nell'app Android, mai sul sito)

- AdMob via Capacitor (`ADS` in `index.html`): intersiziale ogni 3 partite con almeno 120 s di pausa; **video facoltativo con ricompensa = 20 gemme, max 5 al giorno**. Consenso utenti con il modulo UMP di Google (`requestConsentInfo`/`showConsentForm`), pulsante per riaprire le opzioni privacy.
- ⚠️ **Gli ID AdMob oggi sono quelli di PROVA di Google** (in `index.html` e in `android/app/src/main/res/values/strings.xml`). Prima della pubblicazione vanno sostituiti con quelli reali dell'account AdMob di Salvatore. Sono identificativi, non segreti, ma ricordagli di crearli e non inventarli.

## 5. Google Play: a che punto siamo

Fatto (3/11): app Android Capacitor, build su GitHub Actions, gioco in italiano e inglese, privacy, eliminazione dati, segnalazione nickname, icona maskable, scheda Store (testi IT/EN, risposte ai moduli Play Console: categoria Giochi → Arcade, contiene annunci sì, 13+, Data safety con ID Firebase anonimo, nickname/punteggi e ID pubblicitario AdMob).

Da fare / da verificare con Salvatore:
1. Account sviluppatore Google Play (costo una tantum, circa 22 €) e **verifica delle regole attuali per gli account nuovi** (test chiuso con tester per un periodo minimo prima della produzione: controllare i numeri aggiornati, non fidarsi di quelli ricordati).
2. ID AdMob reali (vedi sopra) e firma dell'app: creare la keystore **fuori dal repository**, build `release` firmata (AAB) e aumento di `versionCode`.
3. Email di contatto e URL privacy nella Play Console (`https://salvatoreali75-gif.github.io/Snake/privacy.html`); la pagina privacy va riletta e confermata da lui prima della pubblicazione.
4. Pubblicare le nuove `firestore.rules` nella console Firebase.
5. iPhone: fuori portata per ora (account Apple a pagamento e app incapsulata, spesso rifiutata): resta la PWA da Safari.

## 6. Direzione e idee in sospeso

- Obiettivo di Salvatore: un gioco "da Play Store" (gemme da spendere sulle skin, notifiche interattive, classifica con nickname): in gran parte fatto.
- **Rebrand a tema supereroe** ("Il tuo amichevole snake di quartiere"): era un desiderio di fine ottobre, **non applicato**; oggi il nome pubblico è **Snake Gems**. Chiedi a Salvatore se l'idea è ancora valida prima di fare qualsiasi cosa; se sì, usa personaggi e nome **originali** (vedi vincoli) e verifica che il nome non sia già usato sullo Store.
- **3D:** la prova 2.5D non lo ha convinto ("Mmm non mi convince"), quindi il gioco resta 2D. Un eventuale 3D deve essere un salto netto di qualità, in anteprima privata, non una variante di quella prova. La prova non è nel repository e non va pubblicata.
- Idee non fatte: nuove modalità o eventi a tempo, classifica settimanale, temi del campo, skin a tema.

## 7. Altri progetti collegati (non da toccare qui)

- **Gnam:** nuovo gioco a labirinto, minimal, 2D, swipe, **originale** (non un clone di Pac-Man). Per ora solo in locale/anteprima privata, in attesa di feedback.
- **Neon Asphalt** (repo `Corse`): gioco di corse in Three.js, in anteprima privata. **Appalti**: gestionale aziendale con login e dati sensibili.

## 8. Come lavorare in questo repo

- Sito statico, JavaScript classico in un solo `index.html`. **Nessun framework, nessun bundler** per il gioco (Node serve solo per Capacitor).
- Punti chiave da cercare nel codice: `MODES`, `SKINS`, `MIS`/`MIS_W`, `wallet`, `notify`, `loginCheck`, `FIREBASE_CONFIG`, `submitScore`, `sendReport`, `ADS`, `NATIVE`, `T(`, `computeGrid`/`layout`/`resize`.
- Ogni testo visibile deve avere **italiano e inglese** (`T('italiano', 'English')`).
- Verifica su viewport da telefono (circa 390×844, portrait), tema chiaro e scuro, touch/swipe, console senza errori e funzionamento offline dopo il primo caricamento. Prova anche con lingua del telefono inglese.
- Anteprima: `python3 -m http.server` in locale oppure un branch; la pubblicità non compare nel browser.
- Commit in italiano, descrittivi (es. *"Snake Gems v11: …"*), su branch per le prove.
