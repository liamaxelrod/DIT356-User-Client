<template>
  <div class="row">
    <div class="col-8">
      <v-calendar :columns="$screens({ default: 1, lg: 2 })"
                  :rows="$screens({ default: 1, lg: 2 })"
                  is-expanded
                  :attributes='attrs'/>
    </div>
    <div class="col-4">
      <h2>Your upcoming appointments</h2>
      <ul>
        <li>
          <span>Thursday 22.12.2022</span>
        </li>
        <li>
          <span>Friday 12.01.2023</span>
        </li>
      </ul>
      <h2>Your past appointments</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    return {
      attrs: [
        {
          key: 'today',
          highlight: true,
          dates: new Date()
        },
        {
          highlight: {
            color: 'purple',
            fillMode: 'light'
          },
          dates: new Date(year, month, 13)
        },
        {
          highlight: {
            color: 'purple',
            fillMode: 'outline'
          },
          dates: new Date(year, month, 14)
        }
      ]
    }
  }
}
</script>

<styles>

</styles>
