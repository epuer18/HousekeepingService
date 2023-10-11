
// Connect an event listener to the button "showFormBtn"
// When this button is clicked, the provided function will be executed
document.getElementById("showFormBtn").addEventListener("click", function () {
  document.getElementById("formContainer").style.display = "block";
});
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

  const card = document.createElement("div");

  const service = {"userName": userName,
    "userPhone": userPhone,
    "workLocation" :workLocation ,
    "dayAvailable": dayAvailable,
    "timeAvailable": timeAvailable, 
    "rateHour":rateHour, 
    "cleaningServices": cleaningServices, 
    "rating": 0, 
    "n": 0}

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
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    
    postJSON(service);

  card.className = "card col-md-3 mb-4"; // Added col-md-3 and mb-4 for margin
  // what will be displayed on card
  card.innerHTML = `
    <div class="card-body">  <!-- Use Bootstrap's card-body class for padding -->
        <p>Name: ${userName}</p>
        <p>Phone: ${userPhone}</p>
        <p>Location Open To Work At: ${workLocation}</p>
        <p>Day available ($/hr): ${dayAvailable}</p>
        <p>Time Available ($/hr): ${timeAvailable}</p>
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
