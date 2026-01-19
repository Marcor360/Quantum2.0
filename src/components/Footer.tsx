import "./footer.css";

import LinesFooter from "../assets/svg/360/LineasFooter.svg?react";
import LettersFooter from "../assets/svg/360/Letras Quantum Footer.svg";
import FacebookIcon from "../assets/svg/redes/facebook.svg";
import InstagramIcon from "../assets/svg/redes/instagram.svg";
import WhatsappIcon from "../assets/svg/redes/whatsapp.svg";
import MailIcon from "../assets/svg/redes/mail.svg";

export default function Footer() {
    return (
        <footer className="q-footer">
            <div className="q-footer__bg" aria-hidden="true">
                <LinesFooter className="q-footer__lines" />
            </div>

            <div className="q-footer__content Conteiner">
                <div className="q-footer__top">
                    <div className="q-footer__cta">
                        <h3>¡Impulsemos<br />tus ideas!</h3>
                        <a className="q-footer__btn" href="#contacto">Vamos a hablar</a>
                    </div>
                </div>

                <div className="q-footer__wordmark" aria-hidden="true">
                    <img src={LettersFooter} alt="" />
                </div>

                <div className="q-footer__bottom">
                    <span>© 2025 Quantum Marketing & Sales</span>
                    <div className="q-footer__social">
                        <a href="#" aria-label="Facebook">
                            <img src={FacebookIcon} alt="" />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <img src={InstagramIcon} alt="" />
                        </a>
                        <a href="#" aria-label="WhatsApp">
                            <img src={WhatsappIcon} alt="" />
                        </a>
                        <a href="#" aria-label="Email">
                            <img src={MailIcon} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
