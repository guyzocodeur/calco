var calc_op = '';
var calc_buf = 0;
var calc_nouveau = false;
var calc_tranquille = 0;

function executeOperation(op,cur)
{
    if(calc_nouveau)
        cur = calc_tranquille;
    else
        calc_tranquille = cur;
    calc_nouveau = true;
    if(calc_op == '+')
        calc_buf += parseFloat(cur);
    else if(calc_op == '-')
        calc_buf -= parseFloat(cur);
    else if(calc_op == '*')
        calc_buf *= parseFloat(cur);
    else if(calc_op == '/')
        calc_buf /= parseFloat(cur);
    else if(calc_op == '%')
        calc_buf %= parseFloat(cur);
    else
        calc_buf = parseFloat(cur);
    document.getElementById('ecran').innerHTML = calc_buf;
    if(op != '=') calc_op = op;
}

function btPress(obj)
{
    var curEcran = document.getElementById('ecran').innerHTML;
    var parts = obj.name.split('_');

    if(parts[0] == 'num')
    {
        if(curEcran.length > 20) return;
        if(calc_nouveau)
        {
            calc_nouveau = false;
            document.getElementById('ecran').innerHTML = parts[1];
        }
        else if(curEcran == '0')
            document.getElementById('ecran').innerHTML = parts[1];
        else
            document.getElementById('ecran').innerHTML = curEcran + parts[1];
    }
    else if (parts[0] == 'op')
    {
        if(calc_nouveau && calc_op != '=')
            calc_op = obj.value;
        else
            executeOperation(obj.value,curEcran);
    }
    else if (parts[0] == 'sp')
    {
        if(parts[1] == 'pmoins')
        {
            if(curEcran.length > 20) return;
            document.getElementById('ecran').innerHTML = parseFloat(curEcran) * -1;
        }
        else if(parts[1] == 'virgule')
        {
            if(curEcran.length > 20) return;
            if(calc_nouveau)
            {
                document.getElementById('ecran').innerHTML = '0.';
                calc_nouveau = false;
            }
            else if(curEcran.indexOf('.') == -1)
                document.getElementById('ecran').innerHTML = curEcran + '.';
        }
        
        else if(parts[1] == 'efface')
        {
            calc_buf = 0;
            calc_tranquille = 0;
            calc_op = '';
            document.getElementById('ecran').innerHTML = '0';
            calc_nouveau = false;
        }
        else if(parts[1] == 'supp')
        {
            document.getElementById('ecran').innerHTML = '0';
            calc_nouveau = true;
        }
        else if(parts[1] == 'op_egal')
        {
            executeOperation('=', curEcran);
        }
        else if(parts[1] == 'retour')
        {
            if(curEcran.length == 1)
                document.getElementById('ecran').innerHTML = '0';
            else
                document.getElementById('ecran').innerHTML = curEcran.substr(0, curEcran.length-1);
        }
    }
    obj.blur();
}

var keyPress = function (e)
{
    e = e || window.event;
    var k = e.keyCode || e.which;
    switch(k)
    {
        case 13:
            btPress(document.fCalc.op_egal);
            break;
        case 27:
            btPress(document.fCalc.sp_supp);
            break;
        case 46:
            btPress(document.fCalc.sp_retour);
            break;
        case 48:
        case 96:
            btPress(document.fCalc.num_0);
            break;
        case 49:
        case 97:
            btPress(document.fCalc.num_1);
            break;
        case 50:
        case 98:
            btPress(document.fCalc.num_2);
            break;
        case 51:
        case 99:
            btPress(document.fCalc.num_3);
            break;
        case 52:
        case 100:
            btPress(document.fCalc.num_4);
            break;
        case 53:
        case 101:
            btPress(document.fCalc.num_5);
            break;
        case 54:
        case 102:
            btPress(document.fCalc.num_6);
            break;
        case 55:
        case 103:
            btPress(document.fCalc.num_7);
            break;
        case 56:
        case 104:
            btPress(document.fCalc.num_8);
            break;
        case 57:
        case 105:
            btPress(document.fCalc.num_9);
            break;
        case 106:
            btPress(document.fCalc.op_multiplication);
            break;
        case 107:
            btPress(document.fCalc.op_addition);
            break;
        case 109:
            btPress(document.fCalc.op_soustraction);
            break;
        case 110:
            btPress(document.fCalc.sp_virgule);
            break;
        case 111:
            btPress(document.fCalc.op_division);
            break;
            case 112:
            btPress(document.fCalc.sp_pmoins);
            break;
            case 113:
            btPress(document.fCalc.op_modul);
            break;
        default:
            break;
    }
}

function keyPressBackspace(e)
{
    e = e || window.event;
    var k = e.keyCode || e.which;
    if(k == 8)
    {
        if(e.type=='keydown') btPress(document.fCalc.sp_retour);
        if(e.preventDefault)
        {
            e.preventDefault();
            e.stopPropagation();
            e.cancelBubble = true;
        }
        else
        {
            e.cancelBubble = true;
        }
        return false;
    }
    return true;
}

function loadKeyboard()
{
    document.onkeydown = keyPressBackspace;
    document.onkeypress = keyPressBackspace;
    document.onkeyup = keyPress;
}

