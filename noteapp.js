const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// Click event listener for "Add Note" button
addBtn.addEventListener("click", function () {
    addNote();
});

// Save notes to LocalStorage
const saveNotes = () => {
    const notes = document.querySelectorAll(".note .content");
    const titles = document.querySelectorAll(".note .title");

    const data = [];

    notes.forEach((note, index) => {
        const content = note.value;
        const title = titles[index].value;
        if (content.trim() !== "") {
            data.push({ title, content });
        }
    });

    localStorage.setItem("titles", JSON.stringify(data.map(item => item.title)));
    localStorage.setItem("notes", JSON.stringify(data.map(item => item.content)));
};

// Function to add a new note
const addNote = (text = "", title = "") => {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="icons">
            <i class="save fas fa-save"></i>
            <i class="trash fas fa-trash"></i>
        </div>
        <div class="title-div">
            <textarea class="title" placeholder="Write the title ...">${title}</textarea>
        </div>
        <textarea class="content" placeholder="Note down your thoughts ...">${text}</textarea>
    `;

    const delBtn = note.querySelector(".trash");
    const saveButton = note.querySelector(".save");

    delBtn.addEventListener("click", function () {
        note.remove();
        saveNotes();
    });

    saveButton.addEventListener("click", function () {
        saveNotes();
    });

    main.appendChild(note);
    saveNotes();
};

// Load notes from LocalStorage when page loads
const loadNotes = () => {
    const titlesData = JSON.parse(localStorage.getItem("titles")) || [];
    const contentData = JSON.parse(localStorage.getItem("notes")) || [];

    for (let i = 0; i < Math.max(titlesData.length, contentData.length); i++) {
        addNote(contentData[i], titlesData[i]);
    }
};

loadNotes();

