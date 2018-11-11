import I18n from "react-native-i18n";

export const locales:{[key: string]: string} = {
    en: "English",
    pl: "Polski"
}

let translations = {
    pl: {
        mics: {
            circuit_end: "koniec",
            days: "dni",
            effectiveness: "skuteczność",
            left: "pozostało",
            of: "z",
            filter: "Filtruj",
            scroll_to_today: "Dzisiaj"
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
            send_link: "Wyślij link aktywacyjny",
            link_has_been_sent: "Link aktywacyjny został wysłany.\nSprawdź swoją skrzynke e-mail."
        },
        password_reset: {
            change_password: "Zmień hasło",
            password_changed: "Hasło zostało zmienione.\nMożesz się zalogować."
        },
        register: {
            register: "Zarejestruj się",
            success_title: "Konto utworzone",
            success_text: "Możesz się teraz zalogować.",

            errors: {
                email: "Adres email jest nie poprawny",
                password_length_not_valid: "Podane hasło jest za krótkie.\nWymagane minimum 5 znaków",
                password_not_match: "Podane hasła nie są takie same"
            }
        },

        settings: {
            circuit_length: "Długość obiegu",
            language: "Język",
            notifications: "Powiadomienia",
            remove_my_account: "Remove my account",
            settings: "Ustawienia",
            theme: "Motyw kolorystyczny",
            planner_footer_circle_component: {
                title: "Strona główna | stopka",
                subtext: "Środkowy element",
                options: {
                    avatar: "Awatar użytkownika",
                    circuit_left: "Obecny obieg (pozostało dni)",
                    circuit_progress: "Obecny obieg (%)"
                }
            }
        },

        modals: {
            addTreningSection: {
                title: "Dodaj Trening"
            }
        },

        planner: {
            add_first_training: "Dodaj swój pierwszy trening",
            done_of: "Zrobiono",
            missing: "Brakuje",
            type: "Typ",
            types: {
                none: "Brak",
                sets: "Sety",
                reps: "Powtórzenia",
                time: "Czas",
                weight: "waga"
            },
            circuits: {
                all: "Wszystkie",
                previous: "Poprzedni",
                current: "Obecny"
            }
        },

        statistics: {
            circuit: "Obieg",
            sort: "Sortowanie",
            effectiveness: {
                title: "Utrzymuj wysoką skuteczność poprzez realizowanie swoich celów w każdym obiegu treningowym."
            }
        },

        themes: {
            light: "Dzienny",
            dark: "Nocny"
        },

        locales: {
            en: "Anglielski",
            pl: "Polski"
        },

        routes: {
            auth: "Zaloguj się",
            calendar: "Kalendarz",
            effectivenessstats: "Skuteczność",
            initpage: "Pull Up!",
            languagepicker: "Wybierz język",
            login: "Logowanie",
            passwordreset: "Zmień hasło",
            passwordreminder: "Przypomnij hasło",
            planner: "Pull Up!",
            profile: "Profil",
            popularitystats: "Popularność",
            progressstats: "Postęp",
            register: "Rejestracja",
            settings: "Ustawienia",
            themepicker: "Wybierz motyw"
        },

        fields: {
            additional_weight: "Dodatkowy ciężar? (KG)",
            date: "Data",
            email: "Email",
            email_validate: "Potwierdź adres email",
            number_of_reps_done: "Ilość wykonanych powtórzeń",
            password: "Hasło",
            password_repeat: "Powtórz hasło",
            type_name: "Podaj nazwę"
        },

        buttons: {
            add: "Dodaj",
            add_set: "Dodaj set",
            cancel: "Anuluj",
            close: "Zamknij",
            clickToClose: "Kliknij by anulować",
            edit: "Edycja",
            finish: "Zakończ",
            now: "Teraz",
            remove: "Usuń",
            save: "Zapisz",
            logout: "Wyloguj się",
            ok: "OK"
        },

        errors: {
            "Bad credentials": "Błędna nazwa użytkownika lub niepoprawne hasło. Możesz skorzystać z opcji przypomnienia hasła.",
            "failed": "Nie powiodło się.",
            "no_internet_connection": "Brak połączenia z serwerem.",
            "no_internet_connection_required_for_this_action": "Wymagane połączenia z internetem. ",
            "no_internet_connection_text": "Pracujesz w trybie offline. Nadal możesz wysyłać sety czy modyfikować oraz tworzyć treningi. Synchronizacja danych nastąpi przy ponownym połaczeniu z internetem.",
            "USER_ALREADY_EXIST": "Użytkownik już istnieje",
            "SERVER_ERROR": "Wystąpił błąd. Spróbuj ponownie."
        }
    },
    en: {
        locales: {
            en: "English",
            pl: "Polish"
        },
    }
};

I18n.fallbacks = true;
I18n.translations = translations;

export default I18n;
