import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

// TODO : charger et parser track.json

const contenu = readFileSync("track.json", "utf-8");
console.log(contenu);

const contenuParse = JSON.parse(contenu);
console.log(contenuParse);

// TODO : construire le chemin vers ~/ada-tech/bloc1/projets

const cheminProjets = join(
  homedir(),
  "documents",
  "ADA",
  "ada-tech",
  "bloc1",
  "projets",
);

// TODO : vérifier que ce dossier existe et afficher le résultat

if (existsSync(cheminProjets)) {
  console.log("✅ dossier projets existe");
} else {
  console.log("❌ dossier projets introuvable");
}

// TODO : pour chaque projet de la track,
const projets = ["adalgo", "adapage", "adapi", "adaquiz", "adaremise", "adatabase", "adataviz", "adateque", "cluada", "trackada-anyonym"]
//        vérifier que le dossier existe au bon endroit
projets.forEach((nom) => {
  const icone = existsSync(cheminProjets) 
  if (icone) {
  console.log("✅ " + nom);
} else {
  console.log("❌ " + nom);
}
})
//        vérifier que le repository git est initialisé
projets.forEach((nom) => {
  const chemin    = join(homedir(), "ada-tech", "bloc1", "projets", nom)
  const cheminGit = join(chemin, ".git")
  const gitOk     = existsSync(cheminGit)
  console.log(`${nom} : git ${gitOk ? "✅" : "❌"}`)
})
//        lister le contenu du dossier

//        vérifier si git a été initialisé


//        vérifier que les fichiers requis sont présents
//        afficher ✅ ou ❌ avec les erreurs dans l'ordre

// TODO : calculer et afficher le pourcentage de projets corrects
