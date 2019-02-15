.. _stream_twitter:

**Creare uno stream di dati da Twitter**
****************************************

(ex SPECIFICHE PER LA CREAZIONE DI STREAM DI TIPO TWEED FEED  - DOC) 

**Pagina Attuale** `Link <http://developer.smartdatanet.it/docs/specifiche-per-la-creazione-di-stream-di-tipo-tweed-feed/>`_
 
A partire dalla versione 1.3.0, la piattaforma consente di definire smartobject di tipo tweet feed ed i relativi streams.
Tali oggetti permettono di definire delle ricerche da eseguire sul social network Twitter e di utilizzarne i risultati come uno stream in input alla piattaforma.

Per poter utilizzare queste funzionalità è necessario essere in possesso di un account twitter che verrà associato allo smartobject di tipo tweet feed. Una utenza twitter può essere utilizzata per un solo smartobject e deve essere unica a livello di piattaforma.

Gli stream  associati a smart object  di tipo tweet feed definiscono le ricerche da effettuare e utilizzeranno tale utenza  per l’accesso al social network.
 
**Definizione dello smart object**
==================================
 
Nel primo step della registrazione, dopo aver selezionato il tipo “feed tweet”, compare il bottone “Accedi a Twitter.
E’ necessario premere tale bottone e, accedendo al proprio account Twitter, autorizzare l’applicazione  Smart Data Platform.

Tra i campi di questa tipologia di smart object è presente anche il numero massimo di stream (e quindi di ricerche twitter) che potranno essere definiti per quello smart object ( e quindi per quell’utenza).

.. image:: img/Stream_Twitter1.png

Le policy di accesso di Twitter prevedono un numero massimo di interrogazioni per ogni utente (180 interrogazioni in 15 minuti).

Nella piattaforma, tale limite massimo viene suddiviso equamente tra gli stream configurati per un certo smart object ; ad esempio se per uno smart object vengono definiti tre stream, la frequenza delle ricerche definite da ogni stream sarà di 60 interrogazioni ogni 15 minuti ciascuna
 
In fase di modifca dello smart object è possibile modificare Nome, Descrizione e l’utenza twitter utilizzata

**Definizione dello Stream**
============================

Nella definzione di uno stream associato ad uno smart object di tipo feed tweet, le impostazioni specifiche per questa tipologia sono nello step 4 del wizard.

.. image:: img/Stream_Twitter2.png

La query di ricerca definisce la ricerca che viene eseguita su twitter (ed esempio #iphone)

Lingua à se impostata, ricerca solo i tweet scritti nella lingua selezionata.

Ricerca Geolocalizzata à si definisce  un ulteriore filtro di ricerca in base ad una determinata posizione geografica (coordinate lon/lat, raggio di ricerca e unità di misura in cui è espresso il raggio – km o miglia)

**NOTA** - Viene riportato l’intervallo di polling (in secondi) ossia la frequenza con la quale lo stream interroga le api twitter. Tale frequenza dipende dal numero di stream associati allo stesso smart object

