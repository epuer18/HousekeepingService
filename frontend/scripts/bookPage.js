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
      <div class="card card-body col-md-3">
            <h3>${service.userName} </h3>
            <p>Phone:${service.userPhone}  </p>
            <p>Location Open To Work At:${service.workLocation}  </p>
            <p>Day available ($/hr): ${service.dayAvailable}  </p>
            <p>Time Available ($/hr): ${service.timeAvailable}  </p>
            <p>Rate ($/hr): ${service.rateHour}  </p>
            <p>Cleaning Services: ${service.cleaningServices} </p>
            <p>Rating: ${service.rating}</p>
        </div>
    `;
    }
  
    function redraw(services) {
      let rows =  services.map(getserviceCode);
      servicesElement.innerHTML = "";
      servicesElement.innerHTML =  rows;
    }
  
    async function loadData() {
      const res = await fetch("./api/services");
      const services = await res.json();
  
  
      // should already be max 20 but
      me.redraw(services.slice(0, 20));
    }
  
    me.redraw = redraw;
    me.loadData = loadData;
  
    return me;
  }
  
  const main = BookingModule();
  
  
  main.loadData();