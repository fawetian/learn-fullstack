import React, { useState, useEffect } from 'react'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    window.electronAPI.getNotes().then(setNotes)
    window.electronAPI.onUpdateNotes((_event, newNotes) => setNotes(newNotes))
  }, [])

  const openNoteWindow = () => {
    window.open('note.html', '新建笔记', 'width=400,height=300')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>我的笔记</h1>
      <button onClick={openNoteWindow}>新建笔记</button>
      <ul>
        {notes.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
