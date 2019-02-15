.. _usare_stream_dati:

**Utilizzare stream di dati presenti su Yucca**
***********************************************

**Pagina attuale** `Link <http://developer.smartdatanet.it/getting-started/getting-started-fruizione-in-streaming/>`_

Introduzione alle funzioni di streaming
=======================================

YUCCA consente la fruizione dei dati in essa memorizzati e/o elaborati in varie modalità. I dati in streaming, sono fruibili, principalmente, tramite i protocolli **Stomp over WebSocket(s)** e **MQTT(s)**.

.. image:: Stream_Dati1.png

**MQTT (Message Queuing Telemetry Transport)** è un protocollo di messaggistica leggero, studiato per dispositivi limitati in termini di risorse (cpu, memoria) che operano su reti a bassa largheza di banda e ad alta latenza. Implementa il paradigma publish/subscribe.

**STOMP (Simple Text-Oriented Messaging Protocol)** è un protocollo che definisce il formato dei messaggi che transitano fra client e server. Si appoggia, come layer di trasporto, al protocollo web socket che fornisce canali di comunicazione full-dublex attraverso una singola connessione TCP/IP. Di fatto consente al server di inviare notifiche al client senza la necessità di essere invocato (modalità push).

Come individuare lo stream
==========================

Esistono due modalità di esposizione di uno stream:

- **Stream pubblici**: sono accessibili a tutti i fruitori registrati della piattaforma e possono essere invocati liberamente tramite autenticazione guest. In ogni caso, anche per questi flussi si suggerisce di utilizzare l’autenticazione OAuth2.

- **Stream privati**: sono accessibili solo ai proprietari dello stream (e,ai tenant autorizzati dal proprietario del dato)e, per essere fruiti, richiedono l’autenticazione del client tramite la specifica OAuth2.

Prima di essere fruito, lo stream deve essere individuato. La modalità principale per poter individuare gli stream è lo store.


Individuare lo stream tramite store
===================================

Accedere allo store. Nella schermata che compare inserire i criteri di ricerca desiderati e premere il pulsante di ricerca. 

Alternativamente ckiccare sulla lente (senza inserire nessun criterio di ricerca) e selezionare il **Tipo Stream**. 

Verranno visualizzati tutti gli stream presenti nello Store.

.. image:: Stream_Dati2.png

Fare click sullo stream desiderato per visualizzarne le informazioni di dettaglio che comprenderanno anche le informazioni per l’accesso allo stream:

.. image:: Stream_Dati3.png

Se si vuole accedere allo stream tramite OAuth (opzione suggerita per tutti gli stream e obbligatoria per quelli privati), è necessario **registrare** l’applicazione fruitrice.
E’ possibile fare questo premendo sul pulsante sottoscrivi API, scegliendo una applicazione (o creandone una nuova) e selezionando sottoscrivi:

.. image:: Stream_Dati4.png

Per ottenere le credenziali dell’applicazione e il token utilizzabile è necessario accedere alle proprie sottoscrizioni e generare il token qualora questa sia la prima sottoscrizione per l’applicazione

.. image:: Stream_Dati5.png

il token da utilizzare per l’autenticazione OAuth è presente sotto la voce “Token di accesso”.

**NOTA:** il token mostrato negli screenshot è solo un esempio. È necessario utilizzare quello generato per le proprie applicazioni.

Individuare lo stream da Gestione
=================================

In alternativa all’uso dello store, è possibile individuare gli stream tramite il tab di Gestione. Questa modalità è principalmente indicata in fase di sviluppo e test degli stream in quanto consente allo sviluppatore di avere sott’occhio tutte le informazioni. Per le applicazioni fruitrici, invece, si consiglia fortemente l’utilizzo dello store.

Per prima cosa è necessario accedere allo User Portal come descritto nell’apposito tutorial. Premere, quindi, il pulsante **Gestione** per visualizzare la schermata di gestione degli SmartObject e degli Stream disponibili. L’utente autenticato potrà vedere tutti gli stream di proprietà del suo tenant e tutti gli stream pubblici. L’utente anonimo vedrà quelli relativi al tenant sandbox.

.. image:: Stream_Dati6.png

Facendo Click sul nome dello stream è possibile visualizzare le sue informazioni di dettaglio: 

.. image:: Stream_Dati7.png

Tra le informazioni mostrate, è presente la coda di output del sensore (URL Web Socket) che indica quale topic è necessario sottoscrivere (in MQTT o Web socket) per ricevere gli eventi.

Ad esempio, le coordinate per accedere alla coda dello stream “temperature” via Web Socket sono le seguenti:

- URL: ws://stream.smartdatanet.it/ws

- user: guest

- password: Aekieh6F

- topic:/topic/output.smartlab.550e8400-e29b-41d4-a716-446655440000_temperature

Ulteriori informazioni su quali siano le modalità di integrazione sono disponibili qui.


Ricezione, in streaming, dei dati dei sensori via Stomp/WebSocket
=================================================================

