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

      return ` 
      <div class="card booking-card col-sm-12 col-md-4 col-lg-3">
            <h3 class="card-title"><strong>${service.userName}</strong></h3>
            <p>Phone: ${service.userPhone}  </p>
            <p>Location Open To Work At: ${service.workLocation}  </p>
            <p>Day available: ${service.dayAvailable}  </p>
            <p>Time Available: ${service.timeAvailable}  </p>
            <p>Rate ($/hr): ${service.rateHour}  </p>
            <p>Cleaning Services: ${service.cleaningServices} </p>
            <p>Rating: ${service.rating}</p>
        </div>
    `;
    }
  
    function redraw(services) {

      servicesElement.innerHTML = "";
      servicesElement.innerHTML =  services.map(getserviceCode).join("\n");
    }
  
    async function loadData() {
      const res = await fetch("./api/services");
      const services = await res.json();
      me.redraw(services);
    }
  
    me.redraw = redraw;
    me.loadData = loadData;
  
    return me;
  }
  
  const main = BookingModule();
  
  
  main.loadData();