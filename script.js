const responsiveMenu = document.querySelector("#responsive-menu");
const localitiesContainer = document.querySelector("#localities");
const seeMoreBtn = document.querySelector(".last-place");
const seeLessBtn = document.querySelector(".fold");
const cuisinesElement = document.querySelector(".cuisines");
const restaurantsTypesElement = document.querySelector(".restaurants-types");
const restaurantsElement = document.querySelector(".restaurants");
const citiesElement = document.querySelector(".cities");


function toggleResponsiveMenu(){
    responsiveMenu.classList.toggle("open");
}

async function fetchData() {
  try {
    const response = await fetch("data/location-details.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
  }
}

async function main() {
  let data = await fetchData();
  data.locations.forEach((el) => {
    const placeDiv = document.createElement("div");
    const divElement = document.createElement("div");
    const h3Element = document.createElement("h3");
    const paraElement = document.createElement("p");
    const imgElement = document.createElement("img");

    h3Element.innerText = el.name;
    paraElement.innerText = el.place_count;
    imgElement.src = "./assets/arrow.svg";

    divElement.append(h3Element, paraElement);
    placeDiv.classList.add("places");
    placeDiv.classList.add("more-places");
    placeDiv.append(divElement);

    localitiesContainer.append(placeDiv);
  });
}

seeMoreBtn.addEventListener("click", () => {
  seeMoreBtn.classList.add("expended");
  main();

  main().then(() => {
    const placeDiv = document.createElement("div");
    const paraElement = document.createElement("p");
    const imgElement = document.createElement("img");

    placeDiv.classList.add("places");
    placeDiv.classList.add("last-place");
    placeDiv.classList.add("more-places");
    placeDiv.classList.add("fold");

    paraElement.innerText = "see less";
    imgElement.src = "./assets/uparrow.svg";

    placeDiv.append(paraElement, imgElement);

    localitiesContainer.append(placeDiv);
    const expendedPlaces = [...document.getElementsByClassName("more-places")];
    placeDiv.addEventListener("click", () => {
      expendedPlaces.forEach((el) => {
        el.style.display = "none";
      });
      seeMoreBtn.classList.remove("expended");
    });
  });
});

document.getElementById("email").addEventListener("change", function () {
  const input = document.getElementById("contact-input");
  input.type = "email";
  input.placeholder = "Email";
});

document.getElementById("phone").addEventListener("change", function () {
  const input = document.getElementById("contact-input");
  input.type = "number";
  input.placeholder = "Phone";
});

function toggleAccordion(element, displayType = "block") {
    const content = element.nextElementSibling;
    const isOpen = content.style.display === displayType;
    content.style.display = isOpen ? "none" : displayType;
    element.querySelector("span").innerHTML = isOpen
        ? `<span><img src="./assets/downarrow.svg" alt="downarrow"></span>`
        : `<span><img src="./assets/uparrow.svg" alt="downarrow"></span>`;
}

async function fetchAccordianData(){
  try {
    const response = await fetch("data/accordian-data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
  }
}

function createAnchorElement(data, type, to, nearMe) {
  // console.log(type)
  const anchorElement = document.createElement("a");
  const spanElement = document.createElement("span");
  anchorElement.href = "#";
  anchorElement.innerText = `${data[type]} ${nearMe?"near me":""}`;
  to.append(anchorElement, spanElement);
}

async function accordianData() {
  let data = await fetchAccordianData();
  // console.log(data)
  data.popular_cuisines.forEach((cuisineobj) => {
    createAnchorElement(cuisineobj, "cuisine", cuisinesElement,true);
  });

  data.popular_restaurants_types.forEach((restaurantobj) => {
    createAnchorElement(restaurantobj, "restaurant", restaurantsTypesElement,true);
  });

  data.popular_restaurants.forEach((restaurantobj) => {
    createAnchorElement(restaurantobj, "restaurant", restaurantsElement,false);
  });

  data.cities.forEach((citiesobj) => {
    createAnchorElement(citiesobj, "city", citiesElement,false);
  });
}

accordianData();

