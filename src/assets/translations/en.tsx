export default {
    mics: {
        amount: "Amount",
        circuit_end: "End",
        days: "days",
        edit_mode: "Edit mode",
        effectiveness: "Effectiveness",
        exercise: "Exercise",
        exercise_variant: "Variant of the exercise",
        filter: "Filter",
        goal_type: 'Goal type',
        hide_finished_goals: "Hide finished goals",
        none: "None",
        left: "left",
        of: "of",
        pick_bar_to_check_time: "Pick the bar to see the time",
        reps_record: "Reps record",
        scroll_to_today: "Today",
        tutorial: "Tutorial",
        type_name: "Provide name",
        weight_record: "Weight record",
        your_trainings: "Your tranings",
        you_have_to_pick_exercise: "Required - pick exercise",
        you_have_to_type_exercise: "Required - provide name",
    },

    boarding: {
        step_one: {
            titie: "Your personal traning diary",
            line_one: {
                title: 'Create exercise list',
                description: 'Create tranings (e.g.. Pull, Push or Monday, Wednesday etc.), and then complete them with exercises (e.g. squat, deadlift, bench press, pull up etc.)'
            },
            line_two: {
                title: 'Note the sets and reps',
                //description: 'Dodaj set poprzez kliknięcie utworzonego ćwiczenia, następnie uzupełnij formularz o ilość wykonanych powtórzeń, ciężar oraz wybierz poziom trudności (1-3).'
                description: 'To add a set: click on the created exercise, provide information about amount of reps, weight and pick the difficulty level.'
            },
            line_three: {
                title: 'Monitor your cardio',
                //description: 'Przejdź do trybu cardio i wybierz interesujący Cię program (np. tabata, klasycznie itp.). Dodatkowo możesz wybrać jedno z utworzonych wcześniej ćwiczeń typu "czas", a cały naliczony czas zostanie dodany jako jeden set.'
                description: 'Turn on your cardio mode and see how long can you last on fitness cross trainer'
            },
            line_four: {
                title: 'Achieve training goals',
                description: 'Define your own goals while creating exercise. For example, you can define that you have to perform total 100 reps of that exercise during the current circuit.'
            },
            line_five: {
                title: 'Follow statistics',
                description: 'The application provides detailed statistics about your trenings. Progress (reps, sets, weight), most often performed exercises, calendar with all history you need and much more.'
            },
            line_six: {
                title: 'Set the circuit duration',
                description: 'By default the cirucit duration is set to week. After this all the goals will be reset. You can change the duration from you profile view'
            }
        },
        step_last: {
            get_started: "Get started!"
        }
    },

    login: {
        title: "Login",
        login: "Login",
        no_account: "No account? Join us!",
        remind_password: "I forgot my password",
        login_alert_ok_button: "Try again",
        password_multiple_wrong: "If you sure the provided e-mail is correct - use the restore password functionality"
    },
    password_reminder: {
        send_link: "Send the activation link",
        link_has_been_sent: "The activation link has been sent.\nCheck your e-mail."
    },
    password_reset: {
        change_password: "Change password",
        password_changed: "Password has been changed.\nYou can login."
    },
    register: {
        register: "Register",
        success_title: "Account has been created",
        success_text: "Now you can login.",

        errors: {
            email: "Provided e-mail address is incorect",
            password_length_not_valid: "Provided password is too short.\n5 characters at least",
            password_not_match: "Provided passwords are different"
        }
    },

    settings: {
        avatar: {
            picture_to_big_title: "Picture is too big",
            picture_to_big_text: "Choosen picture has been scaled to 400x400 px, however, it's size is %{size} MB. Maximum allowed size is 0.6 MB."
        },
        circuit_length: "Circuit duration",
        language: "Language",
        show_on_boarding: "Welcome screen",
        show_on_boarding_subtext: "New user tutorial",
        remove_my_account: "Remove account",
        settings: "Settings",
        theme: "Color theme",
        planner_calendar_mode: "Grouping - calendar",
        planner_calendar_mode_subtext: "You can group the exercises by your own tranings (e.g. pull / push / leg day etc) or by dates, automatically (e.g yesterday, 3 days ago, one week ago etc.)",
        planner_footer_circle_component: {
            title: "Home page | footer",
            subtext: "The middle element",
            options: {
                avatar: "User avatar",
                circuit_left: "Current circuit (days left)",
                circuit_progress: "Current circuit (%)"
            }
        },
        notifications: {
            title: "Notifications",
            turn_on: "Turn on",
            turned_on: "Enabled",
            turned_off: "Disabled"
        }
    },

    modals: {
        addTreningSection: {
            title: "add training"
        },
        addGoalModal: {
            addExerciseButtonText: "Create your own exercise",
            training: "training",
            create_own_exercise: "Create your own exercise",
            pick_exercise_from_list: "Pick exercise from the list",
            provide_the_required_quantity: "Provide required quantity"
        },
        edit_goal_modal: {
            provide_the_required_quantity: "Provide required quantity"
        },
        calendar_day_modal: {
            number_of_exercise: "Number of exercises"
        },
        createExerciseModal: {
            addGoalButtonText: "Pick from the list"
        }
    },

    planner: {
        first_step: {
            title: "Training plan",
            add_first_training: "Add your first training",
            own_button_text: "Create your own training",
            predefined_button_text: "Pick one of the prepared",
            own: {
                placeholder: "e.g. \"Monday\" or \"Push\"",
            },
            predefined: {
                fbw_basic: "FBW (basic)",
                push_pull_basic: "Push / Pull (basic)",
            }
        },
        add_training_title_information: `The name of the traning can be for example day name ("Monday") or type of the traning, e.g. "Pull day" or "Leg day"`,
        empty_list_iniformation: `Nazwą treningu może być dzień tygodnia ("Poniedziałek") lub typ ćwiczeń np. "Trening Pull" czy "Trening nóg"`,
        done_of: "Done",
        other: "other",
        difficultLevelTitle: "difficulty",
        difficultLevelTitleFull: "difficulty level",
        difficultLevels: {
            1: "Easy",
            2: "Medium",
            3: "Hard",

            easy: "Easy",
            medium: "Medium",
            hard: "Hard"
        },
        custom_mode: {
            calendar: {
                today: "Today",
                yesterday: "Yesterday",
                two_days_ago: "Two days ago",
                three_days_ago: "Three days ago",
                four_days_ago: "Four days ago",
                five_days_ago: "Five days ago",
                six_days_ago: "Six days ago",
                week_ago: "Week ago",
                older_than_week_ago: "Older than week ago",
                circuit_ago: "Previous circuit",
                older: "Older"
            }
        },
        missing: "Missing",
        last_set__short_text: "Lately",
        type: "Type",
        types: {
            none: "None",
            sets: "Sets",
            reps: "Reps",
            time: "Time",
            weight: "Weight"
        },
        circuits: {
            all: "All",
            previous: "Previous",
            current: "Current"
        }
    },

    statistics: {
        circuit: "Circuit",
        sort: "Sort",
        traning_section: "Training",
        all_traninings: "All",
        exercise: "Exercise",
        effectiveness: {
            title: "Maintain high efficiency by achieving your goals in each training circuit."
        },
        progress: {
            title: "Increase the weight or the number of repetitions regularly."
        }
    },

    cardio: {
        screen_awake_title: "Keep screen awake",
        screen_awake_subtitle: "Only during the countdown",

        start: "Start",
        resume: "Resume",
        reset: "Reset",
        round: "Round",
        pause: "Pause",
        end: "End"
    },

    themes: {
        light: "Light",
        dark: "Dark",
        cream: "Cream"
    },

    locales: {
        en: "English",
        pl: "Polish"
    },

    routes: {
        '': '',
        addtraining: 'Add training',
        auth: "Login",
        calendar: "Calendar",
        cardio: "Stoper",
        effectivenessstats: "Effectiveness",
        home: "Planer",
        initpage: "Pull Up!",
        languagepicker: "Choose langunage",
        login: "Login",
        passwordreset: "Change password",
        passwordreminder: "Remind password",
        planner: "Pull Up!",
        profile: "Profil",
        popularitystats: "popularity",
        progressstats: "Progress",
        register: "Register",
        settings: "Settings",
        statistics: "Statistics",
        themepicker: "Choose a theme",
        notifications: "Notifications"
    },

    fields: {
        additional_weight: "Extra weight? (KG / LBS)",
        date: "Date",
        email: "Email",
        email_validate: "Confirm your email",
        number_of_reps_done: "Number of reps",
        number_of_required_reps: "Number of reps",
        number_of_required_time: "Number of minutes",
        number_of_required_sets: "Number of sets",
        password: "Password",
        password_repeat: "Repeat the password",
        type_name: "Provide the name"
    },

    buttons: {
        add: "Add",
        add_set: "Add set",
        cancel: "Cancel",
        close: "Close",
        clickToClose: "Tap to close",
        edit: "Edit",
        finish: "Finish",
        logout: "Logout",
        next: "Next",
        now: "Now",
        ok: "OK",
        unfinished_goals: "GOALS < 100%",
        remove: "Remove",
        save: "Save",
        scroll_to_now: "Scroll to now",
        skip: "Skip",
        today: "Today",
        toggle_collapse: "Collapse",
        toggle_expand: "Expand",
    },

    warnings: {
        attention: "Attention",
        information: "Intormation",
        possible_swap_weight_reps: "Probably the number of repetitions with the weight was mistaken. Ingore this messange and save it again if everything is ok.",
        still_during_production: "Still in progress, check later.",
        user_removed_data_erased: "All personal data has been erased. You will be logged out.",
        not_synchronized: "Not synchronized.",
        not_synchronized_text: "Some actions (e.g. create set) has been done in offline mode and will be lost after logout. \n\nTo aviod tap on cancel and connect to the internet."
    },

    errors: {
        "Bad credentials": "Wrong username, email or password. In case you have forgotten your password, please use the password restore.",
        "failed": "Operation failed.",
        "no_internet_connection": "No connection.",
        "no_internet_connection_required_for_this_action": "Internet connection is required. ",
        "no_internet_connection_text": "You are in offline mode. You can still create and modify a set or exercise. All data will be synchronized when you will be online.",
        "USER_ALREADY_EXIST": "User already exist",
        "SERVER_ERROR": "Fatal error. Try again."
    }
}
