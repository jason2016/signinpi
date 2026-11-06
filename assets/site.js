// signinpi — aucun cookie, aucune mesure d'audience, aucun appel réseau.

// 付款链接必须与销售条款同时上线，不得单独启用。
// Lien de paiement Mollie : à remplacer par Jason une fois créé dans le back-office Mollie.
// Tant qu'il vaut "#", le bouton reste affiché comme désactivé.
const MOLLIE_PAYMENT_URL = "#";

document.querySelectorAll("[data-pay]").forEach(function (a) {
  if (MOLLIE_PAYMENT_URL && MOLLIE_PAYMENT_URL !== "#") {
    a.href = MOLLIE_PAYMENT_URL;
    a.rel = "noopener";
    a.removeAttribute("aria-disabled");
  } else {
    a.href = "#";
    a.setAttribute("aria-disabled", "true");
    a.addEventListener("click", function (e) { e.preventDefault(); });
  }
});

// Bouton de contact : le mailto part normalement (pas de preventDefault), et on
// deplie en plus un panneau qui montre l'adresse — sans client mail configure,
// le mailto ne fait rien et le visiteur doit quand meme voir ou ecrire.
var panneau = document.getElementById("contact-panel");
document.querySelectorAll("[data-contact]").forEach(function (a) {
  a.addEventListener("click", function () {
    if (!panneau) return;
    panneau.hidden = false;
    a.setAttribute("aria-expanded", "true");
  });
});

function selectionner(el) {
  var r = document.createRange();
  r.selectNodeContents(el);
  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(r);
}

document.querySelectorAll("[data-copy]").forEach(function (b) {
  var libelle = b.textContent;
  var adresse = panneau && panneau.querySelector("[data-mail]");
  var statut = panneau && panneau.querySelector("[data-status]");
  function repli() {
    // navigator.clipboard absent (http, ancien navigateur) ou refuse :
    // on selectionne l'adresse et on dit quoi faire, plutot que de ne rien faire.
    if (adresse) selectionner(adresse);
    if (statut) statut.textContent = b.getAttribute("data-fallback");
  }
  b.addEventListener("click", function () {
    var texte = adresse ? adresse.textContent.trim() : "";
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texte).then(function () {
        b.textContent = b.getAttribute("data-done");
        if (statut) statut.textContent = "";
        setTimeout(function () { b.textContent = libelle; }, 2000);
      }, repli);
    } else {
      repli();
    }
  });
});
