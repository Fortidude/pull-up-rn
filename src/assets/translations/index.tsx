import I18n from 'react-native-i18n';

let translations = {
    en: {
        login: {
            title: "Logowaie",
            login: "Zaloguj się",
            no_account: "Nie masz konta? Dołącz do nas!",
            remind_password: "Nie pamiętam hasła"
        },
        password_reminder: {
            send_link: "Wyślij link aktywacyjny"
        },
        register: {
            register: "Zarejestruj się"
        },

        routes: {
            planner: "Planner",
            login: "Logowanie",
            register: "Rejestracja",
            passwordreminder: "Przypomnij hasło",
            profile: "Profil",
            settings: "Ustawienia"
        },

        fields: {
            email: "Email",
            password: "Hasło",
            password_repeat: "Powtórz hasło"
        }
    }
};

I18n.fallbacks = true;
I18n.translations = translations;

export default I18n;
