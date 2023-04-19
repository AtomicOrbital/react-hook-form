import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

const resources = {
    vi: {
        translation: {
            "email": "Địa chỉ email",
            "password": "Mật khẩu",
            "repeatPassword": "Xác nhập lại mật khẩu",
            "Name": "Họ và tên",
            "gender": "Giới tính",
            "city": "Thành Phố",
            "register": "Đăng ký ngay"

        },
    },
    en: {
        translation: {
            "email": "Address email",
            "password": "Password",
            "repeatPassword": "Repeat Password",
            "Name": "Name",
            "gender": "Gender",
            "region": "Region",
            "city" : "City",
            "register": "Register"
        }
    }
};


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "vn",
        // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });



export default i18n;