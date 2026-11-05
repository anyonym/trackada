# README : Trackada

Trackada est un programme de comparaison entre une arborescence créée sur un ordinateur et une base de données définie.
Le script parcourt l'ensemble des fichiers créés depuis un dossier cible, afin de les comparer à ceux théoriquement attendus.
A l'issue, un résultat correspondant au volume considéré correct est indiqué à l'utilisateur.

## Pour tester :

1. Cloner le contenu du dépôt github : https://github.com/anyonym/trackada.git
2. Depuis un terminal permettant l'utilisation de nodejs, naviguer dans l'arborescence jusqu'à entrer dans le dossier `trackada` (en local)
3. Utiliser la commande `node checktrack.js`
4. Cibler le dossier `projets`
5. Lancer la vérification


## Exemples d'affichage :
<b>N.B.: Le programme est configuré pour que le texte des réponses succédant à "✅" s'affiche en vert, et à "❌" en rouge.</b>

### Exemple 1 : mauvais dossier sélectionné
```
-> node checktrack.js
Dossier à vérifier ? pr
dossier introuvable
```

### Exemple 2 : dossier sélectionné correct, vérification lancée
```
-> node checktrack.js
Dossier à vérifier ? projets
Lancer la vérification ? (o/n) o

✅ dossier ~/ada-tech/bloc1/projets

✅ dossier du projet adapage

✅ dossier du projet adaquiz

✅ dossier du projet trackada

❌ dossier du projet adalgo
- Le repository git n'est pas initialisé
- package.json et README.md

❌ dossier du projet adataviz
- Le repository git n'est pas initialisé
- index.html, package.json et README.md

❌ dossier du projet adatabase
- Le repository git n'est pas initialisé
- package.json et README.md

❌ dossier du projet adapi
- Le repository git n'est pas initialisé
- package.json et README.md

❌ 43% des projets sont initialisés correctement (3/7)
```

### Exemple 3 : dossier correct sélectionné, vérification annulée
```
-> node checktrack.js
Dossier à vérifier ? projets
Lancer la vérification ? (o/n) n
Vérification annulée
```

## Pistes d'amélioration

Permettre un ciblage de recherche parmi la liste de dossiers contenus dans la base de données, afin de pouvoir vérifier l'ensemble comme actuellement mais également proposer une vérification par dossier unique et afficher un indicateur de complétion correspondant. 