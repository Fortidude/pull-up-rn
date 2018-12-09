String.prototype.ucFirst = function (): String {
    let _string: String = this;
    return `${_string[0].toLocaleUpperCase()}${_string.substr(1)}`;
}
