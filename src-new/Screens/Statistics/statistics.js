import React from 'react';
import Abstract from './../abstract';
import { RefreshControl } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

import I18n from './../../Translations/translations';

import PullUpHeader from './../../Components/PullUpHeader';
import InformationModal from './../../Components/Information.modal';

import {default as EffectivenessTab} from './Tabs/effectiveness';
import {default as PopularityTab} from './Tabs/popularity';
import {default as ProgressTab} from './Tabs/progress';

import Style from './../../Styles/style';
import Color from './../../Styles/color';
const footerStyle = Style.footerTab;

class statistics extends Abstract {
    constructor(props) {
        super(props);

        this.props.dispatchLoadStatistics();
        this.state = {
            tab: 1,
            refreshing: false,

            header_text: 'Statystyki'
        }
    }

    isTabActive(tab) {
        return this.state.tab === tab;
    }

    switchToTab(tab) {
        this.setState({tab: tab});
    }

    changeHeaderText(headerText) {
        this.setState({header_text: headerText})
    }

    render() {
        return (
            <Container>
                <PullUpHeader back
                              bodyText={this.state.header_text}
                              navigation={this.props.navigation}
                />

                <Content style={{flex: 1}}
                         keyboardShouldPersistTaps="always"
                         keyboardDismissMode={'none'}
                         showsVerticalScrollIndicator={false}
                         refreshControl={
                             <RefreshControl
                                 refreshing={this.state.refreshing}
                                 onRefresh={() => this.props.dispatchLoadStatistics(true)}
                             />
                         }>

                    <EffectivenessTab store={this.props.store}
                              isToggled={this.isTabActive(1)}
                              style={{flex: 1}}
                              changeRightHeader={this.changeHeaderText.bind(this)}
                    />
                    <PopularityTab store={this.props.store}
                              isToggled={this.isTabActive(2)}
                              style={{flex: 1}}
                              changeRightHeader={this.changeHeaderText.bind(this)}
                    />
                    <ProgressTab store={this.props.store}
                              isToggled={this.isTabActive(3)}
                              style={{flex: 1}}
                              changeRightHeader={this.changeHeaderText.bind(this)}
                    />

                </Content>

                <Footer style={footerStyle.footer}>
                    <FooterTab style={footerStyle.container}>
                        <Button vertical onPress={this.switchToTab.bind(this, 1)}
                                style={{alignSelf:'stretch'}}>
                            {this.isTabActive(1) && <Text style={footerStyle.button.icon.active}>Efektywność</Text>}
                            {!this.isTabActive(1) && <Text style={footerStyle.button.icon.un_active}>Efektywność</Text>}
                        </Button>
                        <Button vertical onPress={this.switchToTab.bind(this, 2)}
                                style={{alignSelf:'stretch'}}>
                            {this.isTabActive(2) && <Text style={footerStyle.button.icon.active}>Popularność</Text>}
                            {!this.isTabActive(2) && <Text style={footerStyle.button.icon.un_active}>Popularność</Text>}
                        </Button>
                        <Button vertical onPress={this.switchToTab.bind(this, 3)}
                                style={{alignSelf:'stretch'}}>
                            {this.isTabActive(3) && <Text style={footerStyle.button.icon.active}>Progresja</Text>}
                            {!this.isTabActive(3) && <Text style={footerStyle.button.icon.un_active}>Progresja</Text>}
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )

    }
}

import { loadStatistics } from './../../Store/Planner/planner.actions';

import {connect} from 'react-redux';

function mapStateToProps (state) {
    return {
        store: state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchLoadStatistics: (refresh = false) => {dispatch(loadStatistics(refresh))},
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(statistics);