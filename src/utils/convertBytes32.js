const convertBytes32 = (number) => {
    function numStringToBytes32(num) {
        var bn = new BN(num).toTwos(256);
        return padToBytes32(bn.toString(16));
    }

    function bytes32ToNumString(bytes32str) {
        bytes32str = bytes32str.replace(/^0x/, '');
        var bn = new BN(bytes32str, 16).fromTwos(256);
        return bn.toString();
    }

    function padToBytes32(n) {
        while (n.length < 64) {
            n = "0" + n;
        }
        return "0x" + n;
    }
    console.log(numStringToBytes32(5))
};

module.exports = {
    convertBytes32
};