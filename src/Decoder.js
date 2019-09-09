
class Decoder {
    constructor(name, abi) {
        this.name = name
        this.abi = abi

        this.getInterface = this.getInterface.bind(this);
    }

    getInterface() {
        let _data = [];
        _data = _data.concat(this._getContract());
        _data.push("{");
        for (const item of this.abi) {
            _data = _data.concat(this._getItem(item));
        }
        _data.push("}");;
        return _data.join("\n");
    }

    _getContract() {
        let _data = [];
        _data.push("contract");
        _data.push(" ");
        _data.push(this.name);
        _data.push(" ");
        return _data.join("");
    }

    _getItem(item) {
        let _data = [];
        switch (item.type) {
            case "function":
                _data = _data.concat(this._getFunction(item));
                break;
            case "event":
                _data = _data.concat(this._getEvent(item));
                break;
        }
        return _data;
    }

    _getFunction(item) {
        let _data = [];
        _data.push("    ");
        _data.push(item.type);
        _data.push(" ");
        _data.push(item.name);
        _data.push("(");
        _data.push(this._getInput(item));
        _data.push(")");
        _data.push(" ");
        _data.push("public");
        _data.push(this._getStateMutability(item));
        _data.push(this._getOutput(item));
        _data.push(";");
        return _data.join("");

    }

    _getEvent(item) {
        let _data = [];
        _data.push("    ");
        _data.push("event");
        _data.push(" ");
        _data.push(item.name);
        _data.push("(");
        _data.push(this._getInput(item));
        _data.push(")");
        _data.push(";");
        return _data.join("");
    }

    _getInput(item) {
        let _data = [];
        for (let i = 0; i < item.inputs.length; i++) {
            const input = item.inputs[i];
            _data.push(input.type);
            if (input.indexed) {
                _data.push(" ");
                _data.push("indexed");
            }
            if (input.name) {
                _data.push(" ");
                _data.push(input.name);
            }
            if (i < item.inputs.length - 1) {
                _data.push(",");
                _data.push(" ");
            }
        }
        return _data.join("");
    }

    _getStateMutability(item) {
        let _data = [];
        switch (item.stateMutability) {
            case "nonpayable":
                break;
            default:
                _data.push(" ");
                _data.push(item.stateMutability);
                break;
        }
        return _data.join("");
    }

    _getOutput(item) {
        if (!item.outputs.length) { return ""; }

        let _data = [];
        _data.push(" ");
        _data.push("returns");
        _data.push(" ");
        _data.push("(");
        for (let i = 0; i < item.outputs.length; i++) {
            const output = item.outputs[i];
            _data.push(output.type);
            if (output.name) {
                _data.push(" ");
                _data.push(output.name);
            }
            if (i < item.outputs.length - 1) {
                _data.push(",");
                _data.push(" ");
            }
        }
        _data.push(")");
        return _data.join("");
    }
}

module.exports = {
    Decoder,
};