
import React from 'react';
import {
	Animated,
	StatusBar,
	View,
	StyleSheet,
	MaskedViewIOS,
} from 'react-native';
import { connect } from 'react-redux';

import Styles from './Loader.styles';
import { ThemeValueInterface, ThemeInterface } from '../../assets/themes';

type Props = {
	theme: ThemeInterface,
	children: React.ReactNode,
	isLoaded: boolean,
	imageSource: any,
	backgroundStyle: any,
};

type State = {
	loadingProgress: Animated.Value,
	animationDone: boolean,
};

class Loader extends React.Component<Props, State> {
	style: ThemeValueInterface;

	constructor(props: Props) {
		super(props);

		this.style = Styles(this.props.theme);

		this.state = {
			loadingProgress: new Animated.Value(0),
			animationDone: false,
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.isLoaded && !this.props.isLoaded) {
			Animated.timing(this.state.loadingProgress, {
				toValue: 100,
				duration: 1200,
				useNativeDriver: true,
			}).start(() => {
				this.setState({
					animationDone: true,
				});
			});
		}
	}

	render() {
		const opacityClearToVisible = {
			opacity: this.state.loadingProgress.interpolate({
				inputRange: [0, 15, 30],
				outputRange: [0, 0, 1],
				extrapolate: 'clamp',
			}),
		};

		const imageScale = {
			transform: [
				{
					scale: this.state.loadingProgress.interpolate({
						inputRange: [0, 10, 100],
						outputRange: [1, 0.1, 70],
					}),
				},
			],
		};

		const appScale = {
			transform: [
				{
					/**
					 * @TODO set proper scale using physical device.
					 */
					scale: this.state.loadingProgress.interpolate({
						inputRange: [0, 70, 100],
						outputRange: [1.1, 1.01, 1],
					}),
				},
			],
		};

		const fullScreenBackgroundLayer = this.state.animationDone ? null : (
			<View style={[StyleSheet.absoluteFill, this.props.backgroundStyle]} />
		);
		const fullScreenWhiteLayer = this.state.animationDone ? null : (
			<View style={[StyleSheet.absoluteFill, this.style.fullScreenWhiteLayer]} />
		);

		return (
			<View style={this.style.fullScreen}>
				<StatusBar  animated={true} hidden={!this.state.animationDone} />
				{fullScreenBackgroundLayer}
				<MaskedViewIOS
					style={{ flex: 1 }}
					maskElement={
						<View style={this.style.centeredFullScreen}>
							<Animated.Image
								style={[this.style.maskImageStyle, imageScale]}
								source={this.props.imageSource}
							/>
						</View>
					}
				>
					{fullScreenWhiteLayer}
					<Animated.View style={[opacityClearToVisible, appScale, { flex: 1 }]}>
						{this.props.children}
					</Animated.View>
				</MaskedViewIOS>
			</View>
		);
	}
}

const mapStateToProps = (state: any) => ({
    theme: state.app.theme
});

export default connect(mapStateToProps)(Loader);
