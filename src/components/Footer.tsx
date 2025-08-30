// components/Footer.tsx
import React from 'react';
import { useIntl } from 'react-intl/index'; // If you are using react-intl v3.12.0 or newer

// If you are using an older version of react-intl, use the following import instead:
// import { injectIntl, IntlShape } from 'react-intl';
import I18nKey from '../lib/I18nKey';

const Footer: React.FC = () => {
    const intl = useIntl();

    return (
        <footer className="bg-[#0a0c0f] py-10 px-5 text-center border-t border-[rgba(255,255,255,0.08)]">
            <div className="links flex justify-center gap-6 flex-wrap mb-4">
                <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#pricing">{intl.formatMessage({
                    id: I18nKey.PRICING,
                })}</a>
                <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#about">{intl.formatMessage({
                    id: I18nKey.ABOUT,
                })}</a>
                <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#donate">{intl.formatMessage({
                    id: I18nKey.DONATE,
                })}</a>
                <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#faq">{intl.formatMessage({
                    id: I18nKey.FAQ,
                })}</a>
                <a className="text-[#a5afc7] text-sm hover:text-[#e6e8ee] transition-colors duration-300" href="#signup">{intl.formatMessage({
                    id: I18nKey.SIGN_UP,
                })}</a>
            </div>
            <p className="text-[#a5afc7] text-sm">{intl.formatMessage({
                id: I18nKey.COPYRIGHT,

            }, { year: new Date().getFullYear() })} </p>
        </footer>
    );
};

export default Footer;