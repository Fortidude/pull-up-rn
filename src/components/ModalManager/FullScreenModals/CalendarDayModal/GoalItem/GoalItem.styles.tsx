import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            borderBottomWidth: theme.borders.borderWidth
        },

        content: {
            container: {
                height: 65,
                flexDirection: 'row',
                paddingVertical: 15
            },
            left: {
                container: {
                    flex: 3,
                    justifyContent: 'center',
                },
                name: {
                    fontFamily: theme.fonts.mainFontFamily,
                    fontSize: theme.fonts.fontSize,
                    color: theme.colors.textColor,
                    fontWeight: '500'
                },
                variant: {
                    fontFamily: theme.fonts.mainFontFamily,
                    fontSize: theme.fonts.fontH3Size,
                    color: theme.colors.textColor,
                }
            },
            right: {
                container: {
                    flex: 1,
                    justifyContent: 'center',
                },
                detailsText: {
                    fontFamily: theme.fonts.mainFontFamily,
                    fontSize: theme.fonts.fontH3Size,
                    color: theme.colors.textColor,
                }
            },
            icon: {
                container: {
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }
            }
        },

        setsList: {
            container: {
                overflow: 'hidden'
            }
        }
    };
}

export default getStyle;
