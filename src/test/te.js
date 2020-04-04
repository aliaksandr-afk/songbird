

 function addNote(title, content) {
    return { type: 'ADD_NOTE', title, content };
}

console.log(addNote('tit', 'cont'))

