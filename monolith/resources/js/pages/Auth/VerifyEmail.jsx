import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Vérification de l'email" />

            <div className="mb-4 text-sm text-gray-600">
                Merci de vérifier votre email en cliquant sur le lien que nous
                venons de vous envoyer. Si vous n’avez rien reçu, nous pouvons
                vous renvoyer un email.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Un nouveau lien de vérification a été envoyé.
                </div>
            )}

            <div className="mt-4 flex items-center justify-between">
                <form onSubmit={submit}>
                    <PrimaryButton disabled={processing}>
                        Renvoyer un email de vérification
                    </PrimaryButton>
                </form>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm text-gray-600 underline hover:text-gray-900"
                >
                    Se déconnecter
                </Link>
            </div>
        </>
    );
}

VerifyEmail.layout = (page) => <GuestLayout>{page}</GuestLayout>;
