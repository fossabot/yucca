.. _oauth2:

**Utilizzare lo store ed i token Oauth2**
*****************************************

(ex Utilizzo dello store e dei token Oauth 2  - DOC) 

**Pagina Attuale** `Link <http://developer.smartdatanet.it/docs/utilizzo-dello-store-e-dei-token-oauth-2/>`_

**Cos’è Oauth**

**Open Authorization** o più comunemente **OAuth**, è un protocollo di comunicazione open mediante il quale un’applicazione (o un servizio web) può gestire in modo sicuro l’accesso autorizzato a risorse protette. 

Il protocollo è compatibile con qualsiasi tipologia di applicazione: desktop, web e mobile. Il protocollo OAuth è stato ideato da Blaine Cook nel 2006, mentre lavorava all’implementazione Twitter di OpenID, proponendosi come alternativa aperta ai molti protocolli proprietari già esistenti, come Google AuthSub, AOL OpenAuth, Yahoo BBAuth, Flickr API e tanti altri. Dalla versione 1.0 (pubblicata nel 2007).

OAuth, ha subìto diverse revisioni, fino all’attuale versione 2.0 che riscrive, quasi completamente, il funzionamento del protocollo perdendo la retrocompatibilità con le versioni precedenti. YUCCA supporta OAuth 2.0.
 
**Ruoli e attori di oAuth: nomenclatura ufficiale**

OAuth 2.0 prevede i seguenti ruoli:

•	Resource Owner è il proprietario (o chi ne fa le veci) della risorsa da proteggere. Con il termine risorsa si intende il servizio oData per l’accesso ai daiti, lo stream, etc. In YUCCA è rappresentato dall’utente che pubblica i suoi dati e i suoi servizi sullo store.
•	Resource Server: è il server che espone la risorsa protetta. Riceve le richieste da un client che si identifica tramite la presentazione di un access_token e fornisce la risposta richiesta. In YUCCA è rappresentato dai server che espongono gli stream e i servizi oData.
•	Client: è l’applicazione fruitrice della risorsa. Le applicazioni possono essere di qualsiasi tipo: web, client/server, mobile, desktop,… In YUCCA, i client sono rappresentati dalle applicazioni, censite sullo store, che si sottoscrivono ad un determinato servizio, stream,…
•	Authorization Server): è il server che, a fronte di una grant da parte del RO, fornisce al client i token di accesso alla risorsa. In YUCCA è rappresentato dall’API Manager che espone gli stream e i servizi.

**Modalità di concessione della grant**
=======================================

OAuth 2.0 prevede diversi pattern di funzionamento che si differenziano per la modalità di concessione della grant al client e per la complessità del processo autorizzazione. In ognuno di essi partecipano tutti gli attori precedenti ma con modalità differenti. I pattern principali sono:

•	Authorization Code Grant (quella più complessa e meno utilizzata)
•	Implicit Grant
•	Resource Owner Password Credential Grant
•	Client Credential Grant

Per una descrizione completa dei singoli pattern si suggerisce di leggere la `RFC 6749 <https://tools.ietf.org/html/rfc6749>`_ all’interno della quale viene descritto il funzionamento di OAuth 2.0.

YUCCA, **al pari** degli strumenti social e cloud più diffusi, utilizza il pattern **Client Credential Grant**.

Nel pattern Client Credential, l’applicazione client richiede il token autenticandosi con le proprie credenziali OAuth. La grant viene concessa in quanto solo le applicazioni registrate sono dotate di credenziali di accesso. In YUCCA il token può essere richiesto in due modalità differenti:

•	Tramite richiesta manuale sullo store;
•	Tramite invocazione di un servizio esposto dall’API manager.

A seconda della modalità scelta, il ciclo di vita del token cambia. I due token sono differenti, in quanto generati con meccanismi differenti, ma sono completamente intercambiabili.

Le istruzioni seguenti richiedono l’accesso allo store e allo user portal. Per sapere come connetterti vedi questo tutorial.

**Gestione del token tramite store**
------------------------------------

Il ciclo di vita è il seguente:

.. image:: img/OAuth1.png

1.	il responsabile dei datataset o degli stream pubblici, provvede al loro censimento e alla loro creazione tramite lo user portal. Questa operazione genera, implicitamente, la registrazione degli stessi sullo store (passo 1a). Per un dettaglio di come censire i sensori e i flussi vedi questo tutorial 
2.	il responsabile dell’applicazione client registra la stessa sullo store.
3.	tramite le funzioni dello store, il responsabile dell’applicazione ricerca lo stream o il servizio oData  a cui vuole accedere e si sottoscrive ad esso.
4.	tramite le funzioni dello store, il responsabile delle applicazioni genera il token che viene passato **manualmente**  (4a) all’applicazione fruitrice. Con questa operazione vengono generate anche le **chiavi OAuth**: il **customer_id** e il **customer_secret**. In questo caso d’uso non servono a meno che non si voglia rigenerare il token tramite servizi.
5.	l’applicazione **accede** allo stream o al servizio oData **facendosi autorizzare con il token** ottenuto nel passo precedente.

