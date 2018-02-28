import React from 'react'
import { PanResponder, View } from 'react-native';

import PropTypes from 'prop-types';

export default class SwipeResponder extends React.Component {
    static propTypes = {
        children: PropTypes.any,
        onLeft: PropTypes.func,
        onRight: PropTypes.func,

        allowVertical: PropTypes.bool,
        onUp: PropTypes.func,
        onDown: PropTypes.func,

    };

    constructor(props) {
        super(props);

        this.state = {swiped: false}
    }

    getDirection = ({moveX, moveY, dx, dy}) => {
        let {onLeft, onRight} = this.props;

        const draggedLeft = dx < -30;
        const draggedRight = dx > 30;

        if (draggedLeft && onRight) {
            onRight();
            this.setState({swiped: true});
        }

        if (draggedRight && onLeft) {
            onLeft();
            this.setState({swiped: true});
        }


        const draggedUp = dy < -20;
        if (draggedUp && this.props.onUp) {
            this.props.onUp();
            this.setState({swiped: true});
        }

        const draggedDown = dy > 20;
        if (draggedDown && this.props.onDown) {
            this.props.onDown();
            this.setState({swiped: true});
        }
    };

    isMoving = ({moveX, moveY, dx, dy}) => {
        if (!this.props.allowVertical) {
            return (dx < -30 || dx > 30);
        }

        return (dx < -30 || dx > 30 || dy > 20 || dy < -20);
    };

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder:(evt, gestureState) => this.isMoving(gestureState),
            onMoveShouldSetPanResponderCapture:(evt, gestureState) => this.isMoving(gestureState),
            onPanResponderRelease:() => {
                if (this.state.swiped) {
                    this.setState({swiped: false});
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                if (!this.state.swiped) {
                    this.getDirection(gestureState);
                }
            }
        });
    }

    render() {
        return (<View style={{flex: 1}} {...this._panResponder.panHandlers}>{this.props.children}</View>);
    }
}