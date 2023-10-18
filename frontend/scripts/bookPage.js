// Make a module for bookings
function BookingModule(servicesID = "#cardsContainer") {
    const me = {};
  
    const servicesElement = document.querySelector(servicesID);
  
    function getserviceCode(service) {
      /*
        userName
        userPhone
        workLocation
        dayAvailable
        timeAvailable
        rateHour
        cleaningServices 
    */

        let rating = `
        <div class= "row">
        <div class="rate col-md-12 col-lg-10">
            <input type="radio" id=${"star5" + service._id} name=${"rate" + service._id} value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id=${"star4" + service._id} name=${"rate" + service._id} value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id=${"star3" + service._id} name=${"rate" + service._id} value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id=${"star2" + service._id} name=${"rate" + service._id} value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id=${"star1" + service._id} name=${"rate" + service._id} value="1" />
            <label for="star1" title="text">1 star</label>
            </div>
            <div class="col">
                <div class="btn btn-success" id=${"update_btn" + service._id} >
                Submit
            </div>
            </div>
        </div>`
   

      return ` 
      <div class="card booking-card col-sm-12 col-md-4 col-lg-3">
            <h3 class="card-title"><strong>${service.userName}</strong></h3>
            <p>Phone: ${service.userPhone}  </p>
            <p>Location Open To Work At: ${service.workLocation}  </p>
            <p>Day available: ${service.dayAvailable}  </p>
            <p>Time Available: ${service.timeAvailable}  </p>
            <p>Rate ($/hr): ${service.rateHour}  </p>
            <p>Cleaning Services: ${service.cleaningServices} </p>
            <p id=${"rating" + service._id}>Rating: ${service.rating}</p>
            <h4><strong>Add a Rating!</strong></h4>
            <div class="rating row" id=${"rating" + service._id} >
                   ${rating}
            </div>
        </div>
    `; // Wow this is such a simple and elegant way for displaying content. Love it!
    }

    function updateRatings(service) {
        const button = document.getElementById("update_btn" + service._id)
        function button_handling() {

            let radio = document.getElementsByName("rate" + service._id);
            let new_rating = 0;

            radio.forEach((option) => {
                if (option.checked) {
                    new_rating = parseFloat(option.value);
                }
            })

            if(new_rating !== 0){
                if (service.n === "" || service.n === undefined){
                    service.n = 1;
                } 
                const n = JSON.parse(service.n);
                const rating = JSON.parse(service.rating)
                const updatedRating = ((rating * n) + new_rating)/(n+1);
    
                console.log(updatedRating)

                const htmlrating = document.getElementById("rating" + service._id);
                htmlrating.innerHTML = "Rating: " + updatedRating;

                button.classList.add("disabled");
                button.removeEventListener("click", button_handling)

                 async function putJSON(data) {
                try {
                const response = await fetch("./api/update", {
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
            }
            console.log(service._id)

            putJSON({_id: service._id, rating: updatedRating, n: n+1});
            }
        }
    
       
        
        button.addEventListener("click", button_handling) 

    }

    function redraw(services) {
      servicesElement.innerHTML = "";
      servicesElement.innerHTML =  services.map(getserviceCode).join("\n");
    }
  
    async function loadData() {
      const res = await fetch("./api/services");
      const services = await res.json();
      me.redraw(services);
      services.map(updateRatings);
    }
  
    me.redraw = redraw;
    me.loadData = loadData;
    me.updateRatings = updateRatings;
  
    return me;
  }
  
  const main = BookingModule();


  
  
  main.loadData(); 

//Overall so many inspirations on how I can use the language 
