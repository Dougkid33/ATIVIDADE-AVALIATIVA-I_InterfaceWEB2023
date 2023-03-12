$(function() {
    $("#datepicker").datepicker();
    $("#datepickerreturn").datepicker();
    
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $("input[type='submit']").click(function(event) {
      event.preventDefault(); 
      
      
      if ($("#valordiaria input").val() == "" || $("#datepicker").val() == "" || $("#datepickerreturn").val() == "") {
        alert("Preencha todos os campos.");
        return;
      }
      
      var dataida = new Date($("#datepicker").val());
      var dataretorno = new Date($("#datepickerreturn").val());
      if (dataretorno < dataida) {
        $("#modal").text("A data de retorno não pode ser superior à de ida");
        $("#modal").dialog();
        return;
      }
      
      var diferenca = (dataretorno - dataida) / (1000 * 60 * 60 * 24); // converte para dias
      if (diferenca > 30) {
        $("#modal").text("A diferença entre as datas não pode ser superior a 30 dias");
        $("#modal").dialog();
        return;
      }
      
      var valordiaria = parseFloat($("#valordiaria input").val());
      var totaldiarias = diferenca == 0 ? 0.5 : diferenca - 1;
      var valortotal = totaldiarias * valordiaria + valordiaria / 2;
      
      $("#modal").html("<p>O valor total é: R$ " + valortotal.toFixed(2) + "</p>");
      $("#modal").dialog();
      console.log(valortotal);
    });
  });
  