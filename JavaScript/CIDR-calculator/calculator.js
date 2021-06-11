// TODO get current IP via API
// TODO install git 
// !!! install git


function calculate(firstTrip, secondTrip, thirdTrip, fourthTrip, hostAmount2) {
    /* read all user input Triplets*/
    var firstTrip = document.getElementById("firstTriplet").value;
    var secondTrip = document.getElementById("secondTriplet").value;
    var thirdTrip = document.getElementById("thirdTriplet").value;
    var fourthTrip = document.getElementById("fourthTriplet").value;

    /* ===== join Triplets to ip ===== */
    var ip = firstTrip + "." + secondTrip + "." + thirdTrip + "." + fourthTrip;
    console.log("Concated ip: " + ip);


    //==========================
    //======= INPUT ============

    // ======= User input how many Computers need to be joined? =====
    var hostAmount = document.getElementById("hostAmount2").value;
    console.log("How many hosts? (userInput) " + hostAmount);
    // !!! display error message if forgot to fill 
    // TODO display error message if forgot to fill 
    if (hostAmount == "") {
        alert("Please enter number of required hosts!")
    }


    //==========================
    //======= OUTPUT ===========

    // ===== Number of hosts to accommodate --> calculate CIDR table SUFFIX
    var suffix = Math.ceil(Math.log2(hostAmount));
    // 
    document.getElementById("suffix").placeholder = suffix;
    console.log("suffix .innerHTML: " + document.getElementById("suffix").innerHTML.valueOf());

    // ==== trying to solve problem to write into INPUT field
    // let suffixtest = document.getElementById("suffix").innerHTML.valueOf();
    // document.getElementById("suffix").innerHTML = suffixtest;
    // console.log("suffixtest: " + suffixtest);

    console.log("suffix: " + suffix);
    //TODO output into html  --> /suffix

    var netBit = suffix;
    console.log("Network Bit: " + netBit);
    document.getElementById("networkBits").innerHTML = netBit;

    var hostBit = 32 - netBit;
    console.log("Host Bits: " + hostBit);
    document.getElementById("hostBits").innerHTML = hostBit;

    var maxSubnets = Math.pow(2, netBit);
    console.log("maximum Subnets in Network: " + maxSubnets);
    document.getElementById("subnetMax").innerHTML = maxSubnets;

    var maxHosts = Math.pow(2, hostBit);
    console.log("Max hosts per subnet with given suffix: " + maxHosts);
    document.getElementById("hostMax").innerHTML = maxHosts;

    //  var a = netBit.toString(2);
    //      b = a << 8;
    //      console.log("Testing bitwise Subnetmask: " + (a.toString(2)));    




    var subnetmaskBinarySplit;
    var arr = [];
    var subnetmask = function() {
        var subnetmaskHelper = '';
        for (var i = 0; i < hostBit; i++) {
            subnetmaskHelper = subnetmaskHelper + 1;
        };
        console.log("subnetmaskHelper before BitShift: " + subnetmaskHelper);


        // ====== concat the 0s up to 32 =====
        console.log(subnetmaskHelper.length)
        for (j = subnetmaskHelper.length; j < 32; j++) {
            subnetmaskHelper = subnetmaskHelper + 0;
        };
        console.log("concated String: " + subnetmaskHelper);


        // ========== split into octets --> not yet awesome... ======
        subnetmaskBinary = subnetmaskHelper.toString(2).match(/.{1,8}/g);
        console.log("Octets: " + subnetmaskBinary);
        subnetmaskBinarySplit = subnetmaskBinary.toString().split(',');
        // XXX returns ARRAY!!!!!
        console.table(subnetmaskBinarySplit);

        // ======== join binary array with '.'
        // subnetmaskBinaryFinal = subnetmaskBinarySplit.join('.');
        // console.log(subnetmaskBinaryFinal);

        // ========= convert binaries to decimal
        // https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript
        var index;

        for (index = 0; index < subnetmaskBinarySplit.length; ++index) {
            decimal = parseInt((subnetmaskBinarySplit[index]), 2);
            arr.push(decimal);
            console.log(decimal);
        }
        console.table(arr);
        var subnetmaskFinal = arr.join('.');
        console.log(subnetmaskFinal);
        document.getElementById("subnetmask").innerHTML = subnetmaskFinal;
    };
    subnetmask();


    // ====== function to invert numbers
    var wildcardmask = function() {

        var willdcardmaskHelper = "";
        // ======= call convert() for each item in subnetmaskBinarySplit 
        subnetmaskBinarySplit.forEach(convert);

            /* ====== das passiert eigentlich alles erst nach convert(item)*/
            // ====== entferne letzten Punkt bei 0.0.0.127.
            var willdcardmaskFinal = willdcardmaskHelper.slice(0, -1);
            document.getElementById("wildcardmask").innerHTML = willdcardmaskFinal;
            
            // ====== wird von subnetmaskBinarySplit.forEach() aufgerufen
            function convert(item) {
                var octettItem = "";
                for (let index = 0; index < item.length; index++) {
                    // ======= konvertieren subnetmaske und rechnen alles -1 --> invertieren sozusagen 0en und 1sen
                    let _inverted = Math.abs(parseInt(item[index], 10) - 1);
                    // ======= je 8 Mal durchlaufen (Bits) --> fügt zu einem Byte (8) zusammen
                    octettItem += _inverted.toString();
                };
                // ====== hier werden alle Bytes zur wildcardmask 'concated'
                willdcardmaskHelper += parseInt(octettItem, 2) + ".";
            };
    };
    wildcardmask();
}

// SLIDER
//__-------------------------------------------
// var slider = document.getElementById("hostAmount").value;
// var output = document.getElementById("demo");
// output.innerHTML = slider.value;

// function sliderValue(slider) {
// output.innerHTML = this.value;
// console.log(slider);
// }
