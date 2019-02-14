.. _codice_SO:

**Generare il codice di uno Smart Object**
******************************************

(ex Prassi per la generazione del codice di uno smart object  - DOC) 
`Pagina Attuale <http://developer.smartdatanet.it/docs/prassi-per-la-generazione-del-codice-di-uno-smart-object/>`_

Ogni smart object sulla piattaforma deve essere identificato univocamente da un codice che rispetti il formato:

xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Qualora sia necessario censire un 

Scopri :ref:`numero elevato di smart object <n_elevato_SO>` con Yucca!



 può essere utile seguire le indicazioni riportarte nel documento `RFC4122 <http://www.ietf.org/rfc/rfc4122.txt>`_ al paragrafo 4.3. Algorithm for Creating a Name-Based UUID.


In particolare si può pensare di generare uno UUID a partire da:

•	uno spazio di nomi
•	un nome univoco nello spazio
•	un algoritmo di hash

Utilizzando l’algoritmo due volte si suggerisce di generare un UUID per un DNS registrato a proprio nome:

FIRST_UUID = uuid (DNS, "www.mydomain.it", sha1)

ove il valore DNS è 6ba7b810-9dad-11d1-80b4-00c04fd430c8

SMART_OBJECT_UUID = uuid (FIRST_UUID, "smart object name", sha1)
 