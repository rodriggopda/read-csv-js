$(document).ready(function() {

  let csv_link = "  "; // colar aqui
  let t_header = $(".t-header");
  let t_body = $(".t-body");

  $.ajax({
    url: csv_link,
  })
  .done(function(data) {

    let arr = data.split(/\r\n/);

    let ct_body;

    for (let i = 0; i < arr.length; i++) {

      // console.log(i);

      let col = arr[i].split(",");

      if(i === 0 && i <= col.length) {
        
        for(let c = 0; c < col.length; c++) {
          t_header.append(`<th>${col[c]}</th>`);
        }
      } else {
        ct_body += '<tr>';

        for(let c = 0; c < col.length; c ++) {
          ct_body += `<td> ${col[c]} </td>`;
        }

        ct_body += '</tr>';
      }

      //console.log("final");
      
    }

    t_body.append(ct_body);

  });

});