@extends('layouts.app')

@section('content')
    <p id="result">Atualizando o telefone... </p>
    <script type="text/javascript">
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 204) {
                document.getElementById('result').innerText = 'Telefone atualizado com sucesso';
            } else {
                document.getElementById('result').innerText = 'Não foi possível atualizar o telefone';
            }
        };
        xhttp.open('PATCH', 'http://dev.code-education.com.br/api/customers/phone_numbers/{{$token}}', true);
        xhttp.send();
    </script>
@endsection    