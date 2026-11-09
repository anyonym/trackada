export function formaterListe(elements) {
  if (elements.length === 1) {
    return elements[0]; // élément a
  }
  const debut = elements.slice(0, -1).join(", "); // = éléments a, b
  const dernier = elements[elements.length - 1]; // = élement c
  return `${debut} et ${dernier}`; // -> il manque a, b et c
}

export function calculerPourcentage(numerateur, total) {
    return Math.round((numerateur / total) * 100);
}