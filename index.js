
const characterList = document.getElementById("characterList");
const characterModal = new bootstrap.Modal(document.getElementById("characterModal"));
const modalName = document.getElementById("modalName");
const modalGender = document.getElementById("modalGender");
const modalHeight = document.getElementById("modalHeight");

async function fetchCharacters() {
  try {
    const response = await fetch("https://swapi.dev/api/people");
    const characters = (await response.json()).results;
    console.log(characters)
    displayCharacters(characters);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayCharacters(characters) {
  characters.forEach(character => {
    const characterCard = document.createElement("div");
    characterCard.className = "col-md-4 mb-4";

    characterCard.innerHTML = `
      <div class="card">
        <img src="img src/rsz_eucvnjsxmamp1kf.webp" class="card-img-top" alt="${character.name}">
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <button class="btn btn-primary view-details" data-bs-toggle="modal" data-bs-target="#characterModal" data-id="${character.url}">View Details</button>
        </div>
      </div>
    `;

    characterList.appendChild(characterCard);
  });

  const viewButtons = document.querySelectorAll(".view-details");
  viewButtons.forEach(button => {
    button.addEventListener("click", () => {
      const characterUrl = button.getAttribute("data-id");
      fetchCharacterDetails(characterUrl);
    });
  });
}

async function fetchCharacterDetails(url) {
  try {
    const character = await (await fetch(url)).json();
    modalName.textContent = character.name;
    modalGender.textContent = character.gender;
    modalHeight.textContent = character.height;
    characterModal.show();
  } catch (error) {
    console.error("Error fetching character details:", error);
  }
}

fetchCharacters();
