@component('mail::message')
# Pedido número: {{ $order->id }}

Produto: **{{ $order->product->name }}**

Quantidade: **{{ $order->amount }}**

Valor total: **R$ {{ number_format($order->total, 2, ',', '.') }}**

Estamos processando o seu pedido, aguarde as próximas etapas do seu pedido.

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