Il token generato dallo store ha una validità, di default, di 30758099 secondi (356 giorni) ma la sua durata è impostabile tramite l’apposito pannello di controllo.

Per generare le chiavi, premere il pulsante generate. Verrà pure generato il token Oauth.

.. image:: img/OAuth2.png

Alla sua scadenza il token può essere **rigenerato** premendo il pulsante **re-generate** nella schermata di gestione delle sottoscrizioni.

.. image:: img/OAuth4.png

Se il token non viene rigenerato verrò negato l’accesso ai servizi e agli stream.

**Gestione del token tramite servizi**
--------------------------------------

Il ciclo di vita è il seguente:

.. image:: img/OAuth5.png

1.	il responsabile dei datataset o degli stream pubblici, provvede al loro censimento e alla loro creazione tramite lo user portal. Questa operazione genera, implicitamente, la registrazione degli stessi sullo store (passo 1a). Per un dettaglio di come censire i sensori e i flussi vedi questo tutorial
2.	il responsabile dell’applicazione client registra la stessa sullo store.
3.	tramite le funzioni dello store, il responsabile dell’applicazione ricerca lo stream o il servizio oData  a cui vuole accedere e si sottoscrive ad esso.
4.	tramite le funzioni dello store, il responsabile delle applicazioni genera le **chiavi OAuth**: il **customer_id** e il **customer_secret**.  Questo passo è obbligatorio per ottenere le chiavi che sono necessarie per l’invocazione dei servizi. Viene pure generato un token ma può essere ignorato in quanto, in questo caso d’uso, lo si vuole generare applicativamente.
5.	l’applicazione fruitrice invoca i servizi per la generazione del token e si autentica con il customer_id e il customer_secret.
6.	l’applicazione **accede** allo stream o al servizio oData **facendosi autorizzare con il token** ottenuto nel passo precedente.

Il token generato ha una validità, non modificabile, di 30758099 secondi (356 giorni). Alla sua scadenza deve essere rigenerato invocando nuovamente il servizi per la creazione del token altrimenti non si potrà più accedere alle risorse protette.

**Come invocare i servizi per la generazione del token**
--------------------------------------------------------

Il richiamo di questo servizio deve avvenire in modalità http/POST con protocollo HTTPS.
L’end point del servizio è: https://api.smartdatanet.it/api/token

È necessario passare i seguenti parametri, in modalità, HTTPFORM. Tutti i parametri sono **obbligatori**:

•	**grant_type**: indica il tipo di grant che si vuole utilizzare. Deve essere impostato a **client_credential**;
•	**client_id**: è l’identificativo univoco (pubblico) del client. Nella piattaforma prende il nome di **customer_id** ma nell’invocazione del servizio bisogna utilizzare il nome originale della specifica Oauth.
•	**client_secret**: è l’identificativo segreto del client; Nella piattaforma prende il nome di **customer_secret** ma nell’invocazione del servizio bisogna utilizzare il nome originale della specifica Oauth.
•	**scope**: è obbligatorio impostarlo come **PRODUCTION**.

.. image:: img/OAuth6.png

In risposta si ottiene, all’interno del body http, una stringa JSON contenente:

•	la tipologia di token (YUCCA usa il token in formato bearer).
•	la validità del token in secondi (un anno solare).
•	l’access_token che il client deve passare durante l’invocazione del servizio;
•	la restituzione di un valore scope che è impostato a default e può essere ignorato.

Questa procedura deve essere utilizzata ogni volta che si vuole generare un nuovo token per una data applicazione (compresa la sua rigenerazione dopo la scadenza).

Esistono, per tutti i principali linguaggi di programmazione, numerose librerie che implementano le funzioni di accesso tramite Oauth. 
Tali librerie possono essere liberamente usate anche se, la loro complessità, può non essere giustificata per un’invocazione semplice come quella a noi necessaria.

Lo strumento più rapido e leggero, consiste nell’esecuzione di una normale chiamata HTTP POST con le librerie fornite di serie con il linguaggio di programmazione scelto.

A titolo esemplificativo, si riporta un esempio funzionante in javascript (per gli altri linguaggi di programmazione il concetto è equivalente):

