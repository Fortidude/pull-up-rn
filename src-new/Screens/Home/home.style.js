import React from 'react';
import {Dimensions, StyleSheet, Platform, PixelRatio} from 'react-native';

import Color from './../../Styles/color';

const width = Dimensions.get('window').width;
export const tileSizeBig = (width / 2) - 30;
export const tileSizeMedium = (width / 3) - 30;
export const tileSizeSmall = (width / 4) - 80;

const homeStyle = {
    container: {backgroundColor: 'transparent'},
    content: {backgroundColor: 'transparent', paddingTop: 0},

    flexRow: {flexDirection: 'row'},

    tileSection: {

        separator: {marginTop: 20},
        textHeader: {color: Color.white.color08, fontFamily: 'Poppins-Light', fontSize: 15},
        textHeaderLine: {flex: 1, backgroundColor: Color.light_black.color, height: StyleSheet.hairlineWidth},
        textHeaderContainer: {flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20, marginBottom: 5},
        overlay: {
            position: 'absolute',
            marginTop: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },
        heightBig: {
            height: tileSizeBig,
        },
        heightMedium: {
            height: tileSizeMedium,
        },
        heightSmall: {
            height: tileSizeMedium,
        },
        tile: {
            container: { borderRadius: 0, borderColor: Color.white.color01, borderWidth: 0 },
            text_title: {position: 'absolute', bottom: 0, left: 0, right: 0, paddingLeft: 5, marginBottom: 5, marginLeft: 5, zIndex: 2, backgroundColor: Color.black.color08},
            view: {
                container: [
                    {flex: 1, borderColor: Color.white.color },
                    Platform.select({
                        ios: {borderWidth: 0/*StyleSheet.hairlineWidth*/},
                        android: {borderWidth: 0}
                    })
                ]
            },
            header: {
                container: {backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderWidth: 0, flex: 1}
            },
            body: {
                container: {backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderWidth: 0, flex: 2}
            },
            footer: {
                container: {backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderWidth: 0, flex: 1}
            }
        },
        bigTileSingle: {
            container: {flex: 1, margin: 10, marginTop: 0, height: tileSizeBig+5},
            touchable: {
                container: {flexDirection: 'row', flex: 1, height: tileSizeBig+5, backgroundColor: Color.white.color01}
            },
            overlay: {
                icon: {color: Color.orange.color, fontSize: tileSizeMedium/3},
                font_awesome_icon: {color: Color.orange.color, fontSize: tileSizeMedium/4}
            }
        },
        mediumTileSingle: {
            container: {flex: 1, margin: 0, height: tileSizeMedium+20, backgroundColor: 'transparent'},
            container_disabled: {opacity: 0.3},
            image_background: {margin: 0, padding: 0, height: tileSizeMedium+20, width: tileSizeMedium+20},
            overlay: {
                icon: {color: Color.white.color, fontSize: tileSizeMedium/3},
                font_awesome_icon: {color: Color.white.color, fontSize: tileSizeMedium/4}
            }
        },
        smallTileSingle: {
            container: {flex: 1, margin: 0, backgroundColor: Color.white.color01},
            overlay: {
                icon: {color: Color.white.color, fontSize: 30, alignSelf: 'center'},
                font_awesome_icon: {color: Color.white.color, fontSize: 25}
            }
        }
    },

    fab: {
        button: {backgroundColor: Color.background.color01, justifyContent: 'center', alignContent: 'center', width: 40, height: 40, borderRadius: 20, borderColor: Color.light_black.colorHalf, borderWidth: 1},
        button_icon: { backgroundColor: 'transparent', color: Color.white.color }
    }
};

export default homeStyle;
