export type ContactInfo = {
  call_label: string;
  call_value: string;
  email_label: string;
  email_value: string;
  location_label: string;
  location_value: string;
  form_title: string;
  form_subtitle: string;
  map_embed_url: string;
  banner_image: string;
  video_image: string;
};

export const defaultContact: ContactInfo = {
  call_label: 'Téléphone principal',
  call_value: '(+237) 674 048 225 / (+237) 696 781 077',
  email_label: 'E-mails',
  email_value: 'contact@camerounhydraulique.com • cameroun.hydraulique@yahoo.fr',
  location_label: 'Agences Cameroun Hydraulique',
  location_value:
    'Douala : entre Texaco Nkolouloun et Carrefour Photo Golden (face Boulangerie de luxe) • Douala Yassa : entrée salle de fête BOCOM • Yaoundé : en face Tradex Olembe • BP 9593 Douala Cameroun',
  form_title: 'Parlons de vos besoins hydrauliques',
  form_subtitle:
    'Douala : (+237) 674 048 225 • Yaoundé : (+237) 696 781 077 — Service urgent disponible 7j/7.',
  map_embed_url:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1995.6073240853046!2d9.7067669!3d4.0615366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610dfc22ef6c2b%3A0xa8f0c7cdeaec1c30!2sTexaco%20Nkolouloun!5e0!3m2!1sfr!2scm!4v1739126400000!5m2!1sfr!2scm',
  banner_image: '/img/breadcrumb.jpg',
  video_image: '/img/video.png',
};
