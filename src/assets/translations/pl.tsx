export default {
    mics: {
        amount: "Ilość",
        circuit_end: "koniec",
        days: "dni",
        edit_mode: "Tryb edycji",
        effectiveness: "skuteczność",
        exercise: "Ćwiczenie",
        exercise_variant: "Wariant",
        filter: "Filtruj",
        goal_type: 'Typ celu',
        hide_finished_goals: "Ukryj wykonane cele",
        none: "Brak",
        left: "pozostało",
        of: "z",
        pick_bar_to_check_time: "Wybierz słupek, aby zobaczyć godzinę",
        reps_record: "Rekord powtórzeń",
        scroll_to_today: "Dzisiaj",
        tutorial: "Tutorial",
        type_name: "Wpisz nazwę",
        weight_record: "Rekord ciężaru",
        your_trainings: "Lista utworzonych treningów",
        you_have_to_pick_exercise: "Musisz wybrać ćwiczenie",
        you_have_to_type_exercise: "Musisz wpisać ćwiczenie",
    },

    boarding: {
        step_one: {
            titie: "Twój osobisty dziennik treningowy",
            line_one: {
                title: 'Utwórz listę ćwiczeń',
                description: 'Utwórz treningi (np. Pull, Push lub poniedziałek, środa itp.), a następnie uzupełnij je o ćwiczenia (np. squat, deadlift, bench press, pull up itp.)'
            },
            line_two: {
                title: 'Notuj sety i powtórzenia',
                description: 'Dodaj set poprzez kliknięcie utworzonego ćwiczenia, następnie uzupełnij formularz o ilość wykonanych powtórzeń, ciężar oraz wybierz poziom trudności (1-3).'
            },
            line_three: {
                title: 'Monitoruj swoje cardio',
                description: 'Przejdź do trybu cardio i wybierz interesujący Cię program (np. tabata, klasycznie itp.). Dodatkowo możesz wybrać jedno z utworzonych wcześniej ćwiczeń typu "czas", a cały naliczony czas zostanie dodany jako jeden set.'
            },
            line_four: {
                title: 'Zdobywaj cele treningowe',
                description: 'W trakcie tworzenia danego ćwiczenia możesz zdefiniować swój cel. Przykładowo wykonanie 10 setów czy 100 powtórzeń w ciągu tygodnia.'
            },
            line_five: {
                title: 'Obserwuj statystyki',
                description: 'Aplikacja dostarcza szczegółowe statystyki odnośnie twoich treningów. Postęp (powtórzenia, ciężar), najczęściej wykonywane ćwiczenia, kalendarz ze szczegółową historią i wiele więcej.'
            },
            line_six: {
                title: 'Ustal długość obiegu',
                description: 'Domyślnie obieg ustawiony jest na tydzień i po tym okresie wszystkie cele treningowe zostają wyzerowane. Możesz zmienić długość obiegu z poziomu swojego profilu.'
            }
        },
        step_last: {
            get_started: "Zaczynamy!"
        }
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
        avatar: {
            picture_to_big_title: "Zdjęcie jest za duże",
            picture_to_big_text: "Zdjęcie zostało zmniejszone do maksymalnie 400x400 px, jednak i tak jest wielkość to %{size} MB. Maksymalny rozmiar to 0.6 MB."
        },
        circuit_length: "Długość obiegu",
        language: "Język",
        show_on_boarding: "Ekran powitalny",
        show_on_boarding_subtext: "Tutorial dla nowego użytkownika",
        remove_my_account: "Usuń konto",
        settings: "Ustawienia",
        theme: "Motyw kolorystyczny",
        planner_calendar_mode: "Grupowanie - kalendarz",
        planner_calendar_mode_subtext: "Ćwiczenia możesz grupować wg. własnych treningów (np. pull / push / leg day itp.) lub względem daty ostatniego wykonania (wczoraj, 3 dni temu, tydzień temu itp.)",
        planner_footer_circle_component: {
            title: "Strona główna | stopka",
            subtext: "Środkowy element",
            options: {
                avatar: "Awatar użytkownika",
                circuit_left: "Obecny obieg (pozostało dni)",
                circuit_progress: "Obecny obieg (%)"
            }
        },
        notifications: {
            title: "Powiadomienia",
            turn_on: "Włącz powiadomienia",
            turned_on: "Powiadomienia aktywne",
            turned_off: "Powiadomienia wyłączone"
        },
    },

    modals: {
        addTreningSection: {
            title: "Dodaj Trening"
        },
        addGoalModal: {
            addExerciseButtonText: "Utwórz własne ćwiczenie",
            training: "trening",
            create_own_exercise: "Utwórz własne ćwiczenie",
            pick_exercise_from_list: "Wybierz ćwiczenie z listy",
            provide_the_required_quantity: "Podaj wymaganą ilość"
        },
        edit_goal_modal: {
            provide_the_required_quantity: "Podaj wymaganą ilość"
        },
        calendar_day_modal: {
            number_of_exercise: "Ilość ćwiczeń"
        },
        createExerciseModal: {
            addGoalButtonText: "Wybierz z listy"
        }
    },

    planner: {
        first_step: {
            title: "Plan treningowy",
            add_first_training: "Dodaj swój pierwszy trening",
            own_button_text: "Utwórz własny",
            predefined_button_text: "Wybierz gotowy",
            own: {
                placeholder: "np. \"Poniedziałek\" lub \"Push\"",
            },
            predefined: {
                fbw_basic: "FBW (podstawowy)",
                push_pull_basic: "Push / Pull (podstawowy)",
            }
        },
        add_training_title_information: `Nazwą treningu może być dzień tygodnia ("Poniedziałek") lub typ ćwiczeń, np. "Trening Pull" czy "Trening nóg"`,
        empty_list_iniformation: `Nazwą treningu może być dzień tygodnia ("Poniedziałek") lub typ ćwiczeń np. "Trening Pull" czy "Trening nóg"`,
        done_of: "Zrobiono",
        other: "Pozostałe",
        difficultLevelTitle: "Trudność",
        difficultLevelTitleFull: "Poziom trudności",
        difficultLevels: {
            1: "Łatwo",
            2: "Średnio",
            3: "Trudno",

            easy: "Łatwo",
            medium: "Średnio",
            hard: "Trudno"
        },
        custom_mode: {
            calendar: {
                today: "Dzisiaj",
                yesterday: "Wczoraj",
                two_days_ago: "Dwa dni temu",
                three_days_ago: "Trzy dni temu",
                four_days_ago: "Cztery dni temu",
                five_days_ago: "Pięć dni temu",
                six_days_ago: "Sześć dni temu",
                week_ago: "Tydzień temu",
                older_than_week_ago: "Starsze niż tydzień",
                circuit_ago: "W poprzednim obiegu",
                older: "Starsze"
            }
        },
        missing: "Brakuje",
        last_set__short_text: "Ostatnio",
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
        traning_section: "Traning",
        all_traninings: "Wszystkie",
        exercise: "Ćwiczenie",
        effectiveness: {
            title: "Utrzymuj wysoką skuteczność poprzez realizowanie swoich celów w każdym obiegu treningowym."
        },
        progress: {
            title: "Regularnie zwiększaj ciężar badź ilość powtórzeń."
        }
    },

    cardio: {
        screen_awake_title: "Nie wyłączaj ekranu",
        screen_awake_subtitle: "Tylko w trakcie odliczania",

        start: "Start",
        resume: "Wznów",
        reset: "Resetuj",
        round: "Runda",
        pause: "Przerwa",
        end: "Koniec"
    },

    themes: {
        light: "Dzienny",
        dark: "Nocny",
        cream: "Kremowy"
    },

    locales: {
        en: "Anglielski",
        pl: "Polski"
    },

    routes: {
        '': '',
        addtraining: 'Dodaj trening',
        auth: "Zaloguj się",
        calendar: "Kalendarz",
        cardio: "Stoper",
        effectivenessstats: "Skuteczność",
        home: "planer",
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
        statistics: "Statystyki",
        themepicker: "Wybierz motyw",
        notifications: "Powiadomienia"
    },

    fields: {
        additional_weight: "Dodatkowy ciężar? (KG)",
        date: "Data",
        email: "Email",
        email_validate: "Potwierdź adres email",
        number_of_reps_done: "Ilość wykonanych powtórzeń",
        number_of_required_reps: "Ilość wykonanych powtórzeń",
        number_of_required_time: "Ilość minutów",
        number_of_required_sets: "Ilość setów",
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
        edit: "Edytuj",
        finish: "Zakończ",
        logout: "Wyloguj się",
        next: "Następny",
        now: "Teraz",
        ok: "OK",
        unfinished_goals: "CELE < 100%",
        remove: "Usuń",
        save: "Zapisz",
        scroll_to_now: "Przewiń do chwili obecnej",
        skip: "Pomiń",
        today: "Dzisiaj",
        toggle_collapse: "Zwiń",
        toggle_expand: "Rozwiń",
    },

    warnings: {
        attention: "Uwaga",
        information: "Informacja",
        possible_swap_weight_reps: "Prawdopodobnie pomylono ilość wykonanych powtórzeń z ciężarem. Zignoruj wiadomość i ponownie zapisz jeżeli wszystko jest prawidłowo.",
        still_during_production: "Wciąż nad tym pracujemy.",
        user_removed_data_erased: "Wszystkie dane zostały wymazane bezpowrotnie. Zostaniesz wylogowany.",
        not_synchronized: "Brak synchronizacji.",
        not_synchronized_text: "Pewne wykonane akcje (np. dodanie setu) zostały wykonane w trybie offline i po wylogowaniu zostaną utracone. \n\nAby temu zapobiec kliknij anuluj, następnie połącz się z internetem."
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
}
