class Valid { 
  constructor() {
    this.validations = [
      'data-min-length',
      'data-max-length',
      'data-equal',
      'data-email-validate',
      'data-password-validate',
      'data-required',
      'data-only-letters'
    ]
  }
  validate(fm) {
    let curValid = document.querySelectorAll('form .error-validation');
    if(curValid.length) {
      this.cleanValidations(curValid);
    }
    let inps = fm.getElementsByTagName('input');
    let inpA = [...inps];
    inpA.forEach(function(inp, obj) {
      for(let j = 0; this.validations.length > j; j++) {
        if(inp.getAttribute(this.validations[j]) != null) {
          let mtd = this.validations[j].replace("data-", "").replace("-", "");
          let val = inp.getAttribute(this.validations[j])
          this[mtd](inp,val);
        }
      }
    }, this);
  }
  onlyletters(inp) {
    let az = /^[A-Za-z]+$/;;
    let inpV = inp.value;
    let errMes = `Este campo não aceita números nem caracteres especiais`;
    if(!az.test(inpV)) {
      this.printMessage(inp, errMes);
    }
  }
  minlength(inp, minV) {
    let inpLen = inp.value.length;
    let errMes = `O campo precisa ter, no mínimo, ${minV} caracteres`;
    if(inpLen < minV) {
      this.printMessage(inp, errMes);
    }
  }
  maxlength(inp, maxV) {
    let inpLen = inp.value.length;
    let errMes = `O campo pode ter, no máximo, ${maxV} caracteres!!!`;
    if(inpLen > maxV) {
      this.printMessage(inp, errMes);
    }
  }
  equal(inp, inpN) {
    let inpComp = document.getElementsByName(inpN)[0];
    let errMes = `Este campo precisa estar idêntico ao ${inpN}!!!`;
    if(inp.value != inpComp.value) {
      this.printMessage(inp, errMes);
    }
  }
  required(inp) {
    let inpV = inp.value;
    if(inpV === '') {
      let errMes = `Este campo é obrigatório`;
      this.printMessage(inp, errMes);
    }
  }
  emailvalidate(inp) {
    let em = /\S+@\S+\.\S+/;
    let email = inp.value;
    let errMes = `Insira um email no padrão example@email.com !!!`;
    if(!em.test(email)) {
      this.printMessage(inp, errMes);
    }
  }
  passwordvalidate(inp) {
    let chAr = inp.value.split("");
    let upcs = 0;
    let nums = 0;
    for(let k = 0; chAr.length > k; k++) {
      if(chAr[k] === chAr[k].toUpperCase() && isNaN(parseInt(chAr[k]))) {
        upcs++;
      } else if(!isNaN(parseInt(chAr[k]))) {
        nums++;
      }
    }
    if(upcs === 0 || nums === 0) {
      let errMes = `A senha precisa de pelo menos um caractere maiúsculo e um número!!!`;
      this.printMessage(inp, errMes);
    }
  }
  cleanValidations(val) {
    val.forEach(elmt => elmt.remove());
  }
  printMessage(input, mes) {
    let errQt = input.parentNode.querySelector('.error-validation');
    if(errQt === null) {
      let tmp = document.querySelector('.error-validation').cloneNode(true);
      tmp.textContent = mes; 
      let inpPar = input.parentNode;  
      tmp.classList.remove('template');  
      inpPar.appendChild(tmp);
    }
  }
}
let fm = document.getElementById('regf');
let sbmt = document.getElementById('bt');
let vl = new Valid();
sbmt.addEventListener('click', function(qf) {
  qf.preventDefault();
  vl.validate(fm);
});