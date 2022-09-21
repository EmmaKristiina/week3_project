/* Lähteinä käytetty
https://www.w3schools.com/jsref/prop_html_classname.asp*/
import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

if (document.readyState !== "loading") {
  console.log("valmis");
  initialize();
} else {
  document.addEventListener("DOMContetntLoaded", function () {
    console.log("else valmis");
    initialize();
  });
}

function initialize() {
  const tab = document.getElementById("tabBody");

  async function getdata() {
    const url =
      "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
    const dataPromise = await fetch(url);
    const dataJSON = await dataPromise.json();
    const url2 =
      "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
    const datapromise2 = await fetch(url2);
    const dataJSON2 = await datapromise2.json();

    const temp = dataJSON.dataset.dimension.Alue.category.label;
    const temp1 = dataJSON.dataset.value;
    const temp2 = dataJSON2.dataset.value;

    const areas = Object.values(temp);
    const population = Object.values(temp1);
    const employment = Object.values(temp2);

    var i = 0;
    areas.forEach((area) => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      var per, rounded;

      td1.innerText = area;
      td2.innerHTML = population[i];
      td3.innerHTML = employment[i];

      per = employment[i] / population[i];
      rounded = per.toFixed(2);
      const text = document.createTextNode(rounded);
      td4.appendChild(text);
      i++;
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      if (per > 0.45) {
        tr.appendChild(td4).className = "over";
      }
      if (per < 0.25) {
        tr.appendChild(td4).className = "bad";
      }
      tr.appendChild(td4);
      tab.appendChild(tr);
    });
  }

  getdata();
}
