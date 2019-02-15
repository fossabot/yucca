.. _creare_stream_dati:

**Creare uno stream di dati a partire da stream esistenti**
***********************************************************
**Pagina attuale** `Link <http://developer.smartdatanet.it/docs/specifiche-di-creazione-stream-a-partire-da-stream-esistenti/>`_

Dalla versione 0.8.1 la piattaforma mette a disposizione la possibilità di creare stream partendo da altri flussi e aggiungendo logica di aggregazione, filtro, pattern matching.

Quando viene creato uno stream in tale modo, lo smartobject sorgente risulta essere la piattaforma (i dati provengono da altri flussi, non direttamente da uno smartobject) e viene indicato come “internal – VE internal tenant sandbox”.

La piattaforma utilizza il linguaggio SiddhiQL (https://docs.wso2.com/display/CEP310/Siddhi+Language+Specification).
Nelle versioni successive saranno implementati in modalità semplificata gli scenari più comuni in modo da poter aggiungere tali logiche utilizzando wizard guidati.
La pagina di creazione e modifica flusso “creato da altri stream” presenta le seguenti sezioni:

- Definizione stream in ingresso

- Query SIDDHI

- Componenti stream in uscita

Definizione stream in ingresso
==============================

Nella prima parte si possono scegliere gli stream da cui recuperare gli eventi di interesse. Sono a disposizione tutti gli stream pubblici o appartenenti alla propria organizzazione.

.. image:: Creazione_Stream_Dati1

Scegliendo dalla drop-down list “Creazione da” e premendo “+” viene aggiunto lo stream scelto alla lista degli stream selezionati.
La dicitura “as inputN” indica che tale flusso sarà riferibile come inputN nella query Siddhi.
In SiddhiQL gli stream definiscono la struttura dati dell’evento che transita e contengono un insieme di campi suddivisi in:

- campi metadata (iniziano per meta_ )

- campi correlationdata (iniziano per correlation_)

- campi payloaddata (non hanno prefisso)

Per gli stream aggiunti sono a disposizione i seguenti campi:

- meta_source (String) il campo indica lo smartobject che ha inviato l’evento (campo sensor nel messaggio)

- time (String)  il campo indica l’istante a cui si riferisce l’evento (campo values[].time nel messaggio)

- Tutti le componenti come censite nel flusso di aggiunto.

Nell’esempio citato in figura per il primo stream la definizione è :



Componenti stream in uscita
===========================

Prima di scrivere la query SiddhiQL è necessario indicare quali saranno le componenti dello stream in uscita, in maniera del tutto analoga a come fatto per gli stream creati a partire dagli smartobject.

Lo stream in uscita e referenziabile come **outputStream** nella query SiddhiQL.

Analogamente a quanto descritto per gli stream in ingresso, i campi sono:

- meta_source (String)
- time (String)
- Tutti le componenti come censite nel flusso.

Query SIDDHI
============

Qui è possibile inserire la query che implementa la logica necessaria.

E’ possibile utilizzare tutto quello descritto al link ad esclusione di :

- Event Table

- Extensions

Esempi pratici
==============

Per gli esempi  si suppone di utilizzare il flusso in ingresso definito così:

**define stream input0(meta_source string, time string, c0 float );**

ove **c0** rappresenta una temperatura.

*Pass-through*

Stream in uscita:

**define stream outputStream(meta_source string, time string, c0 float );**

Query SIDDHI:

    from input0
    
    insert into outputStream;

    *Filter (Stream in output con solo i valori superiori a 30)*

Stream in uscita:

    **define stream outputStream(meta_source string, time string, c0 float );**

Query SIDDHI:

    from input0[c0>30]
    insert into outputStream;
 
    Filter (Stream in output con solo i valori superiori a 30 o inferiori a 18)

Stream in uscita:

    **define stream outputStream(meta_source string, time string, c0 float );**
    
**Query SIDDHI:**

    from input0[c0>30 or c0<18]
    
    insert into outputStream;
 
    *Aggregation (Stream in output che contiene gli eventi di due stream in ingresso)*

Stream in ingresso aggiuntivo ove c1 è la temperatura di un altro sensore

    **define stream input1(meta_source string, time string, c1 float );**

Stream in uscita:

    **define stream outputStream(meta_source string, time string, temp float );**

Query SIDDHI:

    from input0
    
    select meta_source as meta_source,time as time, c0 as temp  
    
    insert into outputStream;

    from input1
    
    select meta_source as meta_source,time as time, c1 as temp 
     
    insert into outputStream;
 






