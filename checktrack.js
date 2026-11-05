import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import readline from "readline";

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

// 1. vérifier que le dossier existe au bon endroit
function verifierProjet(projet) {
  const erreurs = [];
  // On récupère le chemin de chaque projet
  const cheminProjet = join(dossierProjets, projet.name);
  // Condition pour savoir si le projet existe ou non dans mon dossier
  if (!existsSync(cheminProjet)) {
    erreurs.push("le dossier n'existe pas ou n'est pas nommé correctement");
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
  let nbProjetsCorrects = 0;
  // TODO : vérifier que ce dossier existe et afficher le résultat
  // vérification si le dossier projets existe et affichage
  if (existsSync(dossierProjets)) {
    console.log(green("✅ dossier ~/ada-tech/bloc1/projets"));
    console.log("");
  } else {
    console.log(
      red("❌ dossier ~/ada-tech/bloc1/projetsdossier projets introuvable"),
    );
    console.log(
      "Le dossier n'existe pas : vérifie ton arborescence de la semaine 1",
    );
    console.log("");
  }
  // TODO : pour chaque projet de la track,
  // récupérer tous les projets dans le JSON
  const projets = track.projects;
  // on prend les projet un par un
  projets.forEach((projet) => {
    // récupération de toutes les erreurs dans un array pour chaque projet
    const erreurs = verifierProjet(projet);
    // afficher ✅ ou ❌ avec les erreurs dans l'ordre
    if (erreurs.length === 0) {
      console.log(green(`✅ dossier du projet ${projet.name}`));
      nbProjetsCorrects++; // incrémente le nombre de dossiers qui ne sont pas en erreur
    } else {
      console.log(red(`❌ dossier du projet ${projet.name}`));
      erreurs.forEach((erreur) => console.log(`- ${erreur}`));
    }
    console.log("");
  });

  // TODO : calculer et afficher le pourcentage de projets corrects
  const total = track.projects.length;
  const pourcentage = Math.round((nbProjetsCorrects / total) * 100);
  const symbole = nbProjetsCorrects === total ? "✅" : "❌";

  const message = `${pourcentage}% des projets sont initialisés correctement`;
  if (pourcentage === 100) {
    console.log(green(`${symbole} ${message} (${nbProjetsCorrects}/${total})`));
  } else {
    console.log(red(`${symbole} ${message} (${nbProjetsCorrects}/${total})`));
  }
}

// Affichage couleurs
const green = (str) => {
  return "\x1b[32m" + str + "\x1b[0m";
};
const red = (str) => {
  return "\x1b[31m" + str + "\x1b[0m";
};

// Interaction avec l'utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Dossier à vérifier ? ", (dossier) => {
  if (dossier.trim().toLocaleLowerCase() === "projets") {
    rl.question("Lancer la vérification ? (o/n) ", (reponse) => {
      if (reponse.trim().toLocaleLowerCase() === "o") {
        console.log("");
        rl.close();
        lancerVerification();
      } else {
        console.log("Vérification annulée");
        rl.close();
      }
    });
  } else {
    console.log("dossier introuvable");
    rl.close();
  }
});
