let darkbtn= document.querySelector('#darkbtn');
let maindiv= document.querySelector('main');
let add= document.querySelector('#addtask');
let formdiv= document.querySelector('.formdiv')
let form=document.querySelector('form');
let tasklist= document.querySelector('.taskshow');
let taskdiv= document.querySelector('.tasks');
let taskpending= document.querySelector('.taskpending')
let menu= document.querySelector('.menu');
let currentFilter = 'all';
let taskarr=[];
darkbtn.addEventListener("click", () => {
    maindiv.classList.toggle("dark");
    
});
//this is event bubling
maindiv.addEventListener("click", () => {
  console.log("Grandparent main div ");
});

menu.addEventListener("click", () => {
  console.log("Parent menu");
});

document.querySelector(".alltask").addEventListener("click", () => {
    console.log('👇bubling 👇')
  console.log("Child .alltask");
});
//.....
//this is event capturing
maindiv.addEventListener("click", () => {
    console.log('👇capturing 👇')
  console.log("Grandparent main div");
},true);

menu.addEventListener("click", () => {
  console.log("Parent menu");
},true);

document.querySelector(".alltask").addEventListener("click", () => {
  console.log("Child .alltask button");
},true);
//.........
// the different between capturing and bubbling is in order which event travel
// in bubbling the event towards upwards from the clicked element child->parent->grandparent
// in capturing the event travl from outermost element and goes downward totally reverse of  bubbling 

add.addEventListener('click',()=>{
 formdiv.style.display='flex';
})

function closef () {
formdiv.style.display='none';
}
function renderTasks(filter = currentFilter) {
    currentFilter = filter;
    tasklist.innerHTML = '';

    let tasks = taskarr;

    if (filter === 'pending') {
        tasks = taskarr.filter(task => task.status === 'pending');
    }
    if (filter === 'completed') {
    tasks = taskarr.filter(task => task.status === 'completed');
}
    

    tasks.forEach(elem => {
         let card = document.createElement('div');
        card.className ='task';

        card.innerHTML = `<div class="taskcontaint">
            <div class="tasktext">
           <div>
            <h2>name</h2>
            <p>${elem.tname}</p>
           </div>
            <div>
            <h2>status</h2>
            <p>${elem.status}</p>
           </div> <div>
            <h2>category</h2>
            <p>${elem.taskcategory}</p>
           </div>
        </div>
        <div class="taskbutton">
            <button class="editbtn">edit</button>
            <button class="delete">delete</button>
            <button class="completebtn">Complete</button>
        </div>
        </div>
        <div class="editsection">
            <input type="text" id="editname" placeholder="enter task name">
              <select id="editcategory" >
        <option value="coding-task">coding task</option>
        <option value="personal-task">personal task</option>
        <option value="professional-task">professional task</option>
    </select>
    <select id="editstatus" >
        <option value="pending">pending</option>
        <option value="Completed">Completed</option>
    </select>
    <button class='subedit'>submit</button>
        </div>`;
        console.log(taskarr);
        card.dataset.id = elem.id;
        card.dataset.status = elem.status;
        card.dataset.category = elem.taskcategory;

        tasklist.appendChild(card);
    });
}
function handleTaskClick(e) {
    if (e.target.classList.contains('editbtn')) {
         let card = e.target.closest('.task');
        let editsection = card.querySelector('.editsection');
        
         if(editsection.style.display === 'flex'){
        editsection.style.display = 'none';
    } else {
        editsection.style.display = 'flex';
    }
    }

    if (e.target.classList.contains('delete')) {
     let card = e.target.closest('.task');
        let id= card.dataset.id;
        taskarr = taskarr.filter(elem => elem.id !== id);
         card.remove();
         renderTasks();
    }

    if (e.target.classList.contains('subedit')) {
       let card = e.target.closest('.task');

    let id = card.dataset.id;
    let status = card.dataset.status;
    let type = card.dataset.category;

    let editSection = e.target.closest('.editsection');
    let input = editSection.querySelector('input');
    let selectct= editSection.querySelector('#editcategory');
    let selectst= editSection.querySelector('#editstatus');
    let taskd= taskarr.find((elem)=> elem.id === id);

    
    taskd.tname=input.value;
    taskd.taskcategory=selectct.value;
     taskd.status=selectst.value;
    renderTasks();
    console.log(taskd);
    }

    if (e.target.classList.contains('completebtn')) {
       let card = e.target.closest('.task');
        let id=card.dataset.id;
        let text= card.querySelector('.textcontaint');
        let taskd = taskarr.find(elem => elem.id === id);
        taskd.completed=true;

        taskd.status = 'completed';
        renderTasks();

        console.log(taskarr);
    }
}

menu.addEventListener('click',(e)=> {
   
 if (e.target.classList.contains('pendingt')) {
        
     
    }

    if (e.target.classList.contains('completedt')) {
        renderTasks('completed');
  
    }

    if (e.target.classList.contains('alltask')) {
        renderTasks('all');
    }
    
})
form.addEventListener('submit',(e)=> {
     e.preventDefault();
   
     let tname= e.target[0].value;
    let taskcategory= e.target[1].value;
    if(tname.trim()==='' || taskcategory.trim()===''){
        alert('fill the fields')
        return;
    }

    taskarr.push({
        id:crypto.randomUUID(),
        tname,
        taskcategory,
        status:'pending',
        completed:false,
    })
    renderTasks()
    console.log(taskarr)
    form.reset();
    formdiv.style.display='none';
})



tasklist.addEventListener('click',handleTaskClick);

let diagram = document.querySelector('.diagram');

document.querySelector('.showd').addEventListener('click', () => {
    if (diagram.style.display === 'none') {
        diagram.style.display = 'flex';
        document.querySelector('.showd').textContent='hide';
    } else {
        diagram.style.display = 'none';
        document.querySelector('.showd').textContent='show diagram';
    }
});