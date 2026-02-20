type ContactMapProps = {
    map_embed_url: string
}

const ContactMap = ({ map_embed_url }: ContactMapProps) => {
    return (
        <div className="map-section">
            <div className="map-items">
                <div className="googpemap">
                    <iframe src={map_embed_url} style={{ border: 0 }} allowFullScreen loading="lazy" />
                </div>
            </div>
        </div>
    )
}

export default ContactMap
