<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class QuotationRequest extends Mailable
{
    use Queueable, SerializesModels;

    public $formData;
    public $items;

    public function __construct($formData, $items)
    {
        $this->formData = $formData;
        $this->items = $items;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(config('mail.from.address'), config('mail.from.name')),
            replyTo: [
                new Address($this->formData['email'], $formData['name'] ?? 'Client'),
            ],
            subject: 'Nouvelle Demande de Devis - ' . ($this->formData['name'] ?? 'Client'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.quotation_request',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
