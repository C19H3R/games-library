function Game(title,developers,imageURL,progress,played=false) {
    this.title=title;
    this.developers=developers;
    this.imageURL=imageURL;
    this.progress=progress;
    this.played=played;
}
const removeAllChildNodes=(parent)=> {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const getRandomId=()=>{
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

const addGameToLibrary=(game)=>{
    myLibrary.push(game);
}
const removeGameFromLibrary=(id)=>{
    myLibrary= myLibrary.filter((item,index)=>index!=id);
    console.log(id);
    displayGamesOnPage();
}
const updateProgress=(idx,full)=>{
    if(full)
    myLibrary[idx].progress=100;
    else
    myLibrary[idx].progress=0;
    displayGamesOnPage();
}

const displayGamesOnPage=()=>{
    removeAllChildNodes(parentNodeCards);
    if(myLibrary.length==0){
        //return something else
        console.log("array is empty");
    }else{
        myLibrary.forEach((gameObj)=>{
            const newGameDom=createCardwithInfo(gameObj);
            parentNodeCards.appendChild(newGameDom);
        })
        updateCloseButtons();
        updateCheckBoxes();
    }
}
const updateCloseButtons=()=>{
    let closeButtons=[...document.getElementsByClassName("close-card-btn")];
    closeButtons.forEach((item,idx)=>{
        item.addEventListener("click",()=>{
            console.log(idx);
            removeGameFromLibrary(idx);
        })
    })
}






const updateCheckBoxes=()=>{
    let CheckBoxes=[...document.getElementsByClassName("played-check-box")];
    CheckBoxes.forEach((item,idx)=>{
        item.addEventListener("click",()=>{
            if(item.checked){
                updateProgress(idx,true);
            }else{
                updateProgress(idx,false);
            }
            console.log(item.checked, idx);
        })
    })
}













const createCardwithInfo =(game)=>{
    const card=document.createElement("div");
    card.classList.add("col","mt-3");
    
    //main card body tag
    const cardMain=document.createElement("div");
    cardMain.classList.add("card")

    card.appendChild(cardMain);

    //image tag
    const imgTag=document.createElement("img");
    imgTag.classList.add("card-img-top");
    imgTag.setAttribute("src",game.imageURL);
    imgTag.setAttribute("alt","card image")

    cardMain.appendChild(imgTag);

    //remove button
    const btnDiv=document.createElement("div");
    const closeButton=document.createElement("button")
    closeButton.setAttribute("type","button")
    closeButton.classList.add("btn-close","float-end","mt-2","mx-2","close-card-btn");
    closeButton.setAttribute("aria-label","close");

    btnDiv.appendChild(closeButton);

    cardMain.appendChild(btnDiv);

    //main CardBody

    const cardBody=document.createElement("div");
    cardBody.classList.add("card-body");

    cardMain.appendChild(cardBody);

    //heading / text for card

    const headingTextTag=document.createElement("h4");
    headingTextTag.classList.add("card-title")
    headingTextTag.textContent=game.title;
    
    cardBody.appendChild(headingTextTag);

    const publisherText=document.createElement("span");
    publisherText.classList.add("card-text");
    publisherText.innerHTML=`By<em>${game.developers}</em>`;

    cardBody.appendChild(publisherText);

    //progress Bar

    const progressElement=document.createElement("div");
    progressElement.classList.add("progress","mt-3");

    const progressBar=document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("role","progressbar");
    progressBar.style.width=`${game.progress}%`;
    progressBar.setAttribute("aria-valuenow",`${game.progress}`)
    progressBar.setAttribute("aria-valuemin","0")
    progressBar.setAttribute("aria-valuemax","100")
    progressBar.textContent=game.progress+"%";

    progressElement.appendChild(progressBar);

    cardBody.appendChild(progressElement);

    //checkbox

    const randomIdForCBox=getRandomId();

    const checkboxDiv=document.createElement("div")
    checkboxDiv.classList.add("form-check","mt-3");
    
    const checkBoxInput = document.createElement("input");
    checkBoxInput.classList.add("form-check-input","played-check-box");
    checkBoxInput.setAttribute("type","checkbox");
    checkBoxInput.setAttribute("value","");
    checkBoxInput.id=randomIdForCBox;
    checkBoxInput.checked=game.progress>=90;

    const chkBoxLabel=document.createElement("label")
    chkBoxLabel.classList.add("form-check-label");
    chkBoxLabel.setAttribute("for",randomIdForCBox);
    chkBoxLabel.textContent="Played";

    checkboxDiv.appendChild(checkBoxInput)
    checkboxDiv.appendChild(chkBoxLabel)

    cardBody.appendChild(checkboxDiv);

    return card;
}

const handleSubmit=()=>{
    if(titleInput.value==""||developersInput.value==""||imageUrlInput==""){
       alert("Invalid Input");
        return;
    }
    const newGame=new Game(titleInput.value,developersInput.value,imageUrlInput.value,gameProgress.value,gameProgress.value==100);
    addGameToLibrary(newGame);
    console.log(myLibrary);
    displayGamesOnPage();
    titleInput.value="";
    developersInput.value="";
    imageUrlInput.value="";
    gameProgress.value=0;
}

let myLibrary =[]
const parentNodeCards=document.getElementById("gamesDisplay");

const titleInput=document.getElementById("titleInfo");
const developersInput=document.getElementById("developerInfo");
const imageUrlInput=document.getElementById("imageURL");
const gameProgress=document.getElementById("gameProgress");

const SubmitButton=document.getElementById("submit-entry")

SubmitButton.addEventListener("click",handleSubmit)