La ricezione dei dati tramite l’utilizzo del protocollo stomp over web socket è indicata per i client basati su javascript come le Rich Internet Application, le Rich Mobile Application e le applicazioni mobile ibride. Nelle demo realizzate, l’utilizzo di stomp è mediato dalla libreria ufficiale. È possibile, comunque, a discrezione del fruitore, utilizzare anche librerie di altri produttori che implementano il protocollo. SDP non fornisce nessun supporto su come utilizzare le librerie stomp all’interno delle applicazioni per il quale si rimanda ai siti dei produttori delle stesse.

Per utilizzare il protocollo stomp è necessario importare la relativa libreria tramite il comando:

*<script src="js/stomp.js"></script>*

quindi si deve istanziare il client con il comando:

*client = Stomp.client(urlServer);*

dove urlServer è l’url descritta nel paragrafo precedente. Si deve quindi aprire la connessione con il comando:

*client.connect("user" , "password" , connectCallBack, errorCallback);*

dove:

- “**user**” e “**password**” sono le credenziali di accesso. Nel caso di accesso guest le credenziali sono: 

    - user: guest;

    - password: Aekieh6F

Nel caso di accesso tramite Oauth2 le credenziali sono:

- user: “Bearer: Token” dove Token è il token Oauth recuperato dallo store.

- Password: lasciare vuota.

- connectCallBack è la function javascript che gestisce l’avvenuta connessione.

- errorCallback è la function javascript che gestisce gli eventuali errori di connessione.

Se la connessione è andata a buon fine si deve eseguire la sottoscrizione alla coda di ricezione con il comando:

*client.subscribe(topics, messageCallback);*


dove **messageCallback** è la function javascript che deve gestire ed elaborare i messaggi ricevuti dalla piattaforma. Questa function viene invocata da javascript ogni volta che viene ricevuto un messaggio dalla piattaforma.
Un client javascript base, in grado di ricevere messaggi dalla piattaforma tramite stomp/ws, è rappresentato dal seguente codice che deve essere, ovviamente, integrato con le relative funzioni di gestione.

.. image:: Stream_Dati8.png

Nel caso di autenticazione tramite OAuth, bisogna modificare la connessione nel seguente modo:

*client.connect("Bearer: token" , "" , connectCallBack, errorCallback);*

dove token è il token OAuth recuperato dallo store e la password è impostata a null. 

Con il token ottenuto nel nostro esempio:

*client.connect("Bearer mqlNmYuAtlr7QvVEc1edBTJEdHMa" , "" , connectCallBack, errorCallback);*

Ricezione, in streaming, dei dati dei sensori tramite MQTT
==========================================================

Per poter utilizzare la connessione MQTT è necessario utilizzare una libreria **client**. Negli esempi si è utilizzata la libreria **Paho** del progetto Eclipse ma su web esistono librerie alternative. 

In ogni caso la scelta della libreria è a carico di chi sviluppa le applicazioni; SDP non fornisce nessun supporto sul funzionamento di tali librerie e sulla loro modalità di utilizzo per il quale si rimanda al produttore delle stesse.

Utilizzando Paho per Java, per poter ricevere i messaggi da una coda è necessario istanziare il client MQTT

*client = new MqttClient(broker, "appid")*;

dove **broker** è l’URL di connessione fornita sullo user portal o sullo store. Quindi impostare user e password e aprire la connessione con i comandi:

*MqttConnectOptions connOpts = new MqttConnectOptions();*

*connOpts.setUserName(user);*

*connOpts.setPassword(password.toCharArray());*

*client.connect(connOpts);*

attivare le procedura di callback per ricevere i messaggi e sottoscrivere la coda con i comandi:

*client.setCallback(this);*

*client.subscribe(coda, qos);*

dove **coda** è la topic indicata sullo user portal o sullo store e **qos** è un numero che indica il livello di servizio di MQTT per la descrizione del quale si rimanda alla documentazione ufficiale del protocollo.

E' necessario impostare le tre seguenti callbak function:

- **connectionLost**: gestisce la perdita di connessione e gli errori di connessione

- **deliveryComplete**: gestisce il completamento del delivery del messaggio

- **messageArrived**: gestisce i messaggi in arrivo. 

Per sottoscrivere la coda di ricezione dello stream temperature utilizzato in questo tutorial, è possibile usere un codice simile al seguente:

.. image:: Stream_Dati9.png

Nel caso di utilizzo dell’autenticazione OAuth è necessario modificare le credenziali come segue:

*String user           = "Bearer mqlNmYuAtlr7QvVEc1edBTJEdHMa";*

*String password       = "";*
 
**NOTA:** Il codice precedente è fornito solo a titolo esemplificativo. La sintassi dello stesso è fortemente dipendente dalla libreria scelta, dalla sua versione e dal linguaggio di programmazione utilizzato per cui dovrà essere adattato alle proprie necessità.






