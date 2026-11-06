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
