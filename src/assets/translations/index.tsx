import I18n from 'react-native-i18n';

let translations = {
    en: {
        login: {
            title: "Logowaie",
            login: "Zaloguj się",
            no_account: "Nie masz konta? Dołącz do nas!",
            remind_password: "Nie pamiętam hasła",
            login_alert_ok_button: "Spróbuj ponownie",
            password_multiple_wrong: "W przypadku pewności co do poprawnego adresu email zaleca się skorzystanie z opcji przypomnienia hasła."
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
        },

        buttons: {
            cancel: "Anuluj",
            save: "Zapisz"
        },

        errors: {
            "failed": "Nie powiodło się.",
            "Bad credentials": "Błędna nazwa użytkownika lub niepoprawne hasło. Możesz skorzystać z opcji przypomnienia hasła.",
        }
    }
};

I18n.fallbacks = true;
I18n.translations = translations;

export default I18n;
