import I18n from 'react-native-i18n';

let translations = {
    pl: {
        about: {
            form: {
                email_placeholder: "Adres Email",
                header: "Masz pytanie do autora? Napisz!",
                text_placeholder: "Treść",
            }
        },
        auth: {
            sections: {
                login: "LOGOWANIE",
                register: "REJESTRACJE"
            },
            password_forget: "Nie pamiętasz hasła?",
            email_placeholder: "Email",
            username_placeholder: "Nazwa użytkownika",
            login_placeholder: "Nazwa użytkownika lub email",
            login_in: "Zaloguj się",
            min_5_characters: "minimum 5 znaków",
            now_can_login: 'Możesz się zalogować.',
            password_placeholder: "Hasło",
            password_repeat_placeholder: "Powtórz hasło",
            register_success: 'Rejestracja przebiegła pomyślnie.'
        },
        buttons: {
            cancel: 'Anuluj',
            close: 'Zamknij',
            choose_one: "Wybierz",
            create: 'Utwórz',
            'delete': "Usuń",
            edit: 'Edycja',
            join: "Dołącz",
            save: 'Zapisz',
            send: "wyślij",
            ok: 'OK',
            ready: 'Gotowe',
            refresh: 'Odśwież'
        },
        history: {
            one: "Pierwszy",
            two: "Drugi",
            three: "Trzeci",
            four: "Czwarty",
            five: "Piąty",
        },
        planner: {
            titles: {
                1: 'Treningi',
                2: 'Statystyki',
                3: 'Dodaj'
            },
            sub_titles: {
                1: 'Lista twoich ćwiczeń i celów',
                2: 'Sprawdź swoje wyniki',
                3: 'Dodaj nowe ćwiczeń lub cel'
            },
            sections: {
                add_new: 'Utwórz nową sekcje (trening)',
                name: 'Nazwa',

                today: 'dzisiejsze',
                yesterday: 'wczorajsze',
                two_days_ago: '2 dni temu',
                three_days_ago: '3 dni temu',
                four_days_ago: '4 dni temu',
                five_days_ago: '5 dni temu',
                six_days_ago: '6 dni temu',
                week_ago: 'tydzień temu',
                older_than_week_ago: 'starsze w obecnym obiegu',
                circuit_ago: 'w poprzednim obiegu',
                older: 'starsze',
                other: 'inne'
            },
            type: {
                none: '',
                none_t: 'brak',
                sets: 'sety',
                reps: 'powtórzenia',
                time: 'czas',
                weight: 'ciężar'
            },
            choice_type: {
                none: 'brak',
                sets: 'sets',
                reps: 'reps',
                time: 'czas',
                weight: 'ciężar',
                help: {
                    header: "Wybierz typ celu a następnie konkretnie ćwiczenie, które chcesz dodać do swojego planu.",
                    none: "dodaj do swojego planu dane ćwiczenie, zliczaj ilość wykonanych powtórzeń i setów, bez konkretnego celu.",
                    sets: "ustaw swój cel, np. 10 setów dla danego ćwiczenia i systematycznie dodawaj po każdym wykonanym. Na koniec będziesz wiedział ile Ci brakuje oraz będziesz mógł porównać wyniki z poprzednimi tygodniami / miesiącami itp.",
                    reps: "Podobnie jak z SETS, z tą różnicą, że nie ma znaczenia czy wykonasz swoje - przykładowo - 100 muscle up w 5 czy 20 seriach. Ważne, że będzie ich 100!",
                    time: "Używaj np. do statyki (progresje planche, front itp.) lub cardio (np. skakanka, biegi itp.)",
                }
            },
            exercise: {
                add_new: "Dodaj ćwiczenie",
                add_custom: "Dodaj własne ćwiczenie",
                name: "Nazwa",
                none_exercise_found: "Brak dostępnych ćwiczeń",
                variant: "Wariant",
                is_cardio: "Cardio"
            },
            create_set: {
                confirm_set: "Dodaj set",
                minutes: "minut",
                till_now: "dotychczas"
            },
            circuits:{
                current: 'Obecny',
                previous: 'Poprzedni',
                all: 'Wszystkie'
            }
        },
        training: {
            cardio: {

            }
        },
        errors: {
            "failed": "Nie powiodło się.",
            'Bad credentials': "Błędna nazwa użytkownika lub niepoprawne hasło. Czy masz już konto?",
            'VALIDATION_ERROR': "Nie prawidłowo wypełniony formularz",
            'USER_ALREADY_EXIST': "Podany adres email lub nazwa użytkownika jest już zajęta.",
            'Token is not valid.': "Wystąpił błąd autoryzacji. Zaloguj się ponownie",
            'DOMAIN.FIRST_FORM_NOT_FILLED': "Najpierw uzupełnij wymagany formularz",
            'Network request failed': "Nie wykryto połączenia z internetem.\nPołączenie z internetem jest wymagane przy pierwszym pobraniu listy. Później możesz działać offline.",
            'Network error': "Nie wykryto połączenia z internetem.",
            'Wait for synchronization': 'Trwa synchronizacja z serwerem. \nNoże potrwać do kilkunastu sekund. Spróbuj za chwile.'
        },
        informations: {
            info_level: "Twój poziom treningowy\nPoziom zależy od ilości minionych obiegów, ilości ustawionych oraz osiąganych celów jak również ogólnej aktywności. Poziom może spaść, jeżeli aktywność bądź osiągane cele zmaleją.\n W krótce pojawi się system sztucznej inteligencji, który będzie automatycznie dostosowywał twoje cele w zależności od ogólnych wyników. Będzie miało to bardzo duży wpływ na ogólny poziom.\nSystem automatycznego dostosowywania będzie można wyłączyć w ustawieniach.",
            info_days: "Czas pozostały do rozpoczęcia nowego obiegu\nDługość obiegu możesz zmienić w ustawieniach. Domyślnie jest 7 dni.",
            soon_available: "Obecnie niedostępne.\nPoszczególne funkcjonalności pojawiać się będą wraz z kolejnymi aktualizacjami.",
            no_cardio_exercises: "Brak dostępnych celów dla Cardio.\nPodczas dodawania ćwiczenia / celu wybierz np. Jump Rope lub utwórz własne wybierając opcje \"Cardio\"",
        }
    },
};

I18n.fallbacks = true;
I18n.translations = translations;

export default I18n;
