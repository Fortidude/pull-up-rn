import React from 'react';
import {View, Text, Animated} from 'react-native';
import {Icon, Button} from 'native-base';

import * as Animatable from 'react-native-animatable';

import Color from './../../../Styles/color';
import Style from './../../../Styles/style';

export class TutorialStepOneInfo extends React.Component  {
    render() {
        return (
            <View style={{flex: 1, marginTop: 40, alignItems: 'center', elevation: 0}}>
                <Animatable.Text style={[Style.card.cardItem.text, {color: Color.orange.color, fontSize: 20, lineHeight: 22}]}
                                 animation="fadeIn"
                                 duration={2400}>
                    <Text>Cześć { this.props.name }!</Text>
                </Animatable.Text>
            </View>
        )
    }
}

export class TutorialStepOneBottomInfo extends React.Component  {
    render() {
        return (
            <Animatable.Text style={[Style.card.cardItem.text, {alignSelf: 'center', color: Color.orange.color, fontSize: 16, margin: 20, lineHeight: 22}]}
                             animation="fadeIn"
                             duration={2400}
                             delay={2000}>
                <Text>Dodaj swój pierwszy trening, np. "Poniedziałek" lub "Trening Pull".</Text>
            </Animatable.Text>
        )
    }
}

export class TutorialStepOneBottomIcon extends React.Component  {
    render() {
        return (
            <Animatable.View style={{backgroundColor: 'transparent', marginTop: 0, alignSelf: 'center', position: 'absolute', bottom: 0, right: 20, zIndex:2}}
                             animation="fadeInRight"
                             delay={4000}>
                <Animatable.View style={{backgroundColor: 'transparent', marginTop: 0, alignSelf: 'center', position: 'absolute', bottom: 0, right: 20, zIndex:2}}
                                 animation="shake"
                                 duration={3000}
                                 delay={6000}
                                 direction="normal"
                                 iterationCount="infinite">
                    <Icon name="ios-arrow-dropleft-outline" style={{color: Color.orange.color, fontSize: 50}}/>
                </Animatable.View>
            </Animatable.View>
        )
    }
}

export class TutorialStepTwoInfo extends React.Component  {
    render() {
        return (
            <View style={{flex: 1, marginTop: 40, alignItems: 'center', elevation: 0}}>
                <Animatable.Text style={[Style.card.cardItem.text, {margin: 40, color: Color.orange.color, fontSize: 15, lineHeight: 17}]}
                                 animation="fadeIn"
                                 delay={200}>
                    Kliknij w "dodaj" na utworzonej sekcji, następnie wybierz cwiczenie (np. Pull UP). Do każdego cwiczenia możesz ustawic cel, np. 200 powtórzeń w ciągu swojego obiegu.
                </Animatable.Text>
            </View>
        )
    }
}

export class TutorialStepTwoIcon extends React.Component  {
    render() {
        return (
            <Animatable.View style={{backgroundColor: 'transparent', right: 75, position: 'absolute'}}
                             animation="fadeInLeft"
                             delay={1000}>
                <Animatable.View style={{backgroundColor: 'transparent', marginTop: 2}}
                                 animation="rubberBand"
                                 duration={3000}
                                 delay={2000}
                                 direction="normal"
                                 iterationCount="infinite">
                    <Icon name="ios-arrow-dropright" style={{color: Color.orange.color}}/>
                </Animatable.View>
            </Animatable.View>
        )
    }
}

export class TutorialStepThreeInfo extends React.Component  {
    render() {
        return (
            <View style={{flex: 1, marginTop: 40, marginLeft: 40, marginRight: 40, elevation: 0}}>
                <Animatable.Text style={[Style.card.cardItem.text, {color: Color.orange.color, fontSize: 15, lineHeight: 17}]}
                                 animation="fadeIn"
                                 delay={200}>
                    Przesuń palcem w lewo aby móc usunąć cel lub przenieść do innego treningu (sekcji).
                </Animatable.Text>
                <Animatable.Text style={[Style.card.cardItem.text, {marginTop: 10, color: Color.orange.color, fontSize: 15, lineHeight: 17}]}
                                 animation="fadeIn"
                                 delay={1000}>
                    Przesuń palcem w prawo aby zobaczyć szczegóły.
                </Animatable.Text>

                <Animatable.View style={[{marginTop: 50, color: Color.orange.color, fontSize: 15, lineHeight: 17}]}
                                 animation="fadeIn"
                                 delay={1500}>
                    <Button onPress={() => this.props.next()} transparent style={[Style.cardio.button.start, {borderColor: Color.orange.color, marginTop: 20}]}>
                        <Text style={[Style.cardio.button.start_text, {color: Color.orange.color}]}>Dalej</Text>
                    </Button>
                </Animatable.View>

            </View>
        )
    }
}

export class TutorialStepThreeSwipe extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            left_end: false,
            right_end: false
        }
    }

    render() {
        if (this.state.left_end && this.state.right_end) {
            return null;
        }

        return (
            <View style={{position: 'absolute', top: 0, backgroundColor: Color.black.color08, zIndex: 40, height: 80, width: Style.widthValue}}>
                {!this.state.left_end && <Animatable.View style={[{alignSelf: 'center'}]}
                                 animation="fadeInLeft"
                                 onAnimationEnd={() => this.setState({left_end: true})}
                                 delay={1500}
                                 iterationCount={2}>
                    <Icon name="ios-arrow-dropright" style={{color: Color.orange.color, fontSize: 40, marginTop: 15}}/>
                </Animatable.View>}
                {!this.state.right_end && <Animatable.View style={[{alignSelf: 'center'}]}
                                 animation="fadeInRight"
                                 onAnimationEnd={() => this.setState({right_end: true})}
                                 delay={4000}
                                 iterationCount={2}>
                    <Icon name="ios-arrow-dropleft" style={{color: Color.orange.color, fontSize: 40, marginTop: 15}}/>
                </Animatable.View>}
            </View>
        )
    }
}

export class TutorialStepFourInfo extends React.Component  {
    render() {
        return (
            <View style={{flex: 1, marginTop: 40, marginLeft: 40, marginRight: 40, elevation: 0}}>
                <Animatable.Text style={[Style.card.cardItem.text, {color: Color.orange.color, fontSize: 15, lineHeight: 17}]}
                                 animation="fadeIn"
                                 delay={100}>
                    Kliknij na powyższe ćwiczenie i dodaj set.
                </Animatable.Text>
                <Animatable.Text style={[Style.card.cardItem.text, {marginTop: 20, color: Color.orange.color, fontSize: 15, lineHeight: 17}]}
                                 animation="fadeIn"
                                 delay={2000}>
                    Wpisz ile wykonałeś powtórzeń (lub minut w przypadku celu "czas"), a następnie obserwuj swoje wyniki wybierajać na górze "statystyki".
                </Animatable.Text>
                <Animatable.View animation="fadeIn"
                                 delay={3000}>
                    <Button onPress={() => this.props.finish()} transparent style={[Style.cardio.button.start, {borderColor: Color.orange.color, marginTop: 20}]}>
                        <Text style={[Style.cardio.button.start_text, {color: Color.orange.color}]}>Koniec</Text>
                    </Button>
                </Animatable.View>

            </View>
        )
    }
}

