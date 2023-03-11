$(function() {
    // Linhas de código para pegar o datepicker
    $("#datepicker").datepicker();
    $("#datepickerreturn").datepicker();
    
    // botão submit
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $("input[type='submit']").click(function(event) {
      event.preventDefault(); 
      
      //condicional pra validar se os campos foram preenchidos
      if ($("#valordiaria input").val() == "" || $("#datepicker").val() == "" || $("#datepickerreturn").val() == "") {
        alert("Preencha todos os campos.");
        return;
      }
      
      // Verifica se a data de retorno é maior ou igual à data de ida
      var dataida = new Date($("#datepicker").val());
      var dataretorno = new Date($("#datepickerreturn").val());
      if (dataretorno < dataida) {
        $("#modal").text("A data de retorno não pode ser superior à de ida");
        $("#modal").dialog();
        return;
      }
      
      // Verifica se a diferença entre as datas é maior que 30 dias
      var diferenca = (dataretorno - dataida) / (1000 * 60 * 60 * 24); // converte para dias
      if (diferenca > 30) {
        $("#modal").text("A diferença entre as datas não pode ser superior a 30 dias");
        $("#modal").dialog();
        return;
      }
      
      // Calcula o valor total
      var valordiaria = parseFloat($("#valordiaria input").val());
      var totaldiarias = diferenca == 0 ? 0.5 : diferenca - 1;
      var valortotal = totaldiarias * valordiaria + valordiaria / 2;
      
      // Exibe o resultado no modal
      $("#modal").html("<p>O valor total é: R$ " + valortotal.toFixed(2) + "</p>");
      $("#modal").dialog();
      console.log(valortotal);
    });
  });
  