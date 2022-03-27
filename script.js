let addBtn = document.querySelector('.add-btn');

let mainCont = document.querySelector('.main-cont');

let modalCont = document.querySelector('.modal-cont');
let modalContShow = false;

let deleteTicket = false;
let crossBtn = document.querySelector('.remove-btn');

// Elements for Priority color selection
let colors = ['lightpink' , 'lightblue' , 'lightgreen' , 'black']
// Default priority color
let modalPriorityColor = colors[colors.length-1] // black


// filterColor
let filterColor;


// node list of all color divs in modal
let allPriorityColors = document.querySelectorAll('.priority-color');

// TextArea container where user will insert his task
let textAreaCont = document.querySelector('.textarea-cont');


// MODAL container show
// Displaying or removing modal on addBtn click
addBtn.addEventListener('click', function (e) {
    // Display a model
    modalContShow = !modalContShow;
    if (modalContShow) {
        modalCont.style.display = "flex";
    }
    else {
        modalCont.style.display = "none";
    }
});


// attaching a 'click' event listner to all the color divs present in add color
// the callback function of each event Listner will:
// 1) Remove the class 'active' from every element 
// 2) add class 'active' to the selected element
allPriorityColors.forEach(function(colorElem){
    colorElem.addEventListener('click',function(e){
        allPriorityColors.forEach(function(priorityColor){
            priorityColor.classList.remove('active');
        });

        e.currentTarget.classList.add('active');

        modalPriorityColor = e.currentTarget.classList[0];
    })
});

// Creating a ticket when enter is pressed
document.querySelector('body').addEventListener('keydown', function (e) {
    if(modalContShow){
        let key = e.key;
        if (key == "Enter") {
            
            // creating task ticket
            createTicket(modalPriorityColor,textAreaCont.value);
            
            // Resetting modal cont
            textAreaCont.value='';
            modalCont.style.display = "none";
            modalContShow = !modalContShow;
        }
    }
});



// Ticket creater
function createTicket(color,task) {
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute("class", "ticket-cont");

    ticketCont.innerHTML =  `<div class="ticket-color ${color}"></div>
                             <div class="ticket-id">#F12qKca9Po</div>
                            <div class="task-area">${task}</div>`;
   
    mainCont.appendChild(ticketCont);

    
    addRemoveListner(ticketCont);
    
    // Based on the selected filter color show the ticket or don't show the ticket
    if(filterColor != undefined && filterColor != color){
        ticketCont.style.display = 'none';
    }
}

// For deleting a ticket
crossBtn.addEventListener('click',function(e){
    deleteTicket =! deleteTicket;
    if(deleteTicket){
        crossBtn.style.color = 'red';
    }else{
        crossBtn.style.color = 'white';
        
    }
})

// Adding event listner on ticket to perform remove action
function addRemoveListner(ticketCont){
    
    ticketCont.addEventListener('click',function(e){
        if(deleteTicket){
            e.currentTarget.remove();
        }
    });
}


// Filter
let allColorBtn = document.querySelectorAll('.color');
// console.log(allColorBtn);

allColorBtn.forEach(function(colorBtn){

    colorBtn.addEventListener('click',function(selectEvent){
       
        // To highlight the selected filter color
        allColorBtn.forEach(function(colorBtn){
            colorBtn.classList.remove('active');
        })
        let colorBtn = selectEvent.currentTarget;
        colorBtn.classList.add('active');

        // get the filter color class
        let selectedColorClass = colorBtn.classList[1];

        // Set selected filter color globally
        filterColor = selectedColorClass;

        // get all the tasks ticket
        let allTaskTicket = mainCont.children;

        // Iterate Each and every one and filter out the desired ticket
        for(let i=0;i<allTaskTicket.length;i++){

            // Selecting a particular task ticket
            let currTaskTicket = allTaskTicket[i];
            let ticketColorClass = currTaskTicket.children[0].classList[1];

            // if selected filter color is equal to ticket color then set display to block otherwise none
            if(ticketColorClass === selectedColorClass){
                currTaskTicket.style.display = 'block';
            }else{
                currTaskTicket.style.display = 'none';
            }
        }
     
        
    })
})

allColorBtn.forEach(function(colorBtn){
    colorBtn.addEventListener('dblclick',function(e){
        e.currentTarget.classList.remove('active');

        // get all the task tickets
        let allTaskTicket = mainCont.children;

        // and make display block
        for(let i=0;i<allTaskTicket.length;i++){
            let currTaskTicket = allTaskTicket[i];
            currTaskTicket.style.display = 'block';
        }
        
        // Reset the filter color to undefined when no filter color is selected
        filterColor = undefined;
    })
})