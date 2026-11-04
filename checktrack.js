import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
// import readline from "readline";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Lancer la vérification ? (o/n)", (reponse) => {
//   if (reponse.trim().toLocaleLowerCase() === "o") {
//     return verifierProjet();
//   } else {
//     console.log("Vérification annulée");
//   }
// });

// TODO : charger et parser track.json
const track = JSON.parse(readFileSync("track.json", "utf-8")); // récupère tout le fichier track.json

// TODO : construire le chemin vers ~/ada-tech/bloc1/projets

const dossierProjets = join(
  homedir(),
  "documents",
  "ADA",
  "ada-tech",
  "bloc1",
  "projets",
);

// TODO : vérifier que ce dossier existe et afficher le résultat
// 1. vérifier que le dossier existe au bon endroit
function verifierProjet(projet) {
  const erreurs = [];
  // On récupère le chemin de chaque projet
  const cheminProjet = join(dossierProjets, projet.name);
  // Condition pour savoir si le projet existe ou non dans mon dossier
  if (!existsSync(cheminProjet)) {
    erreurs.push("Le dossier n'existe pas : vérifie ton arborescence");
    return erreurs;
  }
  // 2. Vérifier que le repository git est initialisé
  // Condition pour savoir si le repo git est initialisé ou non
  if (!existsSync(join(cheminProjet, ".git"))) {
    erreurs.push("Le repository git n'est pas initialisé");
  }
  // 3. Vérifier que les fichiers requis sont présents
  // Vérification des fichiers dans chaque dossier projet
  const manquants = [];
  projet.required.forEach((file) => {
    if (!existsSync(join(cheminProjet, file))) {
      manquants.push(file);
    }
  });
  // Ici il faut reformater l'array manquant pour avoir un affichage correct
  if (manquants.length > 0) {
    erreurs.push(formaterListe(manquants)); // récupérer les éléments manquants
  }
  return erreurs;
}


function formaterListe(elements) {
  if (elements.length === 1) {
    return elements[0]; // élément a
  }
  const debut = elements.slice(0, -1).join(", "); // = éléments a, b
  const dernier = elements[elements.length - 1]; // = élement c
  return `${debut} et ${dernier}`; // -> il manque a, b et c
}

function lancerVerification() {
  // on vérifie si le dossier projets existe et on affiche
  if (existsSync(dossierProjets)) {
    console.log("✅ dossier projets existe");
  } else {
    console.log("❌ dossier projets introuvable");
  }
  // TODO : pour chaque projet de la track,
  // récupérer tous les projets dans le JSON
  const projets = track.projects;
  // on prend les projet un par un
  projets.forEach((projet) => {
    // On récupère toutes les erreurs dans un array pour chaque projet
    const erreurs = verifierProjet(projet);
    // SI 0 erreur afficher ✅
    // Si des erreurs afficher ❌ + la liste des erreurs
    //  afficher ✅ ou ❌ avec les erreurs dans l'ordre
    if (erreurs.length === 0) {
      console.log(`✅ dossier du projet ${projet.name}`);
    } else {
      console.log(`❌ dossier du projet ${projet.name}`);
      erreurs.forEach((erreur) => console.log(`- ${erreur}`));
    }
    console.log("");
  });
}

// TODO : calculer et afficher le pourcentage de projets corrects

// const total = track.projects.length
// const pourcentage = Math.round((projetsCorrects / total) * 100)
// const symbole = projetsCorrects === total ? "✅" : "❌"

// const message = `${pourcentage}% des projets sont initialisés correctement`
// console.log(`${symbole} ${message} (${projetsCorrects}/${total})`)

// rl.close();
lancerVerification();
