    const inputElement = document.getElementById("input");

    let topIndex=-1;
    let arr=[];

    document.getElementById("zero").onclick = function() {
        inputElement.value += "0";
    };

    document.getElementById("one").onclick = function() {
        inputElement.value += "1";
    };

    document.getElementById("logicalAnd").onclick = function() {
        inputElement.value += " && ";
    };

    document.getElementById("logicalOr").onclick = function() {
        inputElement.value += " || ";
    };

    document.getElementById("logicalNot").onclick = function() {
        inputElement.value += " ! ";
    };

    document.getElementById("bitwiseAnd").onclick = function() {
        inputElement.value += " & ";
    };

    document.getElementById("bitwiseOr").onclick = function() {
        inputElement.value += " | ";
    };

    document.getElementById("bitwiseNot").onclick = function() {
        inputElement.value = '~'+inputElement.value;
    };

    document.getElementById("bitwiseXor").onclick = function() {
        inputElement.value += " ^ ";
    };

    function resetFunc() {
        inputElement.value = "";
        topIndex=0;
        for(let i=0; i<arr.length; i++)
        {
            arr.pop();
        }
    }

    document.getElementById("res").onclick = resetFunc;

    document.getElementById("prev").onclick = function() {
        topIndex--;
        if(topIndex>=0)
        {
            inputElement.value=arr[topIndex];
        }else{
            window.alert("This is earliest Operation");
        }
    }

    document.getElementById("next").onclick = function() {
        topIndex++;
        if(topIndex<arr.length)
        {
            inputElement.value=arr[topIndex];
        }
        else{
            window.alert("This is latest operation");
        }
    }

    function changeToDecimal(binaryString) {
        if(binaryString.length==0) return 0;
        let num=0;
        for(let i=binaryString.length-1; i>=0; i--)
        {
            num+=(2**(binaryString.length-1-i))*binaryString[i];
        }
        return num;
    }

    function changeToBinary(decimalValue) {
        let binaryStr="";
        while(decimalValue>0)
        {
            binaryStr=String(decimalValue%2)+binaryStr;
            decimalValue=parseInt(decimalValue/2);
        }
        return binaryStr;
    }

    document.getElementById("uright").onclick = function() {
        let binaryStr=inputElement.value;
        let newString=binaryStr.substr(0,binaryStr.length-1);
        newString="0"+newString;
        inputElement.value=newString;
        arr.push(inputElement.value);
        topIndex++;
    };

    document.getElementById("left").addEventListener("click", function() {
    let binaryStr = inputElement.value;
    let indexOne=-1;
    while(binaryStr[indexOne]!="1")
    {
        indexOne++;
    }
    binaryStr=binaryStr.substr(indexOne);
    binaryStr = binaryStr.substring(0)+'0'; 
    inputElement.value = binaryStr;
    arr.push(inputElement.value);
    topIndex++;
    });

    document.getElementById("right").addEventListener("click", function() {
        let binaryStr=inputElement.value;
        let lastBit=binaryStr[0];
        let len=binaryStr.length;
        let newString=binaryStr.substr(0,len-1);
        inputElement.value=lastBit+newString;
        arr.push(inputElement.value);
        topIndex++;
    });

    document.getElementById("solve").addEventListener("click", function() {
        inputElement.value+=" = ";
        let binaryStr=inputElement.value.trim();
        let firstTerm="", secondTerm="", operatorSign="";
        let tempFlag=true;
        let countEqual=0;
        let validStr="01&|!^~";
        if(binaryStr[0]=='~')
        {
            operatorSign="~";
            for(let i=1; i<binaryStr.length; i++)
            {
                if (validStr.includes(binaryStr[i])==false && binaryStr[i]!="="){
                    tempFlag=false;
                }
                else if(binaryStr[i]=="1" || binaryStr[i]=="0")
                {
                    firstTerm+=binaryStr[i];
                }
                else if(binaryStr[i]=="=")
                {
                    countEqual++;
                }
                else if(binaryStr[i]==" "){
                    continue;
                }
            }
        }
        else{

            for(let i=0; i<binaryStr.length; i++)
            {
                if(binaryStr[i]!=" ")
                {
                    if (validStr.includes(binaryStr[i])==false && binaryStr[i]!="="){
                        tempFlag=false;
                    }
                    else if((binaryStr[i]=="1" || binaryStr[i]=="0") && (operatorSign.length==0))
                    {
                        firstTerm+=binaryStr[i];
                    }
                    else if((binaryStr[i]=="1" || binaryStr[i]=="0") && (operatorSign.length!=0))
                    {
                        secondTerm+=binaryStr[i];
                    }
                    else if(validStr.substr(2).includes(binaryStr[i])==true)
                    {
                        operatorSign+=binaryStr[i];
                    }
                    else if(binaryStr[i]=="="){
                        countEqual++;
                    }
                    else if(binaryStr[i]==" "){
                        continue;
                    }
                }
            }
        }
        let checkFlag=false;
        if((operatorSign.length>2) || tempFlag==false || countEqual>1 || (operatorSign.length==0))
        {
            inputElement.value="";
            flag=true;
            checkFlag=true;
        }
        if(checkFlag){
            checkFlag=false;
            window.alert("enter valid input");
            return;
        }
        else{
            let result="";
            let firstNum=changeToDecimal(firstTerm);
            let secondNum=changeToDecimal(secondTerm);
            if(firstTerm.length!=secondTerm.length)
            {
                if(firstTerm.length<secondTerm.length)
                {
                    while(firstTerm.length<secondTerm.length)
                    {
                        firstTerm = "0" + firstTerm;
                    }
                }
                else{
                    while(secondTerm.length<firstTerm.length)
                    {
                        secondTerm = "0" + secondTerm;
                    }
                }
            }
            switch(operatorSign)
            {
                case "&":
                {
                    result="";

                    for(let i=0; i<firstTerm.length; i++)
                    {
                        if(firstTerm[i]==secondTerm[i] && firstTerm[i]=="1")
                        {
                            result=result+"1";
                        }
                        else{
                            result=result+"0";
                        }
                    }
                    inputElement.value+=result;
                    break;
                }

                case "|":
                {
                    result="";
                    for(let i=0; i<firstTerm.length; i++)
                    {
                        if(firstTerm[i]=="1" || secondTerm[i]=="1")
                        {
                            result=result+"1";
                        }
                        else{
                            result=result+"0";
                        }
                    }
                    inputElement.value+=result;
                    break;
                }

                case "^":
                {
                    result="";
                    for(let i=0; i<firstTerm.length; i++)
                    {
                        if(firstTerm[i]==secondTerm[i])
                        {
                            result=result+"0";
                        }
                        else{
                            result=result+"1";
                        }
                    }
                    inputElement.value+=result;
                    break;
                }

                case "~":
                {
                    result="";
                    for(let i=0; i<firstTerm.length; i++)
                    {
                        if(firstTerm[i]=="0"){
                            result+="1";
                        }
                        else {
                            result+="0";
                        }
                    }
                    inputElement.value += result;
                    break;
                }

                case "&&":
                {
                    result="";
                    if(firstNum!=0 && secondNum!=0){
                        result="1";
                        inputElement.value+="1";
                    }
                    else {
                        result="0";
                        inputElement.value+="0";
                    }
                    break;
                }

                case "||":
                {
                    result="";
                    if(firstNum!=0 || secondNum!=0){
                        result="1";
                        inputElement.value+="1";
                    }
                    else {
                        result="0";
                        inputElement.value+="0";
                    }
                    break;
                }
            }
            arr.push(inputElement.value);
            topIndex++;

            if(document.getElementById('bin_dec').checked == true && operatorSign!="~")
            {
                let finalNum=changeToDecimal(result);
                inputElement.value+=` , ${firstNum} ${operatorSign} ${secondNum} = ${finalNum}`;
            }
            else if(document.getElementById('bin_dec').checked == true && operatorSign=="~")
            {
                let negateNum=changeToDecimal(result);
                inputElement.value+=` , ${operatorSign} ${firstNum} = ${negateNum}`;
            }
        }
    });
