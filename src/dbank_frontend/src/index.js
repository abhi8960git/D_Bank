import { dbank_backend } from "../../declarations/dbank_backend";

console.log(dbank_backend);

const button = document.querySelector("#submit-btn");

window.addEventListener("load", async function () {
  // console.log("Finshed Loading..");

  const currentVal = await dbank_backend.checkBalance();
  this.document.getElementById("value").innerText = currentVal;
});

document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("submit");

    const inputAmount = parseFloat(
      document.getElementById("input-amount").value
    );
    const outputAmount = parseFloat(
      document.getElementById("withdrawal-amount").value
    );
    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length != 0) {
      await dbank_backend.topUp(inputAmount);
    }

    if(document.getElementById("withdrawal-amount").value.length != 0){
      await dbank_backend.widthdraw(outputAmount);
    }

    await dbank_backend.compound();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";

    button.removeAttribute("disabled");
  });
