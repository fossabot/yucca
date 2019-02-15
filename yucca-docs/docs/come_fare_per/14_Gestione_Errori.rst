.. _gestire_errori:

**Gestire gli errori**
*****************************************

(ex Gestione degli errori  - DOC)  

**Pagina Attuale** `Link <http://developer.smartdatanet.it/docs/gestione-degli-errori/>`_

In questa sezione vengono descritte le modalità di gestione degli errori della piattaforma a fronte di problemi sugli eventi ricevuti.

**Eventi alfanumerici in realtime**

Le politiche sotto descritte si applicano agli eventi ricevuti su tutti i canali (MQTT e HTTP).

Gli eventi che causano errori sulla piattaforma producono nuovi eventi nel seguente formato:

{
 "error_name" : "NOME ERRORE",
 "error_code" : "CODICE ERRORE ",
 "output" : "CODA DI USCITA",
 "message" : <MESSAGGIO ERRATO>
}

A fronte della ricezione di un evento errato la piattaforma:

1.	Se il protocollo è request/response (come HTTP) risponde con uno status errato (HTTP 500) e con il messaggio di cui sopra
2.	In ogni caso pubblica il messaggio errato nella topic dichiarata nel campo “output” (se tale campo è valorizzato)

Gli errori attualmente gestiti sono:

.. image:: img/Errori.png


