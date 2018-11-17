import { ThemeInterface } from 'src/assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        content: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
        }
    };
}

export default getStyle;
