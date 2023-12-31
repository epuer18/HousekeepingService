# AI prompts used in this project

## Data Generation

- **Prompt:** I want to generate fake data in the form of json objects for an application I am testing. The application is to post and book housekeeping and cleaning services and each object represent a service provided by someone or some company. The properties of the objects are as follows. userName: name of person or company providing the service, userPhone: phone number to contact in (XXX) XXX-XXXX format, workLocation: string of general work locations (i.e. greater Boston area), dayAvailable: specific date in MM-DD-YYYY format, timeAvailable: time of day in XX:XX military format, rateHour: numeric value representing a dollar per hour amount, cleaningServices: string listing services offered (i.e. "carpet cleaning, pet odor removal"), rating: number out of 5. I need 30 objects to be generated for all these fields keeping the consistent theme of housekeeping and cleaning.

- **Output:** Certainly! Here's a JSON array containing 30 fake data objects for housekeeping and cleaning services with the properties you specified:

(cropped output, full data in services.json)

```
[
  {
    "userName": "CleanCo",
    "userPhone": "(555) 123-4567",
    "workLocation": "Greater Boston Area",
    "dayAvailable": "10-15-2023",
    "timeAvailable": "09:00",
    "rateHour": 25,
    "cleaningServices": "Carpet Cleaning, Pet Odor Removal",
    "rating": 4.8
  },
  {
    "userName": "Sparkling Homes",
    "userPhone": "(555) 987-6543",
    "workLocation": "Cambridge, MA",
    "dayAvailable": "10-16-2023",
    "timeAvailable": "14:30",
    "rateHour": 30,
    "cleaningServices": "Deep Cleaning, Window Washing",
    "rating": 4.9
  },
...
```

- **Prompt:** The time on my form is showing up as 24 hr, how can i change it to regular time ?

- **Output:** If the time on your form is being inputted via an <input type="time"> element, it's worth noting that the browser's default behavior for this input type is to use the 24-hour format. There's no native way to change this behavior. However, if you'd like to display the time in a 12-hour format (AM/PM) after it has been selected or for other purposes, you can convert it using JavaScript.

```
function formatTime(time) {
const [hours, minutes] = time.split(":");
const parsedHours = parseInt(hours, 10);
const amPm = parsedHours >= 12 ? "PM" : "AM";
const formattedHours = parsedHours % 12 || 12; // Convert 0 to 12 for 12-hour format
return `${formattedHours}:${minutes} ${amPm}`;
}
```
