<template>
<div>
  <h1>笔记列表</h1>
  <button @click="openNoteWindow">新建笔记</button>
  <ul>
    <li v-for="(note, index) in notes" :key="index">{{ note }}</li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return { notes: [] }
  },
  methods: {
    openNoteWindow() {
      window.open('note.html', '新建笔记', 'width=400,height=300')
    }
  },
  mounted() {
    window.electronAPI.getNotes().then((notes) => {
      this.notes = notes
    })
    window.electronAPI.onUpdateNotes((event, notes) => {
      this.notes = notes
    })
  }
}
</script>