<!DOCTYPE html>
   <html>
   <head>
   <script>
     function getToken(clientId, clientSecret)
     {
       var xmlhttp;
       var post;
       post = "grant_type=client_credentials" + "&client_id=" 
       post += clientId +"&client_secret="+clientSecret+"&scope=PRODUCTION"
       xmlhttp=new XMLHttpRequest();
       xmlhttp.open("POST","https://api.smartdatanet.it/api/token",false);
       xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       xmlhttp.send(post);

       var resp = JSON.parse(xmlhttp.responseText);
       return (resp.access_token);
    }
   </script>
  </head>
  <body>
    <div id="myDiv"><h2>Richiesta token oauth</h2></div>
    <button type="button" onclick="document.getElementById('myDiv').innerHTML=getToken('mio codice','mio codice');">Get Token</button>
  </body>
</html>

dove al posto di ‘mio codice’ si dovranno inserire il custemer_id e il customer_secret ottenuti in precedenza.

Il formato JSON di risposta, secondo lo standard Oauth è simle al seguente:

 {
    "scope": "default",
    "token_type": "bearer",
    "expires_in": 30758099,
    "access_token": "97a2674dc37e1b921ea6995ad69db1"
}

Nell’esempio fornito, il codice Javascript esegue il parsing del JSON e restituisce direttamente il token.

**Come accedere ai servizi di lettura autenticandosi con Oauth**
----------------------------------------------------------------

**Invocazione dei servizi oData**

Nell’invocazione dei servizi oData, il token Oauth deve essere passato, come da speficica, nell’header HTTP aggiungendo ad esso la seguente riga:

'Authorization'  'Bearer IlMioTokenOauth'

dove al posto di **IlMioTokenOaut** si deve inserire il token vero ottenuto con una delle modalità descritte in precedenza.

L’operazione è molto semplice ed è supportata da tutte le librerie di HTTP o dai wrapper di invocazione dei servizi REST forniti con i principali linguaggi di programmazione. Lo sviluppatore può utilizzare il framework da lui preferito. 

A titolo di esempio, si riporta una possibile invocazione tramite javascript. Per poterla utilizzare è necessario impostare l’URL dei propri servizi e un token valido. L’esempio utilizza una chiamata GET ma questa deve essere impostata (GET, POST, PUT, DELETE,…) in base al servizio da invocare.

<!DOCTYPE html>
  <html>
    <head>
      <script>
         function callService(url, parametri)
         {
           var xmlhttp;
           xmlhttp=new XMLHttpRequest();
           xmlhttp.open('GET', url, false);
           xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
           xmlhttp.setRequestHeader('Authorization', 'Bearer mqlNmYuAtlr7QvVEc1edBTJEdHMa');
           xmlhttp.send(parametri);
           return(xmlhttp.responseText);
         }
      </script>
    </head>
    <body>
       <div id="myDiv"><h2>Invocazione servizio oData con OAuth</h2></div>
       <button type="button" onclick="alert(callService('http://api.smartdatanet.it/odata/SmartDataOdataService.svc/ds_Trfl_2/$metadata',''));">Invoca</button>
    </body>
 </html>

Per maggiori informazioni sulla ricerca e sull’utilizzo di un servizio oData vedere questo `tutorial <http://developer.smartdatanet.it/getting-started/getting-started-discovery-e-fruizione-tramite-api-odata/>`_
.

**Sottoscrizione ad una coda STOMP**

La sottoscrizione ad una coda STOMP con l’autenticazione Oauth utilizza la stessa sintassi di una chiamata priva di Oauth dove, però, le credenziali, sono impostate nel seguente modo:
•	User: “**Bearer IlMioToken**”
•	Password: **lasciare vuota**

dove al posto di **IlMioTokenOaut** si deve inserire il token vero ottenuto con una delle modalità descritte in precedenza.

Per maggiori informazioni su come leggere i dati da una coda STOMP, vedere questo `tutorial <http://developer.smartdatanet.it/getting-started/getting-started-fruizione-in-streaming/>`_.

**Sottoscrizione ad una coda MQTT**

La sottoscrizione ad una coda MQTT con l’autenticazione Oauth utilizza la stessa sintassi di una chiamata priva di Oauth dove, però, le credenziali, sono impostate nel seguente modo:

•	User: “**Bearer IlMioToken**”
•	Password: **lasciare vuota**

dove al posto di **IlMioTokenOaut** si deve inserire il token vero ottenuto con una delle modalità descritte in precedenza.

Per maggiori informazioni su come leggere i dati da una coda MQTT, vedere questo `tutorial <http://developer.smartdatanet.it/getting-started/getting-started-fruizione-in-streaming/>`_
.
