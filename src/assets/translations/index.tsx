import I18n from 'react-native-i18n';

export const locales:{[key: string]: string} = {
    en: 'English',
    pl: 'Polski'
}

let translations = {
    pl: {
        mics: {
            effectiveness: "skuteczność",
            left: "pozostało"
        },

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

        settings: {
            theme: "Motyw kolorystyczny",
            language: "Język"
        },

        themes: {
            light: "Dzienny",
            dark: "Nocny"
        },

        locales: {
            en: 'Anglielski',
            pl: 'Polski'
        },

        routes: {
            planner: "Pull Up!",
            login: "Logowanie",
            register: "Rejestracja",
            passwordreminder: "Przypomnij hasło",
            profile: "Profil",
            settings: "Ustawienia",
            themepicker: "Wybierz motyw",
            languagepicker: "Wybierz język",
            initpage: "Pull Up!"
        },

        fields: {
            email: "Email",
            password: "Hasło",
            password_repeat: "Powtórz hasło"
        },

        buttons: {
            cancel: "Anuluj",
            save: "Zapisz",
            logout: "Wyloguj się",
            ok: 'OK'
        },

        errors: {
            "failed": "Nie powiodło się.",
            "Bad credentials": "Błędna nazwa użytkownika lub niepoprawne hasło. Możesz skorzystać z opcji przypomnienia hasła.",
            "no_internet_connection": "Brak połączenia z serwerem.",
            "no_internet_connection_text": "Pracujesz w trybie offline. Nadal możesz wysyłać sety czy modyfikować oraz tworzyć treningi. Synchronizacja danych nastąpi przy ponownym połaczeniu z internetem."
        }
    },
    en: {
        locales: {
            en: 'English',
            pl: 'Polish'
        },
    }
};

I18n.fallbacks = true;
I18n.translations = translations;

export default I18n;
