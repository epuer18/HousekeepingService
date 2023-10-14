// Connect an event listener to the button "showFormBtn"
// When this button is clicked, the provided function will be executed
document
  .getElementById("showFormBtn")
  .addEventListener("click", async function () {
    document.getElementById("formContainer").style.display = "block";
  });

// Function to format time from 24 hr  to regular time
// when creating card, form was changing time to 24 hr
// help from AI
function formatTime(time) {
  if (typeof time !== "string" || !time.includes(":")) {
    return time; // or return a default value, or throw an error for testing
  }

  const [hours, minutes] = time.split(":");
  const parsedHours = parseInt(hours, 10);
  const amPm = parsedHours >= 12 ? "PM" : "AM";
  const formattedHours = parsedHours % 12 || 12; // Convert 0 to 12 for 12-hour format
  return `${formattedHours}:${minutes} ${amPm}`;
}
// Load all services from the server and display them
async function loadServices() {
  try {
    const response = await fetch("./api/services");
    const services = await response.json();
    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = ""; // Clear the container first
    services.forEach((service) => {
      // catching errors with time change
      if (
        typeof service.timeAvailable !== "string" ||
        !service.timeAvailable.includes(":")
      ) {
        console.log("Faulty service:", service);
      } // testing
      const card = document.createElement("div");
      card.className = "card col-md-3 mb-4";
      card.innerHTML = `
        <div class="card-body">
            <p>Name: ${service.userName}</p>
            <p>Phone: ${service.userPhone}</p>
            <p>Location Open To Work At: ${service.workLocation}</p>
            <p>Day available: ${service.dayAvailable}</p>
            <p>Time Available: ${formatTime(service.timeAvailable)}</p>
            <p>Rate ($/hr): ${service.rateHour}</p>
            <p>Cleaning Services: ${service.cleaningServices}</p>
            
            <button class="delete-btn" data-id="${service._id}">Delete</button>

        </div>
      `;
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load services:", error);
  }
}

// Load services when the page loads
window.onload = loadServices;

// Fetch the element with id "formContainer" and set its CSS display property to "block",
// which means it will be shown on the page (if it was previously hidden)
// get the value from the input field with id "userPhone"

document
  .getElementById("submitBtn")
  .addEventListener("click", async function () {
    document.getElementById("formContainer").style.display = "none";
    // get values for each input
    const userName = document.getElementById("userName").value;
    const userPhone = document.getElementById("userPhone").value;
    const workLocation = document.getElementById("workLocation").value;
    const dayAvailable = document.getElementById("dayAvailable").value;
    const timeAvailable = document.getElementById("timeAvailable").value;
    const rateHour = document.getElementById("rateHour").value;
    const cleaningServices = document.getElementById("cleaningServices").value;

    // Check if any of the required fields are empty
    if (
      !userName ||
      !userPhone ||
      !workLocation ||
      !dayAvailable ||
      !timeAvailable ||
      !rateHour ||
      !cleaningServices
    ) {
      alert("Please fill out all required fields.");
      return; // Prevent form submission if any field is empty
    }

    // create and display card
    const card = document.createElement("div");

    const service = {
      userName: userName,
      userPhone: userPhone,
      workLocation: workLocation,
      dayAvailable: dayAvailable,
      timeAvailable: timeAvailable,
      rateHour: rateHour,
      cleaningServices: cleaningServices,
      rating: 0,
      n: 0,
    };

    async function postJSON(data) {
      try {
        const response = await fetch("./api/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Server Response", result); // testing

        return result.id;
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // postJSON(service);
    const serviceId = await postJSON(service);

    if (serviceId) {
      loadServices();
    }

    card.className = "card col-md-3 mb-4"; // Added col-md-3 and mb-4 for margin
    // what will be displayed on card
    card.innerHTML = `
    <div class="card-body">  <!-- Use Bootstrap's card-body class for padding -->
        <p>Name: ${userName}</p>
        <p>Phone: ${userPhone}</p>
        <p>Location Open To Work At: ${workLocation}</p>
        <p>Day available: ${dayAvailable}</p>
        <p>Time Available: ${formatTime(timeAvailable)}</p>
        <p>Rate ($/hr): ${rateHour}</p>
        <p>Cleaning Services: ${cleaningServices}</p>
        <button class="delete-btn" data-id="${serviceId}">Delete</button> <!-- Added data-id here -->
        </div>
`;
    // add carrd to div
    document.getElementById("cardsContainer").appendChild(card);

    // Hide the form
    // how? set its CSS display property to "none"

    document.getElementById("formContainer").style.display = "none";
  });

// method to delete
async function deleteService(id, cardElement) {
  console.log("Deleting service with ID:", id);
  try {
    const response = await fetch(`./api/delete/${id}`, {
      method: "DELETE",
    });
    console.log("Delete response:", await response.json());

    if (response.ok) {
      // Remove the card from the DOM
      cardElement.remove();
    } else {
      console.error("Failed to delete service.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document
  .getElementById("cardsContainer")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const serviceId = event.target.getAttribute("data-id");
      deleteService(serviceId, event.target.closest(".card")); // closest(): used to find the parent card element
    }
  });
