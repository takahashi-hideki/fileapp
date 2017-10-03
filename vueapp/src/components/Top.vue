<template>
  <div class="top">
    <table border="1" align="center">
      <tr>
        <th>Menu</th>
        <th>description</th>
      </tr>
      <tr>
        <td>TOP</td>
        <td>この画面です。</td>
      </tr>
      <tr>
        <td>MEMBER</td>
        <td>ユーザーの確認、追加、削除を行うことができます。</td>
      </tr>
      <tr>
        <td>LOGIN</td>
        <td>ログインすることができます。</td>
      </tr>
      <tr>
        <td>FILE</td>
        <td>ファイルのアップロード、ダウンロードを行うことができます。先にログインしてください。</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'top'
}
</script>

<style scoped>
table {
  border-color: #000;
  margin-top: 60px;
}
</style>