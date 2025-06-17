import { Helmet } from "react-helmet-async";
import "@assets/css/style_login.css"
import "@assets/css/vendors/bootstrap.css";
import "@assets/css/vendors/feather-icon.css";
import "@assets/css/vendors/font-awesome.css";
import "@assets/css/vendors/icofont.css";
import "@assets/css/vendors/themify.css";
import "@assets/css/vendors/flag-icon.css";
import "@assets/css/vendors/scrollbar.css";

const MetaTags = () => {
    return (
        <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/* Íconos */}
            <link rel="icon" href="assets/images/ade/adee.png" type="image/x-icon" />
            <link rel="shortcut icon" href="/assets/images/ade/adee.png" type="image/x-icon" />
            {/* Fuentes */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </Helmet>
    );
};

export default MetaTags;