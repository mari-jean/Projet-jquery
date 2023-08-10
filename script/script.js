// Attend que le document soit prêt
$(document).ready(function () {
  // Sélectionne tous les éléments li de l'ul ayant l'id main-menu et les stocke dans la variable $mainMenuItems
  var $mainMenuItems = $("#main-menu ul").children("li");

  // Stocke la longueur de $mainMenuItems dans la variable totalMainMenuItems
  var totalMainMenuItems = $mainMenuItems.length;

  // Définit l'indice de l'élément actuellement ouvert dans la variable openedIndex
  var openedIndex = 2;

  // Initialise la fonction init
  var init = function () {
    // Attache les événements
    bindEvents();
    // Si openedIndex est un index valide, appelle la fonction animateItem sur l'élément correspondant pour l'ouvrir
    if (validIndex(openedIndex)) {
      animateItem($mainMenuItems.eq(openedIndex), true, 1400);
    }
  };

  // Attache les événements aux éléments du menu
  var bindEvents = function () {
    // Attache un gestionnaire d'événement click à tous les éléments .images des éléments li du menu
    $mainMenuItems.children(".images").click(function () {
      // Récupère l'index de l'élément li parent
      var newIndex = $(this).parent().index();
      // Vérifie si l'élément est valide et l'anime pour l'ouvrir
      checkAndAnimateItem(newIndex);
    });

    // Attache un gestionnaire d'événement hover aux éléments .button
    $(".button").hover(
      function () {
        $(this).addClass("hovered");
      },
      function () {
        $(this).removeClass("hovered");
      }
    );

    // Attache un gestionnaire d'événement click à tous les éléments .button du menu
    $(".button").click(function () {
      // Récupère l'index de l'élément .button
      var newIndex = $(this).index();
      // Vérifie si l'élément est valide et l'anime pour l'ouvrir
      checkAndAnimateItem(newIndex);
    });
  };

  // Vérifie si l'indice donné est un indice valide dans le menu
  var validIndex = function (indexToCheck) {
    return indexToCheck >= 0 && indexToCheck < totalMainMenuItems;
  };

  // Anime l'élément donné pour l'ouvrir ou le fermer
  var animateItem = function ($item, toOpen, speed) {
    // Sélectionne l'élément .color de l'élément li donné et le stocke dans $colorImage
    var $colorImage = $item.find(".color");
    // Définit les paramètres d'animation de l'élément li et de l'élément .color en fonction de la valeur de toOpen
    var itemParam = toOpen ? { width: "420px" } : { width: "140px" };
    var colorImageParam = toOpen ? { left: "0px" } : { left: "140px" };

    // Anime l'élément .color et l'élément li donné avec les paramètres correspondants
    $colorImage.animate(colorImageParam, speed);
    $item.animate(itemParam, speed);
  };

  // Fonction qui vérifie si l'élément est déjà ouvert ou non, puis anime l'élément approprié en fonction de son état
  var checkAndAnimateItem = function (indexToCheckAndAnimate) {
    // Si l'élément est déjà ouvert, on le ferme
    if (openedIndex == indexToCheckAndAnimate) {
      animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250); // Animation pour fermer l'élément
      openedIndex = -1; // L'élément est maintenant fermé
    }
    // Sinon, on ouvre l'élément
    else {
      // Vérifie si l'élément est valide pour être ouvert
      if (validIndex(indexToCheckAndAnimate)) {
        animateItem($mainMenuItems.eq(openedIndex), false, 250); // Animation pour fermer l'élément actuellement ouvert
        openedIndex = indexToCheckAndAnimate; // Ouvre l'élément sélectionné
        animateItem($mainMenuItems.eq(openedIndex), true, 250); // Animation pour ouvrir l'élément sélectionné
      }
    }
  };

  init(); // Initialisation du menu principal
});
