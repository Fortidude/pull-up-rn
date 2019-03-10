import ImagePicker from 'react-native-image-picker';
import { Alert } from 'react-native';

type onSuccess = (base64avatar: string) => void;
class PickAvatar {
    options = {
        title: 'Zmień swój Avatar',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    launchCamera = (onSuccess: onSuccess) => {
        ImagePicker.launchCamera(this.options, response => this._process(response, onSuccess));
    }

    launchImageLibrary = (onSuccess: onSuccess) => {
        ImagePicker.launchImageLibrary(this.options, response => this._process(response, onSuccess));
    }

    _process = (response: any, onSuccess: onSuccess) => {

        if (response.didCancel) {
            // this.setState({avatar_loading: false});
        }
        else if (response.error) {
            // this.setState({avatar_loading: false});
        }
        else if (response.fileSize > 600000) {
            let size = Math.round(response.fileSize / (1024 * 1024) * 100) / 100;
            Alert.alert(
                'Zdjęcie jest za duże',
                'Zdjęcie zostało zmniejszone do maksymalnie 400x400 px, jednak i tak jest wielkość to ' + size + ' MB. Maksymalny rozmiar to 0.6 MB.',
                [
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false }
            );
            // this.setState({avatar_loading: false});
        }
        else {
            //let source = {uri: response.uri};
            let image = 'data:image/jpeg;base64,' + response.data;
            //let source = { uri: image };

            onSuccess(image);
        }
    }
}

export default new PickAvatar();
