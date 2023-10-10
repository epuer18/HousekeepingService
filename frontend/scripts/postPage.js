// Connect an event listener to the button "showFormBtn"
// When this button is clicked, the provided function will be executed
document.getElementById("showFormBtn").addEventListener("click", function () {
  document.getElementById("formContainer").style.display = "block";
});

// Function to format time from 24 hr  to regular time
// when creating card, form was changing time to 24 hr
function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const parsedHours = parseInt(hours, 10);
  const amPm = parsedHours >= 12 ? "PM" : "AM";
  const formattedHours = parsedHours % 12 || 12; // Convert 0 to 12 for 12-hour format
  return `${formattedHours}:${minutes} ${amPm}`;
}

// Fetch the element with id "formContainer" and set its CSS display property to "block",
// which means it will be shown on the page (if it was previously hidden)
// get the value from the input field with id "userPhone"

document.getElementById("submitBtn").addEventListener("click", function () {
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
    </div>
`;
  // add carrd to div
  document.getElementById("cardsContainer").appendChild(card);

  // Hide the form
  // how? set its CSS display property to "none"

  document.getElementById("formContainer").style.display = "none";
});
