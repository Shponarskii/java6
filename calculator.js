function calculator1() {
    let c = document.getElementById("cos");
    let a = document.getElementById("kol-vo");
    let r = document.getElementById("res");
    let re = new RegExp('^[0-9]*[.]?[0-9]+$');
    let re1 = /^[1-9]*[0-9]+$/;
    let td = c.value.match(re);
    let ta = a.value.match(re1);
    if (c.value === "" || a.value === "")
        r.innerHTML = "Введите данные";
    else if (td && ta)
        r.innerHTML = ("Стоимость заказа: " + parseFloat(c.value) * parseInt(a.value));
    else r.innerHTML = "Ошибка: неверный формат записи чисел";
}

function calculator2() {
    let s = document.getElementsByName("catch");
    let select = s[0];
    let p = 0;
    let ps = Gcost();
    let pI = parseInt(select.value) - 1;
    if (pI >= 0) {
        p = ps.prodTypes[pI];
    }

    let rD = document.getElementById("switch");
    if (select.value==="2"){
        rD.style.display="block";
    }
    else{
        rD.style.display="none";
    }

    let cD = document.getElementById("flag");
    if (select.value==="3"){
        cD.style.display="block";
    }
    else{
        cD.style.display="none";
    }

    if (select.value === "2") {
        let r = document.getElementsByName("catchclose");
        r.forEach(function (radio) {
            if (radio.checked) {
                let oP = ps.prodOptions[radio.value];
                if (oP !== undefined) {
                    p += oP;
                }
            }
        });
    } 
    else if (select.value === "3") {
        let chb = document.querySelectorAll("#flag input");
        chb.forEach(function (checkbox) {
            if (checkbox.checked) {
                let pP = ps.prodProperty[checkbox.name];
                if (pP !== undefined) {
                    p += pP;
                }
            }
        });
    }

    let sh = document.getElementById("tsize");
    let ans;
    let flag = false;
    let re2=/^[1-9]*[0-9]+$/;
    let km=sh.value.match(re2);
    if (sh.value === "") {
        ans = "Введите данные";
    }
    else if (!km) {
        ans = "Ошибка: неверный формат записи числа";
    }
    else {
        flag = true;
        let f = parseInt(sh.value);
        ans = ("Стоимость заказа: " + f * p);
    }

    let cb = document.getElementById("cost");
    cb.innerHTML = ans;
}

function Gcost() {
    return {
        prodOptions: {
            cr: 300
        },
        prodProperty: {
            in: 500
        },
        prodTypes: [200, 400, 1000]
    };
}

window.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("b-calc");
    button.addEventListener("click", calculator1);

    let input1 = document.getElementById("tsize");
    input1.addEventListener("input", calculator2);

    let s1 = document.getElementsByName("catch");
    s1[0].addEventListener("change", calculator2);

    let radios = document.getElementsByName("catchclose");
    radios.forEach(function (radio) {
        radio.addEventListener("change", calculator2);
    });

    let checkboxes = document.querySelectorAll("#flag input");
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", calculator2);
    });

    calculator2();

});