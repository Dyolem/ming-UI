import { defineComponent } from 'vue'

export default defineComponent(() => {
  return () => {
    return (
      <table>
        <thead>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>

      </table>
    )
  }
}, { name: 'MTable' })
