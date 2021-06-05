async function boot() {
  let csv_link = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSaTp-aYU6dmV0TX6laiFZq0j0h3wFoTYyl1PkakuZgChxkoDwpETWwVhsms-TTELxWF-X_ORF63cfy/pub?output=csv";

  await $.ajax({
    url: csv_link,
  })
  .done(function(data) {

    //\d{1}\,\d{3} teste 5,194 para 5.194
    
    data = data.split(/\r\n/);
    
    var lines = [];
    var col = [];
    var res = [];

    for(let i = 0; i < data.length; i++) {
      lines.push(data[i].split((/([a-z][A-Z]{*})\,/)));
    }

    lines.splice(0, 1);

    for(let i = 0; i < lines.length; i++) {
      col.push(lines[i])
      res.push({ "value": i, "data": col[i][0].split(/[a-zA-Z]{0}\,/)})
    }

    var cities = document.querySelector("#cities");
    var consume = document.querySelector("#consume");
    var calcButton =  document.getElementById("calc");
    var city = [];
    

    for(let i = 0; i < res.length; i++) {
      city.push(document.createElement("option"));
      city[i].setAttribute("value", res[i].value)
      city[i].innerHTML = res[i].data[0]
      cities.append(city[i])
    }

    var rad;
    var radValue = document.getElementById("rad");
    var pkit = document.getElementById("pkit");

    cities.addEventListener("change", function() {
      rad = res[cities.value].data[2]+","+res[cities.value].data[3];
      radValue.value = rad.replace(/"/g, "");
    });

    calcButton.addEventListener("click", function() {
      // CONSUMO DA CONTA/30/MÉDIA ANUAL DE IRRADIAÇÃO DA CIDADE/0,75
      let rad = radValue.value.replace(/\,/g, ".");						
      let potency = consume.value / 30 / rad / 0.75;
      pkit.innerHTML = potency.toFixed(2);
    });

    return;

  });
}

$(document).ready(function() {

  boot();

});