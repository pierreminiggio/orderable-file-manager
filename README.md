Ce package permet de lister, ajouter et supprimer des fichiers en Ajax

Pour le moment c'est très barebone avec aucun CSS

<img src="https://miniggiodev.fr/packages/orderable-file-manager/barebone-html.png">

Par la suite on pourra ordonner les fichiers et utiliser le file manager comme un sélecteur de fichier pour un input html via une popin.

Utilisation : 
```javascript
const OrderableFileManager = require('orderable-file-manager')
OrderableFileManager.load()
```

```html
<div
    class="orderable-file-manager" 
    data-listfiles="[listFileUrl]"
    data-savefile="[saveFileUrl]"
></div>
```

listFileUrl une fois appelée en ajax par la lib doit retourner un JSON ressemblant à ça :
```json
[ 
   { 
      "id": 11,
      "delete_url":"http:\/\/catoon.local:8080\/edsa-dev\/framework\/back\/produits\/ajax\/produit\/fichier\/11\/supprimer",
      "name":"Profile.pdf",
      "url":"http:\/\/catoon.local:8080\/edsa-dev\/framework\/public\/files\/ecom\/product\/3\/Profile.pdf"
   },
   {
   	// Fichier suivant
   }
]
```

Et saveFileUrl va recevoir un fichier 'file' pour être traité par votre Back End



On peut charger via un autre sélecteur :
```javascript
OrderableFileManager.load('.classeexemple')
```

Récupérer les élements qui ont été chargés par la lib :
```javascript
OrderableFileManager.getAll()
```

Récupérer un élement qui a été chargée par la lib via son ID (ou via 'no-id-[increment]' s'il n'a pas d'id) :
```javascript
OrderableFileManager.get('test')
```
