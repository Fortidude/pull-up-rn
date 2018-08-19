import React from 'react';
import {  } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';


interface Props {
    theme: object;
}

class Theme extends React.Component<Props> {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => ({
    theme: state.app.theme
});

export default connect(mapStateToProps)(Theme);
