const button = document.getElementById("add-btn")
const unordList = document.getElementById("unordered-list")
const inputText = document.getElementById("input-text")

button.addEventListener('click', (event) =>{
    event.preventDefault()

    const listItem = document.createElement('li')
    if (inputText.value === ""){
        alert("Task can not be empty.")
    } else {
        listItem.textContent = inputText.value;
        inputText.value = ""
        listItem.style.padding = "16px"
        listItem.style.borderBottom = "2px solid #012E4A"
        listItem.style.fontSize = "1.5rem"
        listItem.setAttribute('draggable', true);
        unordList.appendChild(listItem)
    }
 
    listItem.addEventListener("mouseenter", (event) => {
        event.target.style.backgroundColor = "#012E4A";
        event.target.style.color = "#E8EDE7";
        setTimeout(() => {
          event.target.style.backgroundColor = "";
          event.target.style.color="";
        }, 500);
      },
      false
    );
    
    listItem.addEventListener('dragstart', dragStartHandler);
    listItem.addEventListener('dragenter', dragEnterHandler);
    listItem.addEventListener('dragleave', dragLeaveHandler);
    listItem.addEventListener('dragover', dragOverHandler);
    listItem.addEventListener('drop', dropHandler);

    listItem.addEventListener("mousedown", event=>{
        if (event.button === 1)
        event.target.remove()
    })
})

function dragStartHandler(event) {
    currentDragTarget = event.target;
}

function dragEnterHandler(event) {
    event.target.classList.add('drag-over');
}

function dragLeaveHandler(event) {
    event.target.classList.remove('drag-over');
}

function dragOverHandler(event) {
    event.preventDefault();
}

function dropHandler(event) {
    event.preventDefault();

    event.target.classList.remove('drag-over');

    let dropTarget = event.target;
    while (dropTarget.tagName !== 'LI') {
        dropTarget = dropTarget.parentNode;
    }

    if (dropTarget !== currentDragTarget) {
        const insertBefore = (event.clientY < dropTarget.getBoundingClientRect().top + dropTarget.offsetHeight / 2);
        if (insertBefore) {
            dropTarget.parentNode.insertBefore(currentDragTarget, dropTarget);
        } else {
            dropTarget.parentNode.insertBefore(currentDragTarget, dropTarget.nextSibling);
        }
    }
}



