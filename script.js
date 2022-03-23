let addBtn = document.querySelector('.add-btn');
let modalCont = document.querySelector('.modal-cont');
let modalContShow = false;
addBtn.addEventListener('click',function(e){
    // Display a model
    modalContShow = !modalContShow;
    if(modalContShow){
        modalCont.style.display = "flex";
    }
    else{
        modalCont.style.display = "none";
    }

    // Create a card accordingly and add it
})