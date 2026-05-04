<?php

namespace App\Http\Controllers;

use App\Mail\QuotationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class QuotationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'formData.name' => 'required|string|max:255',
            'formData.email' => 'required|email|max:255',
            'formData.phone' => 'required|string|max:20',
            'formData.company' => 'nullable|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.product.name' => 'required|string',
            'items.*.product.id' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            $adminEmail = config('mail.admin_email') ?? 'contact@camerounhydrauliques.com';
            
            Mail::to($adminEmail)
                ->cc($validated['formData']['email']) // Optional: send copy to client
                ->send(new QuotationRequest($validated['formData'], $validated['items']));

            return response()->json([
                'message' => 'Votre demande de devis a été envoyée avec succès.'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Quotation Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
