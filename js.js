/**
 * Created by Administrator on 2017/4/12.
 */
function Sma(obj) {
    // console.log(this.scp);
    this.scp = document.getElementById(obj.scp) || document.body;

    this.data = obj.data;
    this._init()
}
Sma.prototype = {
    _init: function () {
        var _this = this;
        _this.render()
    },
    render: function () {
        var _this = this;
        var structure;
        var nowStructure;
        var needNode = '';
        if (this.scp.querySelector("[s-txt]")) {
            this.scp.querySelector("[s-txt]").innerText = _this.data[this.scp.querySelector("[s-txt]").getAttribute("s-txt")]
        }
        if (this.scp.querySelector("[s-model]")) {


            _this.scp.querySelector("[s-model]").onpropertychange = scpWatch;
            _this.scp.querySelector("[s-model]").addEventListener('input', scpWatch, false);

            function scpWatch() {
                var reg = /\{#(\w+)#\}/g;
                _this.data[_this.scp.querySelector("[s-model]").getAttribute("s-model")] = _this.scp.querySelector("[s-model]").value;
                _this.scp.querySelector("[s-txt]").innerText = _this.data[_this.scp.querySelector("[s-model]").getAttribute("s-model")];
                structure = _this.scp.childNodes;
                circulation(structure, needNode);
                if (nowStructure.parentNode.childNodes.length != 0) {

                    if (reg.test(nowStructure.nextSibling.nodeValue)) {
                        // alert();
                        console.log(nowStructure.nextSibling.nodeValue.indexOf("{"));
                        console.log();
                        needNode = initStructure(nowStructure.nextSibling.nodeValue);
                        nowStructure.nextSibling.nodeValue=nowStructure.nextSibling.nodeValue.substring(0, 15)+ ""+ _this.data[needNode];
                    }
                    else {
                        nowStructure.nextSibling.nodeValue=nowStructure.nextSibling.nodeValue.substring(0, 15)+ ""+ _this.data[needNode];
                    }
                } else {

                }
                // console.log(nowStructure.parentNode.childNodes.length);
                // console.log(nowStructure.nextSibling);
            }

            function circulation(arr) {
                var haveNode = [];
                var haveNoNode = [];

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].childNodes.length != 0) {
                        haveNode.push(arr[i]);
                    }
                    else {
                        haveNoNode.push(arr[i]);
                    }
                }
                for (var j = 0; j < haveNoNode.length; j++) {
                    if ((typeof haveNoNode[j].nodeValue) == "string") {
                        if (haveNoNode[j].nodeValue.indexOf("{") != -1) {
                            // console.log(1);
                            if (haveNoNode[j].parentNode.childNodes.length != 0) {
                                nowStructure = haveNoNode[j].previousSibling;
                            } else {
                                nowStructure = haveNoNode[j].parentNode;
                            }


                        }
                    }
                }
                console.log(haveNode);

            }

            function initStructure(tpl, res) {
                var reg = /\{#(\w+)#\}/g;
                var x = '';
                if (reg.test(tpl)) {
                    tpl.replace(reg, function (match, $1) {
                        // console.log(res[$1]);
                        x = $1
                    });
                    return x
                }

            }
        }
    }
};






