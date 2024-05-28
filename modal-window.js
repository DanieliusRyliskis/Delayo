const firstAdd = document.getElementById("first-add");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const blur = document.querySelector(".blur");
const closeButton = document.querySelector(".close-modal");
const cancelButton = document.getElementById("cancel-button");

const hiddenArray = [modal, overlay, blur];

const changeModal = function () {
  console.log(this);
  hiddenArray.forEach((i) => {
    i.classList[this]("hidden");
  });
};
// Check how to pass a function as an argument
firstAdd.addEventListener("click", changeModal.bind("remove"));
closeButton.addEventListener("click", changeModal.bind("add"));
cancelButton.addEventListener("click", changeModal.bind("add"));
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden"))
    changeModal.bind("add")();
});
