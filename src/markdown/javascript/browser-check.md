# Browser 이름 및 버전 체크 snippet

***

### snippet


    function browser() {
        var userAgent = navigator.userAgent,
            match = userAgent.match(/(opera|chrome|crios|safari|ucbrowser|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
            result = {},
            tem;
    
        if (/trident/i.test(match[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
            result.name = "Internet Explorer";
        } else if (match[1] === "Chrome") {
            tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
    
            if (tem && tem[1]) {
                result.name = tem[0].indexOf("Edge") === 0 ? "Edge" : "Opera";
            }
        }
        if (!result.name) {
            tem = userAgent.match(/version\/(\d+)/i); // iOS support
            result.name = match[0].replace(/\/.*/, "");
    
            if (result.name.indexOf("MSIE") === 0) {
                result.name = "Internet Explorer";
            }
            if (userAgent.match("CriOS")) {
                result.name = "Chrome";
            }
    
        }
        if (tem && tem.length) {
            match[match.length - 1] = tem[tem.length - 1];
        }
    
        result.version = Number(match[match.length - 1]);
    
        return result;
    }
    
    /*  Result
    {name: "Opera", version: 63}
    {name: "Firefox", version: 69}
    {name: "Safari", version: 12}
    {name: "Chrome", version: 77}
    {name: "Internet Explorer", version: 11}
    {name: "Edge", version: 17}
    */