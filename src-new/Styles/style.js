import {
    StyleSheet,
    PixelRatio,
    Dimensions,
    Platform,
    AsyncStorage
} from "react-native";
import Color from './color';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

let headerMainFontSize = 20;
let headerRightFontSize = 18;
let textFontSize = 16;
if (Platform.OS === 'android') {
    headerMainFontSize = 16;
    headerRightFontSize = 12;
    textFontSize = 12;
}


let TouchColor = Color.blue.color;
const FontPopping = {fontFamily: 'Poppins-Light'};
const FontRoboto = {fontFamily: 'Roboto'};
const TextStyle = [FontPopping, {fontSize: textFontSize, color: Color.white.color}];
const TextHeaderStyle = { fontFamily: 'Poppins-Light', fontSize: 14, color: Color.white.color, alignSelf: 'center'};
const TileHalfScreen = (width/2);

export const borderRadiusIfApple = (borderRadius) => {
    return isIos() ? borderRadius : 0;
};

export const isIos = () => Platform.OS === 'ios';
export const isIphoneX = () => {
    let d = Dimensions.get('window');
    const { height, width } = d;

    return (
        Platform.OS === 'ios' && (height === 812 || width === 812)
    );
};

export default {
    header: {
        container: [
            {flexDirection: 'row', borderBottomColor: Color.white.color02},
            Platform.select({
                android: {
                    backgroundColor: Color.light_black_02.color,
                    height: 40,
                    elevation: 0,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: Color.black.color
                },
                ios: {
                    backgroundColor: Color.light_black.colorHalf
                }
            })
        ],
        body: {
            container: [
                {flexDirection: 'row', borderWidth: 0},
                Platform.select({android: {flex: 3, backgroundColor: 'transparent'}, ios: {flex: 1, alignContent: 'center', justifyContent: 'center', paddingTop: 10}})
            ],
            text: {color: Color.white.color08, fontWeight: '200', fontFamily: 'Roboto', fontSize: headerMainFontSize}
        },
        left: {
            container: [
                {borderWidth: 0},
                Platform.select({android: {flex: 1, backgroundColor: 'transparent'}, ios: {flex: 1, paddingTop: 10}})
            ],
            back: {
                backgroundColor: 'transparent',
                color: Color.white.color,
                fontSize: 40,
            }
        },
        right: {
            container: [
                {borderWidth: 0},
                Platform.select({android: {flex: 2, backgroundColor: 'transparent'}, ios: {flex: 1, paddingTop: 10}})
            ],
            text: [FontPopping, {fontSize: headerRightFontSize, color: Color.white.color, paddingRight: 10}],
            text_button: [FontPopping, {fontSize: headerRightFontSize, color: TouchColor, paddingLeft: 10, paddingRight: 10}],
            text_button_disabled: {color: Color.grey.color},
            avatar: Platform.select({android: {width: 50, height: 50}, ios: {width: 30, height: 30, borderRadius: borderRadiusIfApple(15)}})
        }
    },

    fullHeight: {height: height - 100},
    heightValue: height,
    widthValue: width,
    textInputAndroidFixPadding: Platform.select({android: {paddingBottom: 0, paddingTop: 0}, ios: {}}),
    touchColor: {color: TouchColor},
    borderWidth: {borderWidth: StyleSheet.hairlineWidth},

    separator: {marginTop: 20},
    textHeader: {color: Color.white.color08, fontFamily: 'Poppins-Light', fontSize: 13},
    textHeaderLine: {flex: 1, backgroundColor: Color.white.color01, height: StyleSheet.hairlineWidth},
    textHeaderContainer: {flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20, marginBottom: 5},

    avatar: {
        image: {borderColor: Color.white.color, borderWidth: 0}
    },

    card: {
        container: {marginTop: 10, marginLeft: 0, marginRight: 0, backgroundColor: 'transparent', borderColor: 'transparent'},
        separator: {marginTop: 20},
        text_header: TextHeaderStyle,
        text_header_sub: {  fontFamily: 'Poppins-Light', fontSize: 10, color: Color.white.colorHalf, alignSelf: 'center', marginBottom: 10},
        cardItem: {
            container: {backgroundColor: 'transparent', borderColor: 'transparent', borderRadius: 0},
            text: TextStyle,
            text_blue: [...TextStyle, {color: TouchColor}],
            text_dark: { ...FontPopping, fontSize: textFontSize, color: Color.white.color08},
            text_disabled: { ...FontPopping, fontSize: textFontSize, color: Color.white.colorHalf},
            text_note: { ...FontPopping, fontSize: textFontSize-2, color: Color.white.colorHalf},
            input: {...{borderRadius: borderRadiusIfApple(10)}, ...FontPopping, ...{color: Color.white.color08, fontSize: 14, padding: 5, paddingLeft: 20, minHeight: 35, maxHeight: 35, backgroundColor: Color.light_black_02.color}},
            input_with_icon: {
                container: {...{borderRadius: borderRadiusIfApple(10)}, ...{marginTop: 5, marginBottom: 5, borderColor: 'transparent', height: 35, backgroundColor: Color.light_black_02.color, marginLeft: 20, marginRight: 20, flexDirection: 'row'}},
                input: {...FontPopping, color: Color.white.color08, fontSize: 14, flex: 12},
                icon: {color: Color.white.color, flex: 1}
            },
            input_multi_line: {
                container: {...{borderRadius: borderRadiusIfApple(10)}, ...{borderColor: 'transparent', backgroundColor: Color.light_black_02.color, marginLeft: 20, marginRight: 20, padding: 10, flex: 1, flexDirection: 'row'}},
                input: {...FontPopping, borderBottomWidth: 0, color: Color.white.color08, fontSize: 14, flex: 1, minHeight: 90, alignSelf: 'flex-start'},
            },
            picker: {...{borderRadius: borderRadiusIfApple(10)}, ...{marginRight: 0, padding:5, marginTop: 3, width: width/2, minHeight: 35, height: 35, maxHeight: 35, backgroundColor: Color.light_black_02.color}},
            switcher: {
                onTintColor: TouchColor
            },
            border_bottom: {borderBottomWidth: StyleSheet.hairlineWidth, borderColor: Color.light_black_02.color}
        }
    },

    auth: {
        form: {width: width, paddingLeft: 20, paddingRight: 20},
        input: {
            container: {marginBottom: 10, borderColor: 'transparent', backgroundColor: Color.light_black_03.colorHalf, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10},
            element: {color: Color.white.color, fontFamily: 'Roboto', fontSize: 14},
            icon: {color: Color.white.colorHalf, marginLeft: 5}
        },
        button: {
            element_login: {
                elevation: 0,
                alignSelf: 'center',
                justifyContent: 'center',
                width: width / 2
            },
            element_register: {
                elevation: 0,
                alignSelf: 'center',
                justifyContent: 'center',
                width: width / 2
            },
            element_login_enabled: {
                backgroundColor: Color.green.color
            },
            element_login_disabled: {
                backgroundColor: Color.green.colorHalf
            },
            element_register_enabled: {
                backgroundColor: Color.red.color
            },
            element_register_disabled: {
                backgroundColor: Color.red.colorHalf
            },
            element_reset: {
                elevation: 0,
                alignSelf: 'flex-start',
                justifyContent: 'center',
                width: width / 2,
                backgroundColor: 'transparent',
                marginTop: 10
            },
            text: {fontFamily: 'Roboto', fontSize: 10}
        }
    },

    profile: {
        header: {
            avatar: [Platform.select({android: {}, ios: {position: 'absolute', bottom: -50}}), {backgroundColor: 'transparent'}],
            avatar_icon_change: [Platform.select({android: {bottom: 0, right: 0, color: TouchColor}, ios: {bottom: -10, right: -10, color: Color.white.color}}), {position: 'absolute', fontSize: 40}],
            container: [Platform.select({android: {height: height/6}, ios: {height: height/8}}), {backgroundColor: Color.white.color01, borderColor: 'transparent', marginLeft: 0, marginRight: 0, marginTop: 0, borderRadius: 0}],
            cardItem: {
                container: {flexDirection: 'row', flex: 1, backgroundColor: 'transparent'},
                text_note: {...FontPopping, fontSize: 12, position: 'absolute', alignSelf:'center', top: 10, color: Color.white.colorHalf}
            }
        },
        card: {
            container: {marginTop: 50, marginLeft: 20, marginRight: 20},
            cardItem: {
                container: {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Color.white.color02, paddingLeft: 0},
                left: {flex: 1, justifyContent: 'flex-start'},
                text: [...TextStyle, {marginLeft: 0}],
                text_note: [...TextStyle, {color: Color.white.colorHalf}],
            }
        }
    },

    planner: {
        section: {
            button: {backgroundColor: Color.light_black.color03, borderBottomColor: Color.black.color, borderBottomWidth: StyleSheet.hairlineWidth, height: 35, paddingLeft: 0, paddingRight: 0}
        },
        list: {
            swipe_row: {
                container: {height: 80},
                left: {},
                body: {
                    container: {flexDirection: 'row', alignContent: 'center'},
                    body: {justifyContent: 'center', height: 80, paddingLeft: 13, paddingTop: 4},
                    right: {justifyContent: 'center', height: 80, paddingRight: 13, paddingTop: 4}
                },
                right: {}
            }
        },
        new_goal: {
            left: {flex: 3, alignContent: 'flex-start', flexDirection: 'row', marginLeft: 10},
            right: {flex: 2, alignContent: 'flex-end', flexDirection: 'row'},
            right_button: {height: 40, borderRadius: borderRadiusIfApple(15), borderColor: Color.blue.color, borderWidth: StyleSheet.hairlineWidth, flex: 1, justifyContent: 'center'},

            row: {flexDirection: 'row'},
            tile_left: {paddingRight: 10, paddingLeft: 20, paddingTop: 20, paddingBottom: 20, width: TileHalfScreen, height: TileHalfScreen},
            tile_right: {paddingRight: 20, paddingLeft: 20, paddingTop: 20, paddingBottom: 20, width: TileHalfScreen, height: TileHalfScreen},
            tile_content: {flex: 1, backgroundColor: Color.light_black_03.color, justifyContent: 'center', alignItems: 'center'}
            
        }
    },
    
    cardio: {
        header: {
            container: {flex: 1, width: width, flexDirection: 'row', justifyContent: 'center'},
        },
        timer: {
            container: {flex: 4, width: width, flexDirection: 'row', justifyContent: 'center'},
            count: [TextHeaderStyle, {fontSize: 80, flex: 2, textAlign: 'center'}],
            colon: [TextHeaderStyle, {fontSize: 80, flex: 1, textAlign: 'center', paddingBottom: 10}]
        },
        button: {
            container: {flex: 1, flexDirection: 'row'},

            start: {alignSelf: 'center', borderRadius: borderRadiusIfApple(25), flex: 1, height: 50, borderColor: TouchColor, borderWidth: 1, marginLeft: 10, marginRight: 20},
            start_text: {flex: 1, textAlign: 'center', color: TouchColor},

            stop: {alignSelf: 'center', borderRadius: borderRadiusIfApple(25), flex: 1, height: 50, borderColor: Color.red.color, borderWidth: 1, marginLeft: 10, marginRight: 20},
            stop_text: {flex: 1, textAlign: 'center', color: Color.red.color},

            restart: {alignSelf: 'center', borderRadius: borderRadiusIfApple(25), flex: 1, height: 50, borderColor: Color.grey.color, borderWidth: 1, marginLeft: 20, marginRight: 10},
            restart_text: {flex: 1, textAlign: 'center', color: Color.grey.color},

            round: {alignSelf: 'center', borderRadius: borderRadiusIfApple(25), flex: 1, height: 50, borderColor: Color.tealBlue.color, borderWidth: 1, marginLeft: 20, marginRight: 10},
            round_text: {flex: 1, textAlign: 'center', color: Color.tealBlue.color},

            empty_placeholder: {flex: 1}
        },
        rounds: {
            container: {flex: 5, flexDirection: 'row', marginTop: 20},
            item_container: {flex: 1, width: width - 40, marginLeft: 20, marginRight: 20, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, paddingTop: 4},
            title: [TextHeaderStyle, {fontSize: 18, textAlign: 'center'}],
            count: [TextHeaderStyle, {fontSize: 20, width: 15, textAlign: 'center'}],
            colon: [TextHeaderStyle, {fontSize: 20, width: 10, textAlign: 'center'}]
        }
    },

    footerTab: {
        footer: {padding: 0, backgroundColor: Color.background.color, borderTopColor: Color.black.color, borderTopWidth: StyleSheet.hairlineWidth},
        container: [
            Platform.select({
                ios: {backgroundColor: 'transparent'},
                android: {backgroundColor: 'transparent', paddingLeft: 2, paddingRight: 2}
            })
        ],
        button: {
            container: {backgroundColor: Color.light_black_02.colorHalf, borderTopColor: 'transparent', borderRadius: 0},
            container_rounded: {backgroundColor: Color.light_black_02.colorHalf, borderTopColor: 'transparent', borderRadius: borderRadiusIfApple(20), marginLeft: 20, marginRight: 20},
            text: {
                active: [FontPopping, {fontSize: 15, color: TouchColor}],
                un_active: [FontPopping, {fontSize: 15, color: Color.black.colorHalf}]
            },
            icon: {
                active: {color: Color.white.color, opacity: 1},
                un_active: {color: Color.grey.colorHalf}
            }
        }
    },

    footer_button: {
        button: {alignSelf: 'center', justifyContent: 'center', backgroundColor: Color.orange.color, flex: 1},
        logout_button: {alignSelf: 'center', justifyContent: 'center', backgroundColor: Color.white.color, flex: 1},
        text: [TextStyle, {color: Color.black.color, fontWeight: '600'}]
    }
};
