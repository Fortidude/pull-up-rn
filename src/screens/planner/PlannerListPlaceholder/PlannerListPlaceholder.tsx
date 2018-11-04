import React from 'react';

import {
    PlaceholderContainer,
    Placeholder
    //@ts-ignore
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeInterface } from 'src/assets/themes';
import { View } from 'react-native';

export default (props: {theme: ThemeInterface}) => {
    const Gradient = () => {
        return (
            <LinearGradient
                colors={[props.theme.colors.loaderPlaceholderTextColor, props.theme.colors.loaderPlaceholderTextColorInverse, props.theme.colors.loaderPlaceholderTextColor]}
                start={{ x: 1.0, y: 0.0 }}
                end={{ x: 0.0, y: 0.0 }}
                style={{
                    flex: 1,
                    width: 120
                }}
            />
        );
    };

    const loader = new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 8000);
    });

    return (
        <PlaceholderContainer
            style={{ width: '100%', height: 500 }}
            animatedComponent={<Gradient />}
            duration={2000}
            delay={100}
        >
            {[0, 1, 2, 3].map((index) => (
                <View key={index}>
                    <Placeholder style={{ height: 20, marginTop: 40, backgroundColor: props.theme.colors.loaderPlaceholderTextColor, width: '50%' }} />
                    {[0, 1, 2, 3, 4].map((key) => (
                        <View key={key} style={{ flexDirection: 'row', marginTop: 30, width: '100%' }}>
                            <Placeholder style={{ height: 15, backgroundColor: props.theme.colors.loaderPlaceholderTextColor, width: '10%', position: 'absolute', left: '5%' }} />
                            <Placeholder style={{ height: 15, backgroundColor: props.theme.colors.loaderPlaceholderTextColor, width: '30%', position: 'absolute', right: '35%' }} />
                            <Placeholder style={{ height: 15, backgroundColor: props.theme.colors.loaderPlaceholderTextColor, width: '30%', position: 'absolute', right: 0 }} />
                        </View>
                    ))}
                </View>
            ))}
        </PlaceholderContainer>
    )
}