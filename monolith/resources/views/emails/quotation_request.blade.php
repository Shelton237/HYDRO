<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
        .header { border-bottom: 2px solid #1f6f2d; padding-bottom: 10px; margin-bottom: 20px; }
        .info-grid { display: grid; grid-template-columns: 120px 1fr; gap: 10px; margin-bottom: 30px; }
        .label { font-weight: bold; color: #666; }
        .item-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .item-table th, .item-table td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
        .item-table th { background: #f9f9f9; color: #1f6f2d; }
        .footer { margin-top: 40px; font-size: 12px; color: #999; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="color: #1f6f2d; margin: 0;">Nouvelle Demande de Devis</h2>
            <p style="margin: 5px 0 0;">Cameroun Hydraulique SARL</p>
        </div>

        <div class="info-grid">
            <div class="label">Nom :</div>
            <div>{{ $formData['name'] }}</div>
            
            <div class="label">Entreprise :</div>
            <div>{{ $formData['company'] ?? 'N/A' }}</div>
            
            <div class="label">Email :</div>
            <div>{{ $formData['email'] }}</div>
            
            <div class="label">Téléphone :</div>
            <div>{{ $formData['phone'] }}</div>
        </div>

        <h3 style="color: #1f6f2d;">Articles demandés</h3>
        <table class="item-table">
            <thead>
                <tr>
                    <th>Désignation</th>
                    <th>Réf.</th>
                    <th>Quantité</th>
                </tr>
            </thead>
            <tbody>
                @foreach($items as $item)
                <tr>
                    <td>{{ $item['product']['name'] }}</td>
                    <td><code>{{ $item['product']['id'] }}</code></td>
                    <td><strong>{{ $item['quantity'] }}</strong></td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="footer">
            Cet email a été envoyé via le site web camerounhydrauliques.com
        </div>
    </div>
</body>
</html>
