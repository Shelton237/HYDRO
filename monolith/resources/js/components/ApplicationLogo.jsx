export default function ApplicationLogo({ className = '', ...props }) {
    const classes = className ? className : 'h-32 w-auto object-contain';

    return <img {...props} src="/img/logo/logo.jpg" alt="Cameroun Hydraulique SARL" className={classes} />;
}
